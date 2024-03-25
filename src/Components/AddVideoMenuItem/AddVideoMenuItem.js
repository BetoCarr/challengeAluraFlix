// Importación de React y componentes
import React, { useState }  from 'react';
import FormNuevoVideo from '../FormNuevoVideo/FormNuevoVideo';
import ConfirmationDialogWithForm from '../ConfirmationDialogWithForm/ConfirmationDialogWithForm';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles'; 

function AddVideoMenuItem ({ categoryId, categoryName, handleClose }) {

    const [isOpen, setIsOpen] = useState(false);

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    const handleAddVideoConfirmationDialogOpen = () => {
        setIsOpen(true);
    };

    const handleConfirmation = () => {
        setIsOpen(false); // Cierra el diálogo de confirmación
    };

    const handleCancel = () => {
        setIsOpen(false); // Cierra el diálogo de confirmación
        handleClose(); // Cierra el menú
    };

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
            <ConfirmationDialogWithForm
                isOpen={isOpen}
                onClose={handleCancel}
                message={`¿Quieres agregar video a la categoría '${categoryName}'?`}
                onConfirm={handleConfirmation}
                confirmLabel="Aceptar"
                onCancel={handleCancel}
                cancelLabel="Cancelar"
                formComponent={(handleFormClose) => (
                    <FormNuevoVideo handleClose={handleFormClose} setShowFormNewVideo={setIsOpen} />
                )}
            />
        </>
    );
}


export default AddVideoMenuItem;