// Importa React y los componentes necesariosy hooks de Redux
import './StyleVideoCard.css'
import React from 'react';
import MySlider from '../../../../Components/Slider/Slider';
import Banner from '../Banner/Banner';
import ContainerTitulo from '../ContainerTitulo/ContainerTitulo';
import VideoCard from './VideoCard';
import { obtnerVideosCategoryId } from '../../../../api/api';
// Componente funcional para renderizar las listas de videos
function VideoList({ category }){

    // Obtiene la categoría del store usando el selector
    // const category = useSelector(state => selectCategoryById(state, categoryId));
    console.log(category.id)

    const fetchVideos = async (id) => {
        // setLoading(true); // Muestra indicador de carga
        const videosData = await obtnerVideosCategoryId(id);
        console.log(videosData.data)
        // setVideos(videosData); // Actualiza el estado con los videos obtenidos
        // setLoading(false); // Oculta indicador de carga
    };   

    fetchVideos(category.id)
    // console.log(videos)

    // // Verifica si la categoría es un banner
    // if(category.isBanner === true) {
    //     // Omite el primer video si es un banner
    //     const videosToRender = category.videos.slice(1); 

    //     // Renderiza el carrusel de banner sin ContainerTitulo
    //     return(
    //         <>
    //             {/* Renderiza el Banner con el primer video de la categoría */}
    //             <Banner categoryId={category.id} />
    //             <div className='container-videolist'>
    //                 {/* Renderiza el slider con los videos restantes */}
    //                 <MySlider>
    //                     {videosToRender.map(video => (
    //                             <VideoCard key={video.id} categoryId={category.id} video={video} />
    //                         )
    //                     )}
    //                 </MySlider>
    //             </div>
    //         </>
    //     )
    // } else {
    //     // Renderiza la lista de videos normal con ContainerTitulo
    //     return(
    //         <div className='container-videolist'>
    //             {/* Renderiza el título de la categoría */}
    //             <ContainerTitulo categoryId={category.id} />
    //             {/* Renderiza el slider con los videos de la categoría */}
    //             <MySlider>
    //                 {category.videos.length > 0 ? (
    //                     category.videos.map(video => (
    //                         <VideoCard key={video.id} categoryId={category.id} video={video} />
    //                     ))
    //                 ) : (
    //                     <p>No videos found.</p>
    //                 )}
    //             </MySlider>
    //         </div>
    //     )
    // }
    
};

// Exporta el componente VideoList para su uso en otras partes de la aplicación
export default VideoList;