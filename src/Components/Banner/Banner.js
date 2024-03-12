import './StylesBanner.css'
import React from 'react';
import Box from '@mui/material/Box';
import ContainerTitulo from '../ContainerTitulo/ContainerTitulo';
import VideoCard from '../VideoCard/VideoCard';
import Typography from '@mui/material/Typography';

function Banner ({ title, video, color, categoryId, categoryName, isBanner }) {
    return(
        <Box component='section' className='banner-container banner-image'>
            <Box className='content-container'>
                <ContainerTitulo 
                    title={title} 
                    color={color} 
                    categoryId={categoryId} 
                    categoryName={categoryName} 
                    isBanner={isBanner}
                />
                <Typography variant='h4' color='text.primary'>
                    Explora y Aprende Deportes
                </Typography>
                <Typography variant='body1' color='text.primary'>
                    SportFlix te invita a explorar y aprender una variedad de deportes emocionantes. Sumérgete en el mundo del deporte, desde el longboarding hasta el fútbol y el frontenis. Nuestra plataforma está diseñada para ayudarte a adquirir nuevas habilidades y conocimientos deportivos mientras te diviertes. ¡Unete a la aventura deportiva ahora!
                </Typography>
            </Box>
            <VideoCard
                imageUrl={video.imageUrl} 
                videoUrl={video.videoUrl} 
                id={video.id} 
                title={video.title} 
                categoryColor={color} 
                isBanner={isBanner}/>
        </Box>
    );
}

export default Banner;