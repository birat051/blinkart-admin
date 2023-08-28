import ProductCategoryModel, { ProductCategory } from '@/models/category_model'
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

export interface CategoryList
{
    categories:ProductCategory[]
    id:string
}

export interface SubCategoryMap
{
    [id: string]:ProductCategory[]
}

type OfferProp={
    subCategoryMap: SubCategoryMap,
    parentCategories: ProductCategory[],
    error?: string
}

export enum SelectedParam {
    Empty = "",
    Price = "price",
    Discount = "discount"
  }

export interface OfferFormData {
    title: string;
    category: string;
    subcategory: string;
    description: string;
    istopoffer: boolean;
    imageurl: string;
    expirydate: Date;
    price: string;
    discount: string;
  }

export const OfferDetails=z.object({
    title: z.string().min(3),
    category: z.string(),
    subcategory: z.string(),
    description:z.string().min(50),
    istopoffer: z.boolean(),
    imageurl: z.string().url(),
    expirydate: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),
    price: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Number) return parseInt(arg.toString());
    }, z.number()),
    discount: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Number) return parseInt(arg.toString());
    }, z.number()),
})



function AddOffersPage(props:OfferProp) {
    const [param, setparam] = useState<string>('')
    const [selectedCategory, setselectedCategory] = useState('')
    let resolverConfig;
    if (param === SelectedParam.Discount) {
    if (selectedCategory && props.subCategoryMap[selectedCategory] && props.subCategoryMap[selectedCategory].length > 0) {
    resolverConfig = zodResolver(OfferDetails.omit({ price: true }));
    } else {
    resolverConfig = zodResolver(OfferDetails.omit({ price: true, subcategory: true }));
    }
    } else {
    if (selectedCategory && props.subCategoryMap[selectedCategory] && props.subCategoryMap[selectedCategory].length > 0) {
    resolverConfig = zodResolver(OfferDetails.omit({ discount: true }));
    } else {
    resolverConfig = zodResolver(OfferDetails.omit({ discount: true, subcategory: true }));
    }
    }
    const { register, handleSubmit, formState, reset, control } = useForm<OfferFormData>({ resolver: resolverConfig,});
    const { field: categoryField } = useController({
      name: 'category',
      control,
    });
    const { field: imageUrlField } = useController({
        name: 'imageurl',
        control,
      });
    const { field: subCategoryField } = useController({
        name: 'subcategory',
        control,
      });
      const { field: topOfferField } = useController({
        name: 'istopoffer',
        control,
        defaultValue: false
      });
    const {errors}=formState
    const [image, setimageUrl] = useState('')
    const changeImageUrl=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setimageUrl(event.target.value)
    }
    const handleParamChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        setparam(event.target.value)
      }
    const handleCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
      categoryField.onChange(event.target.value)
      setselectedCategory(event.target.value)
    }
    const handleSubcategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        subCategoryField.onChange(event.target.value)
    }
    const handleOfferChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        topOfferField.onChange(event.target.checked)
    }
    const addImageUrl=()=>{
        imageUrlField.onChange(image)
        setimageUrl('')
    }
    const onFormSubmit=async (value:Record<string,any>)=>{
        // console.log('Subcategory field is: ',subCategoryField.value)
        const data=(subCategoryField.value && subCategoryField.value.length>0)?{
            title:value.title,
            description:value.description,
            price:value.price??0,
            category:subCategoryField.value,
            parentCategory:categoryField.value,
            expiryDate:value.expirydate,
            isTopOffer:topOfferField.value,
            discount:value.discount??0,
            categoryImageUrl:value.imageurl,
        }:{
            title:value.title,
            description:value.description,
            price:value.price??0,
            category:categoryField.value,
            parentCategory:null,
            expiryDate:value.expirydate,
            isTopOffer:topOfferField.value,
            discount:value.discount??0,
            categoryImageUrl:value.imageurl,
        }
        // console.log('Data is: ',data)
        try{
            const response = await fetch('/api/offers/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
          const responseData=await response.json()
          if(response.status===201)
          {
            alert('Offer has been successfully added')
            subCategoryField.onChange('')
            imageUrlField.onChange('')
            categoryField.onChange('')
            reset()
          }
          else
          alert(responseData.error);
        }
        catch(error){
            alert('Unexpected error occured while trying to create new offer')
        }
    }
    if(props.error)
    {
      return (
        <ErrorContainer>
          <p>{props.error}</p>
        </ErrorContainer>
      )
    }
  return (
    <HomePageRightColumn>
        <Head>
            <title>Add a new offer</title>
        </Head>
      <AddProductForm onSubmit={handleSubmit(onFormSubmit)}>
        <h2>Add a new offer</h2>
        <label>Title</label>
        <input type="text" placeholder='Enter offer title' {...register('title')}/>
        {errors.title && <p>{errors.title.message?.toString()}</p>}
        <label>Description</label>
        <textarea placeholder='Enter offer description' {...register('description')}/>
        {errors.description && <p>{errors.description.message?.toString()}</p>}
        <label>Choose a Category</label>
        <select value={categoryField.value} onChange={handleCategoryChange}>
        <option value="">Category</option>
        {props.parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
        ))}
        </select>
        {errors.category && <p>{errors.category.message?.toString()}</p>}
        {categoryField.value && props.subCategoryMap[categoryField.value] && props.subCategoryMap[categoryField.value].length>0 && <label>Choose Sub-Category</label>}
        {categoryField.value && props.subCategoryMap[categoryField.value] && props.subCategoryMap[categoryField.value].length>0 && 
        <select value={subCategoryField.value} onChange={handleSubcategoryChange}>
            <option value="">Subcategory</option>
            {props.subCategoryMap[categoryField.value].map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
        ))}
        </select>}
        {errors.subcategory && <p>{errors.subcategory.message?.toString()}</p>}
        <label>Enter image URL</label>
        <div>
            <input type="text" placeholder='Enter image url' value={image} onChange={changeImageUrl}/>
            <FontAwesomeIcon icon={faCirclePlus} color='#51B451' size='sm' style={{width:'30px',height:'30px',marginLeft:'1rem',cursor:'pointer'}} onClick={addImageUrl}/>
        </div>
        {errors.imageurl && <p>{errors.imageurl.message?.toString()}</p>}
        {imageUrlField.value && <Image src={imageUrlField.value} alt='image for offer' height={150} width={150} placeholder='blur' blurDataURL='../../public/blurimage.jpeg' style={{marginBottom:'1rem',objectFit: 'contain'}}/>}
        <label>Select offer parameter</label>
        <select value={param} onChange={handleParamChange}>
        <option value={SelectedParam.Empty}>Offer parameter</option>
        <option value={SelectedParam.Discount}>Discount</option>
        <option value={SelectedParam.Price}>Price</option>
        </select>
        {param===SelectedParam.Discount && <label>Enter minimum discount</label>}
        {param===SelectedParam.Discount && <input type="number" placeholder='Enter discount' {...register('discount')}/>}
        {errors.discount && <p>{errors.discount.message?.toString()}</p>}
        {param===SelectedParam.Price && <label>Enter starting price</label>}
        {param===SelectedParam.Price && <input type="number" placeholder='Enter price' {...register('price')}/>}
        {errors.price && <p>{errors.price.message?.toString()}</p>}
        <label>Expiry Date</label>
        <input type="date" placeholder='Enter expiry date' {...register('expirydate')}/>
        {errors.expirydate && <p>{errors.expirydate.message?.toString()}</p>}
        <div>
        <label>Include as top offer</label>
        <input type="checkbox" onChange={handleOfferChange}/>
        </div>
        {errors.istopoffer && <p>{errors.istopoffer.message?.toString()}</p>}
        <button type="submit">SAVE</button>
      </AddProductForm>
    </HomePageRightColumn>
  )
}

export default AddOffersPage

export async function getStaticProps(){
    try{
        await connectToDatabase()
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
                subCategoryMap,
                parentCategories: JSON.parse(JSON.stringify(parentCategories))
            }
        }
    }
    catch(error)
    {
        return {
            props: {
                error: (error as Error).toString()
            }
        }
    }
}
