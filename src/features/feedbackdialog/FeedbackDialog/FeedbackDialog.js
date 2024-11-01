import './FeedbackDialog.css';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material'

// import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router

function FeedbackDialog({ onClose, message, showActions, onConfirm }) {
    return(
        <Dialog open fullWidth onClose={onClose}>
            <DialogContent className='box-dialog'>
                <Typography color="#F5F5F5"variant="body1" style={{ paddingBottom: showActions ? 0 : '20px' }}>
                    {message}
                </Typography>
            </DialogContent>
            {showActions && (
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={onConfirm} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}

export default FeedbackDialog;
