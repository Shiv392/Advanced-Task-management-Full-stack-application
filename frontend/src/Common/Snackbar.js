import React from 'react';
import Snackbar from '@mui/material/Snackbar';

const SnackbarComp=({opensnackbar,message,vertical,horizontal})=>{
return(
    <>
     <Snackbar
        open={opensnackbar}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        autoHideDuration={5000}
        message={message}
      />
    </>
)
}

export default SnackbarComp;