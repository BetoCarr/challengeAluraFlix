import './FeedbackDialog.css'
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { closeFeedback } from '../feedbackActions';
function FeedbackDialog() {

    const dispatch = useDispatch();
    const { isOpen, message, onConfirm, confirmLabel, onClose, onCancel, cancelLabel } = useSelector((state) => state.feedback);

    // Función para manejar el cierre del cuadro de diálogo
    function handleClose() {
        if (onConfirm) {
            onConfirm();
        }
        dispatch(closeFeedback());
    }

    return (
        // Componente de cuadro de diálogo de Material-UI
        <Dialog open={isOpen} onClose={handleClose}>
            {/* Contenido del cuadro de diálogo */}
            <DialogContent className='box-dialog'>
                {message} {/* Muestra el mensaje proporcionado */}
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
    )
}

export default FeedbackDialog;
