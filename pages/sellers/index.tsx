import EditSellerAccountForm from '@/components/EditSellerAccountForm'
import EditSellerForm from '@/components/EditSellerForm'
import SellerView from '@/components/SellerView'
import UserDataModel from '@/models/admin_user_model'
import Seller, { SellerDataModel } from '@/models/seller_model'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import connectToDatabase from '@/util/connectDB'
import Head from 'next/head'
import React, { useState } from 'react'

interface SellerAdminMap {
  [sellerId: string]: string;
}

type sellerPageProp={
  sellers: SellerDataModel[],
  error?: string,
  sellerDetails: SellerAdminMap
}

function SellerPage(props:sellerPageProp) {
  const [selectedSeller, setselectedSeller] = useState<string>('')
  const [selectedUser, setselectedUser] = useState('')
  const [sellerList, setsellerList] = useState(props.sellers)
  const [sellerEmailMap, setsellerEmailMap] = useState(props.sellerDetails)
  if(props.error)
  {
    return (
      <ErrorContainer>
        <p>{props.error}</p>
      </ErrorContainer>
    )
  }
  const changeSelectedSeller=(sellerId:string)=>{
    setselectedSeller(sellerId)
    setselectedUser('')
  }
  const changeSelectedSellerPassword=(sellerId:string)=>{
    setselectedUser(sellerId)
    setselectedSeller('')
  }
  const updateSellerDetails=(seller:SellerDataModel)=>{
    const newSellerList=sellerList.filter((data)=>data._id!==seller._id)
    setsellerList([...newSellerList,seller])
  }
  const changeEmailList=(sellerId:string,emailId:string)=>{
    const newSellerMap=sellerEmailMap
    newSellerMap[sellerId]=emailId
    setsellerEmailMap(newSellerMap)
  }
  return (
    <HomePageRightColumn>
       <Head>
        <title>Sellers</title>
      </Head>
      {sellerList.map((seller)=>{
        if(selectedSeller===seller._id)
        return (
          <EditSellerForm key={seller._id} closeSellerForm={changeSelectedSeller} seller={seller} updateSellerDetails={updateSellerDetails}/>
          )
        else if(selectedUser===seller._id)
        return (
          <EditSellerAccountForm key={seller._id} emailId={sellerEmailMap[seller._id]} sellerId={seller._id} closeSellerForm={changeSelectedSeller} changeEmailList={changeEmailList}/>
          )
        return (
          <SellerView key={seller._id} seller={seller} changeSelectedSeller={changeSelectedSeller} changeSelectedSellerPassword={changeSelectedSellerPassword}/>
        )
      })}
    </HomePageRightColumn>
  )
}

export default SellerPage

export async function getStaticProps(){
  try{
    await connectToDatabase()
    const sellers=await Seller.find()
    const sellerAdminUsers = await Promise.all(
      sellers.map(async (seller) => {
        const adminUser = await UserDataModel.findOne({ seller: seller._id });
        return {
          sellerId: seller._id,
          email: adminUser?.email || ''
        };
      })
    );
    const sellerDetails:SellerAdminMap = {};
    sellerAdminUsers.forEach((user) => {
      sellerDetails[user.sellerId] = user.email;
    });
    return {
      props: {
        sellers:JSON.parse(JSON.stringify(sellers)),
        sellerDetails
      },
      revalidate: 600
    }
  }
  catch(e)
  {
    return {
      props:{
        error: (e as Error).toString()
      }
    }
  }
}