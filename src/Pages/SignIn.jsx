/* eslint-disable no-unused-vars */
import React from 'react';
// import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material/';
import './signIn.css'
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../Firebase/useAuthContext';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(7, 'Password should be of minimum 7 characters length').required('Password is required'),
});

const SignIn = () => {
  const [error, setError] = React.useState('') 
  const { signIn, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setError('')
      try{
        // console.log(values)
        await signIn(values.email, values.password)
        formikHelpers.resetForm()
        navigate('/home')
      }catch(err){
        if(err.code === 'auth/wrong-password'){
          setError('Wrong password')
        }
        // console.log(err.code)
      }
    },
  });

  const handleGoogleLogin = async() => {
    try{
      await loginWithGoogle()
      navigate('/home')
    }catch(err){
      console.log(err)
    }
  }
  // console.log(formik.errors)

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-teal-700'>
      <form onSubmit={formik.handleSubmit} className='w-7/12 p-8 bg-white flex flex-col gap-y-7 rounded-lg text-center text-black' >
        
        <TextField
          // fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          color='secondary'
          helperText={Boolean(formik.touched.email) && formik.errors.email}
        />
        <TextField
          // fullWidth
          sx={{
            color: 'white'
          }}
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={(formik.touched.password && Boolean(formik.errors.password)) || error}
          helperText={(formik.touched.password && formik.errors.password) || (error && error)}
        />
        <Button 
          color="primary" 
          variant="contained"  
          type="submit" 
          // disabled={!formik.dirty || !formik.isValid}
        > 
          Login
        </Button>
        <Link to='/pw-forget'>Forgot yuor password?</Link>
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

