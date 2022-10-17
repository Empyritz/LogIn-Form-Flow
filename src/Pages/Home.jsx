import React from 'react';
import { Button } from '@mui/material';
import useAuth from '../Firebase/useAuthContext';
import { useNavigate } from 'react-router-dom';
// import { useWatch } from 'react-hook-form';
// import  { Controller, set, useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup'
// import { async } from '@firebase/util';



// const validationSchema = yup.object({
//   email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
//   password: yup.string('Enter your password').min(7, 'Password should be of minimum 7 characters length').required('Password is required'),
// });

const Home = () => {
  const { logOut, user, doUpdatePassword, doUpdateEmail } = useAuth()
  const [inputValue, setInputValue] = React.useState()
  const [validateName, setValidateName] = React.useState(true)
  const [inputName, setInputName] = React.useState('email')
  // const { handleSubmit, control}= useForm({
  //   defaultValues: {
  //     email: '',
  //     password: ''
  //   },
  //   resolver: yupResolver(validationSchema),
  // })

  // const onSubmit = (data) => {
  //   if(inputName === 'email'){
  //     try{
  //       // await doUpdateEmail(data.email)
  //       console.log(data.email)
  //       console.log(data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  //   else{
  //     try{
  //       console.log(data)
  //       console.log(data.password)
  //       // await doUpdatePassword(data.password)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  // }

  const toggleInputName = () => {
    setValidateName(!validateName)
    console.log(user)
    if(validateName){
      setInputName('email')
    }else{
      setInputName('password')
    }
  }

  const handleChange = ({target}) =>  {
    setInputValue({
      [target.name]: target.value
    })
  }

  const onSend = async() => {
    if(inputName === 'email'){
          try{
            await doUpdateEmail(inputValue.email)
            console.log(inputValue.email)
          }catch(err){
            console.log(err)
          }
        }
        else{
          try{
            await doUpdatePassword(inputValue.password)
            console.log(inputValue.password)
          }catch(err){
            console.log(err)
          }
        }
  }

  const navigate = useNavigate()
  const handleLogOut = async() => {
    await logOut()
    navigate('/')
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-9/12'>
        <form action=""  className='flex flex-col items-center gap-y-5'  >
          <h2 className='text-black text-xl text-center mt-4'>Hello! {user.displayName}  Change your {inputName}</h2>
            <TextField  sx={{ width: '50%'}}
              onChange={handleChange}
              name={inputName}
              label={(inputName === 'email' && 'Email') || (inputName === 'password' && 'Password')}
              placeholder={(inputName === 'password' && '******') || (inputName === 'email' && 'email')}
            />
        <Button type='button' onClick={onSend}>Send</Button>
        </form>
      </div>
      <div className='flex justify-evenly'>
        <Button type='button' onClick={toggleInputName} >{inputName}</Button>
        <Button type='button' onClick={handleLogOut}>LogOut</Button>
      </div>
    </div>
  )
}

export default Home