import './FeedbackDialog.css'
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function FeedbackDialog({ isOpen, onClose, message, onCancel, onConfirm, cancelLabel, confirmLabel }) {
    return (
        // Componente de cuadro de diálogo de Material-UI
        <Dialog open={isOpen} onClose={onClose}>
            {/* Contenido del cuadro de diálogo */}
            <DialogContent className='box-dialog'>
                {message}  {/* Muestra el mensaje proporcionado */}
            </DialogContent>
            {/* Acciones del cuadro de diálogo */}
            {/* Solo muestra DialogActions si onCancel o onConfirm están definidos */}
            {(onCancel || onConfirm) && (
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