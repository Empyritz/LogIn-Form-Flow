import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUETS from '../constants/constants'
import useAuth from '../Firebase/useAuthContext';

const Navigation = () => {
  const { user } = useAuth()

  return (
    <div className='h-full flex justify-around items-center'>
      <ul>
        <li><Link to={ROUETS.LANDING}>Landing</Link></li>
      </ul>
      {!user && <ul>
        <li><Link to={ROUETS.SIGNIN}>Signin</Link></li>
      </ul>}
      <ul>
        <li><Link to={ROUETS.HOME}>Home</Link></li>
      </ul>
      {/* <ul>
        <li><Link to={ROUETS.ACCOUNT}>Account</Link></li>
      </ul> */}
      {/* <ul>
        <li><Link to={ROUETS.ADMIN}>Admin</Link></li>
      </ul> */}
    </div>
  )
}

export default Navigation