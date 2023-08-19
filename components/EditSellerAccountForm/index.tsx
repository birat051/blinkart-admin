import { AddProductForm } from '@/styles/addProducts.style'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


type editSellerProp={
    emailId:string,
    sellerId:string,
    closeSellerForm: (sellerId:string)=>void,
    changeEmailList: (sellerId:string,emailId:string)=>void
}

const SellerDetails=z.object({
    email: z.string().email(),
    password: z.string(),
    confirmpass: z.string().min(8),
    newpassword: z.string().min(8),
})


function EditSellerAccountForm(props:editSellerProp) {
  const [editEmail, seteditEmail] = useState(false)
  const [editPass, seteditPass] = useState(false)
  const { register, handleSubmit, formState,} = useForm({
    resolver: zodResolver(editPass ? SellerDetails.pick({password:true,confirmpass:true,newpassword:true}).refine((data) => data.newpassword === data.confirmpass, {
        message: "Password doesn't match",
        path: ["confirmpass"]
      }) : SellerDetails.pick({ email: true })),
  });
  const {errors}=formState
  const handleEmailChange=async (formValues:Record<string, any>)=>{
    const data={
        email:formValues.email,
    }
    try{
        const response = await fetch(`/api/user/updateemail?sellerId=${props.sellerId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    //   console.log('Response is: ',response.body)
      const responseData=await response.json()
      if(response.status===200)
      {
        alert('Email id for seller account has been successfully updated')
        props.changeEmailList(props.sellerId,formValues.email)
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
  const handlePasswordChange=async (formValues:Record<string, any>)=>{
    const data={
        password:formValues.password,
        newPassword:formValues.confirmpass,
      }
      try{
        const response = await fetch(`/api/user/updatepassword?sellerId=${props.sellerId}`, {
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
        alert('Password for seller account has been successfully updated')
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
  const activateEmail=()=>{
    seteditEmail(true)
    seteditPass(false)
  }
  const activePassword=()=>{
    seteditEmail(false)
    seteditPass(true)
  }
  return (
    <AddProductForm onSubmit={handleSubmit(editEmail?handleEmailChange:handlePasswordChange)}>
    <h2>Edit Seller Details</h2>
    <FontAwesomeIcon icon={faClose} style={{width:'15px',height:'15px',color:'grey',position:'absolute',right:'16',top:'16',cursor:'pointer'}} onClick={()=>props.closeSellerForm('')}/>
    <div>
        <label>Email Address</label>
        {!editEmail && <button onClick={activateEmail}>Edit</button>}
        {editEmail && <button onClick={()=>seteditEmail(false)}>Cancel</button>}
    </div>
    <input type='email' placeholder='Enter email id' disabled={!editEmail} defaultValue={props.emailId} {...register('email')}/>
    {errors.email && <p>{errors.email.message?.toString()}</p>}
    <div>
        <label>Update Password</label>
        {!editPass && <button onClick={activePassword}>Edit</button>}
        {editPass && <button onClick={()=>seteditPass(false)}>Cancel</button>}
    </div>
    <input type="password" placeholder='Enter old password' disabled={!editPass} {...register('password')}/>
    {errors.password && <p>{errors.password.message?.toString()}</p>}
    <input type="password" placeholder='Enter new password' disabled={!editPass} {...register('newpassword')}/>
    {errors.newpassword && <p>{errors.newpassword.message?.toString()}</p>}
    <input type="password" placeholder='Confirm password' disabled={!editPass} {...register('confirmpass')}/>
    {errors.confirmpass && <p>{errors.confirmpass.message?.toString()}</p>}
    {(editEmail || editPass) && <button type="submit">SAVE</button>}
    </AddProductForm>
  )
}

export default EditSellerAccountForm
