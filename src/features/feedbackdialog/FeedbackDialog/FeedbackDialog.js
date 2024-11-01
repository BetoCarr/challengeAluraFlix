import './FeedbackDialog.css';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material'
// import { Dialog, Stack, Typography } from '@mui/material';

// import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router
// // import { useFeedback } from '../feedBackDialogContext';
function FeedbackDialog({ onClose, message, showActions }) {

//     const navigate = useNavigate(); // Hook para navegar entre rutas


//     const handleConfirm = () => {
//         if (actionType === 'delete' && onConfirm) {
//             onConfirm();
//         } else if (actionType === 'edit') {
//             navigate(`/editar-categoria/${categoryId}`, { replace: true });
//         } else if (actionType === 'addvideo') {
//             navigate(`/agregar-video/${categoryId}`, { replace: true });
//         }
//         closeDialog();
//     };

//     return (
//         <Dialog open={isOpen} onClose={closeDialog}>
//             <DialogContent className='box-dialog'>
//                 <Typography variant="body1" style={{ paddingBottom: showActions ? 0 : '20px' }}>
//                     {message}
//                 </Typography>
//             </DialogContent>
//             {showActions && (
//                 <DialogActions>
//                     <Button onClick={onCancel || closeDialog} color="primary">
//                         {cancelLabel || 'Cancelar'}
//                     </Button>
//                     <Button onClick={handleConfirm} color="primary">
//                         {confirmLabel || 'Aceptar'}
//                     </Button>
//                 </DialogActions>
//             )}
//         </Dialog>
//     );
    return(
        <Dialog open fullWidth onClose={onClose}>
            <DialogContent className='box-dialog'>
                <Typography variant="body1" style={{ paddingBottom: showActions ? 0 : '20px' }}>
                    {message}
                </Typography>
            </DialogContent>
            {showActions && (
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        {'Cancelar'}
                    </Button>
                    <Button color="primary">
                        {'Aceptar'}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}

export default FeedbackDialog;
