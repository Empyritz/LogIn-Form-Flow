import React from 'react';
import useAuth from '../Firebase/useAuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
const {user, loading} = useAuth()

if(loading){
  return <p>Loading...</p>
}
else if(!user){
  return <Navigate to='/signin' />
}
  return(
    <>{children}</>
  )
}

export default ProtectedRoute