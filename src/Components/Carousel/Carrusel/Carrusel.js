import React, { useState } from 'react';
import MySlider from '../Slider/Slider';
import VideoCard from '../../VideoCard/VideoCard';
import Banner from '../../Banner/Banner';
import ContainerTitulo from '../../TituloCategoria/ContainerTitulo';
import './StylesCarrusel.css'
// Funcion auxiliar para renderizar los videocards dentro del carrusel
function renderCarouselItems(videos, color, id) {
    // console.log(id);
    return (
        <MySlider>
            {videos.map(( video ) => (
                <div key={video.id}>
                    <VideoCard 
                        imageUrl={video.imageUrl}
                        videoUrl={video.videoUrl}
                        title={video.title}
                        id={video.id}
                        categoryId={id}
                        categoryColor={color}
                    />
                </div>
            ))}
        </MySlider>
    );
}

function Carousel({ categoria, isBanner, color }) {
    // console.log(categoria.id);
    // Estado para determinar si se muestra el banner o el carrusel normal
    const [showBanner, setShowBanner] = useState(isBanner);
    // Desestructurar las propiedades de la categoría
    const { nombre, videos, id } = categoria;
    console.log(videos);
    return (
        <>
            {showBanner && ( // Renderiza el carrusel de banner sin ContainerTitulo
                <>
                    <Banner
                        title={nombre}
                        video={videos[0]} 
                        color={color}
                    />
                    <div className='container-carousel'>
                        {renderCarouselItems(videos.slice(1), color, id)} 
                    </div>
                </>
            )}

            {!showBanner &&( // Renderiza el carrusel normal con ContainerTitulo
                <div className='container-carousel'> 
                    <ContainerTitulo
                        color={color}
                        title={nombre}
                    />
                    {renderCarouselItems(videos, color, id)}
                </div>
            )}
        </>
    ); 
}

export default Carousel;