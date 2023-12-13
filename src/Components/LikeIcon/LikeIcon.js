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

    function handleLikeClick () {
        darLikeVideo(videoId, true)
        .then((data) => {
            // Realizar cualquier acción necesaria si la solicitud fue exitosa
            alert(`El usuario dio like al video con el id: ${videoId} y título: ${title}`);
            setLiked(!liked);
            console.log(videoId, title);
            console.log(data);
        })
        .catch((error) => {
            console.error("Error al dar me gusta el video:", error);
            alert("Video NO likeado. Error: " + error);
        })
    }

    return(
        <FavoriteIcon
            className={liked ? 'icon liked' : 'icon'}
            onClick={handleLikeClick}
        />
    )
}

export default LikeIcon;