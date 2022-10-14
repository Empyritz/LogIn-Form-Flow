import React from 'react';
import { authContext } from './authContext';

const useAuth = () => (React.useContext(authContext))

export default useAuth
