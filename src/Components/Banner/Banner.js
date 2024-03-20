// Importacion de estilos, React, componentes MUI, e imagenes
import './StylesBanner.css'
import React from 'react';
import Box from '@mui/material/Box';
import ContainerTitulo from '../ContainerTitulo/ContainerTitulo';
import VideoCard from '../VideoCard/VideoCard';
import Typography from '@mui/material/Typography';
import noVideoImage from '../../assets/img/no-video2.jpeg';

function Banner ({ title, video, color, categoryId, categoryName, isBanner }) {
    // Comprobación si no hay video asociado a la categoría
    if(!video) {
        return (
            // Contenedor principal del banner
            <Box component='section' className='banner-container banner-image'>
                {/* Contenedor de la retroalimentación de error */}
                <Box className='content-container-error'>
                    <Box className='not-found'>   
                        {/* Título de la categoría */}
                        <ContainerTitulo 
                            title={title} 
                            color={color} 
                            categoryId={categoryId} 
                            categoryName={categoryName} 
                            isBanner={isBanner}
                        />
                        {/* Mensaje de invitación a explorar deportes */}
                        <Typography variant='h4' color='text.primary'>
                            Explora y Aprende Deportes
                        </Typography>
                        {/* Descripción de la plataforma */}
                        <Typography variant='body1' color='text.primary'>
                            SportFlix te invita a explorar y aprender una variedad de deportes emocionantes. Sumérgete en el mundo del deporte, desde el longboarding hasta el fútbol y el frontenis. Nuestra plataforma está diseñada para ayudarte a adquirir nuevas habilidades y conocimientos deportivos mientras te diviertes. ¡Unete a la aventura deportiva ahora!
                        </Typography>
                    </Box>
                    {/* Contenedor para la imagen y el mensaje de error */}
                    <Box className='not-found-card'>
                        {/* Imagen de retroalimentación de error */}
                        <img src={noVideoImage} className='no-video-img'/>
                        {/* Mensaje de error */}
                        <Typography variant='h4' color='text.primary'>
                            Datos del video incompletos
                        </Typography>
                        <Typography variant='body1' color='text.primary'>
                            No se pudieron cargar los datos del video. 
                        </Typography>
                        <Typography variant='body1' color='text.primary'>
                            Por favor, agrega videos a la categoria.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    } else {
        // Si hay un video asociado a la categoría
        return(
            <Box component='section' className='banner-container banner-image'>
                {/* Contenedor del contenido del banner */}
                <Box className='content-container'>
                    {/* Título de la categoría */}
                    <ContainerTitulo 
                        title={title} 
                        color={color} 
                        categoryId={categoryId} 
                        categoryName={categoryName} 
                        isBanner={isBanner}
                    />
                    {/* Mensaje de invitación a explorar deportes */}
                    <Typography variant='h4' color='text.primary'>
                        Explora y Aprende Deportes
                    </Typography>
                    <Typography variant='body1' color='text.primary'>
                        SportFlix te invita a explorar y aprender una variedad de deportes emocionantes. Sumérgete en el mundo del deporte, desde el longboarding hasta el fútbol y el frontenis. Nuestra plataforma está diseñada para ayudarte a adquirir nuevas habilidades y conocimientos deportivos mientras te diviertes. ¡Unete a la aventura deportiva ahora!
                    </Typography>
                </Box>
                {/* Componente de tarjeta de video */}
                <VideoCard
                    imageUrl={video.imageUrl} 
                    videoUrl={video.videoUrl} 
                    id={video.id} 
                    title={video.title} 
                    categoryColor={color} 
                    isBanner={isBanner}
                />
            </Box>
        );
    }
}

// Exporta Componente
export default Banner;