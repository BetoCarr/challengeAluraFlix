import React from 'react';
import styled from 'styled-components';
import banner from "../../assets/img/banner2.webp";
import { colorGrisLigero } from "../../Components/UI/variables";
import { BtnGrisLigero } from "../UI/Ui";

const StyleBanner = styled.section`
    background-image: url(${banner});
    background-size: cover;
    background-position: center;
    height: 258px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 1rem;
`
const BannerText = styled.h2`
    font-size: 30px;
    font-weight: 300;
    color: ${colorGrisLigero};
    margin-bottom: 2rem;
`

function Banner () {
    return(
        <StyleBanner>
            <BannerText>Challenge React</BannerText>
            <BtnGrisLigero>Ver</BtnGrisLigero>
        </StyleBanner>
    );
}

export default Banner;