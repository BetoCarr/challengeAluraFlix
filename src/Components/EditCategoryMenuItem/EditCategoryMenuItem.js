// Importación de React y componentes
import React, { useState }  from 'react';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import FormEditarCategoria from '../FormEditarCategoria/FormEditarCategoria';
import { useTheme } from '@mui/material/styles'; 

function EditCategroyMenuItem({ categoryId, categoryName, categoryColor, isBanner, handleClose }) {

    // Estado para controlar la apertura y cierre del cuadro de diálogo de edición
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });

    // Estado para controlar la visibilidad del formulario de edición
    const [showEditForm, setShowEditForm] = useState(false);  

    // Variable para acceder a ThemeProvider
    const theme = useTheme();
    
    // Objeto que contiene los valores iniciales para el formulario de edición de categoría
    const initialValuesForEdit = {
        nombre: categoryName,
        color: categoryColor,
        isBanner: isBanner
    }

    // Función para manejar la confirmación de edición de la categoría
    const handleEditConfirmationDialogOpen = () => {
        setFeedback({
            isOpen: true,
            message: `¿Quieres editar la categoría '${categoryName}'?`, // Mensaje de confirmacion de edicion con el nombre de la categoría
            onCancel: () => handleEditDialogClose(handleClose), // Maneja el cierre del diálogo de confirmación
            onConfirm: () => handleEditFormOpen(), // Abre el formulario de edición al confirmar
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        });
    };

    // Funcion para cerrar cuadro de dialogo de confirmación de eliminación de la categoria
    const handleEditDialogClose = (handleClose) => {
        handleClose();
        setFeedback({ isOpen: false }); // Cierra el diálogo de confirmación
    }

    // Función para abrir el formulario de edición
    const handleEditFormOpen = () => {
        setShowEditForm(true);
        setFeedback({ isOpen: false })
    };

    // Función para cerrar el formulario de edición
    const handleEditFormClose = () => {
        setShowEditForm(false);
    };
    
    return(
        <>
            {/* Componente que muestra el ícono y el mensaje de edicion y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                categoryId={categoryId}
                categoryName={categoryName}
                onClick={handleEditConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <EditIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Editar
            </MenuItem>
            {/* Cuadro de diálogo de confirmación de eliminación */}
            <FeedbackDialog
                onClose={handleClose}
                isOpen={feedback.isOpen}
                message={feedback.message}
                onConfirm={feedback.onConfirm}
                confirmLabel={feedback.confirmLabel}    
                onCancel={feedback.onCancel} 
        
            />
            {/* Renderiza el formulario de edición condicionalmente */}
            {showEditForm && (
                <FormEditarCategoria
                    initialValuesForEdit={initialValuesForEdit}
                    handleClose={handleEditFormClose}
                    setShowEditForm={setShowEditForm} // Pasar la función de actualización de estado
                />
            )}
        </>
    );
}

export default EditCategroyMenuItem;