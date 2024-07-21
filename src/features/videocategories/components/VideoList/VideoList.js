// Importa React y los componentes necesarios
import './StyleVideoCard.css'
import React from 'react';
import { useSelector } from 'react-redux';
import MySlider from '../../../../Components/Slider/Slider';
import { selectVideosByCategoryId } from '../../videoCategoriesSlice';
import VideoCard from './VideoCard';

// Función para renderizar video-cards
function VideoList({ categoryId }){

    const videos = useSelector(state => selectVideosByCategoryId(state, categoryId)) || [];
    console.log(videos)

    return (
        <MySlider>
            {videos.length > 0 ? (
                videos.map(video => (
                    <VideoCard key={video.id} categoryId={categoryId} video={video} />
                ))
            ) : (
                <p>No videos found.</p>
            )}
        </MySlider>
    );
};

// Exporta el componente VideoList para su uso en otras partes de la aplicación
export default VideoList;