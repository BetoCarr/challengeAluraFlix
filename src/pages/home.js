import React from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Banner from "../Components/Banner/Banner";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";

function Home ({categorias}) {
    console.log("categorias >>>" + categorias)
    return(
        <MainContainer>
            <Banner />
            {categorias.map((categoria, index) => (
                <Carousel
                    key={index}
                    videos={categoria.videos}
                />
            ))}
        </MainContainer>
    );
}


export default Home;