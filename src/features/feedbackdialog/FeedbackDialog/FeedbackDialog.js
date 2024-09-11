import './FeedbackDialog.css';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteCategory, updateCategory } from '../../videocategories/videoCategoriesSlice';

function FeedbackDialog({ isOpen, onClose, message, onCancel, onConfirm, cancelLabel, confirmLabel, showActions, actionType, onOpenForm }) {

    const dispatch = useDispatch();

    const handleConfirm = () => {
        if (actionType === 'delete') {
            dispatch(deleteCategory())
            console.log("delet")
        } else if (actionType === 'edit') {
            onOpenForm(); // Abrir el formulario para editar o agregar videos
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
