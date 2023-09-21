import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';

const VideoCardContainer = styled(Card)(({ isbanner }) => ({
    width: isbanner ? '70%' : '50%',
}));


function VideoCard({ videoUrl, title, imageUrl, isbanner }){
    console.log(imageUrl)
    return (
        <VideoCardContainer isbanner={isbanner}>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia
                    component="img"
                    alt={title}
                    height="auto"
                    src={imageUrl}
                    title={title}
                />
            </a>
        </ VideoCardContainer>
    );
};

export default VideoCard;