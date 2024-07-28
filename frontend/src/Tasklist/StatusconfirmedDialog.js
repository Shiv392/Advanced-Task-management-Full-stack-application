import React from 'react';
import {Dialog, DialogTitle,DialogActions,DialogContent } from '@mui/material';
import DividerComp from '../Common/Divider';

const ConfirmStatus=({open,message,dialogconfirm})=>{
    return(
        <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs">
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                {message}
            </DialogContent>
            <div className='mt-3'>
                <DividerComp />
            </div>
            <DialogActions>
                <button className='btn btn-secondary' onClick={()=>dialogconfirm(false)}>Cancel</button>
                <button className='btn btn-danger' onClick={()=>dialogconfirm(true)}>Delete</button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmStatus;