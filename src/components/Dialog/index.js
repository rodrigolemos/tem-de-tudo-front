import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

const CustomizedDialogs = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FaSearch onClick={handleClickOpen} className="icon-info" />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {content}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomizedDialogs;
