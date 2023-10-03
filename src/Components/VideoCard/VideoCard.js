import './StyleVideoCard.css'
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function VideoCard({ videoUrl, title, imageUrl, categoryColor }){

    const cardBorder= {
        border: `4px solid ${categoryColor}`, 
        borderRadius: '8px', 
    };
    
    return (
        <Card style={cardBorder} className='card'>
            <a href={videoUrl} target='_blank' rel='noopener noreferrer'>
                <CardMedia component='div'>
                    <img src={imageUrl} alt={title} className='img-card'/>
                </CardMedia>
                <Typography variant='body1' className='typography-card'>{title}</Typography>
            </a>
        </ Card>
    );
};

export default VideoCard;