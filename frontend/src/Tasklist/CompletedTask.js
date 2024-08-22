import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmStatus from './StatusconfirmedDialog';
import { format } from 'date-fns';

const CompletedTask = ({ completetasklist, completelistres }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy h:mma');
  };

  const [openconfirm, setConfirm] = useState(false);
  const [data, setData] = useState(Object);

  const openStatusConfirm = (task) => {
    setData(task);
    setConfirm(true);
  };

  const StatusConfirmed = (confirm) => {
    setConfirm(false);
    if (confirm) {
      completelistres(data);
    }
  };

  return (
    <div>
        <h5>Completed Task List:</h5>
        <div style={{ height: "300px", overflow: "auto" }}>
      {completetasklist.length === 0 ? (
        <div>No Task Completed</div>
      ) : (
        completetasklist.map((task, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <Checkbox
                  checked={task.isCompleted === 1}
                  onClick={(event) => {
                    event.stopPropagation(); 
                    openStatusConfirm(task);
                  }}
                />
                {task.title}
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <strong>Description:</strong> <span>{task.description}</span>
              </div>
              <div>
                <strong>Task Created:</strong> <span>{formatDate(task.created_at)}</span>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      )}

      <ConfirmStatus
        open={openconfirm}
        message={'Are you sure you want to continue with this task?'}
        dialogconfirm={StatusConfirmed}
      />
    </div>
    </div>
  );
};

export default CompletedTask;
