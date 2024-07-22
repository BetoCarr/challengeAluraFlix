// Importa React y los componentes necesarios
import './StyleVideoCard.css'
import React from 'react';
import { useSelector } from 'react-redux';
import MySlider from '../../../../Components/Slider/Slider';
import { selectCategoryById } from '../../videoCategoriesSlice';
import Banner from '../../../../Components/Banner/Banner';
import VideoCard from './VideoCard';

// Función para renderizar video-cards
function VideoList({ categoryId }){
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre, videos, color, id, isBanner } = category;
    console.log(isBanner)
    // const videos = useSelector(state => selectVideosByCategoryId(state, categoryId)) || [];
    if(isBanner === true) {
        // Renderiza el carrusel de banner sin ContainerTitulo
        return(
            <>
                {/* Renderiza el Banner con el primer video de la categoría */}
                <Banner
                    title={nombre}
                    video={videos[0]} 
                    color={color}
                    categoryId={id} 
                    categoryName={nombre} 
                    isBanner={isBanner}
                />
                {videos.map(video => (
                        <VideoCard key={video.id} categoryId={categoryId} video={video} />
                    )
                )}
                {/* <div className='container-carousel'> */}
                    {/* Renderiza los VideoCards restantes en el carrusel */}
                    {/* <VideoList categoryId={categoryId}/> */}
                {/* </div> */}

            </>
        )
    }
    // return (
    //     // <MySlider>
    //     //     {videos.length > 0 ? (
    //     //         videos.map(video => (
    //     //             <VideoCard key={video.id} categoryId={categoryId} video={video} />
    //     //         ))
    //     //     ) : (
    //     //         <p>No videos found.</p>
    //     //     )}
    //     // </MySlider>
    // );
};

// Exporta el componente VideoList para su uso en otras partes de la aplicación
export default VideoList;