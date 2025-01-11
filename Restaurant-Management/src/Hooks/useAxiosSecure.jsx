import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvier';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true
})

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
      axiosInstance.interceptors.response.use(response =>{
        return response
      },error =>{
        // error khaile erro ta pathai disse 
        console.log("error caught in interceptor",error)
        if(error.status === 401 || error.status === 403 ){
            console.log("Need to LogOut ")
            logOut().then(()=>{
                console.log("LogOut User")
                navigate('/login')
            })
        }
        return Promise.reject(error)
      })
    },[])
    return axiosInstance
};
export default useAxiosSecure;