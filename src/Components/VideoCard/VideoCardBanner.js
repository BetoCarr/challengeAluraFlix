import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function VideoCardBanner({ videoUrl, title, imageUrl }){
    return (
        <Card sx={{width:"45%"}}>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia component="div">
                    <img src={imageUrl} alt={title} style={{width:"100%"}}/>
                </CardMedia>
            </a>
        </ Card>
    );
};

export default VideoCardBanner;