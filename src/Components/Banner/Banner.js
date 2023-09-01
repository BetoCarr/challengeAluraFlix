import React from 'react';
import styled from 'styled-components';
import banner from "../../assets/img/banner2.webp";
import cardPrincipal from "../../assets/img/player.png"
import { colorGrisLigero } from "../../Components/UI/variables";
// import { BtnGrisLigero } from "../UI/Ui";
import{ StyleTitleXL } from "../TituloCategoria/TituloCategoria"
import { VideoCardLarge } from "../VideoCard/VideoCard"
const StyleBanner = styled.section`
    background-image: url(${banner});
    background-size: cover;
    background-position: center;
    height: 532px;
    display: flex;
    align-items: center;
    padding: 1.5rem;
`
const BannerSubTitle= styled.h2`
    font-size: 30px;
    font-weight: 300;
    color: ${colorGrisLigero};
    margin-bottom: 2rem;
`
const BannerText = styled.p`
    font-size: 18px;
    font-weight: 300;
    color: ${colorGrisLigero};
`
const ContainerText = styled.div`
    max-width: 664px;
    height: auto;
`

function Banner () {
    return(
        <StyleBanner>
            <ContainerText>
                <StyleTitleXL>Front End</StyleTitleXL>
                <BannerSubTitle>Challenge React</BannerSubTitle>
                <BannerText>Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</BannerText>
            </ContainerText>
            <VideoCardLarge src={cardPrincipal} />
            {/* <BtnGrisLigero>Ver</BtnGrisLigero> */}
        </StyleBanner>
    );
}

export default Banner;