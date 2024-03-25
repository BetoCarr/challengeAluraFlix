// Importación de React y componentes
import React, { useState }  from 'react';
import FormNuevoVideo from '../FormNuevoVideo/FormNuevoVideo';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles'; 

function AddVideoMenuItem ({ categoryId, categoryName, handleClose }) {

    // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });

    const [showFormNewVideo, setShowFormNewVideo] = useState(false); // Estado para controlar la visibilidad del formulario de edición

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

      // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleAddVideoConfirmationDialogOpen = () => {
        setFeedback({
            isOpen: true,
            message: `¿Quieres agregar video a la categoría '${categoryName}'?`, // Mensaje de confirmación con el nombre de la categoría
            onCancel: () => handleAddVideoDialogClose(handleClose), // Maneja el cierre del diálogo de confirmación
            onConfirm: handleFormOpen(), // Maneja la eliminación de la categoría
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        });
    };

    // Funcion para cerrar cuadro de dialogo de confirmación de eliminación de la categoria
    const handleAddVideoDialogClose = (handleClose) => {
        handleClose();
        setFeedback({ isOpen: false }); // Cierra el diálogo de confirmación
}
    // Función para abrir el formulario de edición
    const handleFormOpen = () => {
        setShowFormNewVideo(true);
        setFeedback({ isOpen: false })
    };

    // Función para cerrar el formulario de edición
    const handleFormClose = () => {
        setShowFormNewVideo(false);
    };

    // const handleAddVideo = () => {
    //     console.log( `¿Quieres agregar video a la categoría '${categoryName}' con el id ${categoryId}?`)
    // }

    return(
        <>
            {/* Componente que muestra el ícono y el mensaje de eliminación y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleAddVideoConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <AddCircleIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }}/>
                Agregar
                <br />
                video
            </MenuItem>
            <FeedbackDialog
                onClose={handleClose} // Maneja el cierre del cuadro de diálogo
                isOpen={feedback.isOpen}
                message={feedback.message}
                onConfirm={feedback.onConfirm}
                confirmLabel={feedback.confirmLabel}
                onCancel={feedback.onCancel} 
                cancelLabel={feedback.cancelLabel}          
            />
            {/* Renderiza el formulario de edición condicionalmente */}
            {showFormNewVideo && (
                <FormNuevoVideo
                    // initialValuesForEdit={initialValuesForEdit}
                    handleClose={handleFormClose}
                    setShowFormNewVideo={setShowFormNewVideo}                   
                    // categoryId={categoryId}
                />
            )}
        </>
    );
}


export default AddVideoMenuItem;