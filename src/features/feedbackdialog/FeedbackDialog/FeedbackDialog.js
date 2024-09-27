import './FeedbackDialog.css';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../videocategories/videoCategoriesSlice';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router

function FeedbackDialog({ isOpen, onClose, message, onCancel, cancelLabel, confirmLabel, showActions, actionType, categoryId }) {

    const navigate = useNavigate(); // Hook para navegar entre rutas

    const dispatch = useDispatch();

    const handleConfirm = () => {
        if (actionType === 'delete') {
            dispatch(deleteCategory())
            console.log("delet")
        } else if (actionType === 'edit') {
            navigate(`/editar-categoria/${categoryId}`, { replace: true });
            console.log("open form");
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
