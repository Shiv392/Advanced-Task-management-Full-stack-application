import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialgTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import DividerComp from '../Common/Divider';

const EditDialog=({open,editdialogres,data,fullscreen})=>{
   const editForm=useFormik({
    enableReinitialize: true,
    initialValues:{
        title:data.title || '',
    description:data.description || ''
    },
    onSubmit:(values,{resetForm})=>{
        console.log('edit form values------------>',values);
        resetForm();
    }
   });

   return(
    <div>
 <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs">
        <DialgTitle>Edit Task</DialgTitle>
        <DialogContent>
            <form className='form' onSubmit={editForm.handleSubmit}>
                <div className='d-flex mt-3 mb-3' style={{"justifyContent":"space-between",'gap':'20px','alignItems':'center'}}>
                <div>
               <TextField label='Enter Title' {...editForm.getFieldProps('title')} />
                </div>
                <div>
                <TextField label='Enter Description' {...editForm.getFieldProps('description')} />
                </div>
                </div>
            </form>
        </DialogContent>
        {/* <Divider sx={{ opacity: 1.0 }} /> */}
        <div className='mt-2 mb-2'>
            <DividerComp />
        </div>
        <DialogActions>
            <button className='btn btn-secondary'aria-hidden="false" aria-modal="true"  onClick={()=>editdialogres(null)}>Cancel</button>
            <button className='btn btn-primary'aria-hidden="false" aria-modal="true"  onClick={()=>editdialogres(editForm.values)}>Save Changes</button>
        </DialogActions>
    </Dialog>
    </div>
   
   )
}
export default EditDialog;