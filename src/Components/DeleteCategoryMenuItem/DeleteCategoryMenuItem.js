// Importación de React y componentes
import React, { useState }  from 'react';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import ManageCategoryMenuItem from '../ManageCategoryMenuItem/ManageCategoryMenuItem';
import { handleCloseDialog } from '../ManageCategoryMenuItem/ManageCategoryMenuItem';
import { obtenerListaVideos, eliminarCategoria } from '../../api/api';

function DeleteCategoryMenuItem({ categoryId, categoryName, handleClose }) {
    // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });

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

    // Función para cerrar cuadro de dialogo de confirmación de eliminación de la categoría
    const handleCloseDeleteDialog = () => {
        handleCloseDialog(handleClose, setFeedback);
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
                    onConfirm: () => {
                        // Cerrar el primer FeedbackDialog
                        handleCloseDeleteDialog();
                        // Cerrar el segundo FeedbackDialog
                        setFeedback({ isOpen: false })
                    },
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
            {/* Componente que muestra el ícono y el mensaje de eliminación y maneja la operación en el backend */}
            <ManageCategoryMenuItem 
                operation="Eliminar"
                categoryId={categoryId}
                categoryName={categoryName}
                handleClose={handleClose}
                handleBackendOperation={handleDeleteCategory}
            />
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