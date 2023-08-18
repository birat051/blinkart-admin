import { AddProductForm } from '@/styles/addProducts.style'
import { HomePageRightColumn } from '@/styles/global.style'
import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'
import { z } from 'zod'


const SellerDetails=z.object({
  name: z.string().min(3),
  address: z.string().min(8),
  email: z.string().email(),
  contactnumber: z.string().length(10),
  password: z.string().min(8),
  confirmpass: z.string().min(8),
})
.refine((data) => data.password === data.confirmpass, {
  message: "Password doesn't match",
  path: ["confirmpass"]
});



function AddSellerPage() {
  const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(SellerDetails)})
  const {errors}=formState
  const [isLoading, setisLoading] = useState(false)
  const handleFormSubmit=async (formValues:Record<string, any>)=>{
    const data={
      name:formValues.name,
      address:formValues.address,
      email:formValues.email,
      contactNumber: formValues.contactnumber,
      password: formValues.password
    }
    try{
      setisLoading(true)
      const response = await fetch('/api/sellers/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        setisLoading(false)
    console.log('Response is: ',response.body)
    const responseData=await response.json()
    if(response.status===201)
    {
      alert('Seller account has been successfully created')
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
    <HomePageRightColumn>
      <LoadingOverlayWrapper active={isLoading}>
      <Head>
        <title>Add a new seller</title>
      </Head>
      <AddProductForm onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Add a new seller</h2>
        <label>Name</label>
        <input type="text" placeholder='Enter seller name' {...register('name')}/>
        {errors.name && <p>{errors.name.message?.toString()}</p>}
        <label>Address</label>
        <textarea  placeholder='Enter address' {...register('address')}/>
        {errors.address && <p>{errors.address.message?.toString()}</p>}
        <label>Contact Number</label>
        <input type='number' placeholder='Enter contact number'  {...register('contactnumber')}/>
        {errors.contactnumber && <p>{errors.contactnumber.message?.toString()}</p>}
        <label>Email id</label>
        <input type='text' placeholder='Enter seller email id' {...register('email')}/>
        {errors.email && <p>{errors.email.message?.toString()}</p>}
        <label>Password</label>
        <input type='password' placeholder='Enter a password' {...register('password')}/>
        {errors.password && <p>{errors.password.message?.toString()}</p>}
        <label>Confirm Password</label>
        <input type='password' placeholder='Re-enter the password' {...register('confirmpass')}/>
        {errors.confirmpass && <p>{errors.confirmpass.message?.toString()}</p>}
        <button type="submit">SAVE</button>
      </AddProductForm >
      </LoadingOverlayWrapper>
      </HomePageRightColumn>
  )
}

export default AddSellerPage