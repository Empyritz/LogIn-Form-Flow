import React from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  setPersistence,
  browserSessionPersistence,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import {auth} from './index'
// import { async } from '@firebase/util';

const authContext = React.createContext()


const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  // const [errors, setErrors] = React.useState(null)

  // const register = async(name, email, passsword) => {  
  //   try {
  //     await signUp(auth, email, passsword)
  //     await updateProfile(auth, {displayName: name})
  //     await sendEmailVerification(auth)
  //   }catch(err){
  //     setErrors(err.code)
  //   }
  // }
  const reauthenticateUser = async(userProvidedPassword) => {
    try{
      await reauthenticateWithCredential(auth.currentUser, credentials(userProvidedPassword))
    }catch(err){
      return err
    }
  }
  const credentials = (userProvidedPassword) => EmailAuthProvider.credential(auth.currentUser.email, userProvidedPassword)
  // const reauthenticateUser = () => reauthenticateWithCredential(auth.currentUser, credentials)
  const noRememberUser = () => setPersistence(auth, browserSessionPersistence)
  const doUpdatePassword = (newPasssword) => updatePassword(user, newPasssword)
  const doUpdateEmail = (newEmail) => updateEmail(user, newEmail)
  const verificateEmail = () => sendEmailVerification(auth.currentUser)
  const updateName = (name) => updateProfile(auth.currentUser, {displayName: name})
  const signUp = (email, passsword) => createUserWithEmailAndPassword(auth, email, passsword)
  const signIn = (email, passsword) => signInWithEmailAndPassword(auth, email, passsword)
  const logOut = () => signOut(auth)
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }
  const resetForgotPassword = (email) => sendPasswordResetEmail(auth, email)
    


  React.useEffect(()=>{
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      console.log(user)
      console.log(auth.currentUser)
      // return unsubscribe
    })
  })

  return (
    <authContext.Provider 
      value={{ 
        signIn, 
        logOut, 
        user, 
        loading, 
        loginWithGoogle, 
        resetForgotPassword, 
        signUp, 
        updateName,
        verificateEmail,
        doUpdateEmail,
        doUpdatePassword,
        noRememberUser,
        reauthenticateUser,
        // credentials
      }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
export {authContext}