import React from 'react';
// import ReactDOM from 'react-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import {TextField, Box} from '@mui/material/';
import './signIn.css'
import { useNavigate } from 'react-router-dom';
import useAuth from '../Firebase/useAuthContext';

const SignUp = () => {
  const { signUp } = useAuth() 
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: ''
  }
  const [error, setError] = React.useState()

  return (
    <div className='signInContainer text-center text-black text-2xl font-mono font-bold'>
        <h3>Register</h3>
      <Formik 
        initialValues={initialValues} 
        
        onSubmit={async(values, formikHelpers)=>{
          setError('')
          try{
            await signUp(values.email, values.password)
            formikHelpers.resetForm()
            navigate('/home')
          }catch(err){
            if(err.code  === 'auth/email-already-in-use'){
              setError('The email is already in use')
            }
            console.log(err.code)
          }
        }}
        
        validationSchema={yup.object({
          email: 
            yup
              .string()
              .email('Invalid email')
              .required('Please enter the email'),
          password: 
            yup
              .string()
              .min(7, 'Password should be minimun 7 characters')
              .required('Please enter password')
        })}

      >
        {({errors, isValid, touched, dirty, isSubmitting})=> (
          <Form >
            <Field  
              name='email' 
              type='email' 
              as={TextField} 
              // value={values.email}
              variant='outlined' 
              color='primary' 
              label='Email' 
              fullWidth 
              error={(touched.email && errors.email) || error  } 
              helperText={(touched.email && errors.email) || ((error) && error)}
            />  
            <Box height={13} />
            <Field 
              name='password' 
              type='password' 
              // value={values.password}
              as={TextField} 
              variant='outlined' 
              color='primary' 
              label='*******' 
              fullWidth
              error={errors.password && touched.password}
              helperText={touched.password && errors.password}
            />    
            <Box height={13} />
            <Button 
              type='submit' 
              variant='contained' 
              color='primary' 
              size='medium'
              disabled={!dirty || !isValid || isSubmitting}
            >SignUp</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}


export default SignUp