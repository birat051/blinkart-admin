import BannerModel, { Banner } from '@/models/banner_model'
import ProductCategoryModel from '@/models/category_model'
import ProductDataModel from '@/models/product_model'
import { BannerView } from '@/styles/banners.style'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import connectToDatabase from '@/util/connectDB'
import Head from 'next/head'
import React, { useState } from 'react'
import Image from 'next/image'
import BannerViewComponent from '@/components/BannerView'


interface BannerType
{
  bannerId:string,
  productName?:string,
  categoryName?:string,
  parentCategoryName?: string
}

export interface BannerMap{
  [bannerId: string]: {
    productName:string,
    categoryName: string,
    parentCategoryName: string
  };
}

type bannerProp={
  banners: Banner[],
  bannerDetailMap: BannerMap
  error?: string
}



function BannerPage(props:bannerProp) {
  if(props.error)
  {
    return (
      <ErrorContainer>
        <p>Unexpected error ocurred: {props.error}</p>
      </ErrorContainer>
    )
  }
  const [bannerList, setbannerList] = useState(props.banners)
  const deleteBanner=async (bannerId:string)=>{
    try{
      const response = await fetch(`/api/banner/delete?bannerId=${bannerId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
    const responseData=await response.json()
    if(response.status===200)
    {
      alert('Banner has been deleted')
      const newBannerList=bannerList.filter((banner)=>banner._id!==bannerId)
      setbannerList(newBannerList)
    }
    else
    alert(responseData.error);
  }
  catch(error){
      alert('Unexpected error occured while trying to delete banner')
  }
  }
  return (
    <HomePageRightColumn>
      <Head>
        <title>All Banners</title>
      </Head>
      {bannerList.map((banner)=>{
        return (
          <BannerViewComponent key={banner._id} banner={banner} bannerDetailMap={props.bannerDetailMap} deleteBanner={deleteBanner}/>
        )
      })}
    </HomePageRightColumn>
  )
}

export default BannerPage

export async function getStaticProps()
{
  try{
    await connectToDatabase()
    const banners=await BannerModel.find()
    const bannerDetails:BannerType[]=await Promise.all(banners.map(async (banner)=> {
      let detail: BannerType = {
        bannerId: banner._id.toString(),
      };
      if (banner.link.startsWith('/categories/')) {
        const categoryId = banner.link.split('/')[2];
        console.log('Category id: ',categoryId)
        const category = await ProductCategoryModel.findById(categoryId).populate('parentCategory');
        if (category) {
          detail.categoryName = category.name;
          if(category.parentCategory)
          detail.parentCategoryName = category.parentCategory.name
        }
      } else if (banner.link.startsWith('/products/')) {
        const productId = banner.link.split('/')[2];
        console.log('Product id: ',productId)
        const product = await ProductDataModel.findById(productId).populate('category');
        if (product) {
          detail.productName = product.name;
          detail.categoryName=product.category.name
        }
      }
      return detail;
    }))
    // console.log('Banner details are: ',bannerDetails)
    const bannerDetailMap:BannerMap={}
    bannerDetails.forEach((banner)=>{
      bannerDetailMap[banner.bannerId]={
        categoryName: banner.categoryName??'',
        parentCategoryName: banner.parentCategoryName??'',
        productName: banner.productName??''
      }
    })
    console.log('Banner map is: ',bannerDetailMap)
    return {
      props: {
        banners: JSON.parse(JSON.stringify(banners)),
        bannerDetailMap
      },
      revalidate: 600
    }
  }
  catch(e)
  {
    return {
      props: {
        error: (e as Error).toString()
      }
    }
  }
}