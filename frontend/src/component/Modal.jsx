import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function Modal(props) {
    const { open, handleClose, title, message, confirmText, cancelText, onConfirm } = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modal;
