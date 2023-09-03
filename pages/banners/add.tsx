import ProductCategoryModel, { ProductCategory } from '@/models/category_model'
import ProductDataModel, { Product } from '@/models/product_model'
import { AddProductForm } from '@/styles/addProducts.style'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import connectToDatabase from '@/util/connectDB'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'

interface ProductCategoryData{
    categoryId:string,
    products: Product[]
}

interface ProductCategoryMap{
    [categoryId: string]: Product[];
}

interface SubCategoryMap{
  [categoryId: string]: ProductCategory[];
}


const BannerDetails=z.object({
    title: z.string().min(3),
    category: z.string().min(1),
    imageUrl:z.string().url()
  })

type addBannerProp={
    categories: ProductCategory[],
    productMap: ProductCategoryMap,
    subCategoryMap: SubCategoryMap,
    error?: string
}

function AddBannerPage(props:addBannerProp) {
  const [imageUrl, setimageUrl] = useState('')
  const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(BannerDetails)})
  const { field: categoryField } = useController({
    name: 'category',
    control,
  });
  const { field: subcategoryField } = useController({
    name: 'subcategory',
    control,
  });
  const { field: productField } = useController({
    name: 'product',
    control,
  });
  const { field: imageField } = useController({
    name: 'imageUrl',
    control,
  });
  const {errors}=formState
  const handleCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    categoryField.onChange(event.target.value)
  }
  const handleSubCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    subcategoryField.onChange(event.target.value)
  }
  const handleProductChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    productField.onChange(event.target.value)
  }
  const parentCategories=props.categories.filter((category)=>category.parentCategory===null)
  const onFormSubmit=async (formValues:Record<string,any>)=>{
    let bannerUrl=''
    if(productField.value && productField.value.length>0)
    bannerUrl='/products/'+productField.value
    else if(subcategoryField.value && subcategoryField.value.length>0)
    bannerUrl='/categories/'+subcategoryField.value+'/1'
    else
    bannerUrl='/categories/'+categoryField.value+'/1'
    console.log('Banner url is: ',bannerUrl)
    const data={
      title:formValues.title,
      imageUrl: formValues.imageUrl,
      link: bannerUrl
    }
    try{
      const response = await fetch('/api/banner/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    // console.log('Response is: ',response.body)
    const responseData=await response.json()
    if(response.status===201)
    {
      alert('Banner has been successfully added')
      reset()
      categoryField.onChange(null)
      imageField.onChange(null)
      
    }
    else
    alert(responseData.error);
  }
  catch(error){
      alert('Unexpected error occured while trying to add banner')
  }
  }
  const changeImageUrl=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setimageUrl(event.target.value)
  }
  const addImageUrl=()=>{
    imageField.onChange(imageUrl)
    setimageUrl('')
  }
  if(props.error)
  {
    return (
      <ErrorContainer>
        <p>Unexpected error ocurred: {props.error}</p>
      </ErrorContainer>
    )
  }
  return (
    <HomePageRightColumn>
        <Head>
            <title>Add Banner</title>
        </Head>
      <AddProductForm onSubmit={handleSubmit(onFormSubmit)}>
        <h2>Add a new banner</h2>
        <label>Title</label>
        <input type='text' placeholder='Enter banner title' {...register('title')}/>
        {errors.title && <p>{errors.title.message?.toString()}</p>}
        <label>Banner Image URL</label>
        <div>
        <input type='text' placeholder='Enter image url' value={imageUrl} onChange={changeImageUrl}/>
        <FontAwesomeIcon icon={faCirclePlus} color='#51B451' size='sm' style={{width:'30px',height:'30px',marginLeft:'1rem',cursor:'pointer'}} onClick={addImageUrl}/>
        </div>
        {imageField.value && imageField.value.length>0 && 
        <Image width={300} height={100} src={imageField.value} alt='Image for banner' style={{marginBottom: '1rem'}} placeholder='blur' blurDataURL='../../public/blurimage.jpeg'/>
      }
        {errors.imageUrl && <p>{errors.imageUrl.message?.toString()}</p>}
        <label>Select a category</label>
        <select onChange={handleCategoryChange} value={categoryField.value}>
        <option value="">Pick a Category</option>
        {parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
        ))}
        </select>
        {errors.category && <p>{errors.category.message?.toString()}</p>}
        {categoryField.value && categoryField.value.length>0 && props.subCategoryMap[categoryField.value] && props.subCategoryMap[categoryField.value].length>0 && <label>
          Select subcategory
        </label>}
        {categoryField.value && categoryField.value.length>0 && props.subCategoryMap[categoryField.value] && props.subCategoryMap[categoryField.value].length>0 && 
        <select value={subcategoryField.value} onChange={handleSubCategoryChange}>
          <option value="">Pick a Subcategory</option>
          {props.subCategoryMap[categoryField.value].map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
        ))}
          </select>}
        {categoryField.value && !props.subCategoryMap[categoryField.value] && <label>Select a Product</label>}
        {categoryField.value && props.subCategoryMap[categoryField.value] && props.subCategoryMap[categoryField.value].length>0 && subcategoryField.value && <label>Select a Product</label>}
        {categoryField.value && !props.subCategoryMap[categoryField.value] && 
        <select onChange={handleProductChange} value={productField.value}>
          <option value="">Pick a Product</option>
          {props.productMap[categoryField.value].map((product) => (
                <option key={product._id} value={product._id}>
                    {product.name}
                </option>
        ))}
        </select>}
        {categoryField.value && props.subCategoryMap[categoryField.value] && props.subCategoryMap[categoryField.value].length>0 && subcategoryField.value && 
        <select onChange={handleProductChange} value={productField.value}>
          <option value="">Pick a Product</option>
          {props.productMap[subcategoryField.value].map((product) => (
                <option key={product._id} value={product._id}>
                    {product.name}
                </option>
        ))}
          </select>}
        <button type="submit">SAVE</button>
      </AddProductForm>
    </HomePageRightColumn>
  )
}

export async function getStaticProps()
{
    try{
    await connectToDatabase()
    const categories=await ProductCategoryModel.find()
    const subCategoryMap:SubCategoryMap={}
    categories.forEach((category)=>{
      if(category.parentCategory!=null)
      {
      if(!subCategoryMap[category.parentCategory.toString()])
      subCategoryMap[category.parentCategory.toString()]=[]
      subCategoryMap[category.parentCategory.toString()]=[...subCategoryMap[category.parentCategory.toString()],JSON.parse(JSON.stringify(category))]
      }
    })
    // console.log('Subcategory map is: ',subCategoryMap)
    const products:ProductCategoryData[]=await Promise.all(
        categories.map(async (category)=> {
            const products= await ProductDataModel.find({category: category._id.toString()})
            return {
                products: JSON.parse(JSON.stringify(products)),
                categoryId: category._id.toString()
            }
        })
    )
    const productMap:ProductCategoryMap={}
    products.forEach((product)=>{
        productMap[product.categoryId]=product.products
    })
    return{
        props:{
            categories: JSON.parse(JSON.stringify(categories)),
            productMap,
            subCategoryMap
        },
        revalidate: 600
    }
    }
    catch(error)
    {
        return {
            props:{
                error: (error as Error).toString()
            }
        }
    }
}


export default AddBannerPage
