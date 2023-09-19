import React from 'react';
import banner from "../../assets/img/banner-deporte.jpg"
import cardPrincipal from "../../assets/img/player.png"
import { colorGrisLigero, colorTurquesa } from "../../Components/UI/variables";
// import { BtnGrisLigero } from "../UI/Ui";
// import{ StyleTitleXL } from "../TituloCategoria/TituloCategoria"
import VideoCard from "../VideoCard/VideoCard"
import Box from '@mui/material/Box';
import ContainerTitulo from "../TituloCategoria/TituloCategoria"
import Typography from "@mui/material/Typography";

function Banner () {
    return(
        <Box
            sx={{
                width: "100%",
                height: "30rem",
                display: "flex",
                alignItems: "center",
                padding: "1.5rem",
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover", 
                backgroundPosition: "center",
            }}
            component="section"
        >
            <Box sx={{
                    marginRight: "0.5rem", 
                    maxWidth: "50%"
                }}
            >
                <ContainerTitulo title="Fut-Bol" color={colorTurquesa}  width= "32%" height= "3.6rem" fontSize="auto"/>
                <Typography variant="h4" color="text.primary">Explora y Aprende Deportes</Typography>
                <Typography variant='body1' color="text.primary">SportFlix te invita a explorar y aprender una variedad de deportes emocionantes. Sumérgete en el mundo del deporte, desde el longboarding hasta el fútbol y el frontenis. Nuestra plataforma está diseñada para ayudarte a adquirir nuevas habilidades y conocimientos deportivos mientras te diviertes. ¡Unete a la aventura deportiva ahora!</Typography>
            </Box>
            <VideoCard imageUrl={cardPrincipal} videoUrl="https://www.youtube.com/watch?v=QjOWz9avkg8" title="Titulo de prueba" isbanner={true.toString()}  />
        </Box>
    );
}

export default Banner;