import { ProductCategory } from '@/models/category_model'
import { Offer } from '@/models/offer_model'
import { OfferDetails, OfferFormData, SelectedParam, SubCategoryMap } from '@/pages/offers/add'
import { AddProductForm } from '@/styles/addProducts.style'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import Image from 'next/image'

type EditOfferProp={
    offer: Offer,
    subCategoryMap: SubCategoryMap,
    parentCategories: ProductCategory[]
}

function EditOfferForm(props:EditOfferProp) {
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
      defaultValue: props.offer.parentCategory===null?(props.offer.category as ProductCategory)._id:(props.offer.parentCategory as ProductCategory)._id
    });
    const { field: imageUrlField } = useController({
        name: 'imageurl',
        control,
        defaultValue: props.offer.categoryImageUrl
      });
    const { field: subCategoryField } = useController({
        name: 'subcategory',
        control,
        defaultValue: props.offer.parentCategory===null?'':(props.offer.category as ProductCategory)._id
      });
      const { field: topOfferField } = useController({
        name: 'istopoffer',
        control,
        defaultValue: props.offer.isTopOffer
      });
    const {errors}=formState
    const [image, setimageUrl] = useState('')
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
    const changeImageUrl=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setimageUrl(event.target.value)
    }
  return (
    <AddProductForm>
        <h2>Edit offer {props.offer.title}</h2>
        <label>Title</label>
        <input type="text" placeholder='Enter offer title' {...register('title')} defaultValue={props.offer.title}/>
        {errors.title && <p>{errors.title.message?.toString()}</p>}
        <label>Description</label>
        <textarea placeholder='Enter offer description' {...register('description')} defaultValue={props.offer.description}/>
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
        <input type="date" placeholder='Enter expiry date' {...register('expirydate')} defaultValue={props.offer.expiryDate.toString()}/>
        {errors.expirydate && <p>{errors.expirydate.message?.toString()}</p>}
        <div>
        <label>Include as top offer</label>
        <input type="checkbox" onChange={handleOfferChange}/>
        </div>
        {errors.istopoffer && <p>{errors.istopoffer.message?.toString()}</p>}
        <button type="submit">SAVE</button>
    </AddProductForm>
  )
}




export default EditOfferForm