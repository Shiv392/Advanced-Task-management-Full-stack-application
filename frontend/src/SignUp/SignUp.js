import React, { useState,useEffect, useCallback } from 'react';
import {useFormik, validateYupSchema} from 'formik';
import './SignUp.css';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.json';
import BackdropComp from '../Common/Backdrop';
import SnackbarComp from '../Common/Snackbar';
import { useNavigate } from 'react-router-dom';
import signupimage from './Signup.jpg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import  IconButton  from "@mui/material/IconButton";

const SignUp=()=>{

    const signupform=useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            confirmpassword:''
        },
        validationSchema :yup.object({
          name:yup.string().required('Name is required').max(10),
          email:yup.string().email('Enter valid email').required('Email is required').max(30),
          password:yup.string().required('Enter password'),
          confirmpassword : yup.string().oneOf([yup.ref('password'),null],'Password must match').required('Confirm your password')
        }),
        validateOnMount:true,
        onSubmit:(values,{resetForm})=>{
            console.log('form values---->',values);
            signup();
            resetForm();
        }
    })

    const [openbackdrop,setBackdrop]=useState(false);
    const [opensnackbar,setSnackbar]=useState({open:false,message:''});
    const navigate=useNavigate();
    let [showPassword,setShowPassword]=useState(false);

    const visible=()=>{
      setShowPassword(!showPassword);
    }

    useEffect(()=>{
      setShowPassword(false);
      },[])

    const signup=useCallback(async ()=>{
        setBackdrop(true);
        const apibody={
            name:signupform.values.name,
            email:signupform.values.email,
           password:signupform.values.password
           }
        await axios.post(config.signup,apibody).then((res)=>{
          console.log('res------>',res);
          if(res.data.success){
            setSnackbar({open:true,message:res.data.message});
            signupform.resetForm();
            console.log('user signup success');
            setTimeout(() => {
              navigate('/')
            }, 3000);
          }
          else {
            setSnackbar({open:true,message:res.data.message});
            console.log('user signup failed----->',res.data.message)
          }
          
          setTimeout(() => {
            setSnackbar({open:false,message:''})
          }, 5000);        
          setBackdrop(false)
          }).catch(err=> console.error(err));
    },[signupform,navigate])

return(
<div className='signup-container'>
<div className="form-box">
<form className="signup-form" onSubmit={signupform.handleSubmit}>
    <span className="title">Sign up</span>
    <span className="subtitle">Create a free account with your email.</span>
    <div className="form-container">
      <input type="text" className="input" {...signupform.getFieldProps('name')} placeholder="Full Name" />
	  <input type="email" className="input" {...signupform.getFieldProps('email')} placeholder="Email" />
	  <input type={showPassword ? 'text':"password"} className="input" {...signupform.getFieldProps('password')} placeholder="Password" />
    <IconButton onClick={()=> visible()} className="passwordicon-btn2">
            {
              !showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
            }
          </IconButton>
      <input type="password" className="input" {...signupform.getFieldProps('confirmpassword')} placeholder="Confirm Password" />
    </div>
    <button type='submit' className='signup-btn' disabled={!signupform.isValid} onClick={()=>signup()}>Sign up</button>
</form>
<div className="form-section">
  <p>Have an account? <Link to='/'>Login</Link> </p>
</div>


<BackdropComp openbackdrop={openbackdrop} />
<SnackbarComp 
vertical='top' horizontal='right'
opensnackbar={opensnackbar.open}
 message={opensnackbar.message}
 />
</div>
  <div className='image-container'>
    <img src={signupimage} />
  </div>
</div>
)
}
export default SignUp;