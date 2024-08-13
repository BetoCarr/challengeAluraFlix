// Importación de React y componentes
import React, { useState }  from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
import FeedbackDialog from '../../../feedbackdialog/FeedbackDialog/FeedbackDialog';
import { showFeedbackToUser } from '../../../feedbackdialog/feedbackActions'
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteCategory } from '../../videoCategoriesSlice';
import { useTheme } from '@mui/material/styles'; 

function DeleteCategoryMenuItem({ categoryId, handleClose }) {
    // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });

    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre, videos } = category
    
    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    const dispatch = useDispatch();

    // Verifica si hay videos en la categoría accediendo directamente desde Redux
    const checkIfVideosExistForCategory = () => {
        return videos && videos.length > 0;
    };

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleDeleteConfirmationDialogOpen = () => {
        dispatch(showFeedbackToUser({
            message: `¿Quieres eliminar la categoría '${nombre}'?`, // Mensaje de confirmación con el nombre de la categoría
            onCancel: handleDeleteDialogClose(handleClose), // Maneja el cierre del diálogo de confirmación
            onConfirm: handleDeleteCategory, // Maneja la eliminación de la categoría
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        }));
    }

    // Funcion para cerrar cuadro de dialogo de confirmación de eliminación de la categoria
    const handleDeleteDialogClose = (handleClose) => {
        handleClose(); // Cierra el menú
        setFeedback({ isOpen: false }); // Cierra el diálogo de confirmación
    }

    // Función que maneja la confirmación de eliminación de la categoría
    const handleDeleteCategory = () => {
        // Verificar si hay videos asociados a la categoría
        const hayVideosAsociados = checkIfVideosExistForCategory();
        // Si hay videos asociados, mostrar un mensaje de error en el feedback
        if (hayVideosAsociados) {
            setFeedback({
                isOpen: true,
                message: 'No se puede eliminar la categoría porque hay videos asociados.', // Mensaje de error si hay videos asociados
                onConfirm: () => {
                    handleClose(); // Cierra el menú
                    setFeedback({ isOpen: false }) // Cierra el diálogo de confirmación
                },
                confirmLabel: 'Aceptar',
            });
        } else {
            dispatch(deleteCategory(categoryId))
        }  
    };

    return (
        <>
            {/* Componente que muestra el ícono y el mensaje de eliminación y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleDeleteConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Eliminar
            </MenuItem>
            <Divider />
            {/* Cuadro de diálogo de confirmación de eliminación */}
            <FeedbackDialog
                onClose={handleClose} 
                isOpen={feedback.isOpen}
                message={feedback.message}
                onConfirm={feedback.onConfirm}
                confirmLabel={feedback.confirmLabel}
                onCancel={feedback.onCancel} 
                cancelLabel={feedback.cancelLabel}          
            />
        </>
    );
}

// Exporta el componente DeleteCategoryMenuItem para su uso en otras partes de la aplicación
export default DeleteCategoryMenuItem;