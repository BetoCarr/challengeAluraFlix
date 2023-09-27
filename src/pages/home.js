import React from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";

function Home ({categorias}) {
    return(
        <MainContainer>
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