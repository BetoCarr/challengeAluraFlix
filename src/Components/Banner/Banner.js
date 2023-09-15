import React from 'react';
import styled from 'styled-components';
import banner from "../../assets/img/banner2.webp";
import cardPrincipal from "../../assets/img/player.png"
import { colorGrisLigero, colorTurquesa } from "../../Components/UI/variables";
// import { BtnGrisLigero } from "../UI/Ui";
// import{ StyleTitleXL } from "../TituloCategoria/TituloCategoria"
import { VideoCardLarge } from "../VideoCard/VideoCard"
import Box from '@mui/material/Box';
import ContainerTitulo from "../TituloCategoria/TituloCategoria"
import Typography from "@mui/material/Typography";

const BannerSubTitle= styled.h2`
    font-size: 2rem;
    font-weight: 300;
    color: ${colorGrisLigero};
    margin-bottom: 2rem;
`
const BannerText = styled.p`
    font-size: 1.2rem;
    font-weight: 300;
    color: ${colorGrisLigero};
`

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
                    marginRight: "0.5rem"
                }}
            >
                <ContainerTitulo title="Front End" color={colorTurquesa}  width= "30%" height= "5rem" fontSize="2.3rem"/>
                <Typography variant="h4" color="text.primary">Challenge React</Typography>
                <Typography variant='body1' color="text.primary">Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</Typography>
            </Box>
            <VideoCardLarge src={cardPrincipal} />
            {/* <BtnGrisLigero>Ver</BtnGrisLigero> */}
        </Box>
    );
}

export default Banner;