import React, { useState, useEffect }  from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { darLikeVideo, obtenerEstadoLike } from '../../api/api';

function LikeIcon ( {videoId, title} ) {
    const [liked, setLiked] = useState(false);

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
                })
                .catch((error) => {
                    console.error("Error al quitar 'me gusta' al video:", error);
                });
        } else {
            // Si el estado actual es 'unliked', cambiarlo a 'liked'
            darLikeVideo(videoId, true)
                .then(() => {
                    setLiked(true);
                })
                .catch((error) => {
                    console.error("Error al dar 'me gusta' al video:", error);
                });
        }
    }

    return(
        <FavoriteIcon
            className={`icon ${liked ? 'liked' : ''}`}
            onClick={handleLikeClick}
        />
    )
}

export default LikeIcon;