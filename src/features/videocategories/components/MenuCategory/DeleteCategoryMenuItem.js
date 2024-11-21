// Importación de React y componentes
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryById, deleteCategory } from '../../videoCategoriesSlice';
import { selectVideosByCategory } from '../../../videos/videosSlice';
import { useTheme } from '@mui/material/styles'; 
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


// Componente funcional para manejar la eliminación de una categoría
function DeleteCategoryMenuItem({ categoryId, handleClose }) {
    // Hook para obtener dispatch de Redux
    const dispatch = useDispatch();

    // Selector para obtener la información de la categoría desde Redux
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre } = category

    // Hooks del contexto de feedback para abrir y cerrar el diálogo
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
        // Si hay videos, muestra el mensaje de error
        if (hayVideosAsociados) {
            openFeedback("FeedbackDialog", {
                message: `No se puede eliminar la categoria "${nombre}" por que tiene videos asociados`,
            })
        } else { // Si no hay videos asociados, muestra mensaje de confirmación
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
        dispatch(deleteCategory(categoryId)) // Despacha la acción para eliminar una categoría utilizando su ID
        .unwrap() // Desempaqueta la promesa para acceder a los datos o manejar errores
        .then(() => {   // Si la eliminación es exitosa,
            openFeedback("FeedbackDialog", { // Muestra un cuadro de diálogo de retroalimentación con un mensaje de éxito
                message: "Categoria eliminada exitosamente!",
            })
            setTimeout(() => { // Configura un temporizador para cerrar el cuadro de diálogo después de 3 segundos
                closeFeedback();
            }, 3000);              
        })
        .catch(() => { // Configura el cuadro de diálogo de retroalimentación con un mensaje de error 
            openFeedback("FeedbackDialog", {
                message: "Categoria NO eliminada!",
            })
            setTimeout(() => {  // Configura un temporizador para cerrar el cuadro de diálogo después de 3 segundos
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