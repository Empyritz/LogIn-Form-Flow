import React from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form'
import useAuth from '../Firebase/useAuthContext';

const AuthenticateCredentials = ({setReAuthenticate, inputValue, inputName}) => {
  const { reauthenticateUser, doUpdatePassword, doUpdateEmail, } = useAuth()
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      password: ''
    }
  })

  console.log('rendering FIRST')

  React.useEffect(()=> {
    console.log('rendering,useeffect')
    const subscribtion = watch((data)=>{
      console.log(data)
    })

    return () => {
      subscribtion.unsubscribe()
    }
  }, [watch])

  const onSubmit = async(data) => {
    try{
      await reauthenticateUser(data)
      .then(async() => {
        if(inputName === 'email'){
          try{
            await doUpdateEmail(inputValue)
            setReAuthenticate(false)
            console.log('exito')
          }catch(error){
            console.log(error.code)
          }
        }else{
          await doUpdatePassword(inputValue)
          setReAuthenticate(false)
          console.log('exito')
        }
      })
   }
   catch (error){

   }
  }


  const cancelClick = () => {
    setReAuthenticate(false)
  }

  return (
    <div className='w-screen h-screen absolute z-10 flex justify-center items-center' style={{ backgroundColor: 'rgba(0,0,0,0.7)', }}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-2/6 items-center' >
        <label htmlFor="password" className='mb-3 text-white text-xl font-mono'>Confirm your password</label>
        <input type="text" {...register('password')} className='w-full h-11 rounded p-4' placeholder='*******'/>
        <div className='flex justify-evenly w-full mt-5'>
          <Button type='submit' variant='contained'>Send</ Button>
          <Button type='button' variant='outlined' onClick={cancelClick}>Cancel</ Button>
        </div>
      </form>
    </div>
  )
}

export default AuthenticateCredentials