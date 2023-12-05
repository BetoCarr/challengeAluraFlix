import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';


function LikeIcon ( {videoId, title} ) {
    const [liked, setLiked] = useState(false);

    function handleLikeClick () {
        alert(`El usuario di like al video con el id: ${videoId} y titulo: ${title} `)
        setLiked(!liked)
        console.log(videoId, title)
    }

    return(
        <FavoriteIcon className={liked ? 'icon liked' : 'icon'}
            onClick={handleLikeClick}
        />
    )
}

export default LikeIcon;