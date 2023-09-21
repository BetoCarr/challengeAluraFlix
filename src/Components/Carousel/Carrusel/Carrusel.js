import MySlider from '../Slider/Slider';
import VideoCard from '../../VideoCard/VideoCard';

function Carousel({ videos }) {
    // console.log(videos)
    
    return (
        <div>
            <MySlider>
                {videos.map((video, index) => (
                    <div key={index}>
                        <VideoCard 
                            imageUrl={video.imageUrl}
                            videoUrl={video.videoUrl}
                            title={video.title}
                            isBanner={video.isBanner}
                        />
                    </div>
                ))}
            </MySlider>
        </div>
    );
}

export default Carousel;