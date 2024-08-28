// Importación de React y componentes
import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
import { showMessageWithActions, closeFeedback } from '../../../feedbackdialog/feedbackActions';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FeedbackDialog from '../../../feedbackdialog/FeedbackDialog/FeedbackDialog';
import FormEditarCategoria from '../../components/FormEditarCategoria/FormEditarCategoria'
import { useTheme } from '@mui/material/styles'; 

function EditCategroyMenuItem({ categoryId, handleClose }) {
    const dispatch = useDispatch()

    const feedback = useSelector(state => state.feedback); // Asegúrate de seleccionar el estado adecuado

    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre, color, isBanner } = category
    // console.log(category)

    // Estado para controlar la apertura del formulario de editar categoria
    const [isOpen, setIsOpen] = useState(false);

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    const handleConfirmation = () => {
        dispatch(closeFeedback())
        console.log("Abriendo formulario")
        setIsOpen(true); // Abre el formulario después de la confirmación
    };

    const handleCancel = () => {
        dispatch(closeFeedback())
        handleClose(); // Cierra el menú
    };
    const handleCloseForm = () => {
        handleClose(); // Cierra el menú
        setIsOpen(false)
    }
   // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleEditConfirmationDialogOpen = () => {
        dispatch(showMessageWithActions({
            message: `¿Estás seguro de que quieres editar la categoria "${nombre}"?`,
            cancelLabel: 'Cancelar',
            confirmLabel: 'Confirmar',
        }));
    }
    
    return(
        <>
            {/* Componente que muestra el ícono y el mensaje de edicion y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleEditConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <EditIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Editar
            </MenuItem>
            <Divider />
            {/* Cuadro de diálogo de confirmación de edicion */}
            <FeedbackDialog
                isOpen={feedback.isOpen}
                onClose={handleCancel} 
                message={feedback.message}
                onConfirm={handleConfirmation}
                confirmLabel={feedback.confirmLabel}
                onCancel={handleCancel}
                cancelLabel={feedback.cancelLabel}  
                showActions={feedback.showActions} // Asegúrate de pasar el estado de showActions               
            />
            {isOpen && (
                <FormEditarCategoria
                    initialValuesForEdit={{
                        nombre: nombre,
                        color: color,
                        isBanner: isBanner
                    }}
                    handleClose={handleCloseForm} // Cierra el formulario
                    categoryId={categoryId}
                />
            )}
        </>
    );
}
// Exporta componente EditCategroyMenuItem
export default EditCategroyMenuItem;