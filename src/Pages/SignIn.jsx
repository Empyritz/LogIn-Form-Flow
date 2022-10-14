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
  password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const SignIn = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try{
        console.log(values)
        // await signIn(values.email, values.password)
        formikHelpers.resetForm()
        // navigate('/home')
      }catch(err){
        console.log(err.code)
      }
    },
  });

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
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button 
          color="primary" 
          variant="contained"  
          type="submit" 
          // disabled={!formik.dirty || !formik.isValid}
        > 
          Login
        </Button>
        <p >Still don't have an acount 
          <Link to='/signup'>
            <span 
              className='text-sky-500 p-1.5 mt-1  text-center'>
                SignUp
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn

