// Importación de React, componentes y hooks
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '../../videosSlice';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Componente principal DeleteVideoIcon
function DeleteVideoIcon({ categoryId, videoId, title }) {
    // Hook de Redux para despachar acciones
    const dispatch = useDispatch()

    // Hooks del contexto de feedback para abrir y cerrar diálogos
    const { openFeedback } = useFeedback()

    // Maneja el clic en el icono de eliminar para abrir el cuadro de diálogo
    const handleDeleteClick = () => {
        openFeedback("ConfirmationFeedbackDialog", {
            message: `¿Quieres eliminar el video "${title}"?`,// Mensaje de confirmación
            onConfirm: () => {
                handleVideoDelete(categoryId, videoId) // Ejecuta la lógica de eliminación
            }
        })
    };

    // Maneja la lógica de eliminación del video
    const handleVideoDelete = (categoryId, videoId) => {
        dispatch(deleteVideo({ categoryId, videoId })) // Llama a la acción de Redux
        .unwrap() 
        .then(() => {
            openFeedback("InformativeFeedbackDialog", { // Muestra un cuadro de diálogo de éxito
                message: "Video eliminado exitosamente!",
            })
        })
        .catch(() => {
            openFeedback("InformativeFeedbackDialog", { // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
                message: "Video NO eliminado!",
            })
        })
    };  

    return (
        <>
            {/* Icono de eliminar que activa la función handleDeleteClick al hacer clic */}
            <DeleteForeverIcon className='icon' onClick={handleDeleteClick} />
        </>
    );
}

// Exporta el componente DeleteVideoIcon para su uso en otras partes de la aplicación
export default DeleteVideoIcon;