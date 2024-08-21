import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import './ForgetPassword.css'

const EmailDialog=({openemaildialog,emaildialogresponse})=>{
    const emailform=useFormik({
        initialValues:{
            email:''
        },
        validateOnMount:true,
        validationSchema:yup.object({
            email:yup.string().required('Email is required').email('Enter valid email')
        }),
        onSubmit:(values,{resetForm})=>{
            console.log('email dialog for values------>',values);
            emaildialogresponse(values.email)
            resetForm();
        }
    })

    const save=()=>{
        emaildialogresponse(emailform.values.email)
        emailform.resetForm();
    }

return(
<Dialog open={openemaildialog} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs">
<div>
<DialogTitle>Enter your Email:</DialogTitle>
<DialogContent>
    <form className=".email-dialogform" onSubmit={emailform.handleSubmit}>
    <div className="input-container2 mb-2">
          <input type="email" className='input1' {...emailform.getFieldProps('email')} placeholder="abc123@gmail.com" />
        </div>
    </form>
</DialogContent>
<DialogActions>
    <button className='btn btn-light' onClick={()=>emaildialogresponse(null)}>Cancel</button>
    <button className='btn btn-primary' type='submit' onClick={()=> save()} disabled={!emailform.isValid}>Send OTP</button>

</DialogActions>
</div>
</Dialog>
)
}

export default EmailDialog;