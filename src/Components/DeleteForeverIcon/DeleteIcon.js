import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { eliminarVideo } from '../../api/api';

function DeleteVideoButton({ categoryId, videoId, title, onVideoDeleted }) {

    // Estado para gestionar la información del cuadro de diálogo de retroalimentación
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });
    
    const handleDialogClose = () => {
        setFeedback({ isOpen: false });
    };
    // Maneja el clic en el icono de eliminar para abrir el cuadro de diálogo
    const handleDeleteClick = () => {
        // Configura el cuadro de diálogo con el mensaje y la función de confirmación
        setFeedback({
            isOpen: true,
            message: `¿Estás seguro de eliminar permanentemente el video "${title}"?`,
            onCancel: handleDialogClose,
            onConfirm: handleVideoDelete,
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        });    
    };
    // Maneja la lógica de eliminación del video
    const handleVideoDelete = () => {
        eliminarVideo(categoryId, videoId)
            .then((responseData) => {
                console.log("¡Video eliminado exitosamente!", responseData);
                // Configura el cuadro de diálogo de retroalimentación con un mensaje de éxito y una función de confirmación
                setFeedback({
                    isOpen: true,
                    message: "¡Video eliminado exitosamente! La página se recargará para actualizar el contenido.",
                    onConfirm: () => {
                        onVideoDeleted(); // Llamamos a la función proporcionada por el componente padre para actualizar el contenido
                        setFeedback({ isOpen: false }); // Cierra el cuadro de diálogo
                    }
                });
            })
            .catch((error) => {
                console.error("Error al eliminar el video:", error);
                // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
                setFeedback({
                    isOpen: true,
                    message: `Video NO eliminado. Error: ${error}`,
                    onConfirm: () => setFeedback({ isOpen: false })
                });
            })
    };  

    return (
        <>
            {/* Icono de eliminar que activa la función handleDeleteClick al hacer clic */}
            <DeleteForeverIcon className='icon' onClick={handleDeleteClick} />
            {/* Componente de cuadro de diálogo de retroalimentación */}
            <FeedbackDialog
                isOpen={feedback.isOpen}
                onClose={() => setFeedback({ isOpen: false })}
                message={feedback.message}
                onCancel={feedback.onCancel}
                onConfirm={feedback.onConfirm}
                cancelLabel={feedback.cancelLabel}
                confirmLabel="Aceptar"
            />
        </>

    );
}

export default DeleteVideoButton;