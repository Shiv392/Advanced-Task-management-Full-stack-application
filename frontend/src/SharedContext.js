import React, { useState } from 'react';
import { createContext } from 'react';

export const SharedContext=createContext();

const SharedProvider=({children})=>{
    const [useremail,setUserEmail]=useState('');

    const setEmail=(email)=>{
    setUserEmail(email);
    }

    return(
        <SharedContext.Provider value={{useremail,setEmail}}>
            {children}
        </SharedContext.Provider>
    )
}
export default SharedProvider;