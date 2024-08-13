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
            <DialogActions>
                {/* Botón de cancelación, si la función onCancel está definida */}
                {onCancel && (
                    <Button onClick={onCancel} color="primary">
                        {cancelLabel || 'Cancelar'}
                    </Button>
                )}
                {/* Botón de confirmación, si la función onConfirm está definida */}
                {onConfirm && (
                    <Button onClick={onConfirm} color="primary">
                        {confirmLabel || 'Aceptar'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default FeedbackDialog;