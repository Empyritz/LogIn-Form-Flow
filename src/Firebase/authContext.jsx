import React from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'
import {auth} from './index'

const authContext = React.createContext()


const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const signUp = (email, passsword) => createUserWithEmailAndPassword(auth, email, passsword)
  const signIn = (email, passsword) => signInWithEmailAndPassword(auth, email, passsword)
  const logOut = () => signOut(auth)
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }
  const resetPassword = (email) => sendPasswordResetEmail(auth, email)
    


  React.useEffect(()=>{
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      console.log(user)
      // return unsubscribe
    })
  })

  return (
    <authContext.Provider value={{ signIn, signUp, logOut, user, loading, loginWithGoogle, resetPassword}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
export {authContext}