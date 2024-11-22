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
    const { openFeedback, closeFeedback } = useFeedback()

    // Maneja el clic en el icono de eliminar para abrir el cuadro de diálogo
    const handleDeleteClick = () => {
        openFeedback("FeedbackDialog", {
            message: `¿Quieres eliminar el video "${title}"?`,// Mensaje de confirmación
            showActions: true, // Habilita los botones de confirmar y cancelar
            onConfirm: () => {
                closeFeedback() // Cierra el cuadro de diálogo
                handleVideoDelete(categoryId, videoId) // Ejecuta la lógica de eliminación
            }
        })
    };

    // Maneja la lógica de eliminación del video
    const handleVideoDelete = (categoryId, videoId) => {
        dispatch(deleteVideo({ categoryId, videoId })) // Llama a la acción de Redux
            .then((response) => {
                console.log("¡Video eliminado exitosamente!", response);
                openFeedback("FeedbackDialog", { // Muestra un cuadro de diálogo de éxito
                    message: "Video eliminado exitosamente!",
                })
                setTimeout(() => { // Cierra el diálogo después de 3 segundos
                    closeFeedback();
                }, 3000);
            })
            .catch((error) => {
                console.error("Error al eliminar el video:", error);
                openFeedback("FeedbackDialog", { // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
                    message: "Video NO eliminado!",
                })
                setTimeout(() => { // Cierra el diálogo después de 3 segundos
                    closeFeedback();
                }, 3000);
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