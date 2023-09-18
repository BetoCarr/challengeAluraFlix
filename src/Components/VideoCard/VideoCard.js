import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';

const VideoCardContainer = styled(Card)(({ isBanner }) => ({
    width: isBanner ? '70%' : '50%',
}));


function VideoCard({ videoUrl, title, imageUrl, isBanner }){
    return (
        <VideoCardContainer isBanner={isBanner}>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia
                    component="img"
                    alt={title}
                    height="auto"
                    image={imageUrl}
                    title={title}
                />
            </a>
        </ VideoCardContainer>
    );
};

export default VideoCard;