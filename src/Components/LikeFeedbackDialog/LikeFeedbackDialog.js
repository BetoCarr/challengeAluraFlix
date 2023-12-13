import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function LikeFeedbackDialog({ isOpen, onClose, title, action }) {
    let message = '';

    if (action === 'like') {
        message = '¡Me gusta añadido!';
    } else if (action === 'unlike') {
        message = '¡Me gusta eliminado!';
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                {/* Puedes añadir información adicional aquí */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LikeFeedbackDialog;
