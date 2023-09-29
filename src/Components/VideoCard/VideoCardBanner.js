import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';

function VideoCardBanner({ videoUrl, title, imageUrl, categoryColor }){
    const theme = useTheme();

    const cardStyles = {
        border: `4px solid ${categoryColor}`, 
        borderRadius: '8px', 
    };

    return (
        <Card sx={{width:"45%"}} style={cardStyles}>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia component="div">
                    <img src={imageUrl} alt={title} style={{width:"100%"}}/>
                </CardMedia>
                <Typography color="text.primary" sx={{backgroundColor:theme.palette.primary.main, padding:"0.5rem"}}>{title}</Typography>
            </a>
        </ Card>
    );
};

export default VideoCardBanner;