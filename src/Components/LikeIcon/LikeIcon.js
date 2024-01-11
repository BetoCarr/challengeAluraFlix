import React, { useState, useEffect }  from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { darLikeVideo, obtenerEstadoLike } from '../../api/api';

function LikeIcon ( {videoId, title} ) {

    const [liked, setLiked] = useState(false);
    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

    useEffect(() => {
        obtenerEstadoLike(videoId)
            .then((data) => {
                setLiked(data.liked); // Establece el estado actual de "liked" al cargar el componente
            })
            .catch((error) => {
                console.error("Error al obtener estado de 'me gusta':", error);
            });
    }, [videoId]);


    function handleLikeClick() {

        const newLikeState = !liked;

        darLikeVideo(videoId, newLikeState)
            .then(() => {
                setLiked(newLikeState);
                setFeedbackDialogOpen(true);
            })
            .catch((error) => {
                console.error(`Error al ${newLikeState ? 'dar' : 'quitar'} 'me gusta' al video:`, error);
            });
    }

    function handleFeedbackDialogClose() {
        setFeedbackDialogOpen(false);
    }

    return(
        <>
            <FavoriteIcon
                className={`icon ${liked ? 'liked' : ''}`}
                onClick={handleLikeClick}
            />
            <FeedbackDialog
                isOpen={feedbackDialogOpen}
                onClose={handleFeedbackDialogClose}
                message={liked ? `¡"${title}" añadido a tus favoritos!` : `¡"${title}" eliminado de tus favoritos!`}
            />
        </>
    );
}

export default LikeIcon;