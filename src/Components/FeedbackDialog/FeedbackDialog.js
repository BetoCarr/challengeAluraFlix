import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function FeedbackDialog({ isOpen, onClose, message, onConfirm, confirmLabel }) {

    function handleClose() {
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogContent className='box-dialog'>
                {message}
            </DialogContent>
            <DialogActions>
                {onConfirm && (
                    <Button onClick={onConfirm} color="primary">
                        {confirmLabel || 'Ok'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default FeedbackDialog;
