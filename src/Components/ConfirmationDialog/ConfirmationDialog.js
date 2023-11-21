import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './ConfirmationDialog.css'

function ConfirmationDialog ({ isOpen, onClose, onConfirm, videoId, videoTitle }){
    return (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle className='box-dialog'>{`¿Estás seguro de eliminar permanentemente el video "${videoTitle}"?`}</DialogTitle>
            <DialogActions>
                <Button onClick={onClose} style={{ color: 'green' }}>
                    Cancelar
                </Button>
                <Button onClick={() => onConfirm(videoId)} style={{ color: 'red' }}>
                    Eliminar
                </Button>
        </DialogActions>
    </Dialog>
    );
}

export default ConfirmationDialog;
