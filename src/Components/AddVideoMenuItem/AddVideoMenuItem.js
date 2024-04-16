// Importación de React y componentes
import React, { useState }  from 'react';
import FormNuevoVideo from '../FormNuevoVideo/FormNuevoVideo';
import ConfirmationDialogWithForm from '../ConfirmationDialogWithForm/ConfirmationDialogWithForm';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles'; 

// Componente para agregar un nuevo video a una categoría específica
function AddVideoMenuItem ({ categoryId, categoryName, handleClose }) {

    // Estado para controlar la apertura del formulario de nueva categoria
    const [isOpen, setIsOpen] = useState(false);

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Función para abrir el diálogo de confirmación al hacer clic en el menú
    const handleAddVideoConfirmationDialogOpen = () => {
        setIsOpen(true);
    };

    // Función para confirmar la acción de agregar video
    const handleConfirmation = () => {
        setIsOpen(false); // Cierra el diálogo de confirmación
    };

    // Función para cancelar la acción de agregar video
    const handleCancel = () => {
        setIsOpen(false); // Cierra el diálogo de confirmación
        handleClose(); // Cierra el menú
    };

    return(
        <>
            {/* Componente que muestra el ícono para agregar un video a categoria y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleAddVideoConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <AddCircleIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }}/>
                Agregar
                <br />
                video
            </MenuItem>
            {/* Diálogo de confirmación para agregar un nuevo video */}
            <ConfirmationDialogWithForm
                isOpen={isOpen}
                onClose={handleCancel}
                message={`¿Quieres agregar video a la categoría '${categoryName}'?`}
                onConfirm={handleConfirmation}
                confirmLabel="Aceptar"
                onCancel={handleCancel}
                cancelLabel="Cancelar"
                formComponent={(handleFormClose) => (
                    <FormNuevoVideo 
                        handleClose={handleFormClose}
                        setShowFormNewVideo={setIsOpen} 
                        categoryId={categoryId}
                        categoryName={categoryName}
                    />
                )}
            />
        </>
    );
}

// Exporta componente AddVideoMenuItem
export default AddVideoMenuItem;