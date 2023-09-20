import React from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Banner from "../Components/Banner/Banner";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";



function Home ({categorias}) {
    console.log(categorias)
    return(
        <MainContainer>
            <Banner />
            {/* <Carousel url={"/categorias"} /> */}
        </MainContainer>
    );
}


export default Home;