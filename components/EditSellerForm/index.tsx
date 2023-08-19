import { SellerDataModel } from '@/models/seller_model'
import { AddProductForm } from '@/styles/addProducts.style'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type editSellerProp={
    seller: SellerDataModel,
    closeSellerForm: (sellerId:string)=>void,
    updateSellerDetails: (seller:SellerDataModel)=>void
}


const SellerDetails=z.object({
    name: z.string().min(3),
    address:z.string().min(10),
    contactnumber:  z.string().length(10),
})

function EditSellerForm(props:editSellerProp) {
    const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(SellerDetails)})
    const {errors}=formState
    const handleFormSubmit=async (formValues:Record<string, any>)=>{
        const data={
          name:formValues.name,
          address:formValues.address,
          contactNumber: formValues.contactnumber,
        }
        try{
          const response = await fetch(`/api/sellers/updatedetails?sellerId=${props.seller._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
        console.log('Response is: ',response.body)
        const responseData=await response.json()
        if(response.status===200)
        {
          alert('Seller account has been successfully created')
          props.updateSellerDetails(responseData)
          props.closeSellerForm('')
          // reset()
        }
        else{
          alert(responseData.error)
        }
      }
      catch(e)
      {
        alert('Unexpected error occured: '+e)
      }
      }
  return (
    <AddProductForm onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Edit Seller Details</h2>
        <FontAwesomeIcon icon={faClose} style={{width:'15px',height:'15px',color:'grey',position:'absolute',right:'16',top:'16',cursor:'pointer'}} onClick={()=>props.closeSellerForm('')}/>
        <label>
            Name
        </label>
        <input type="text" placeholder='Enter seller name' {...register('name')} defaultValue={props.seller.name}/>
        {errors.name && <p>{errors.name.message?.toString()}</p>}
        <label>
            Address
        </label>
        <textarea placeholder='Enter seller address' {...register('address')} defaultValue={props.seller.address}/>
        {errors.address && <p>{errors.address.message?.toString()}</p>}
        <label>
            Contact Number
        </label>
        <input type="number" placeholder='Enter contact number' {...register('contactnumber')} defaultValue={props.seller.contactNumber}/>
        {errors.contactnumber && <p>{errors.contactnumber.message?.toString()}</p>}
        <button type="submit">SAVE</button>
    </AddProductForm>
  )
}

export default EditSellerForm