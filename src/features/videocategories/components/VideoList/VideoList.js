// Importa React y los componentes necesariosy hooks de Redux
import './StyleVideoCard.css'
import React, { useEffect } from 'react';
import MySlider from '../../../../Components/Slider/Slider';
import Banner from '../Banner/Banner';
import ContainerTitulo from '../ContainerTitulo/ContainerTitulo';
import VideoCard from './VideoCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideosByCategory, selectVideosByCategory } from '../../../videos/videosSlice';

// Componente funcional para renderizar las listas de videos
function VideoList({ category }){

    const dispatch = useDispatch();


    const videoStatus = useSelector(state => state.videos.status)
    const videos = useSelector((state) => selectVideosByCategory(state, category.id));

    // Obtiene la categoría del store usando el selector
    // const category = useSelector(state => selectCategoryById(state, categoryId));
    // console.log(category.id)

    useEffect(() => {
        if(videoStatus === 'idle') {
            dispatch(fetchVideosByCategory({ categoryId: category.id }));
        }
    }, [videoStatus, category.id, dispatch])

    // console.log(videoStatus)
    console.log(videos)
    
    // if(videoStatus === 'loading') {
    //     console.log("CARgando")
    // } else if( videoStatus === 'succeeded') {
    //     // console.log(videos)

    // } else if (videoStatus === 'failed') {
    //     console.log("Fallo")
    // }
    // Verifica si la categoría es un banner
    // if(category.isBanner === true) {
    //     // Omite el primer video si es un banner
    //     const videosToRender = videos.videos.slice(1); 

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
    //                 {videos.videos.length > 0 ? (
    //                     videos.videos.map(video => (
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