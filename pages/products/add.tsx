import { CustomUser } from '@/components/MenuSection'
import ProductCategoryModel, { ProductCategory } from '@/models/category_model'
import { AddProductForm } from '@/styles/addProducts.style'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import connectToDatabase from '@/util/connectDB'
import { faCircle, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'
import { z } from 'zod'

type addProductProp={
  parentCategories: ProductCategory[],
  subcategories:  Record<string, ProductCategory[]>;
  error?:string
}


export const ProductDetails=z.object({
  brand: z.string().min(3),
  name: z.string().min(3),
  category: z.string(),
  price: z.number(),
  highlights: z.array(z.string().min(3)).min(3),
  description:z.string().min(50),
  imageUrls:z.array(z.string().url()).length(4),
  discount:  z.number(),
})

function AddProductPage(props:addProductProp) {
  const {data:session}=useSession()
  const [highlight, sethighlight] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedCategory, setselectedCategory] = useState('')
  const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(ProductDetails)})
  const { field: categoryField } = useController({
    name: 'category',
    control,
  });
  const { field: subCategoryField } = useController({
    name: 'subcategory',
    control,
  });
  const { field: highlightField } = useController({
    name: 'highlights',
    control,
  });
  const { field: imageUrlField } = useController({
    name: 'imageUrls',
    control,
  });
  const { field: priceField } = useController({
    name: 'price',
    control,
  });
  const { field: discountField } = useController({
    name: 'discount',
    control,
  });
  const {errors}=formState
  const handleCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    categoryField.onChange(event.target.value)
    setselectedCategory(event.target.value)
  }
  if(props.error)
  {
    return (
      <ErrorContainer>
        <p>Unexpected error ocurred: {props.error}</p>
      </ErrorContainer>
    )
  }
  const changeHighLight=(event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    sethighlight(event.target.value.trim())
  }
  const addHighlight=()=>{
    const value=highlightField.value
    if(value)
    highlightField.onChange([...highlightField.value,highlight.trim()])
    else
    highlightField.onChange([highlight.trim()])
    sethighlight('')
  }
  const changeImageUrl=(event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setImageUrl(event.target.value)
  }
  const addImageUrl=()=>{
    const value=imageUrlField.value
    if(value)
    imageUrlField.onChange([...imageUrlField.value,imageUrl])
    else
    imageUrlField.onChange([imageUrl])
    setImageUrl('')
  }
  const removeHighlight=(value:string)=>{
    const updatedValues=highlightField.value.filter((highlightValue:string)=>highlightValue!==value)
    highlightField.onChange([...updatedValues])
  }
  const removeImageUrl=(value:string)=>{
    const updatedValues=imageUrlField.value.filter((imageValue:string)=>imageValue!==value)
    imageUrlField.onChange([...updatedValues])
  }
  const handleSubcategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    event.preventDefault()
    subCategoryField.onChange(event.target.value)
  }
  const handlePriceChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    priceField.onChange(parseInt(event.target.value))
  }
  const handleDiscountChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    discountField.onChange(parseInt(event.target.value))
  }
  const onFormSubmit=async (formValues:Record<string, any>)=>{
    const data={
      name:formValues.name,
      brand: formValues.brand,
      description: formValues.description,
      price: priceField.value,
      discount: discountField.value,
      highlights:highlightField.value,
      category: subCategoryField.value??categoryField.value,
      imageUrls: imageUrlField.value,
      seller: (session?.user as CustomUser).seller
    }
    try{
      const response = await fetch('/api/product/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    console.log('Response is: ',response.body)
    const responseData=await response.json()
    if(response.status===201)
    {
      alert('Product has been successfully added')
      reset()
    }
    else
    alert(responseData.error);
  }
  catch(error){
      alert('Unexpected error occured while trying to add address')
  }
  }
  return (
    <HomePageRightColumn>
      <LoadingOverlayWrapper>
      <Head>
        <title>Add a new product</title>
      </Head>
      <AddProductForm onSubmit={handleSubmit(onFormSubmit)}>
        <h2>Add a new Product</h2>
        <label>Brand</label>
        <input type="text" placeholder='Enter brand name' {...register('brand')}/>
        {errors.brand && <p>{errors.brand.message?.toString()}</p>}
        <label>Name</label>
        <input type="text" placeholder='Enter product name' {...register('name')}/>
        {errors.name && <p>{errors.name.message?.toString()}</p>}
        <label>Description</label>
        <textarea placeholder='Describe the product (atleast 50 words)' {...register('description')}/>
        {errors.description && <p>{errors.description.message?.toString()}</p>}
        <label>Pick a Category</label>
        <select onChange={handleCategoryChange} value={categoryField.value}>
        <option value="">Category</option>
        {props.parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
        ))}
        </select>
        {errors.category && <p>{errors.category.message?.toString()}</p>}
        {selectedCategory && props.subcategories[selectedCategory]?.length>0 && <label>Pick a Subcategory</label>}
        {selectedCategory && props.subcategories[selectedCategory]?.length>0 && (
        <select onChange={handleSubcategoryChange} value={subCategoryField.value}>
        <option value="">Subcategory</option>
        {props.subcategories[selectedCategory]?.map((subcategory: ProductCategory) => (
         <option key={subcategory._id} value={subcategory._id}>
        {subcategory.name}
         </option>
         ))}
     </select>
        )}
        <label>Product Highlights</label>
        <div>
        <input type="text" placeholder='Enter product highlights' onChange={changeHighLight} value={highlight}/>
        <FontAwesomeIcon icon={faCirclePlus} color='#51B451' size='sm' style={{width:'30px',height:'30px',marginLeft:'1rem',cursor:'pointer'}} onClick={addHighlight}/>
        </div>
        {highlightField.value && highlightField.value.map((value:string)=>{
          return (
            <div key={value}>
            <p ><span><FontAwesomeIcon icon={faCircle} style={{width:'8px',height:'8px'}}/></span>{value}</p>
            <FontAwesomeIcon icon={faCircleMinus} color='red' size='sm' style={{width:'20px',height:'20px',marginLeft:'1rem',cursor:'pointer'}} onClick={()=>removeHighlight(value)}/>
            </div>
          )
        })}
        {errors.highlights && <p>{errors.highlights.message?.toString()}</p>}
        <label>Product Images</label>
        <div>
        <input type="url" placeholder='Enter image URL' onChange={changeImageUrl} value={imageUrl}/>
        <FontAwesomeIcon icon={faCirclePlus} color='#51B451' size='sm' style={{width:'30px',height:'30px',marginLeft:'1rem',cursor:'pointer'}} onClick={addImageUrl}/>
        </div>
        {imageUrlField.value && imageUrlField.value.map((value:string)=>{
          return (
            <div key={value}>
            <p ><span><FontAwesomeIcon icon={faCircle} style={{width:'8px',height:'8px'}}/></span>{value}</p>
            <FontAwesomeIcon icon={faCircleMinus} color='red' size='sm' style={{width:'20px',height:'20px',marginLeft:'1rem',cursor:'pointer'}} onClick={()=>removeImageUrl(value)}/>
            </div>
          )
        })}
        {errors.imageUrls && <p>{errors.imageUrls.message?.toString()}</p>}
        <label>Price</label>
        <input type="number" placeholder='Enter product price(as per MRP)' value={priceField.value} onChange={handlePriceChange} defaultValue={0}/>
        {errors.price && <p>{errors.price.message?.toString()}</p>}
        <label>Discount %</label>
        <input type="number" placeholder='Enter discount percentage on product' value={discountField.value} onChange={handleDiscountChange} defaultValue={0}/>    
        {errors.discount && <p>{errors.discount.message?.toString()}</p>}
        <button type='submit'>SAVE</button>
      </AddProductForm>
      </LoadingOverlayWrapper>
    </HomePageRightColumn>
  )
}

export default AddProductPage

export async function getStaticProps()
{
  try{
  await connectToDatabase()
  const parentCategories=await ProductCategoryModel.find({parentCategory:null})
  const categoriesWithSubcategories = await Promise.all(
    JSON.parse(JSON.stringify(parentCategories)).map(async (data:ProductCategory) => {
      const subcategories = await ProductCategoryModel.find({
        parentCategory: data._id,
      });
      return {
        ...data,
        subcategories: subcategories.map((subcategory) =>
        JSON.parse(JSON.stringify(subcategory))
          // subcategory.toObject()
        ),
      };
    })
  );
  const subcategoryMap = categoriesWithSubcategories.reduce((map, category) => {
    map[category._id] = category.subcategories;
    return map;
  }, {});
  console.log('Got categories: ',parentCategories)
  console.log('Got subcategories: ',subcategoryMap)
  return {
    props:{
    parentCategories:JSON.parse(JSON.stringify(parentCategories)),
    subcategories: subcategoryMap,
    },
    revalidate: 600
  }
  }
  catch(error)
  {
    console.log('Caught error: ',error)
    return{
      props:{
      error:(error as Error).toString()
      }
    }
  }
}