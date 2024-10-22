// Importa React y los componentes necesariosy hooks de Redux
import './StyleVideoCard.css'
import { selectVideosByCategory } from '../../../videos/videosSlice';
import { useSelector } from 'react-redux';
import React from 'react';
import MySlider from '../../../../Components/Slider/Slider';
import Banner from '../Banner/Banner';
import ContainerTitulo from '../ContainerTitulo/ContainerTitulo';
import VideoCard from './VideoCard';

// Componente funcional para renderizar las listas de videos
function VideoList({ category }){

    const categoryVideos = useSelector(state => selectVideosByCategory(state, category.id));

    // Verifica si la categoría es un banner
    if(category.isBanner === true) {
        // Omite el primer video si es un banner
        const firstVideo = categoryVideos.length > 0 ? categoryVideos[0] : null;
        // Renderiza el carrusel de banner sin ContainerTitulo
        return(
            <>
                {/* Renderiza el Banner con el primer video de la categoría */}
                <Banner 
                    categoryId={category.id} 
                    video={firstVideo} // Pasa el primer video a Banner 
                />
                <div className='container-videolist'>
                    {/* Renderiza el slider con los categoryVideos restantes */}
                    <MySlider>
                        {categoryVideos.slice(1).map(video => (
                                <VideoCard 
                                    key={video.id} 
                                    categoryId={category.id} 
                                    video={video} 
                                />
                            )
                        )}
                    </MySlider>
                </div>
            </>
        )
    } else {
        // Renderiza la lista de videos normal con ContainerTitulo
        return(
            <div className='container-videolist'>
                {/* Renderiza el título de la categoría */}
                <ContainerTitulo 
                    categoryId={category.id} 
                />
                {/* Renderiza el slider con los videos de la categoría */}
                <MySlider>
                    {categoryVideos.length > 0 ? (
                        categoryVideos.map(video => (
                            <VideoCard 
                                key={video.id} 
                                categoryId={category.id} 
                                video={video} 
                            />
                        ))
                    ) : (
                        <p>No videos found.</p>
                    )}
                </MySlider>
            </div>
        )
    }
};

// Exporta el componente VideoList para su uso en otras partes de la aplicación
export default VideoList;