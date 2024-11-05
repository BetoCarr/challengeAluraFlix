// Importación de React y componentes
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '../../videosSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';

function DeleteVideoIcon({ categoryId, videoId, title }) {

    const dispatch = useDispatch()

    const { openFeedback, closeFeedback } = useFeedback()

    // Maneja el clic en el icono de eliminar para abrir el cuadro de diálogo
    const handleDeleteClick = () => {
        openFeedback("FeedbackDialog", {
            message: `¿Quieres eliminar el video "${title}"?`,
            showActions: true,
            onConfirm: () => {
                closeFeedback()
                handleVideoDelete(categoryId, videoId)
            }
        })
    };

    // Maneja la lógica de eliminación del video
    const handleVideoDelete = (categoryId, videoId) => {
        dispatch(deleteVideo({ categoryId, videoId }))
            .then((response) => {
                console.log("¡Video eliminado exitosamente!", response);
                openFeedback("FeedbackDialog", {
                    message: "Video eliminado exitosamente!",
                })
                setTimeout(() => {
                    closeFeedback();
                }, 3000);
            })
            .catch((error) => {
                console.error("Error al eliminar el video:", error);
                // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
                openFeedback("FeedbackDialog", {
                    message: "Video NO eliminado!",
                })
                setTimeout(() => {
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