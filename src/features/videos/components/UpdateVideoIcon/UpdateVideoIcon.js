// Importación de React, componentes y hooks
import React from 'react'
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext'
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit'

// Componente principal UpdateVideoIcon
function UpdateVideoIcon ({ categoryId, videoId, title }) {
    // Inicializa hooks de Redux y navegación
    const navigate = useNavigate();
    const { openFeedback } = useFeedback()

    // Maneja el clic en el ícono de edición
    const handleUpdatdeVideoClick = () => {
        openFeedback("ConfirmationFeedbackDialog", { // Abre un diálogo de confirmación usando el hook de feedback
            message: `¿Quieres editar el video "${title}"?`, // Mensaje de confirmación
            onConfirm: () => {
                navigate(`/update-video/${categoryId}/${videoId}`) // Navega a la ruta de edición del video con los parámetros necesarios
            },
        })
    }
    return(
        <>
            {/* Icono de editar que activa la función handleUpdatdeVideoClick al hacer clic */}
            <EditIcon 
                onClick={handleUpdatdeVideoClick}
            />
        </>
    )
}

// Exporta componente principal
export default UpdateVideoIcon;