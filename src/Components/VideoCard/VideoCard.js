import './StyleVideoCard.css'
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { eliminarVideo } from '../../api/api';

// function eliminarVideo(title, id, categoryId) {
//     alert(`El usuario confirmó que quiere eliminar el video con el titulo: ${title} con el id: ${id} en la categoria con el id ${categoryId}`)
//     console.log(`El usuario quiere eliminar el video con el id ${id}`)
// }


// Función para renderizar video-cards
function VideoCard({ videoUrl, title, imageUrl, categoryColor, categoryId, id}){
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleVideoDelete = ( categoryId, videoId) => {
        eliminarVideo( categoryId ,videoId )
        .then((responseData) => {
            console.log("¡Video eliminado exitosamente!", responseData);
            const confirmMessage = "¡Video eliminado exitosamente! La página se recargará para actualizar el contenido.";
            if(window.confirm(confirmMessage)) {
                // navigate('/', { replace: true });
                window.location.reload();
            }
        })
        .catch((error) => {
            // Aquí manejas el caso de error, por ejemplo, mostrando un mensaje de error al usuario
            console.error("Error al eliminar el video:", error);
            alert("Video NO eliminado. Error: " + error); // Puedes mostrar el mensaje de error al usuario
        })
        .finally(() => {
            // Esto se ejecutará independientemente de si la solicitud fue exitosa o no
            // Puedes realizar acciones adicionales aquí, como restablecer formularios o estados
            // setSubmitting(false); // Por ejemplo, puedes restablecer el estado de submitting
            setDialogOpen(false);
        });
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
                        categoryId={categoryId}
                    />
                </div>
            </Box>
        </ Card>
    );
};

export default VideoCard;