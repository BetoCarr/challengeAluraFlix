// Importación de React y componentes
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import { useTheme } from '@mui/material/styles'; 
import { useNavigate } from 'react-router-dom';

function EditCategroyMenuItem({ categoryId, handleClose }) {

    const navigate = useNavigate();

    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre } = category

    const { openFeedback, closeFeedback } = useFeedback()

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    const handleEditCategoryClick = () => {
        openFeedback("FeedbackDialog", {
            message: `¿Quieres editar la categoria "${nombre}"?`,
            showActions: true,
            onConfirm: () => {
                closeFeedback()
                navigate(`/editar-categoria/${categoryId}`);  // Navega a la ruta de edición
            },
            onCancel: handleClose()
        })
    }

    return(
        <>
            {/* Componente que muestra el ícono y el mensaje de edicion y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleEditCategoryClick} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <EditIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Editar
            </MenuItem>
            <Divider />
        </>
    );
}

// Exporta componente EditCategroyMenuItem
export default EditCategroyMenuItem;