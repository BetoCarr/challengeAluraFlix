import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';

const VideoCardContainer = styled(Card)(({ isbanner }) => ({
    width: isbanner ? '70%' : '100%',
}));

// const styles = {
//     media: {
//         height: "0",
//         paddingTop: '56.25%', 
//         marginTop:'30'
//     }
// };

function VideoCard({ videoUrl, title, imageUrl, isbanner }){
    return (
        <VideoCardContainer isbanner={isbanner}>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                {/* <CardMedia style={styles.media} component="div"> */}
                <CardMedia component="div">
                    <img src={imageUrl} alt={title} />
                </CardMedia>
            </a>
        </ VideoCardContainer>
    );
};

export default VideoCard;