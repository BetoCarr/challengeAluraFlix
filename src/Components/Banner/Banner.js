import React from 'react';
import banner from "../../assets/img/banner2.webp";
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
                <ContainerTitulo title="Front End" color={colorTurquesa}  width= "32%" height= "3.6rem" fontSize="auto"/>
                <Typography variant="h4" color="text.primary">Challenge React</Typography>
                <Typography variant='body1' color="text.primary">Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</Typography>
            </Box>
            <VideoCard imageUrl={cardPrincipal} videoUrl="https://www.youtube.com/watch?v=QjOWz9avkg8" title="Titulo de prueba" isBanner />
        </Box>
    );
}

export default Banner;