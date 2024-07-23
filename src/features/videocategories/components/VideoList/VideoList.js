// Importa React y los componentes necesariosy hooks de Redux
import './StyleVideoCard.css'
import React from 'react';
import { useSelector } from 'react-redux';
import MySlider from '../../../../Components/Slider/Slider';
import { selectCategoryById } from '../../videoCategoriesSlice';
import Banner from '../Banner/Banner';
import ContainerTitulo from '../ContainerTitulo/ContainerTitulo';
import VideoCard from './VideoCard';

// Componente funcional para renderizar las listas de videos
function VideoList({ categoryId }){

    // Obtiene la categoría del store usando el selector
    const category = useSelector(state => selectCategoryById(state, categoryId));

    // Verifica si la categoría es un banner
    if(category.isBanner === true) {
        // Omite el primer video si es un banner
        const videosToRender = category.videos.slice(1); 

        // Renderiza el carrusel de banner sin ContainerTitulo
        return(
            <>
                {/* Renderiza el Banner con el primer video de la categoría */}
                <Banner categoryId={categoryId} />
                <div className='container-videolist'>
                    {/* Renderiza el slider con los videos restantes */}
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
        // Renderiza la lista de videos normal con ContainerTitulo
        return(
            <div className='container-videolist'>
                {/* Renderiza el título de la categoría */}
                <ContainerTitulo categoryId={categoryId} />
                {/* Renderiza el slider con los videos de la categoría */}
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