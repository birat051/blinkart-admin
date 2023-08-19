import EditSellerForm from '@/components/EditSellerForm'
import SellerView from '@/components/SellerView'
import Seller, { SellerDataModel } from '@/models/seller_model'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import connectToDatabase from '@/util/connectDB'
import Head from 'next/head'
import React, { useState } from 'react'

type sellerPageProp={
  sellers: SellerDataModel[],
  error?: string
}

function SellerPage(props:sellerPageProp) {
  const [selectedSeller, setselectedSeller] = useState<string>('')
  const [selectedUser, setselectedUser] = useState('')
  const [sellerList, setsellerList] = useState(props.sellers)
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
    return {
      props: {
        sellers:JSON.parse(JSON.stringify(sellers))
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