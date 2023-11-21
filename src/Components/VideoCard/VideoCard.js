import './StyleVideoCard.css'
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

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
            </a>
            <Box component="div" className='icotypo-container'>
                <div className="title-container">
                    <Typography variant='body1' className='typography-card'>{title}</Typography>
                </div>
                <div className="icon-container">
                    <FavoriteIcon className='icon'></FavoriteIcon>
                    <DeleteForeverIcon className='icon'></DeleteForeverIcon>
                </div>
            </Box>
        </ Card>
    );
};

export default VideoCard;