// Importación de React y componentes
import React, { useState }  from 'react';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { useTheme } from '@mui/material/styles'; 

function ManageCategoryMenuItem({ categoryId, categoryName, handleClose, operation, handleBackendOperation }) {
    // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleOpenDialog = () => {
        setFeedback({
            isOpen: true,
            message: `¿Quieres ${operation.toLowerCase()} la categoría "${categoryName}"?`,
            onCancel: handleCloseDialog,
            onConfirm: handleOperation,
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        });
    };

    const handleCloseDialog = () => {
        handleClose();
        setFeedback({ isOpen: false });
    }

    const handleOperation = async () => {
        try {
            await handleBackendOperation(categoryId);
        } catch (error) {
            console.error(`Error al ${operation.toLowerCase()} la categoría:`, error);
            setFeedback({
                isOpen: true,
                message: `Error al ${operation.toLowerCase()} la categoría. Detalles: ${error}`,
                onConfirm: () => setFeedback({ isOpen: false }),
                confirmLabel: 'Aceptar',
            });
        }
    };

    // // Función para cerrar cuadro de dialogo de confirmación de eliminación de la categoría
    // const handleCloseDeleteDialog = () => {
    //     handleClose(); // Llama a la función de cierre de menu proporcionada como prop
    //     setFeedback({ isOpen: false });
    // };

    //Retorna componente principal
    return (
        <>
            <MenuItem className='menu-item' onClick={handleOpenDialog}>
                {operation === 'Eliminar' && <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: "23px" }} />}
                {operation === 'Editar' && <EditIcon style={{ fill: theme.palette.text.primary, fontSize: "23px" }} />}
                {operation}
            </MenuItem>
            <FeedbackDialog
                isOpen={feedback.isOpen}
                onClose={handleCloseDialog}
                message={feedback.message}
                onCancel={handleCloseDialog}
                onConfirm={feedback.onConfirm}
                confirmLabel={feedback.confirmLabel}
            />
            <Divider sx={{ my: 0.5 }} />
        </>
    )
}

export default ManageCategoryMenuItem;