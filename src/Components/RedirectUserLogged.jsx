import React from 'react';
import useAuth from '../Firebase/useAuthContext';
import { Navigate } from 'react-router-dom';


const RedirectUserLogged = ({children}) => {
const { user } = useAuth()

if(user){
  return <Navigate to='/home' />
}

  return (
    <>{children}</>
  )
}

export default RedirectUserLogged