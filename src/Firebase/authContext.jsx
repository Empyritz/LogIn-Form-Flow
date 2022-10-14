import React from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import {auth} from './index'

const authContext = React.createContext()


const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const signUp = (email, passsword) => createUserWithEmailAndPassword(auth, email, passsword)
  const signIn = (email, passsword) => signInWithEmailAndPassword(auth, email, passsword)
  const logOut = () => signOut(auth)

  React.useEffect(()=>{
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      console.log(user)
      // return unsubscribe
    })
  })

  return (
    <authContext.Provider value={{ signIn, signUp, logOut, user, loading}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
export {authContext}