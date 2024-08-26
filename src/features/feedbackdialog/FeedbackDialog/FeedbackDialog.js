import './FeedbackDialog.css';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function FeedbackDialog({ isOpen, onClose, message, onCancel, onConfirm, cancelLabel, confirmLabel, showActions }) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent className='box-dialog'>
                <Typography variant="body1" style={{ paddingBottom: showActions ? 0 : '20px' }}>
                        {message}
                </Typography>
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
