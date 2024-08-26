import './FeedbackDialog.css';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function FeedbackDialog({ isOpen, onClose, message, onCancel, onConfirm, cancelLabel, confirmLabel, showActions }) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent className='box-dialog'>
                {message}
            </DialogContent>
            {showActions && (
                <DialogActions>
                    {onCancel && (
                        <Button onClick={onCancel} color="primary">
                            {cancelLabel || 'Cancelar'}
                        </Button>
                    )}
                    {onConfirm && (
                        <Button onClick={onConfirm} color="primary">
                            {confirmLabel || 'Aceptar'}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
}

export default FeedbackDialog;
