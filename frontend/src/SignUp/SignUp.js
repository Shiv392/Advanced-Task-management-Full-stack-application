import React, { useState } from 'react';
import {useFormik, validateYupSchema} from 'formik';
import './SignUp.css';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.json';
import BackdropComp from '../Common/Backdrop';
import SnackbarComp from '../Common/Snackbar';
import { useNavigate } from 'react-router-dom';

const ValidationSchema=yup.object({
    name:yup.string().required('Name is required'),
    email:yup.string().required('Email is required').email('Invalid email'),
    password:yup.string().required('Password is required')
    .min(8),
    confirmpasswordL:yup.string().required().oneOf([yup.ref('password'),null],'Password must match')
})
const SignUp=()=>{

    const signupform=useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            confirmpassword:''
        },
        validationSchema : ValidationSchema,
        onSubmit:(values,{resetForm})=>{
            console.log('form values---->',values);
            signup();
            resetForm();
        }
    })

    const [openbackdrop,setBackdrop]=useState(false);
    const [opensnackbar,setSnackbar]=useState({open:false,message:''});
    const navigate=useNavigate();

    const signup=async ()=>{
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
    }

return(
<div className="form-box">
<form className="form" onSubmit={signupform.handleSubmit}>
    <span className="title">Sign up</span>
    <span className="subtitle">Create a free account with your email.</span>
    <div className="form-container">
      <input type="text" className="input" {...signupform.getFieldProps('name')} placeholder="Full Name" />
	  <input type="email" className="input" {...signupform.getFieldProps('email')} placeholder="Email" />
	  <input type="password" className="input" {...signupform.getFieldProps('password')} placeholder="Password" />
      <input type="password" className="input" {...signupform.getFieldProps('confirmpassword')} placeholder="Confirm Password" />
    </div>
    <button type='submit' onClick={()=>signup()}>Sign up</button>
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
)
}
export default SignUp;