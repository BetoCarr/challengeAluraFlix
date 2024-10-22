// Importación de estilos, React, hooks de Redux, componentes de MUI e íconos personalizados
import './StyleVideoCard.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteVideoButton from '../../../../Components/DeleteForeverIcon/DeleteIcon';
import LikeIcon from '../../../../Components/LikeIcon/LikeIcon';
import Box from '@mui/material/Box';
import { selectCategoryById } from '../../../videocategories/videoCategoriesSlice';

// Componente VideoCard que recibe el ID de la categoría, el video y si es el primer video como props
const VideoCard = ({ categoryId, video, isFirstVideo }) => {

    // Selecciona la categoría del store usando el selector
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const categoryColor = category?.color || 'defaultColor';

    // Estilo de borde de la tarjeta basado en el color de la categoría
    const cardBorder = {
        border: `4px solid ${categoryColor}`,
        borderRadius: '8px',
    };

    // Determina las clases de la tarjeta y la imagen basadas en si es el primer video
    const cardClassName = isFirstVideo ? 'card-banner' : 'card';
    const imgClassName = isFirstVideo ? 'image-card-banner' : 'image-card';

    // Función para manejar la eliminación del video
    const handleVideoDeleted = () => {
        window.location.reload();
    };

    return (
    // Componente de tarjeta de MUI con los estilos definidos
    <Card style={cardBorder} className={cardClassName}>
        {/* Enlace al video */}
        <a href={video.url} target='_blank' rel='noopener noreferrer'>
            <CardMedia component='div'>
                <img src={video.imageUrl} alt={video.title} className={imgClassName} />
            </CardMedia>
        </a>
        {/* Contenedor para el título y los íconos */}
        <Box component="div" className='icotypo-container'>
                <div className="title-container">
                    <Typography variant='body1' className='typography-card'>{video.title}</Typography>
                </div>
                <div className="icon-container">
                    {/* Ícono de "Me gusta" */}
                    <LikeIcon
                        videoId={video.id}
                        title={video.title}
                    />
                    {/* Botón de eliminar video */}
                    <DeleteVideoButton
                        categoryId={categoryId}
                        videoId={video.id}
                        onVideoDeleted={handleVideoDeleted}
                        title={video.title}
                    />
                </div>
            </Box>
        </Card>
    );
};

// Exporta el componente VideoCard
export default VideoCard;
