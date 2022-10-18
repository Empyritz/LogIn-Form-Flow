/* eslint-disable no-unused-vars */
import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import './signIn.css'
import useAuth from '../Firebase/useAuthContext';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material/';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthenticateCredentials from '../Components/AuthenticateCredential';


const SignIn = () => {
  //TOGGLE BETWEEN THE TWO INPUT VALUES
  const [toggleName, setToggleName] = React.useState(true)
  const [inputName, setInputName] = React.useState('email')
  //MAKING A CONDITIONAL TO MANAGE THE VALIDATION AND WORKS ONE WITHOUT ANOTHER
  const schemaObject = () => {
    if(inputName === 'email'){
      return (
        {
          email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
        }
      )
    }else{
      return (
        {
          password: yup.string('Enter your password').min(7, 'Password should be of minimum 7 characters length').required('Password is required')
        }
      )
    }
  }
  const validationSchema = yup.object(schemaObject());
  //FUNCTION TO MANAGE THE INPUT VALUE
  const [inputValue, setInputValue] = React.useState('')
  // SET THE MODAL OPEN OR CLOSE AND DEPENDING ABOUT THAT SHOW IT
  const [reAuthenticate, setReAuthenticate] = React.useState(false)
  const { user, logOut, loading } = useAuth() 
  //USE FORM LOGIC
  const { handleSubmit, control, formState: {errors, isSubmitSuccessful}, reset } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  })
  //RESET FORM BEFORE SUCCESFUL SUBMIT AND DONT GET A NULL VALUE
  React.useEffect(()=> {
    if(isSubmitSuccessful){
      reset()
    }
  }, [isSubmitSuccessful ,reset])

 
 const onSubmit = (data) => {
   console.log(data)
  if(inputName === 'email'){
    setInputValue(data.email)
  }else{
    setInputValue(data.password)
  }
  setReAuthenticate(true)
 }
  // console.log(errors.email)

  const toggleInput = () => {
    setToggleName(!toggleName)
    if(toggleName){
      setInputName('email')
    }else{
      setInputName('password')
    }
  }
  const handleLogout = async() => {
    try{
      await logOut()
    }catch(error){
      console.log(error)
    }
  }    

  if(loading){
    return <>Loading...</>
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-teal-700 flex-col'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-96 p-8 bg-white flex flex-col gap-y-4 rounded-lg text-center text-black' >
        <h2>Hello {user.displayName} change your {inputName}</h2>
        <Controller 
          name={inputName}
          control={control}
          render={({field})=> {
            return(
              <TextField 
              {...field} 
              placeholder={inputName === 'email' ? 'Write the new email' : 'Write the new password'} 
              label={inputName === 'email'? 'Email' : 'Password'}  
              helperText={errors.email && errors.email.message}
              error={errors.email}
              type={inputName === 'email' ? 'email' : 'password'}
              />  
            )}
          }
        />
        {/* <Controller 
          name='password'
          control={control}
          render={({field})=> {
            return(
              <TextField 
                {...field} 
                type='password'
                placeholder='*******'
                label='Password'
                helperText={errors.password && errors.password.message}
                error={errors.password}
              />
            )
          }}
        /> */}
        <Button 
          color="primary" 
          variant="contained"  
          type="submit" 
          // disabled={!formik.dirty || !formik.isValid}
        > 
          Send
        </Button>
      </form>
      <div className='mt-6'>
        <Button variant='contained'sx={{ marginRight: '2rem' }} onClick={toggleInput}>Toggle</Button>
        <Button variant='contained' onClick={handleLogout}>LogOut</Button>
      </div>
      {reAuthenticate && <AuthenticateCredentials inputValue={inputValue} setReAuthenticate={setReAuthenticate} inputName={inputName}/>}
    </div>
  );
};

export default SignIn

