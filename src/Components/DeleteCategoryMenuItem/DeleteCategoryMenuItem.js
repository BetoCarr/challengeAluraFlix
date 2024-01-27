// Importación de React y componentes
import React, { useState }  from 'react';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { useTheme } from '@mui/material/styles';
import { eliminarCategoria } from '../../api/api';

function DeleteCategoryMenuItem({ categoryId, categoryName, handleClose }) {
    // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Función auxuliar para recargar la página
    const handleReloadPage = () => {
        window.location.reload();
    }

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
    const handleDeleteCategory = () => {
        eliminarCategoria(categoryId) // Llama directamente a la función de la API
        .then((responseData) => {
            console.log("¡Categoria eliminada exitosamente!", responseData);
            // Configura el cuadro de diálogo de retroalimentación con un mensaje de éxito y una función de confirmación
            setFeedback({
                isOpen: true,
                message: "Categoría eliminada exitosamente! Haz clic en Aceptar para recargar la página.",
                onConfirm: handleReloadPage,
                confirmLabel: 'Aceptar',
            });
        })
        .catch((error) => {
            console.error("Error al eliminar la categoria:", error);
            // Configura el cuadro de diálogo de retroalimentación con un mensaje de error y una función de confirmación
            setFeedback({
                isOpen: true,
                message: `Categoría NO eliminada. Error: ${error}`,
                onConfirm: () => setFeedback({ isOpen: false }),
                confirmLabel: 'Aceptar',
            });
        })
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