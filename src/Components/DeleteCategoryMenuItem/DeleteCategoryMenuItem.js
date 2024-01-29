// Importación de React y componentes
import React, { useState }  from 'react';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { useTheme } from '@mui/material/styles';
import { obtenerListaVideos, eliminarCategoria } from '../../api/api';

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
            console.error("Error al verificar si existen videos para la categoría:", error);
            // Manejar el error según sea necesario
            throw error; // Puedes lanzar el error para que sea manejado por el código que llama a esta función
        }
    };

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleOpendeleteDialog = () => {
        setFeedback({
            isOpen: true,
            message: `¿Estás seguro de eliminar permanentemente la categoria "${categoryName}"?`,
            onCancel: handleCloseDeleteDialog,
            onConfirm: handleDeleteCategory,
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        });
    };

    // Función para cerrar cuadro de dialogo de confirmación de eliminación de la categoría
    const handleCloseDeleteDialog = () => {
        handleClose(); // Llama a la función de cierre de menu proporcionada como prop
        setFeedback({ isOpen: false });
    };

    // Función que maneja la confirmación de eliminación de la categoría
    const handleDeleteCategory = async () => {
        try {
            // Verificar si hay videos asociados a la categoría
            const hayVideosAsociados = await checkIfVideosExistForCategory(categoryId);

            // Si hay videos asociados, mostrar un mensaje de error en el feedback
            if (hayVideosAsociados) {
                setFeedback({
                    isOpen: true,
                    message: "No se puede eliminar la categoría porque hay videos asociados.",
                    onConfirm: () => setFeedback({ isOpen: false }),
                    confirmLabel: 'Aceptar',
                });
            } else {
                // No hay videos asociados, proceder con la eliminación
                const responseData = await eliminarCategoria(categoryId);

                // Mostrar mensaje de éxito en el feedback y configurar la recarga de la página al confirmar
                console.log("¡Categoría eliminada exitosamente!", responseData);
                setFeedback({
                    isOpen: true,
                    message: "Categoría eliminada exitosamente! Haz clic en Aceptar para recargar la página.",
                    onConfirm: handleReloadPage,
                    confirmLabel: 'Aceptar',
                });
            }
        } catch (error) {
            // Manejar errores durante la verificación de videos
            console.error("Error al verificar si existen videos para la categoría:", error);
            
            // Mostrar mensaje de error en el feedback y cerrar el feedback al confirmar
            setFeedback({
                isOpen: true,
                message: `Error al verificar si existen videos para la categoría. Detalles: ${error}`,
                onConfirm: () => setFeedback({ isOpen: false }),
                confirmLabel: 'Aceptar',
            });
        }
    };

    return (
        <>
            {/* Elemento de menú para iniciar el cuadro de diálogo */}
            <MenuItem className='menu-item' onClick={handleOpendeleteDialog}>
                <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: "23px" }} />
                Eliminar
            </MenuItem>
            {/* Cuadro de diálogo de confirmación de eliminación */}
            <FeedbackDialog
                isOpen={feedback.isOpen}
                onClose={handleCloseDeleteDialog}
                message={feedback.message}
                onCancel={handleCloseDeleteDialog}
                onConfirm={feedback.onConfirm}
                confirmLabel={feedback.confirmLabel}            />
        </>
    );
}

// Exporta el componente DeleteCategoryMenuItem para su uso en otras partes de la aplicación
export default DeleteCategoryMenuItem;