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
            onCancel: handleEditDialogClose, // Maneja el cierre del diálogo de confirmación
            onConfirm: () => handleEditFormOpen(), // Abre el formulario de edición al confirmar
            cancelLabel: 'Cancelar',
            confirmLabel: 'Aceptar',
        });
    };

    // Funcion para cerrar cuadro de dialogo de confirmación de eliminación de la categoria
    const handleEditDialogClose = () => {
        setFeedback({ isOpen: false }); // Cierra el diálogo de confirmación
    }

    // // Función para manejar la operación de edición en el backend
    // const handleEditOperation = async (editedCategory) => {
    //     try {
    //         // Realizar la solicitud al backend con la categoría editada
    //         // await yourBackendEditCategoryFunction(categoryId, editedCategory);
    //         // Cerrar el formulario de edición después de completar la operación
    //         handleEditClose();
    //     } catch (error) {
    //         console.error('Error al editar la categoría:', error);
    //         // Manejar el error si ocurre
    //         // Puedes mostrar un mensaje de error al usuario si lo deseas
    //     }
    // };

    // Función para abrir el formulario de edición
    const handleEditFormOpen = () => {
        setShowEditForm(true);
        handleEditDialogClose(); // Cierra el cuadro de diálogo después de abrir el formulario
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
                isOpen={feedback.isOpen}
                message={feedback.message}
                onConfirm={feedback.onConfirm}
                confirmLabel={feedback.confirmLabel}            
            />
            {/* Renderiza el formulario de edición condicionalmente */}
            {showEditForm && (
                <FormEditarCategoria
                    initialValuesForEdit={initialValuesForEdit}
                    handleClose={handleEditFormClose}
                    // Pasa handleEditOperation como prop al formulario de edición
                    // handleEditOperation={handleEditOperation}
                />
            )}
        </>
    );
}

export default EditCategroyMenuItem;