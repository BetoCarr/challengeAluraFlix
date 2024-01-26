// Importación de React y componentes
import React, { useState }  from 'react';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { useTheme } from '@mui/material/styles';
import { eliminarCategoria } from '../../api/api';

function DeleteCategoryMenuItem({ categoryId, categoryName, handleClose }) {
    // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleOpendeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    // Función para cerrar cuadro de dialogo de confirmación de eliminación de la categoría
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        handleClose(); // Llama a la función de cierre de menu proporcionada como prop
    };

    // Función que maneja la confirmación de eliminación de la categoría
    const handleDeleteCategory = () => {
        eliminarCategoria(categoryId); // Llama directamente a la función de la API
        handleCloseDeleteDialog(); // Cierra el cuadro de diálogo después de la confirmación
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
                isOpen={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                message={`¿Seguro que deseas eliminar la categoría "${categoryName}"?`}
                onCancel={handleCloseDeleteDialog}
                onConfirm={handleDeleteCategory}
            />
        </>
    );
}

// Exporta el componente DeleteCategoryMenuItem para su uso en otras partes de la aplicación
export default DeleteCategoryMenuItem;