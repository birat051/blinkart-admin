import { ProductCategory } from '@/models/category_model';
import { CategoryDetails } from '@/pages/categories/add';
import { AddProductForm } from '@/styles/addProducts.style'
import { faCirclePlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form';
import Image from 'next/image';

type editCategoryProp={
    parentCategories: ProductCategory[],
    categorydata: ProductCategory,
    closeEditForm: (categoryId:string)=>void,
    updateCategoryList: (category:ProductCategory)=>void
}


function EditCategoryForm(props:editCategoryProp) {
    const [imageUrl, setimageUrl] = useState('')
    const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(CategoryDetails)})
    const {errors}=formState
    const { field: categoryField } = useController({
        name: 'category',
        control,
        defaultValue: props.categorydata.parentCategory??''
    });
    const handleCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
      categoryField.onChange(event.target.value)
    }
    const { field: imageField } = useController({
        name: 'categoryimage',
        control,
        defaultValue: props.categorydata.imageUrl??''
    });
    const onImageUrlChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setimageUrl(event.target.value)
    }
    const addImageUrl=()=>{
        imageField.onChange(imageUrl)
        console.log('Image url is: ',imageUrl)
        setimageUrl('')
    }
    const submitHandler=async (formValues:Record<string, any>)=>{
        const data={
            name: formValues.name,
            description: formValues.description,
            parentCategory: categoryField.value.length===0?null:categoryField.value,
            imageUrl: imageField.value
        }
        try{
            const response = await fetch(`/api/category/update?categoryId=${props.categorydata._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
          const responseData=await response.json()
          if(response.status===200)
          {
            alert('Category has been successfully updated')
            props.updateCategoryList(responseData)
            props.closeEditForm('')
          }
          else
          alert(responseData.error);
        }
        catch(error){
            alert('Unexpected error occured while trying to update category')
        }
      }
  return (
    <AddProductForm onSubmit={handleSubmit(submitHandler)}>
      <FontAwesomeIcon icon={faClose} style={{width:'15px',height:'15px',color:'grey',position:'absolute',right:'16',top:'16',cursor:'pointer'}} onClick={()=>props.closeEditForm('')}/>
      <h2>Edit category details for {props.categorydata.name}</h2>
      <label>Name</label>
      <input type="text" placeholder='Enter category name' {...register('name')} defaultValue={props.categorydata.name}/>
      {errors.name && <p>{errors.name.message?.toString()}</p>}
      <label>Description</label>
      <textarea placeholder='Enter category description' {...register('description')} defaultValue={props.categorydata.description}/>
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
      <div>
      <input type='text' placeholder='Enter image URL' value={imageUrl} onChange={onImageUrlChange}/>
      <FontAwesomeIcon icon={faCirclePlus} color='#51B451' size='sm' style={{width:'30px',height:'30px',marginLeft:'1rem',cursor:'pointer'}} onClick={addImageUrl}/>
      </div>
      {imageField.value && imageField.value.length>0 && 
        <Image width={50} height={50} src={imageField.value} alt={`Image for category ${props.categorydata.name}`} style={{marginBottom: '1rem'}} placeholder='blur' blurDataURL='../../public/blurimage.jpeg'/>
      }
      {errors.categoryimage && <p>{errors.categoryimage.message?.toString()}</p>}
      <button type='submit'>SAVE</button>
    </AddProductForm>
  )
}

export default EditCategoryForm
