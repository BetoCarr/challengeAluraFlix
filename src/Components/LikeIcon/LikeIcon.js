import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { darLikeVideo } from '../../api/api';

function LikeIcon ( {videoId, title} ) {

    function handleLikeClick () {
        darLikeVideo(videoId, true)
        .then((data) => {
            // Realizar cualquier acción necesaria si la solicitud fue exitosa
            alert(`El usuario dio like al video con el id: ${videoId} y título: ${title}`);
            console.log(videoId, title);
            console.log(data);
        })
        .catch((error) => {
            console.error("Error al dar me gusta el video:", error);
            alert("Video NO likeado. Error: " + error);
        })
    }

    return(
        <FavoriteIcon className='icon'
            onClick={handleLikeClick}
        />
    )
}

export default LikeIcon;