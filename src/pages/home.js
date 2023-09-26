import React from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Banner from "../Components/Banner/Banner";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";

function Home ({categorias}) {
    // console.log(categorias)
    return(
        <MainContainer>
            {/* <Banner /> */}
            {categorias.map((categoria, index) => (
                <Carousel
                    key={index}
                    categoria={categoria}
                    isBanner={categoria.isBanner}
                />
            ))}
        </MainContainer>
    );
}


export default Home;