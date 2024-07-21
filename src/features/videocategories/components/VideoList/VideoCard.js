import './StyleVideoCard.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteVideoButton from '../../../../Components/DeleteForeverIcon/DeleteIcon';
import LikeIcon from '../../../../Components/LikeIcon/LikeIcon';
import Box from '@mui/material/Box';
import { selectCategoryById } from '../../videoCategoriesSlice';

const VideoCard = ({ categoryId, video }) => {
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const categoryColor = category?.color || 'defaultColor';

    const cardBorder = {
        border: `4px solid ${categoryColor}`,
        borderRadius: '8px',
    };

    const isBanner = category?.isBanner || false;
    const cardClassName = isBanner ? 'card-banner' : 'card';
    const imgClassName = isBanner ? 'image-card-banner' : 'image-card';

    const handleVideoDeleted = () => {
        window.location.reload();
    };

    return (
        <Card style={cardBorder} className={cardClassName}>
            <a href={video.url} target='_blank' rel='noopener noreferrer'>
                <CardMedia component='div'>
                    <img src={video.imageUrl} alt={video.title} className={imgClassName} />
                </CardMedia>
            </a>
            <Box component="div" className='icotypo-container'>
                <div className="title-container">
                    <Typography variant='body1' className='typography-card'>{video.title}</Typography>
                </div>
                <div className="icon-container">
                    <LikeIcon
                        videoId={video.id}
                        title={video.title}
                    />
                    <DeleteVideoButton
                        categoryId={categoryId}
                        videoId={video.id}
                        onVideoDeleted={handleVideoDeleted}
                        title={video.title}
                    />
                </div>
            </Box>
        </Card>
    );
};

export default VideoCard;
