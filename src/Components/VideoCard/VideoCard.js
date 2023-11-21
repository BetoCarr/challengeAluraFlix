import './StyleVideoCard.css'
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

function eliminarVideo(title, id) {
    alert(`El usuario confirmó que quiere eliminar el video con el titulo: ${title} con el id: ${id}`)
    console.log(`El usuario quiere eliminar el video con el id ${id}`)
}


// Función para renderizar video-cards
function VideoCard({ videoUrl, title, imageUrl, categoryColor, id}){
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleVideoDelete = (videoId) => {
        eliminarVideo(title, videoId);
        setDialogOpen(false);
    };


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
                    <DeleteForeverIcon className='icon' onClick={handleDeleteClick}></DeleteForeverIcon>

                    <ConfirmationDialog
                        isOpen={dialogOpen}
                        onClose={handleDialogClose}
                        onConfirm={handleVideoDelete}
                        videoId={id}
                        videoTitle={title}
                    />
                </div>
            </Box>
        </ Card>
    );
};

export default VideoCard;