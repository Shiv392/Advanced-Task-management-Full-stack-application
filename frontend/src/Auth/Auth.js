import { createContext, useEffect, useState } from "react";

export const authContext=createContext();

const AuthProvider=({children})=>{
const [isAuthenticated,setAuthenticated]=useState(()=>{
    return localStorage.getItem('isAuthenticated') || false
});

useEffect(()=>{
localStorage.setItem('isAuthenticated',isAuthenticated)
},[isAuthenticated]);

const login=()=>{
    console.log('login() works--------->')
    setAuthenticated(true);
}
const Logout=()=>{
    setAuthenticated(false);
}
return(
    <authContext.Provider value={{isAuthenticated,login,Logout}}>
        {children}
    </authContext.Provider>
)
}
export default AuthProvider;