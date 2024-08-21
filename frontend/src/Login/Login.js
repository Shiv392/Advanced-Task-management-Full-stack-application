import React, { useCallback, useContext,useEffect,useState } from "react";
import './Login.css';
import { useFormik } from "formik";
import config from '../config.json';
import { Link } from "react-router-dom";
import { authContext } from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackdropComp from "../Common/Backdrop";
import SnackbarComp from "../Common/Snackbar";
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import  IconButton  from "@mui/material/IconButton";
import EmailDialog from "../ForgetPassword/Emaildialog";
import ForgetPasswordDialog from "../ForgetPassword/ForgetPasswordDialog";
import { SharedContext } from "../SharedContext";

const Login=()=>{
    const {isAuthenticated,login,Logout}=useContext(authContext);
    const {useremail,setEmail}=useContext(SharedContext)
    const navigate=useNavigate();

    const [openbackdrop,setBackdrop]=useState(false);
    const [opensnackbar,setSnackbar]=useState({open:false,message:''});
    let [showPassword,setShowPassword]=useState(false);
    const [openemaildialog,setemaildialog]=useState(false);
    const [openforgetpassword,setForgetPassworddialog]=useState(false);

    useEffect(()=>{
    setShowPassword(false);
    },[])

    const loginForm=useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:yup.object({
          email:yup.string().required().email('Enter Valid Email').max(50,'Email must be less then 50 length'),
          password:yup.string().required()
        }),
        validateOnMount:true,
        onSubmit: async(values)=>{
            console.log('login form values----->',values);
            await loginClick(values.email,values.password);
        }
    });

    const visible=()=>{
      setShowPassword(!showPassword);
    }

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
            setShowPassword(false);
            navigate('/task')
           }
           else{
            setSnackbar({open:true,message:loginres.data.message});
            setTimeout(() => {
              setSnackbar(false);
            }, (5000));
           } 
           setBackdrop(false);       
    },[loginForm,login,navigate]);

    const OpenEmailDialog=()=>{
      setemaildialog(true);
    }

   const  responsefromemaildialog= async(email)=>{
  console.log('email dialog response------->',email);
  setemaildialog(false);
  if(email){
    setEmail(email);
    setBackdrop(true);
    let creatotpapibody={
      "email":email
    }
    const createotpres= await axios.post(config.sendotp,creatotpapibody);
    setBackdrop(false);
    console.log('create otp res------>',createotpres);
    if(createotpres.data.success){
      setForgetPassworddialog(true);
      setSnackbar({open:true,message:createotpres.data.message});
      setTimeout(() => {
        setSnackbar(false);
      }, (2000));

    }
    else{
      setSnackbar({open:true,message:createotpres.data.message});
      setTimeout(() => {
        setSnackbar(false);
      }, (3000));
    }
  }
  else{
    
  }
   }

   const ForgetPasswordDialogResponse= async(res)=>{
    console.log('forget password dialog response----->',res);
    setForgetPassworddialog(false);
    if(res){
      setBackdrop(true);
     const forgetpasswordapi={
      "email":useremail,
      "otptoken":res.otp,
      "newpassword":res.password
     }
     const forgetpasswordres= await axios.put(config.forgetpassword,forgetpasswordapi);
     console.log('forgetpassword response------->',forgetpasswordres);
     setBackdrop(false);
     setSnackbar({open:true,message:forgetpasswordres.data.message});
            setTimeout(() => {
              setSnackbar(false);
            }, (5000));
    }
   }

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
        <div className="input-container mb-2">
          <input type="email" className="input" {...loginForm.getFieldProps('email')} placeholder="Enter email" /><br />
          <div className="error-container">
          {
            loginForm.errors.email && loginForm.touched.email ? 
            <p className="text text-danger error-text">{loginForm.errors.email}</p> : ''
          }
          </div>
          <span>
          </span>
      </div>
      <div className="input-container mt-2 mb-4">
          <input type={showPassword ? 'text':"password"} className="input" {...loginForm.getFieldProps('password')} placeholder="Enter password" />
          <IconButton onClick={()=> visible()} type="button" className="passwordicon-btn">
            {
              !showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
            }
          </IconButton>
          <div className="error-container">
          {
            loginForm.errors.password && loginForm.touched.password ? 
            <p className="text text-danger error-text">{loginForm.errors.password}</p> : ''
          }
          </div>
        </div>
         <button type="submit" disabled={!loginForm.isValid} className="submit">
        Sign in
      </button>
      <button type="button" className="reset-btn mt-1" onClick={()=>OpenEmailDialog()}>
       Reset Password
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
 <EmailDialog 
 openemaildialog={openemaildialog}
 emaildialogresponse={responsefromemaildialog}
 />
 <ForgetPasswordDialog 
 openforgetpassword={openforgetpassword}
 forgetpasswordresponse={ForgetPasswordDialogResponse}
 />
   </div>
</div>
)
}
export default Login;