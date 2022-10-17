/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signIn.css'
import useAuth from '../Firebase/useAuthContext';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material/';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(7, 'Password should be of minimum 7 characters length').required('Password is required'),
});

const SignIn = () => {
  // const [error, setError] = React.useState('') 
  const [rememberUser, setRememberUser] = React.useState(false)
  const { signIn, loginWithGoogle, noRememberUser } = useAuth()
  const navigate = useNavigate()
  const { handleSubmit, control, formState: {errors} } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    },
    resolver: yupResolver(validationSchema)
  })
 
 const onSubmit = async (data) => {
  try{
    await signIn(data.email, data.password)
    if(!rememberUser){
      try{
        await noRememberUser()
      }catch(err) {
        console.log(err)
      }
    }
    navigate('/home')
  }catch(err){
    console.log(err)
  }
 }

  const handleGoogleLogin = async() => {
    try{
      await loginWithGoogle()
      navigate('/home')
    }catch(err){
      console.log(err)
    }
  }
  console.log(errors.email)

  const handleChangeBox = () => {
    setRememberUser(!rememberUser)
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-teal-700'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-96 p-8 bg-white flex flex-col gap-y-4 rounded-lg text-center text-black' >
        <Controller 
          name='email'
          control={control}
          render={({field})=> {
            return(
              <TextField 
              {...field} 
              placeholder='Write your Email' 
              label='Email' 
              helperText={errors.email && errors.email.message}
              error={errors.email}
              />  
            )}
          }
          // rules={{ required: true, min: 7, max: 23, pattern: /^[\w._]{6,20}@\w+.[a-z]{3,6}.?[a-z]{2,3}?$/i  }}
        />
        <Controller 
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
        />
        <Button 
          color="primary" 
          variant="contained"  
          type="submit" 
          // disabled={!formik.dirty || !formik.isValid}
        > 
          Login
        </Button>
        <div>
          <FormControlLabel  sx={ rememberUser && { color: '#0ea5e9' }} control={<Checkbox checked={rememberUser} />} label='Remember me' onChange={handleChangeBox}/>
        <Link to='/pw-forget'><span className='text-sky-500'>Forgot password?</span></Link>
        </div>
        <p >Still don't have an acount 
          <Link to='/signup'>
            <span 
              className='text-sky-500 p-1.5 mt-1  text-center'>
                SignUp
            </span>
          </Link>
        </p>
      <Button onClick={handleGoogleLogin} sx={{
        backgroundColor: '#269FD7',
        color: 'white',
      }}>Google Sigin</Button>
      </form>
      
    </div>
  );
};

export default SignIn

