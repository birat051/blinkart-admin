import ProductCategoryModel, { ProductCategory } from '@/models/category_model';
import { AddProductForm } from '@/styles/addProducts.style'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style';
import connectToDatabase from '@/util/connectDB';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import React from 'react'
import { useController, useForm } from 'react-hook-form';
import { z } from 'zod';


export const CategoryDetails=z.object({
    name: z.string().min(3),
    description: z.string().min(50),
    categoryimage: z.string().url()
  })

type addCategoryProp={
    parentCategories: ProductCategory[],
    error?:string
}

function AddCategoryPage(props:addCategoryProp) {
    const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(CategoryDetails)})
    const {errors}=formState
    const { field: categoryField } = useController({
        name: 'category',
        control,
      });
    const handleCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
      categoryField.onChange(event.target.value)
    }
    if(props.error)
    {
      return (
        <ErrorContainer>
          <p>Unexpected error ocurred: {props.error}</p>
        </ErrorContainer>
      )
    }
  const submitHandler=async (formValues:Record<string, any>)=>{
    const data={
        name: formValues.name,
        description: formValues.description,
        parentCategory: categoryField.value,
        imageUrl: formValues.categoryimage
    }
    try{
        const response = await fetch('/api/category/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    //   console.log('Response is: ',response.body)
      const responseData=await response.json()
      if(response.status===201)
      {
        alert('Category has been successfully added')
        reset()
      }
      else
      alert(responseData.error);
    }
    catch(error){
        alert('Unexpected error occured while trying to add category')
    }
  }
  return (
    <HomePageRightColumn>
    <Head>
        <title>Add a new category</title>
      </Head>
    <AddProductForm onSubmit={handleSubmit(submitHandler)}>
      <h2>Add a new category</h2>
      <label>Name</label>
      <input type="text" placeholder='Enter category name' {...register('name')}/>
      {errors.name && <p>{errors.name.message?.toString()}</p>}
      <label>Description</label>
      <textarea placeholder='Enter category description' {...register('description')}/>
      {errors.description && <p>{errors.description.message?.toString()}</p>}
      <label>Select Parent Category</label>
      <select onChange={handleCategoryChange} value={categoryField.value}>
        <option value="">Category</option>
        {props.parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
        ))}
        </select>
      <label>
        Category Image
      </label>
      <input type='text' placeholder='Enter image URL' {...register('categoryimage')}/>
      {errors.categoryimage && <p>{errors.categoryimage.message?.toString()}</p>}
      <button type='submit'>SAVE</button>
    </AddProductForm>
    </HomePageRightColumn>
  )
}


export async function getStaticProps()
{
    try{
    await connectToDatabase()
    const categories=await ProductCategoryModel.find({parentCategory: null})
    return {
        props: {
            parentCategories:JSON.parse(JSON.stringify(categories))
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


export default AddCategoryPage
