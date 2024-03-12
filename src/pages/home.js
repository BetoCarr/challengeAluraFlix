// Importa React y los componentes necesarios
import React from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";
import { useCategorias } from '../CategoriaContext';

// Función principal del componente Home
function Home () {
    // Utiliza el hook useCategorias para obtener la lista de categorías
    const categorias = useCategorias();
    // Identifica la categoría marcada actualmente como Banner
    const currentBannerCategory = categorias.find(categoria => categoria.isBanner);
    console.log(currentBannerCategory)
  // Ordena las categorías, colocando la categoría marcada como banner primero
    const categoriasOrdenadas = [...categorias].sort((a, b) => {
        if (a.isBanner) return -1; // La categoría a es marcada como banner
        if (b.isBanner) return 1; // La categoría b es marcada como banner
        return 0; // Ninguna de las categorías es marcada como banner
    });
    // // Loguea la categoría marcada actualmente como Banner solo cuando se renderiza el componente por primera vez
    // useEffect(() => {
    //     console.log(currentBannerCategory);
    // }, [])    // Retorna la estructura principal del componente

    return(
        <MainContainer>
            {/* Mapea cada categoría y renderiza un Carousel para cada una */}
            {categoriasOrdenadas.map((categoria, index) => (
                <Carousel
                    key={index} // Clave única para el mapeo de React
                    categoria={categoria} // Pasa la categoría al componente Carousel
                    isBanner={categoria === currentBannerCategory} // Pasa el estado de banner al componente Carousel
                />
            ))}
        </MainContainer>
    );
}

// Exporta el componente Home
export default Home;