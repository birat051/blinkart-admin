import { ProductCategory } from '@/models/category_model'
import { Product } from '@/models/product_model'
import { ProductDetails } from '@/pages/products/add'
import { AddProductForm } from '@/styles/addProducts.style'
import { faCircle, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form'


type editProductProp={
    product:Product,
    category:ProductCategory
}

function EditProductForm(props:editProductProp) {
    const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(ProductDetails)})
    const {errors}=formState
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
    const onFormSubmit=()=>{

    }
    const handlePriceChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        priceField.onChange(parseInt(event.target.value))
      }
      const handleDiscountChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
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
  return (
    <AddProductForm onSubmit={handleSubmit(onFormSubmit)}>
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
    <button type='submit'>SAVE</button>
  </AddProductForm>
  )
}

export default EditProductForm