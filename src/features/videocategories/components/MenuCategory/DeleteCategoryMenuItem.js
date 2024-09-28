// Importación de React y componentes
import React,  {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryById, deleteCategory } from '../../videoCategoriesSlice';
import FeedbackDialog from '../../../feedbackdialog/FeedbackDialog/FeedbackDialog';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTheme } from '@mui/material/styles'; 

function DeleteCategoryMenuItem({ categoryId, handleClose }) {

    const dispatch = useDispatch();

    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre, videos } = category

    // Variable para acceder a ThemeProvider
    const theme = useTheme();

    // Estados locales para manejar los diálogos
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false); // Controla la visibilidad del diálogo
    const [feedbackMessage, setFeedbackMessage] = useState('');

    // Función para abrir el FeedbackDialog
    const openFeedbackDialog = (message) => {
        setFeedbackMessage(message);
        setFeedbackDialogOpen(true);
    };

    // Función para cerrar el FeedbackDialog
    const closeFeedbackDialog = () => {
        setFeedbackDialogOpen(false);
        setFeedbackMessage("");
    };

    const handleConfirmOpenDialog = () => setIsConfirmDialogOpen(true);
    const handleConfirmCloseDialog = () => setIsConfirmDialogOpen(false);

    const onCancel = () => {
        handleClose()
        handleConfirmCloseDialog()
    }

    // Verifica si hay videos en la categoría accediendo directamente desde Redux
    const checkIfVideosExistForCategory = () => {
        return videos && videos.length > 0;
    };

    // Función para abrir cuadro de dialogo de confirmación de eliminación de la categoría
    const handleDeleteConfirmationDialogOpen = () => {
        const hayVideosAsociados = checkIfVideosExistForCategory();
        if (hayVideosAsociados) {
            // Si hay videos, muestra el mensaje de error
            openFeedbackDialog("No se puede eliminar la categoria por que tiene videos")
            setTimeout(() => {
                onCancel()// Cierra el dialogo
            }, 3000);
        } else {
            // Si no hay videos, muestra el diálogo de confirmación
            handleConfirmOpenDialog();
        }
    };

    // Función para manejar la confirmación de eliminación
    const handleConfirm = async () => {
        console.log("Eliminando categoria")
        handleConfirmCloseDialog()
        dispatch(deleteCategory(categoryId))
        .unwrap()
        .then(() => {
            console.log('Elimincion exitosa, abriendo FeedbackDialog...');
            openFeedbackDialog("Categoría eliminada exitosamente!")
            setTimeout(() => {
                closeFeedbackDialog();
                // resetForm();
                // navigate('/', { replace: true });
            }, 3000);
        })
        .catch((error) => {
            console.log(error)
        });
    };

    return (
        <>
            {/* Componente que muestra el ícono y el mensaje de eliminación y maneja la operación en el backend */}
            <MenuItem 
                className='menu-item'
                onClick={handleDeleteConfirmationDialogOpen} // Abre el diálogo de confirmación al hacer clic en el menú
            >
                <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: '23px' }} />
                Eliminar
            </MenuItem>
            <Divider />
            {  /* Cuadro de diálogo de confirmación de eliminación */}
            <FeedbackDialog
                isOpen={isConfirmDialogOpen}
                onClose={handleConfirmCloseDialog}
                message={`¿Quieres eliminar la categoría ${nombre}?`}  // Usamos la interpolación dentro de {}
                confirmLabel="Aceptar"
                cancelLabel="Cancelar"
                onConfirm={handleConfirm}
                onCancel={onCancel}
                actionType="delete"
                showActions={true} // Muestra los botones Aceptar y Cancelar
            />
            {/* Cuadro de diálogo de error o mensaje de éxito */}
            <FeedbackDialog
                isOpen={feedbackDialogOpen}
                onClose={onCancel}
                message={feedbackMessage}
            />
        </>
    );
}

// Exporta el componente DeleteCategoryMenuItem para su uso en otras partes de la aplicación
export default DeleteCategoryMenuItem;