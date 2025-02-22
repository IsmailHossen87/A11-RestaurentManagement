import React, { createContext, useEffect, useState } from 'react';
// import app from '../FireBase/FireBase';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import auth from '../../Firebase/Firebase';
export const AuthContext = createContext()
// const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider()
const gitHubProvider = new GithubAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)


    const loginGoogle =()=>{
      setLoading(true)
      return signInWithPopup(auth,googleProvider)
  }
  const gitHub =()=>{
    setLoading(true)
    return signInWithPopup(auth,gitHubProvider)
  }

  const createUserEmail = (email,password)=>{
      setLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)
  }
  const loginByemail = (email,password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth,email,password)
  }
  const userUpdate =(name,photo)=>{
      return updateProfile(auth.currentUser,{
          displayName:name, photoURL: photo
      })
  }

    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        // setLoading(false)
        if (currentUser?.email) {
          const user = { email: currentUser?.email };
          axios.post(`${import.meta.env.VITE_API_URL}/jote`, user, { withCredentials: true })
            .then((res) => {
              setLoading(false);
              console.log("Login Cookies",res.data);
            });
        }else{
          axios.post(`${import.meta.env.VITE_API_URL}/logout`,{},{withCredentials:true})
          .then(res =>{
            console.log("logOut Cookies" ,res.data)
            setLoading(false);
          })
        }
      });
      return () => unSubscribe();
    }, []);
    
    
    const logOut = async () => {
      try {
        await signOut(auth);
        setUser(null); // Explicitly setting user state to null
        console.log("Successfully logged out");
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    };
    
  
    const authInfo = {
      user,
      loading,
      loginGoogle,
      gitHub,
      createUserEmail,
      loginByemail,
      userUpdate,
      logOut
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;