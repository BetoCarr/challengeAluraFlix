import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled, width } from '@mui/system';

// const VideoCardContainer = styled(Card)(({ isbanner }) => ({
//     width: isbanner ? '70%' : '100%',
// }));

function VideoCard({ videoUrl, title, imageUrl }){
    return (
        <Card sx={{width:"70%"}}>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia component="div">
                    <img src={imageUrl} alt={title} style={{width:"100%"}}/>
                </CardMedia>
            </a>
        </ Card>
    );
};

export default VideoCard;