// Importación de React y componentes
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../categoriesSlice';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; 
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Componente para agregar un nuevo video a una categoría específica
function AddVideoMenuItem ({ categoryId, handleClose }) {

    const navigate = useNavigate();

    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre } = category

    const { openFeedback, closeFeedback } = useFeedback()

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    const handleAddVideoClick = () => {
        openFeedback("FeedbackDialog", {
            message: `¿Quieres agregar video a la categoria "${nombre}"?`,
            showActions: true,
            onConfirm: () => {
                closeFeedback()
                navigate(`/add-video/${categoryId}`);  // Navega a la ruta de edición
            },
            onCancel: handleClose()
        })
    }

    return(
        <>
            {/* Componente que muestra el ícono para agregar un video a categoria y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleAddVideoClick} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <AddCircleIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }}/>
                Agregar
                <br />
                video
            </MenuItem>
        </>
    );
}

// Exporta componente AddVideoMenuItem
export default AddVideoMenuItem;