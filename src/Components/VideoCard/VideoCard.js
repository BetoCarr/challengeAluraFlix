import './StyleVideoCard.css'
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteVideoButton from '../DeleteForeverIcon/DeleteIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

// Función para renderizar video-cards
function VideoCard({ videoUrl, title, imageUrl, categoryColor, categoryId, id}){

    const cardBorder= {
        border: `4px solid ${categoryColor}`, 
        borderRadius: '8px', 
    };
    
    const handleVideoDeleted = () => {
        window.location.reload();
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
                    <DeleteVideoButton
                        categoryId={categoryId}
                        videoId={id}
                        onVideoDeleted={handleVideoDeleted}
                        title={title}
                    />
                </div>
            </Box>
        </ Card>
    );
};

export default VideoCard;