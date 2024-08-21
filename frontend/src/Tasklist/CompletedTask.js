import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { format } from 'date-fns';
import ConfirmStatus from './StatusconfirmedDialog';

const CompletedTask=({completetasklist,completelistres})=>{
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy h:mma');
      };

      const [openconfirm,setConfirm]=useState(false);
      const [data,setData]=useState(Object);

      const openStatusConfirm=(task)=>{
          setData(task);
          setConfirm(true);
      }

      const StatusConfirmed=(confirm)=>{
        setConfirm(false)
         if(confirm){
            completelistres(data);
         }
      }

    return(
        <div style={{'height':"300px",'overflow':"auto"}}>
            <h5>Completed Task List:</h5>
            {
                completetasklist.length==0 ? <div>No Task Completed </div> :
            <table className='table table-responsive'>
                <thead>
                    <tr>
                        <th>Done</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                     completetasklist.map((task,index)=>(
                        <tr key={index}>
                        <td>
                            {<Checkbox checked={task.isCompleted==1} onClick={()=> openStatusConfirm(task)} />}
                        </td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{formatDate(task.created_at)}</td>
                        </tr>
                     ))
                    }
                </tbody>
            </table>

            }

            <ConfirmStatus 
            open={openconfirm}
            message={'Are you sure you want to continue with this task?'}
            dialogconfirm={StatusConfirmed}
            />
        </div>
    )
}
export default CompletedTask;