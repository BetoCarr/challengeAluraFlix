// Importación de React y componentes
import React,  {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
import FeedbackDialog from '../../../feedbackdialog/FeedbackDialog/FeedbackDialog';
import { showMessageWithActions, closeFeedback} from '../../../feedbackdialog/feedbackActions'
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteCategory } from '../../videoCategoriesSlice';
import { useTheme } from '@mui/material/styles'; 

function DeleteCategoryMenuItem({ categoryId, handleClose }) {

    // const handleConfirm = useHandleConfirm();

    // const feedback = useSelector(state => state.feedback); // Asegúrate de seleccionar el estado adecuado
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre, videos } = category

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    const dispatch = useDispatch();

    // Verifica si hay videos en la categoría accediendo directamente desde Redux
    const checkIfVideosExistForCategory = () => {
        return videos && videos.length > 0;
    };



    // Funcion para cerrar cuadro de dialogo de confirmación de eliminación de la categoria
    const handleCancel = () => {
        handleClose(); // Cierra el menú
        dispatch(closeFeedback()) // Cierra el diálogo de confirmación
    }

    // // Función que maneja la confirmación de eliminación de la categoría
    // const handleConfirm = () => {
    //     // Verificar si hay videos asociados a la categoría
    //     const hayVideosAsociados = checkIfVideosExistForCategory();
    //     // Si hay videos asociados, mostrar un mensaje de error en el feedback
    //     if (hayVideosAsociados) {
    //         dispatch(showMessageWithActions({
    //             message: 'No se puede eliminar la categoría porque hay videos asociados.',
    //             confirmLabel: 'Aceptar',
    //         }));
    //     } else {
    //         dispatch(deleteCategory(categoryId))
    //     }  
    // };

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    // const handleDeleteConfirmationDialogOpen = () => {
    //     dispatch(showMessageWithActions({
    //         message: `¿Estás seguro de que quieres eliminar la categoria ${nombre} ?`,
    //         cancelLabel: 'Cancelar',
    //         confirmLabel: 'Aceptar',
    //         // onConfirm: handleConfirm,
    //         showActions: true, // Asegúrate de que haya acciones (Cancelar, Confirmar)
    //         actionType: 'delete', // Identifica la acción como eliminación
    //     }));
    // }

    // const onDelete = () => {
    //     handleConfirm('delete', categoryId);
    // };

    return (
        <>
            {/* Componente que muestra el ícono y el mensaje de eliminación y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                // onClick={handleDeleteConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Eliminar
            </MenuItem>
            <Divider />
            {/* Cuadro de diálogo de confirmación de eliminación */}
            {/* <FeedbackDialog
                isOpen={feedback.isOpen}
                onClose={handleCancel} 
                message={feedback.message}
                // onConfirm={onDelete}
                confirmLabel={feedback.confirmLabel}
                onCancel={handleCancel}
                cancelLabel={feedback.cancelLabel}  
                showActions={feedback.showActions} // Asegúrate de pasar el estado de showActions       
                actionType={feedback.actionType}        
            /> */}
        </>
    );
}

// Exporta el componente DeleteCategoryMenuItem para su uso en otras partes de la aplicación
export default DeleteCategoryMenuItem;