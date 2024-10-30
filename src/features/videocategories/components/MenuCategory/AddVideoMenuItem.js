// Importación de React y componentes
import React, { useState }  from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
// import FeedbackDialog from '../../../feedbackdialog/FeedbackDialog/FeedbackDialog';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles'; 

// Componente para agregar un nuevo video a una categoría específica
function AddVideoMenuItem ({ categoryId, handleClose }) {

    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre } = category

    // Estado para controlar la apertura del formulario de nueva categoria
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => setIsOpen(true);
    const handleCloseDialog = () => setIsOpen(false);

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Función para cancelar la acción de agregar video
    const onCancel = () => {
        handleCloseDialog()
        handleClose()
    }

    return(
        <>
            {/* Componente que muestra el ícono para agregar un video a categoria y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleOpenDialog} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <AddCircleIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }}/>
                Agregar
                <br />
                video
            </MenuItem>
            {/* Diálogo de confirmación para agregar un nuevo video */}
            {/* <FeedbackDialog
                isOpen={isOpen}
                onClose={handleCloseDialog}
                message={`¿Quieres agregar videos a la categoría ${nombre}?`}
                cancelLabel = 'Cancelar'
                onCancel={onCancel}
                confirmLabel = 'Aceptar'
                actionType='addvideo'
                showActions={true}
                categoryId={categoryId}
            /> */}
        </>
    );
}

// Exporta componente AddVideoMenuItem
export default AddVideoMenuItem;