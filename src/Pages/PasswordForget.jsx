import React from 'react';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useAuth from '../Firebase/useAuthContext';


const PasswordForget = () => {
  const {resetForgotPassword} = useAuth()
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')
  const handleChange = (event) => {
    setError('')
    setEmail(event.target.value)
  }
  const submit = async () => {
    if(!email){
      return setError('Please enter the Email')
    }
    try{
      console.log(email)
      await resetForgotPassword(email)
      setError("We send you and Email to verify it's you")
    }catch(err){
      console.log(err)
    }
  }




  return (
    <div className='h-screen w-screen bg-slate-700 flex justify-center items-center '>
      <div className='w-8/12 md:w-3/6 lg:w-4/12 h-2-3 bg-white p-4 rounded-lg text-center '>
        <h3 className='block text-black mb-4 font-bold mw-full'>Write your Email to send you a code verification</h3>
        <div className='flex justify-center items-center'>
        <TextField  label='Email' placeholder='Write your Email' sx={{ width: '80%' }} onChange={handleChange} helperText={error && error} />
        <Button endIcon={<SendIcon />} color='secondary' variant='outlined' sx={{ marginLeft: '1rem', height: '80%'  }} onClick={submit}>Send</Button>
        </div>
      </div>
    </div>
  )
}

export default PasswordForget