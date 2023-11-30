import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { eliminarVideo } from '../../api/api';

function DeleteVideoButton({ categoryId, videoId, title, onVideoDeleted }) {

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleVideoDelete = () => {
        eliminarVideo(categoryId, videoId)
            .then((responseData) => {
                console.log("¡Video eliminado exitosamente!", responseData);
                const confirmMessage = "¡Video eliminado exitosamente! La página se recargará para actualizar el contenido.";
                if (window.confirm(confirmMessage)) {
                    onVideoDeleted(); // Llamamos a la función proporcionada por el componente padre
                    setDialogOpen(false);
                }
            })
            .catch((error) => {
                console.error("Error al eliminar el video:", error);
                alert("Video NO eliminado. Error: " + error);
            })
            .finally(() => {
                // Esto se ejecutará independientemente de si la solicitud fue exitosa o no
                // Puedes realizar acciones adicionales aquí, como restablecer formularios o estados
                // setSubmitting(false); // Por ejemplo, puedes restablecer el estado de submitting
                setDialogOpen(false);
            });
    };  

    return (
        <>
            <DeleteForeverIcon className='icon' onClick={handleDeleteClick} />
            <ConfirmationDialog
                isOpen={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleVideoDelete}
                videoTitle={title}
            />
        </>

    );
}

export default DeleteVideoButton;