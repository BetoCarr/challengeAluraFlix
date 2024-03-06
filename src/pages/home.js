// Importa React y los componentes necesarios
import React from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";
import { useCategorias } from '../CategoriaContext';

// Función principal del componente Home
function Home () {

    // Utiliza el hook useCategorias para obtener la lista de categorías
    const categorias = useCategorias();
    // Retorna la estructura principal del componente
    return(
        <MainContainer>
            {/* Mapea cada categoría y renderiza un Carousel para cada una */}
            {categorias.map((categoria, index) => (
                <Carousel
                    key={index} // Clave única para el mapeo de React
                    categoria={categoria} // Pasa la categoría al componente Carousel
                    isBanner={categoria.isBanner} // Pasa la propiedad isBanner al componente Carousel
                />
            ))}
        </MainContainer>
    );
}

// Exporta el componente Home
export default Home;