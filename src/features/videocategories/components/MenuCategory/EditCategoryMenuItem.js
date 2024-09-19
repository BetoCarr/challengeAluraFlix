// Importación de React y componentes
import React, { useState }  from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FeedbackDialog from '../../../feedbackdialog/FeedbackDialog/FeedbackDialog';
import FormEditarCategoria from '../../components/FormEditarCategoria/FormEditarCategoria'
import { useTheme } from '@mui/material/styles'; 

function EditCategroyMenuItem({ categoryId, handleClose }) {

    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre, color, isBanner } = category

    // Estado para controlar la apertura del formulario de editar categoria
    const [isOpen, setIsOpen] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleOpenDialog = () => setIsOpen(true);
    const handleCloseDialog = () => setIsOpen(false);
    
    const handleOpenForm = () => setShowEditForm(true); // Abre el formulario
    const handleCloseForm = () => setShowEditForm(false);

    const onCancel = () => {
        handleCloseDialog()
        handleClose()
        handleCloseForm()
    }

    // Variable para acceder a ThemeProvider
    const theme = useTheme();
    
    return(
        <>
            {/* Componente que muestra el ícono y el mensaje de edicion y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleOpenDialog} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <EditIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Editar
            </MenuItem>
            <Divider />
            {/* Cuadro de diálogo de confirmación de edicion */}
            <FeedbackDialog
                isOpen={isOpen}
                onClose={handleCloseDialog}
                message={`¿Quieres editar la categoría ${nombre}?`}  // Usamos la interpolación dentro de {}
                cancelLabel = 'Cancelar'
                onCancel={onCancel}
                confirmLabel = 'Aceptar'
                actionType="edit"
                showActions={true}
                onOpenForm={handleOpenForm} // Pasa la lógica para abrir el formulario
            />
            {showEditForm && (
                <FormEditarCategoria 
                    categoryId={categoryId}
                    initialValuesForEdit={{nombre, color, isBanner}}
                    isOpen={showEditForm} 
                    onClose={onCancel} 
                />
            )}
        </>
    );
}

// Exporta componente EditCategroyMenuItem
export default EditCategroyMenuItem;