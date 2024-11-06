// Importacion de React y componentes
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../videosSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';

// Componente principal LikeIcon
function LikeIcon ( {videoId, title} ) {

    const { openFeedback, closeFeedback } = useFeedback()

    const dispatch = useDispatch();

    const liked = useSelector((state) => state.videos.likes[videoId])

    // Función para manejar el clic en el ícono de 'me gusta'
    function handleLikeClick() {
        // Despachar la acción toggleLike en lugar de cambiar el estado local
        dispatch(toggleLike(videoId))
        openFeedback("FeedbackDialog", {
            message: liked 
            ? `¡"${title}" eliminado de tus favoritos!` 
            : `¡"${title}" añadido a tus favoritos!`
        })
        setTimeout(() => {
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