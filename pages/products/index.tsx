import ProductDataModel, { Product } from '@/models/product_model'
import connectToDatabase from '@/util/connectDB'
import React, { useState } from 'react'
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from 'next'
import { CustomUser } from '@/components/MenuSection'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import ProductView from '@/components/ProductView'
import EditProductForm from '@/components/EditProductForm'
import { ProductCategory } from '@/models/category_model'
import Head from 'next/head'

type productPropType={
  error?:string,
  products:Product[]
}

function ProductsPage(props:productPropType) {
  if(props.error)
  {
    return (
      <ErrorContainer>
        <p>Unexpected error ocurred: {props.error}</p>
      </ErrorContainer>
    )
  }
  const [productList, setproductList] = useState(props.products)
  const [selectedProduct, setselectedProduct] = useState('')
  const changeSelectedProduct=(productId:string)=>{
    setselectedProduct(productId)
  }
  return (
    <HomePageRightColumn>
      <Head>
        <title>Listed Products</title>
      </Head>
      {productList.map((product:Product)=>{
        if(selectedProduct===product._id)
        return(
        <EditProductForm product={product} category={product.category as ProductCategory} key={product._id}/>
          )
        return (
          <ProductView key={product._id} product={product} changeSelectedProduct={changeSelectedProduct}/>
        )
      })}
    </HomePageRightColumn>
  )
}



export async function getServerSideProps(context:GetServerSidePropsContext)
{
  const session =await getSession(context)
  try{
    await connectToDatabase()
    const products=await ProductDataModel.find({seller: (session?.user as CustomUser)?.seller}).populate('category')
    console.log('Products are: ',products)
    return{
      props:{
        products:JSON.parse(JSON.stringify(products))
      }
    }
  }
  catch(error)
  {
    console.log('Caught unexpected error while fetching products: ',error)
    return{
      props:{
        error:(error as Error).toString()
      }
    }
  }
}


export default ProductsPage

