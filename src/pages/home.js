import React from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";
import { useCategorias } from '../CategoriaContext';

function Home () {
    const categorias = useCategorias();
    return(
        <MainContainer>
            {categorias.map((categoria, index) => (
                <Carousel
                    key={index}
                    categoria={categoria}
                    isBanner={categoria.isBanner}
                    color={categoria.color}
                />
            ))}
        </MainContainer>
    );
}

export default Home;