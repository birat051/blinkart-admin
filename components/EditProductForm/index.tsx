import { ProductCategory } from '@/models/category_model'
import { Product } from '@/models/product_model'
import { AddProductForm } from '@/styles/addProducts.style'
import { faCircle, faCircleMinus, faCirclePlus, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomUser } from '../MenuSection'


type editProductProp={
    product:Product,
    category:ProductCategory,
    changeProductList:(product:Product)=>void
    changeSelectedProduct:(productId:string)=>void
}

export const ProductDetails=z.object({
  brand: z.string().min(3),
  name: z.string().min(3),
  price: z.number(),
  highlights: z.array(z.string().min(3)).min(3),
  description:z.string().min(50),
  imageUrls:z.array(z.string().url()).min(4),
  discount:  z.number(),
  quantity: z.number()
})

function EditProductForm(props:editProductProp) {
    const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(ProductDetails)})
    const {errors}=formState
    const {data:session}=useSession()
    const [highlight, sethighlight] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const { field: highlightField } = useController({
      name: 'highlights',
      control,
      defaultValue: props.product.highlights
    });
    const { field: imageUrlField } = useController({
      name: 'imageUrls',
      control,
      defaultValue: props.product.imageUrls
    });
    const { field: priceField } = useController({
      name: 'price',
      control,
      defaultValue: props.product.price
    });
    const { field: discountField } = useController({
      name: 'discount',
      control,
      defaultValue: props.product.discount
    });
    const { field: quantityField } = useController({
      name: 'quantity',
      control,
      defaultValue: props.product.quantity
    });
    const onFormSubmit=async (formValues:Record<string, any>)=>{
      console.log('Submitting update form')
      const body={
        name:formValues.name,
        brand: formValues.brand,
        description: formValues.description,
        price: priceField.value,
        discount: discountField.value,
        highlights:highlightField.value,
        category: props.category.id,
        imageUrls: imageUrlField.value,
        seller: (session?.user as CustomUser).seller,
        quantity: quantityField.value
      }
      const response = await fetch(`/api/product/update?productId=${props.product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data=await response.json()
      if(response.status===200)
      {
        alert('Product has been successfully updated')
        props.changeProductList(data)
        props.changeSelectedProduct('')
      }
      else{
        alert(data.error)
      }
    }
    const handlePriceChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
      // if(event.target.value)
        priceField.onChange(parseInt(event.target.value))
        // else
        // priceField.onChange(0)
      }
      const handleQuantityChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        // if(event.target.value)
        quantityField.onChange(parseInt(event.target.value))
      }
      const handleDiscountChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        // if(event.target.value)
        discountField.onChange(parseInt(event.target.value))
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
        console.log("Highlights are: ",highlightField.value)
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
        console.log("Images are: ",imageUrlField.value)
      }
      const removeHighlight=(value:string)=>{
        const updatedValues=highlightField.value.filter((highlightValue:string)=>highlightValue!==value)
        highlightField.onChange([...updatedValues])
      }
      const removeImageUrl=(value:string)=>{
        const updatedValues=imageUrlField.value.filter((imageValue:string)=>imageValue!==value)
        imageUrlField.onChange([...updatedValues])
      }
  return (
    <AddProductForm onSubmit={handleSubmit(onFormSubmit)}>
    <FontAwesomeIcon icon={faClose} style={{width:'15px',height:'15px',color:'grey',position:'absolute',right:'16',top:'16',cursor:'pointer'}} onClick={()=>props.changeSelectedProduct('')}/>
    <h2>Edit Product Details</h2>
    <label>Brand</label>
    <input type="text" placeholder='Enter brand name' {...register('brand')} defaultValue={props.product.brand}/>
    {errors.brand && <p>{errors.brand.message?.toString()}</p>}
    <label>Name</label>
    <input type="text" placeholder='Enter product name' {...register('name')} defaultValue={props.product.name}/>
    {errors.name && <p>{errors.name.message?.toString()}</p>}
    <label>Description</label>
    <textarea placeholder='Describe the product (atleast 50 words)' {...register('description')} defaultValue={props.product.description}/>
    {errors.description && <p>{errors.description.message?.toString()}</p>}
    <label>Category</label>
    <h3>{props.category.name}</h3>
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
    <input type="number" placeholder='Enter product price(as per MRP)' value={priceField.value} onChange={handlePriceChange} />
    {errors.price && <p>{errors.price.message?.toString()}</p>}
    <label>Discount %</label>
    <input type="number" placeholder='Enter discount percentage on product' value={discountField.value} onChange={handleDiscountChange}/>    
    {errors.discount && <p>{errors.discount.message?.toString()}</p>}
    <label>Product Quantity Available</label>
    <input type="number" placeholder='Enter quantity of product present in your inventory' value={quantityField.value} onChange={handleQuantityChange}/>    
    {errors.quantity && <p>{errors.quantity.message?.toString()}</p>}
    <button type='submit'>SAVE</button>
  </AddProductForm>
  )
}

export default EditProductForm