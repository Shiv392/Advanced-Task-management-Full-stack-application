import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import { authContext } from './Auth';

const AuthRoute=({Component})=>{
const navigate= useNavigate();
const {isAuthenticated}=useContext(authContext);
console.log('isAuthenticated----->',isAuthenticated)

useEffect(()=>{
    console.log('check---->',typeof isAuthenticated);
    console.log('navigate------>',navigate.name)
    if(isAuthenticated==='false'){
        console.log('unauthenticated-------->')
        navigate("/")
    }
},[isAuthenticated]);

return(
    isAuthenticated ? <Component /> : null
)
}

export default AuthRoute;