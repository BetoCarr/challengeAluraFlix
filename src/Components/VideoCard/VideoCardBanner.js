import './StylesVideoCardBanner.css';
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function VideoCardBanner({ videoUrl, title, imageUrl, categoryColor }){

    const cardBorder = {
        border: `4px solid ${categoryColor}`, 
        borderRadius: '8px', 
    };

    return (
        <Card style={cardBorder} className='card-banner'>
            <a href={videoUrl} target='_blank' rel='noopener noreferrer'>
                <CardMedia component='div'>
                    <img src={imageUrl} alt={title} className='img-card-banner'/>
                </CardMedia>
                <Typography className='typography-card-banner'>{title}</Typography>
            </a>
        </ Card>
    );
};

export default VideoCardBanner;