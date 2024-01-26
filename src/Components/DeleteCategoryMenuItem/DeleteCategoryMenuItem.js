import React, { useState }  from 'react';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { useTheme } from '@mui/material/styles';
import { eliminarCategoria } from '../../api/api';

function DeleteCategoryMenuItem({ categoryId, categoryName }) {

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
    };

    // Función que maneja la confirmación de eliminación de la categoría
    const handleDeleteCategory = () => {
        eliminarCategoria(categoryId); // Llama directamente a la función de la API
        handleCloseDeleteDialog(); // Cierra el cuadro de diálogo después de la confirmación
    };

    return (
        <>
            <MenuItem className='menu-item' onClick={handleOpendeleteDialog}>
                <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: "23px" }} />
                Eliminar
            </MenuItem>
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

export default DeleteCategoryMenuItem;