import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from './Auth';

const AuthRoute=({Component})=>{
const navigate=useNavigate();
const {isAuthenticated}=useContext(authContext);
console.log('isAuthenticated----->',isAuthenticated)

useEffect(()=>{
    if(!isAuthenticated){
        navigate('/')
    }
},[isAuthenticated,navigate])
return(
    isAuthenticated ? <Component /> : null
)
}

export default AuthRoute;