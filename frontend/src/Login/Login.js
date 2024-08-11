import React, { useCallback, useContext,useState } from "react";
import './Login.css';
import { useFormik } from "formik";
import config from '../config.json';
import { Link } from "react-router-dom";
import { authContext } from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackdropComp from "../Common/Backdrop";
import SnackbarComp from "../Common/Snackbar";

const Login=()=>{
    const {isAuthenticated,login,Logout}=useContext(authContext);
    const navigate=useNavigate();

    const [openbackdrop,setBackdrop]=useState(false);
    const [opensnackbar,setSnackbar]=useState({open:false,message:''});

    const loginForm=useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit: async(values,{resetForm})=>{
            console.log('login form values----->',values);
            await loginClick(values.email,values.password);
        }
    });

    const loginClick= useCallback(async(email,password)=>{
          setBackdrop(true);
          const apibody={
            "email":email,"password":password
          }
           const loginres=await axios.post(config.login,apibody);
           if(loginres.data.success){
            loginForm.resetForm();
            localStorage.setItem('emial',email);
            localStorage.setItem('token',loginres.data.token);
            login();
            navigate('/task')
           }
           else{
            setSnackbar({open:true,message:loginres.data.message});
            setTimeout(() => {
              setSnackbar(false);
            }, (5000));
           } 
           setBackdrop(false);       
    },[loginForm,login,navigate])
return(
  <div className="body-container">
  <div>
     <div className="wave"></div>
     <div className="wave"></div>
     <div className="wave"></div>
  </div>
  <div className="login-container">
    <form className="form" onSubmit={loginForm.handleSubmit}>
       <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input type="email" {...loginForm.getFieldProps('email')} placeholder="Enter email" />
          <span>
          </span>
      </div>
      <div className="input-container">
          <input type="password" {...loginForm.getFieldProps('password')} placeholder="Enter password" />
        </div>
         <button type="submit" className="submit">
        Sign in
      </button>

      <p className="signup-link">
        No account?
        <Link to='signup'>  
        Sign up
        </Link>
      </p>
   </form>

<BackdropComp openbackdrop={openbackdrop} />
<SnackbarComp 
vertical='top' horizontal='right'
opensnackbar={opensnackbar.open}
 message={opensnackbar.message}
 />
   </div>
</div>
)
}
export default Login;