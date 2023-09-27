import React, { useState } from "react";
import MySlider from '../Slider/Slider';
import VideoCard from '../../VideoCard/VideoCard';
import Banner from '../../Banner/Banner';
import ContainerTitulo from '../../TituloCategoria/TituloCategoria';

// Funcion auxiliar para renderizar los videocards dentro del carrusel
function renderCarouselItems(videos) {
    return (
        <MySlider>
            {videos.map((video, index) => (
                <div key={index}>
                    <VideoCard 
                        imageUrl={video.imageUrl}
                        videoUrl={video.videoUrl}
                        title={video.title}
                    />
                </div>
            ))}
        </MySlider>
    );
}


function Carousel({ categoria, isBanner }) {
    // Estado para determinar si se muestra el banner o el carrusel normal
    const [showBanner, setShowBanner] = useState(isBanner);
    
    // Desestructurar las propiedades de la categoría
    const { nombre, videos } = categoria;
    return (
        <>
            {showBanner && ( // Renderiza el carrusel de banner sin ContainerTitulo
                <>
                    <Banner
                        title={nombre}
                        video={videos[0]} 
                    />
                    {renderCarouselItems(videos.slice(1))} 
                </>
            )}

            {!showBanner &&( // Renderiza el carrusel normal con ContainerTitulo
                <>
                    <ContainerTitulo
                        color={"red"}
                        title={nombre}
                        width="32%"
                        height="3.6rem"
                        fontSize="1rem"
                    />
                    {renderCarouselItems(videos)}
                </>
            )}
        </>
    ); 
}

export default Carousel;