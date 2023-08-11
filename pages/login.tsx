import { HomeContentContainer } from '@/styles/home.style'
import { LoginPageForm } from '@/styles/login.style'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

export const AddressDetails=z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

function LoginPage() {
  const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(AddressDetails)})
  const {errors}=formState
  const [isLoading, setisLoading] = useState(false)
  const router=useRouter()
  const handleFormSubmit=async (formValues:Record<string, any>)=>{
    setisLoading(true)
    console.log('Email is: ',formValues.email)
    const res= await signIn("credentials",{
      email:formValues.email,
      password: formValues.password,redirect:false
    })
    setisLoading(false)
    console.log(res)
    if(res?.ok!=true)
    {
      alert(res?.error)
    }
    else
    {
      router.push('/')
    }
  }
  return (
    <LoadingOverlayWrapper active={isLoading}>
    <HomeContentContainer>
        <LoginPageForm onSubmit={handleSubmit(handleFormSubmit)}>
            <label>Email id</label>
            <input type="email" placeholder='Enter your email id' {...register('email')}/>
            {errors.email && <p>{errors.email?.message?.toString()}</p>}
            <label>Password</label>
            <input type="password" placeholder='Enter your password' {...register('password')}/>
            {errors.password && <p>{errors.password?.message?.toString()}</p>}
            <button type="submit">Login</button>
        </LoginPageForm>
    </HomeContentContainer>
    </LoadingOverlayWrapper>

  )
}

export default LoginPage

