import React from 'react';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const PasswordForget = () => {
  return (
    <div className='h-screen w-screen bg-slate-700 flex justify-center items-center '>
      <div className='w-8/12 h-2-3 bg-white p-4 rounded-lg flex justify-center items-center'>
        <TextField  label='Email' placeholder='Write your Email' sx={{ width: '80%' }} />
        <Button endIcon={<SendIcon />} color='secondary' variant='outlined' sx={{ marginLeft: '1rem', height: '80%'  }}>Send</Button>
      </div>
    </div>
  )
}

export default PasswordForget