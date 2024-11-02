// Importación de React y componentes
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '../../videosSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';

function DeleteVideoIcon({ categoryId, videoId, title, onVideoDeleted }) {

    const dispatch = useDispatch()

    const { openFeedback, closeFeedback } = useFeedback()
    // console.log(categoryId, videoId)

    // Maneja el clic en el icono de eliminar para abrir el cuadro de diálogo
    const handleDeleteClick = () => {
        openFeedback("FeedbackDialog", {
            message: "Quieres eliminar el video?",
            showActions: true,
            onConfirm: () => {
                closeFeedback()
                handleVideoDelete(categoryId, videoId)
            }
        })
    };

    // Maneja la lógica de eliminación del video
    const handleVideoDelete = (categoryId, videoId) => {
        console.log("Llamando a dispatch eliminar video")   
        console.log(categoryId, videoId)
        dispatch(deleteVideo({ categoryId, videoId }))
            .then((response) => {
                console.log("¡Video eliminado exitosamente!", response);
                openFeedback("FeedbackDialog", {
                    message: "Video eliminado exitosamente!",
                })
            })
            .catch((error) => {
                console.error("Error al eliminar el video:", error);
                // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
                openFeedback("FeedbackDialog", {
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