// Importa React y los componentes necesarios
import './StyleVideoCard.css'
import React from 'react';
import { useSelector } from 'react-redux';
import MySlider from '../../../../Components/Slider/Slider';
import { selectCategoryById } from '../../videoCategoriesSlice';
import Banner from '../../../../Components/Banner/Banner';
import ContainerTitulo from '../../../../Components/ContainerTitulo/ContainerTitulo';
import VideoCard from './VideoCard';

// Función para renderizar video-cards
function VideoList({ categoryId }){

    const category = useSelector(state => selectCategoryById(state, categoryId));

    if(category.isBanner === true) {
    // Omite el primer video si es un banner
        const videosToRender = category.videos.slice(1); 

        // Renderiza el carrusel de banner sin ContainerTitulo
        return(
            <>
                {/* Renderiza el Banner con el primer video de la categoría */}
                <Banner categoryId={categoryId} />
                <div className='container-videolist'>
                    <MySlider>
                        {videosToRender.map(video => (
                                <VideoCard key={video.id} categoryId={categoryId} video={video} />
                            )
                        )}
                    </MySlider>
                </div>
            </>
        )
    } else {
        return(
            <div className='container-videolist'>
                <ContainerTitulo categoryId={categoryId} />
                <MySlider>
                    {category.videos.length > 0 ? (
                        category.videos.map(video => (
                            <VideoCard key={video.id} categoryId={categoryId} video={video} />
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