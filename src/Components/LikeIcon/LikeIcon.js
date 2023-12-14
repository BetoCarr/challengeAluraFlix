import React, { useState, useEffect }  from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LikeFeedbackDialog from '../LikeFeedbackDialog/LikeFeedbackDialog';
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
        if (liked) {
            // Si el estado actual es 'liked', cambiarlo a 'unliked'
            darLikeVideo(videoId, false)
                .then(() => {
                    setLiked(false);
                    setFeedbackDialogOpen(true);

                })
                .catch((error) => {
                    console.error("Error al quitar 'me gusta' al video:", error);
                });
        } else {
            // Si el estado actual es 'unliked', cambiarlo a 'liked'
            darLikeVideo(videoId, true)
                .then(() => {
                    setLiked(true);
                    setFeedbackDialogOpen(true);
                })
                .catch((error) => {
                    console.error("Error al dar 'me gusta' al video:", error);
                });
        }
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
            <LikeFeedbackDialog
                isOpen={feedbackDialogOpen}
                onClose={handleFeedbackDialogClose}
                title={title}
                liked={liked}
            />
        </>
    );
}

export default LikeIcon;