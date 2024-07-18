// Importa React y los componentes necesarios
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
import MySlider from '../../../../Components/Slider/Slider';
import VideoCard from '../VideoCard/VideoCard';
import Banner from '../../../../Components/Banner/Banner';
import ContainerTitulo from '../../../../Components/ContainerTitulo/ContainerTitulo';
import './StylesCarrusel.css'

// // Funcion auxiliar para renderizar los videocards dentro del carrusel
// function renderCarouselItems(videos, color, id) {
//     return (
//         <MySlider>
//             {videos.map(( video ) => (
//                 <div key={video.id}>
//                     {/* Renderiza cada VideoCard dentro del slider */}
//                     <VideoCard 
//                         imageUrl={video.imageUrl}
//                         videoUrl={video.videoUrl}
//                         title={video.title}
//                         id={video.id}
//                         categoryId={id}
//                         categoryColor={color}
//                     />
//                 </div>
//             ))}
//         </MySlider>
//     );
// }

// Componente principal Carousel
function Carousel({ categoryId }) {    
    // Estado para determinar si se muestra el banner o el carrusel normal
    // const [showBanner, setShowBanner] = useState(isBanner);

    const categoria = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre, videos, color, id, isBanner } = categoria;
    // console.log(categoria)


    // Retorna componente principal
    return (
        <>
            {isBanner && ( // Renderiza el carrusel de banner sin ContainerTitulo
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
                    <div className='container-carousel'>
                        {/* Renderiza los VideoCards restantes en el carrusel */}
                        <VideoCard categoryId={categoryId} />
                    </div>
                </>
            )}

            {!isBanner &&( // Renderiza el carrusel normal con ContainerTitulo
                <div className='container-carousel'> 
                    {/* Renderiza el título de la categoría en un contenedor */}
                    <ContainerTitulo
                        color={color}
                        title={nombre}
                        categoryId={id} 
                        categoryName={nombre} 
                        isBanner={isBanner}
                    />
                    {/* Renderiza los VideoCards en el carrusel */}
                    <VideoCard categoryId={categoryId} />
                </div>
            )}
        </>
    ); 
}

// Exporta el componente Carousel para su uso en otras partes de la aplicación
export default Carousel;