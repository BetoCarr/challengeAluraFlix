import './StylesBanner.css'
import React from 'react';
import VideoCardBanner from '../VideoCard/VideoCardBanner';
import Box from '@mui/material/Box';
import ContainerTituloBanner from '../TituloCategoria/ContainerTituloBanner';
import Typography from '@mui/material/Typography';

function Banner ({ title, video, color }) {
    return(
        <Box component='section' className='banner-container banner-image'>
            <Box className='content-container'>
                <ContainerTituloBanner title={title} color={color} />
                <Typography variant='h4' color='text.primary'>Explora y Aprende Deportes</Typography>
                <Typography variant='body1' color='text.primary'>SportFlix te invita a explorar y aprender una variedad de deportes emocionantes. Sumérgete en el mundo del deporte, desde el longboarding hasta el fútbol y el frontenis. Nuestra plataforma está diseñada para ayudarte a adquirir nuevas habilidades y conocimientos deportivos mientras te diviertes. ¡Unete a la aventura deportiva ahora!</Typography>
            </Box>
            <VideoCardBanner imageUrl={video.imageUrl} videoUrl={video.videoUrl} title={video.title} categoryColor={color} />
        </Box>
    );
}

export default Banner;