import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const ForgetPasswordDialog=({openforgetpassword,forgetpasswordresponse})=>{

    const resetpasswordform=useFormik({
        initialValues:{
            otp:'',
            password:'',
            confirmpassword:''
        },
        validateOnMount:true,
        validationSchema:yup.object({
         otp:yup.string().required('OTP is required').max(4),
         password:yup.string().required('Password is required').max(16),
         confirmpassword:yup.string().oneOf([yup.ref('password'),null],'Password must match').required('Confirm your password')
        }),
        onSubmit:(values,{resetForm})=>{
            console.log('form values------->',values);
            forgetpasswordresponse(values);
            resetForm();
        }
    })

    const save=()=>{
        resetpasswordform.resetForm();
        forgetpasswordresponse(resetpasswordform.values)
    }

return(
<Dialog open={openforgetpassword} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs">
<DialogTitle>Set New Password</DialogTitle>
<DialogContent>
    <form className="form2" onSubmit={resetpasswordform.handleSubmit}>
    <div className="input-container2 mb-2">
          <input type="email" maxLength='4' className='input1' {...resetpasswordform.getFieldProps('otp')} placeholder="Enter OTP" />
        </div>
        <div className="input-container2 mb-2">
          <input type="email" className='input1' {...resetpasswordform.getFieldProps('password')} placeholder="Enter new password" />
        </div>
        <div className="input-container2 mb-2">
          <input type="email" className='input1' {...resetpasswordform.getFieldProps('confirmpassword')} placeholder="Confirm Password" />
        </div>
    </form>
</DialogContent>
<DialogActions>
<div>
    <button className='btn btn-light' onClick={()=> forgetpasswordresponse(null)}>Cancel</button>
    <button className='btn btn-primary' type='submit' onClick={()=> save()} disabled={!resetpasswordform.isValid}>Set Password</button>
</div>
</DialogActions>
</Dialog>
)
}

export default ForgetPasswordDialog