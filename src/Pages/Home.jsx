import React from 'react';
import { Button } from '@mui/material';
import useAuth from '../Firebase/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const { logOut } = useAuth()
  const handleLogOut = async() => {
    await logOut()
    navigate('/landing')
  }

  return (
    <div>
      <Button type='button' onClick={handleLogOut}>LogOut</Button>
    </div>
  )
}

export default Home