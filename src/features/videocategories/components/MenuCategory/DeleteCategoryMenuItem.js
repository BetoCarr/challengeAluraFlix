// Importación de React y componentes
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryById, deleteCategory } from '../../videoCategoriesSlice';
import { selectVideosByCategory } from '../../../videos/videosSlice';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTheme } from '@mui/material/styles'; 
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';

function DeleteCategoryMenuItem({ categoryId, handleClose }) {

    const dispatch = useDispatch();

    const category = useSelector(state => selectCategoryById(state, categoryId));

    const { nombre } = category
    const { openFeedback, closeFeedback } = useFeedback()

    // Selecciona todos los videos y filtra los de la categoría
    const categoryVideos = useSelector(state => selectVideosByCategory(state, category.id));

    // Verifica si hay videos en la categoría accediendo directamente desde Redux
    const checkIfVideosExistForCategory = () => {
        return categoryVideos && categoryVideos.length > 0;
    };

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleDeleteCategoryClick = () => {
        const hayVideosAsociados = checkIfVideosExistForCategory();
        console.log(hayVideosAsociados)
        if (hayVideosAsociados) {
            // Si hay videos, muestra el mensaje de error
            openFeedback("FeedbackDialog", {
                message: `No se puede eliminar la categoria "${nombre}" por que tiene videos asociados`,
            })
            
        } else {
            openFeedback("FeedbackDialog", {
                message: `¿Quieres eliminar la categoria "${nombre}"?`,
                showActions: true,
                onConfirm: () => {
                    closeFeedback()
                    handleConfirm()
                },
                onCancel: handleClose()
            })
        }
    };

    // Función para manejar la confirmación de eliminación
    const handleConfirm =  () => {
        dispatch(deleteCategory(categoryId))
        .unwrap()
        .then((response) => {
            console.log(response);
            openFeedback("FeedbackDialog", {
                message: "Categoria eliminada exitosamente!",
            })
            setTimeout(() => {
                closeFeedback();
            }, 3000);              
        
        })
        .catch((error) => {
            console.error("Error al eliminar el video:", error);
            // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
            openFeedback("FeedbackDialog", {
                message: "Categoria NO eliminada!",
            })
            setTimeout(() => {
                closeFeedback();
            }, 3000);
        });
    };

    return (
        <>
            {/* Componente que muestra el ícono y el mensaje de eliminación y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleDeleteCategoryClick} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Eliminar
            </MenuItem>
            <Divider />
        </>
    );
}

// Exporta el componente DeleteCategoryMenuItem para su uso en otras partes de la aplicación
export default DeleteCategoryMenuItem;