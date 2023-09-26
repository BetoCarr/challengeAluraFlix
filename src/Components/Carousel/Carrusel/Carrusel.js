import MySlider from '../Slider/Slider';
import VideoCard from '../../VideoCard/VideoCard';
import Banner from '../../Banner/Banner';

function Carousel({ categoria, isBanner }) {
    console.log(categoria.videos[0])
    return (
        <div>
            {isBanner && (
                <Banner
                    title={categoria.nombre}
                    video={categoria.videos[0]} 
                />
            )}
            <MySlider>
                {categoria.videos.map((video, index) => (
                    <div key={index}>
                        <VideoCard 
                            imageUrl={video.imageUrl}
                            videoUrl={video.videoUrl}
                            title={video.title}
                        />
                    </div>
                ))}
            </MySlider>
        </div>
    );
}

export default Carousel;