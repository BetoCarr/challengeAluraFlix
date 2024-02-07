// Importación de React y componentes
import React, { useState }  from 'react';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { obtenerListaVideos, eliminarCategoria } from '../../api/api';
import { useTheme } from '@mui/material/styles'; 

function DeleteCategoryMenuItem({ categoryId, categoryName, handleClose }) {
    // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });
    
    // Variable para acceder a ThemeProvider
    const theme = useTheme();
    
    // Función auxuliar para recargar la página
    const handleReloadPage = () => {
        window.location.reload();
    }

    // Función principal para verificar si existen videos para una categoría
    const checkIfVideosExistForCategory = async(categoryId) => {
        // Obtener la lista de videos asociados a la categoría
        try {
            // Obtener la lista de videos asociados a la categoría
            const videos = await obtenerListaVideos(categoryId);
            // Verificar si hay videos
            const videosExist = videos.length > 0;
            return videosExist;
        } catch (error) {
            console.error('Error al verificar si existen videos para la categoría:', error);
            // Manejar el error según sea necesario
            throw error; // Puedes lanzar el error para que sea manejado por el código que llama a esta función
        }
    };

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleDeleteConfirmationDialogOpen = () => {
        setFeedback({
            isOpen: true,
            message: `¿Quieres eliminar la categoría '${categoryName}'?`, // Mensaje de confirmación con el nombre de la categoría
            onCancel: handleDeleteDialogClose, // Maneja el cierre del diálogo de confirmación
            onConfirm: handleDeleteCategory, // Maneja la eliminación de la categoría
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        });
    };

    // Funcion para cerrar cuadro de dialogo de confirmación de eliminación de la categoria
    const handleDeleteDialogClose = (handleClose) => {
        handleClose(); // Cierra el menú
        setFeedback({ isOpen: false }); // Cierra el diálogo de confirmación
    }

    // Función que maneja la confirmación de eliminación de la categoría
    const handleDeleteCategory = async () => {
        try {
            // Verificar si hay videos asociados a la categoría
            const hayVideosAsociados = await checkIfVideosExistForCategory(categoryId);
            // Si hay videos asociados, mostrar un mensaje de error en el feedback
            if (hayVideosAsociados) {
                setFeedback({
                    isOpen: true,
                    message: 'No se puede eliminar la categoría porque hay videos asociados.', // Mensaje de error si hay videos asociados
                    onConfirm: () => {
                        handleClose(); // Cierra el menú
                        setFeedback({ isOpen: false }) // Cierra el diálogo de confirmación
                    },
                    confirmLabel: 'Aceptar',
                });
            } else {
                // No hay videos asociados, proceder con la eliminación
                const responseData = await eliminarCategoria(categoryId);
                // Mostrar mensaje de éxito en el feedback y configurar la recarga de la página al confirmar
                console.log('¡Categoría eliminada exitosamente!', responseData);
                setFeedback({
                    isOpen: true,
                    message: 'Categoría eliminada exitosamente! Haz clic en Aceptar para recargar la página.', // Mensaje de éxito después de la eliminación
                    onConfirm: handleReloadPage,
                    confirmLabel: 'Aceptar',
                });
            }
        } catch (error) {
            // Manejar errores durante la verificación de videos
            console.error('Error al verificar si existen videos para la categoría:', error);
            // Mostrar mensaje de error en el feedback y cerrar el feedback al confirmar
            setFeedback({
                isOpen: true,
                message: `Error al verificar si existen videos para la categoría. Detalles: ${error}`, // Mensaje de error detallado
                onConfirm: () => setFeedback({ isOpen: false }), // Abre el diálogo de confirmación al hacer clic en el menú
                confirmLabel: 'Aceptar',
            });
        }
    };

    return (
        <>
            {/* Componente que muestra el ícono y el mensaje de eliminación y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                categoryId={categoryId}
                categoryName={categoryName}
                onClick={handleDeleteConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Eliminar
            </MenuItem>
            <Divider />
            {/* Cuadro de diálogo de confirmación de eliminación */}
            <FeedbackDialog
                isOpen={feedback.isOpen}
                message={feedback.message}
                onConfirm={feedback.onConfirm}
                confirmLabel={feedback.confirmLabel}            
            />
        </>
    );
}

// Exporta el componente DeleteCategoryMenuItem para su uso en otras partes de la aplicación
export default DeleteCategoryMenuItem;