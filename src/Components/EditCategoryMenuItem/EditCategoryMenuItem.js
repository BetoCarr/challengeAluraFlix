// Importación de React y componentes
import React, { useState }  from 'react';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ConfirmationDialogWithForm from '../ConfirmationDialogWithForm/ConfirmationDialogWithForm';
import FormEditarCategoria from '../FormEditarCategoria/FormEditarCategoria';
import { useTheme } from '@mui/material/styles'; 

function EditCategroyMenuItem({ categoryId, categoryName, categoryColor, isBanner, handleClose }) {

    const [isOpen, setIsOpen] = useState(false);

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    const handleConfirmation = () => {
        setIsOpen(false); // Cierra el diálogo de confirmación
    };

    // Función para abrir el formulario de edición
    const handleEditFormOpen = () => {
        setIsOpen(true);
    };

    const handleCancel = () => {
        setIsOpen(false); // Cierra el diálogo de confirmación
        handleClose(); // Cierra el menú
    };

    
    return(
        <>
            {/* Componente que muestra el ícono y el mensaje de edicion y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleEditFormOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <EditIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Editar
            </MenuItem>
            <Divider />
            {/* Cuadro de diálogo de confirmación de eliminación */}
            <ConfirmationDialogWithForm
                isOpen={isOpen}
                onClose={handleCancel}
                message={`¿Quieres editar la categoría '${categoryName}'?`}
                onConfirm={handleConfirmation}
                confirmLabel="Aceptar"
                onCancel={handleCancel}
                cancelLabel="Cancelar"
                formComponent={(handleFormClose) => (
                    <FormEditarCategoria
                        initialValuesForEdit={{
                            nombre: categoryName,
                            color: categoryColor,
                            isBanner: isBanner
                        }}
                        handleClose={handleFormClose}
                        categoryId={categoryId}
                    />
                )}
            />
        </>
    );
}

export default EditCategroyMenuItem;