// Importación de React y componentes
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '../../videosSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';

function DeleteVideoIcon({ categoryId, videoId, title, onVideoDeleted }) {

    const { openFeedback, closeFeedback } = useFeedback()
    // console .log({ feedback, openFeedback })

    // Maneja el clic en el icono de eliminar para abrir el cuadro de diálogo
    const handleDeleteClick = () => {
        openFeedback("FeedbackDialog", {
            message: "Quieres eliminar el video?",
            showActions: true,
            onConfirm: () => {
                closeFeedback()
                handleVideoDelete()
            }
        })
    };

    // Maneja la lógica de eliminación del video
    const handleVideoDelete = () => {
        console.log("Llamando a dispatch eliminar video")
        // eliminarVideo(categoryId, videoId)
        //     .then((responseData) => {
        //         console.log("¡Video eliminado exitosamente!", responseData);
        //         // Configura el cuadro de diálogo de retroalimentación con un mensaje de éxito y una función de confirmación
        //         setFeedback({
        //             isOpen: true,
        //             message: "¡Video eliminado exitosamente! La página se recargará para actualizar el contenido.",
        //             onConfirm: () => {
        //                 onVideoDeleted(); // Llamamos a la función proporcionada por el componente padre para actualizar el contenido
        //                 setFeedback({ isOpen: false }); // Cierra el cuadro de diálogo
        //             }
        //         });
        //     })
        //     .catch((error) => {
        //         console.error("Error al eliminar el video:", error);
        //         // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
        //         setFeedback({
        //             isOpen: true,
        //             message: `Video NO eliminado. Error: ${error}`,
        //             onConfirm: () => setFeedback({ isOpen: false })
        //         });
        //     })
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