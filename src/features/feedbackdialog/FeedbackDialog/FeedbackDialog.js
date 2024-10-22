import './FeedbackDialog.css';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router

function FeedbackDialog({ isOpen, onClose, message, onCancel, cancelLabel, onConfirm, confirmLabel, showActions, actionType, categoryId }) {

    const navigate = useNavigate(); // Hook para navegar entre rutas

    const handleConfirm = () => {
        if (actionType === 'delete') {
            onConfirm()
        } else if (actionType === 'edit') {
            navigate(`/editar-categoria/${categoryId}`, { replace: true });
        } else if(actionType === 'addvideo') {
            navigate(`/agregar-video/${categoryId}`, { replace: true });
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent className='box-dialog'>
                <Typography variant="body1" style={{ paddingBottom: showActions ? 0 : '20px' }}>
                        {message}
                </Typography>
            </DialogContent>
            {showActions && (
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        {cancelLabel || 'Cancelar'}
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        {confirmLabel || 'Aceptar'}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}

export default FeedbackDialog;
