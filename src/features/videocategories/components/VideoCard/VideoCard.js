// Importa React y los componentes necesarios
import './StyleVideoCard.css'
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteVideoButton from '../../../../Components/DeleteForeverIcon/DeleteIcon';
import LikeIcon from '../../../../Components/LikeIcon/LikeIcon';
import Box from '@mui/material/Box';
import { selectCategoryById } from '../../videoCategoriesSlice';

// Función para renderizar video-cards
function VideoCard({ categoryId }){

    // Obtén la categoría desde el store usando el selector
    const category = useSelector(state => selectCategoryById(state, categoryId));
    // const { videos } = category
    console.log(category)
    // // Estilo para el borde del card, con el color de la categoría
    // const cardBorder= {
    //     border: `4px solid ${categoryColor}`, 
    //     borderRadius: '8px', 
    // };

    // // Determina la clase de estilo basada en si es un banner o no
    // const cardClassName = isBanner ? 'card-banner' : 'card';
    // const imgClassName = isBanner ? 'image-card-banner' : 'image-card';

    // // Función para manejar la eliminación de un video
    // const handleVideoDeleted = () => {
    //     window.location.reload();
    // };

    // return (
    //     // // Card que representa un video
    //     // <Card style={cardBorder} className={cardClassName}>
    //     //     {/* Enlace al video (se abre en una nueva pestaña) */}
    //     //     <a href={videoUrl} target='_blank' rel='noopener noreferrer'>
    //     //         {/* Contenido multimedia del card (imagen del video) */}
    //     //         <CardMedia component='div'>
    //     //             <img src={imageUrl} alt={title} className={imgClassName}/>
    //     //         </CardMedia>
    //     //     </a>
    //     //     {/* Contenedor para el título y los iconos del card */}
    //     //     <Box component="div" className='icotypo-container'>
    //     //         {/* Contenedor para el título del video */}
    //     //         <div className="title-container">
    //     //             <Typography variant='body1' className='typography-card'>{title}</Typography>
    //     //         </div>
    //     //         {/* Contenedor para los iconos de "Me gusta" y "Eliminar" */}
    //     //         <div className="icon-container">
    //     //             {/* Componente de icono de "Me gusta" */}
    //     //             <LikeIcon
    //     //                 videoId={id}
    //     //                 title={title}
    //     //             />
    //     //             {/* Componente de botón de "Eliminar" */}
    //     //             <DeleteVideoButton
    //     //                 categoryId={categoryId}
    //     //                 videoId={id}
    //     //                 onVideoDeleted={handleVideoDeleted}
    //     //                 title={title}
    //     //             />
    //     //         </div>
    //     //     </Box>
    //     // </ Card>
    // );
};

// Exporta el componente VideoCard para su uso en otras partes de la aplicación
export default VideoCard;