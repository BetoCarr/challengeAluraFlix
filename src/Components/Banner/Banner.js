// Importacion de estilos, React, componentes MUI, e imagenes
import './StylesBanner.css'
import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ContainerTitulo from '../ContainerTitulo/ContainerTitulo';
// import VideoList from '../../features/videocategories/components/VideoList/VideoList';
import VideoCard from '../../features/videocategories/components/VideoList/VideoCard';
import Typography from '@mui/material/Typography';
import MessageBanner from './MessageBanner';
import noVideoImage from '../../assets/img/no-video2.jpeg';
import { selectCategoryById } from '../../features/videocategories/videoCategoriesSlice';

function Banner ({ categoryId }) {

    // Obtén la categoría desde el store usando el selector
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { videos } = category;
    // console.log(isBanner)
    const video = videos.length > 0 ? videos[0] : null;


    // Comprobación si no hay video asociado a la categoría
    if(!video) {
        return (
            // Contenedor principal del banner
            <Box component='section' className='banner-container banner-image'>
                {/* Contenedor de la retroalimentación de error */}
                <Box className='content-container-error'>
                    <Box className='not-found'>   
                        {/* Título de la categoría */}
                        <ContainerTitulo categoryId={categoryId} />
                        {/* Mensaje de invitación a explorar deportes */}
                        <MessageBanner />
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
                    <ContainerTitulo categoryId={categoryId} />
                    {/* Mensaje de invitación a explorar deportes */}
                    <MessageBanner />
                </Box>
                {/* Componente de tarjeta de video */}
                <VideoCard
                    categoryId={categoryId}
                    video={video}
                    isFirstVideo={true}
                />
            </Box>
        );
    }
}

// Exporta Componente
export default Banner;