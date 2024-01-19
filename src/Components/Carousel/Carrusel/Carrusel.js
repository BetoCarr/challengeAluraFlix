// Importa React y los componentes necesarios
import React, { useState } from 'react';
import MySlider from '../Slider/Slider';
import VideoCard from '../../VideoCard/VideoCard';
import Banner from '../../Banner/Banner';
import ContainerTitulo from '../../TituloCategoria/ContainerTitulo';
import './StylesCarrusel.css'

// Funcion auxiliar para renderizar los videocards dentro del carrusel
function renderCarouselItems(videos, color, id) {
    return (
        <MySlider>
            {videos.map(( video ) => (
                <div key={video.id}>
                    {/* Renderiza cada VideoCard dentro del slider */}
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

// Componente principal Carousel
function Carousel({ categoria, isBanner, color, onDelete }) {
    // console.log(categoria)
    // Estado para determinar si se muestra el banner o el carrusel normal
    const [showBanner, setShowBanner] = useState(isBanner);

    // Desestructurar las propiedades de la categoría
    const { nombre, videos, id } = categoria;

    // Función para manejar la eliminación de la categoría
    const handleEliminarCategoria = () => {
        // Lógica para confirmar la eliminación y llamar a la función onDelete
        if (window.confirm(`¿Seguro que deseas eliminar la categoría "${nombre}"?`)) {
            onDelete(); // Pasa el ID de la categoría al componente padre
        }
    };

    return (
        <>
            {showBanner && ( // Renderiza el carrusel de banner sin ContainerTitulo
                <>
                    {/* Renderiza el Banner con el primer video de la categoría */}
                    <Banner
                        title={nombre}
                        video={videos[0]} 
                        color={color}
                    />
                    <div className='container-carousel'>
                        {/* Renderiza los VideoCards restantes en el carrusel */}
                        {renderCarouselItems(videos.slice(1), color, id)} 
                    </div>
                </>
            )}

            {!showBanner &&( // Renderiza el carrusel normal con ContainerTitulo
                <div className='container-carousel'> 
                    {/* Renderiza el título de la categoría en un contenedor */}
                    <ContainerTitulo
                        color={color}
                        title={nombre}
                        onDelete={handleEliminarCategoria} // Pasa la función de eliminación al ContainerTitulo
                    />
                    {/* Renderiza los VideoCards en el carrusel */}
                    {renderCarouselItems(videos, color, id)}
                </div>
            )}
        </>
    ); 
}

// Exporta el componente Carousel para su uso en otras partes de la aplicación
export default Carousel;