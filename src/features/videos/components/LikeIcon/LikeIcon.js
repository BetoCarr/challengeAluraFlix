// Importación de React, componentes y hooks
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../videosSlice';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import FavoriteIcon from '@mui/icons-material/Favorite';


// Componente principal LikeIcon
function LikeIcon ( {videoId, title} ) {
    // Hook de Redux para despachar acciones
    const dispatch = useDispatch();

    // Hooks del contexto de feedback para abrir y cerrar diálogos
    const { openFeedback, closeFeedback } = useFeedback()

    // Obtiene el estado de liked de Redux
    const liked = useSelector((state) => state.videos.likes[videoId])

    // Función para manejar el clic en el ícono de 'me gusta'
    function handleLikeClick() {
        dispatch(toggleLike(videoId)) // Despachar la acción toggleLike en lugar de cambiar el estado local
        openFeedback("FeedbackDialog", { // Configura el mensaje de de acuerdo al estado de like
            message: liked 
            ? `¡"${title}" eliminado de tus favoritos!` 
            : `¡"${title}" añadido a tus favoritos!`
        })
        setTimeout(() => { // Cierra mensaje
            closeFeedback();
        }, 3000);
    }

    return(
        <>
            {/* Ícono de 'me gusta' con clase adicional si está marcado como 'liked' */}
            <FavoriteIcon
                className={`icon ${liked ? 'liked' : ''}`}
                onClick={handleLikeClick}
            />
        </>
    );
}

// Exporta componente LikeIcon
export default LikeIcon;