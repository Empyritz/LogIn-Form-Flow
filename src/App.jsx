//REACT
import './App.css';
import React from 'react';
//LIBRARIES
// import Grid from '@mui/material/Grid'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import * as ROUTES from './constants/constants'
//COMPONENTS
import Header from './Components/Header';
//PAGES
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import PasswordForget from './Pages/PasswordForget'
import Admin from './Pages/Admin'
import Account from './Pages/Account'
import ProtectedRoute from './Components/ProtectedRoute'
import RedirectUserLogged from './Components/RedirectUserLogged';

function App () {
  return (
    <div className='w-screen h-full text-slate-200'>
      <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />}></Route>
          <Route path={ROUTES.HOME} element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path={ROUTES.ACCOUNT} element={<Account />} />
          <Route path={ROUTES.SIGNIN} element={ <RedirectUserLogged><SignIn /></RedirectUserLogged> } />
          <Route path={ROUTES.SIGNUP} element={<RedirectUserLogged><SignUp /></RedirectUserLogged>} />
          <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordForget />} />
          <Route path={ROUTES.ADMIN} element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
