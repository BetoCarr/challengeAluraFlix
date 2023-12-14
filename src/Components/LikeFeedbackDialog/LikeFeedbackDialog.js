import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function LikeFeedbackDialog({ isOpen, onClose, title, liked }) {

    let message = '';
    if (liked === true) {
        message = `¡"${title}" añadido a tus favoritos!`;
    } else if (liked === false) {
        message = `¡"${title}" eliminado de tus favoritos!`;
    }
    function handleClose() {
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogContent className='box-dialog'>
                {message}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LikeFeedbackDialog;
