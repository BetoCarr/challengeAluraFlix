// Importación de React y componentes
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../categoriesSlice';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import { useTheme } from '@mui/material/styles'; 
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';


// Componente funcional para manejar la edición de una categoría
function UpdateCategoryMenuItem({ categoryId, handleClose }) {
    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Selector para obtener la información de la categoría desde Redux
    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre } = category

    // Hooks del contexto de feedback para abrir y cerrar el diálogo
    const { openFeedback, closeFeedback } = useFeedback()

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Maneja el clic en el elemento del menú para abrir el diálogo de confirmación
    const handleEditCategoryClick = () => {
        openFeedback("FeedbackDialog", {
            message: `¿Quieres editar la categoria "${nombre}"?`,
            showActions: true,
            onConfirm: () => {
                closeFeedback()
                navigate(`/update-category/${categoryId}`);  // Navega a la ruta de edición
            },
            onCancel: handleClose
        })
    }

    return(
        <>
            {/* Componente que muestra el ícono y el mensaje de edicion y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleEditCategoryClick} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                {/* Ícono de edición con estilo personalizado */}
                <EditIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Editar
            </MenuItem>
            {/* Línea divisora para separar este ítem del resto */}
            <Divider />
        </>
    );
}

// Exporta componente EditCategroyMenuItem
export default UpdateCategoryMenuItem;