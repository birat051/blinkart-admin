import OfferModel, { Offer } from '@/models/offer_model'
import { ErrorContainer } from '@/styles/global.style'
import { OfferListView } from '@/styles/offers.style'
import connectToDatabase from '@/util/connectDB'
import Head from 'next/head'
import React, { useState } from 'react'
import OfferView from '@/components/OfferView'
import { CategoryList, SubCategoryMap } from './add'
import ProductCategoryModel, { ProductCategory } from '@/models/category_model'
import EditOfferForm from '@/components/EditOfferForm'


type OfferProp={
    offerList: Offer[],
    error?: string,
    subCategoryMap: SubCategoryMap,
    parentCategories: ProductCategory[]
}   

function OfferPage(props:OfferProp) {
    if(props.error)
    {
      return (
        <ErrorContainer>
          <p>{props.error}</p>
        </ErrorContainer>
      )
    }
    const [offerList, setofferList] = useState(props.offerList)
    const [selectedOffer, setselectedOffer] = useState('')
    const deleteOffer=async (offerId:string)=>{
        try{
            const response = await fetch(`/api/offers/delete?offerId=${offerId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
              });
          const responseData=await response.json()
          if(response.status===200)
          {
            alert('Offer has been deleted')
            const newOfferList=offerList.filter((offer)=>offer._id!==offerId)
            setofferList(newOfferList)
          }
          else
          alert(responseData.error);
        }
        catch(error){
            alert('Unexpected error occured while trying to delete offer')
        }
    }
    const changeSelectedOffer=(offerId:string)=>{
        setselectedOffer(offerId)
    }
    const updateOfferList=(newOffer:Offer)=>{
        const newOfferList=offerList.filter((offer)=>offer._id!==newOffer._id)
        setofferList([...newOfferList,newOffer])
    }
  return (
    <OfferListView>
        <Head>
            <title>View all offers</title>
        </Head>
        {offerList.map((offer)=>{
            if(offer._id===selectedOffer)
            return (
            <EditOfferForm subCategoryMap={props.subCategoryMap} offer={offer} parentCategories={props.parentCategories} key={offer._id} closeEditForm={changeSelectedOffer} updateOfferList={updateOfferList}/>
            )
            return (
                <OfferView key={offer._id} offer={offer} deleteOffer={deleteOffer} editOffer={changeSelectedOffer}/>
            )
        })}

    </OfferListView>
  )
}

export default OfferPage

export async function getStaticProps()
{
    try{
        await connectToDatabase()
        const offerList=await OfferModel.find().populate('parentCategory').populate('category');
        // console.log('Offer list is: ',offerList)
        const parentCategories=await ProductCategoryModel.find({parentCategory:null})
        const subCategoryList:CategoryList[]=await Promise.all(parentCategories.map(async (category)=>{
            const categories=await ProductCategoryModel.find({parentCategory: category._id.toString()})
            return {
                id: category._id,
                categories: JSON.parse(JSON.stringify(categories))
            }
        }))
        const subCategoryMap:SubCategoryMap={}
        subCategoryList.forEach((category)=>{
            subCategoryMap[category.id]=category.categories
        })
        return {
            props: {
                offerList:JSON.parse(JSON.stringify(offerList)),
                subCategoryMap,
                parentCategories: JSON.parse(JSON.stringify(parentCategories))
            },
            revalidate: 600
        }
    }
    catch(error)
    {
        return {
            error: (error as Error).toString()
        }
    }
}