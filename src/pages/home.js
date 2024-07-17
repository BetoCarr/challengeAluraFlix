// Importa React y los componentes necesarios
import React, {useEffect} from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Carousel from "../Components/Carousel/Carrusel/Carrusel";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../features/videocategories/videoCategoriesSlice';
// import { useCategorias } from '../CategoriaContext';

// Función principal del componente Home
function Home () {
    // // Utiliza el hook useCategorias para obtener la lista de categorías
    // const categorias = useCategorias();
    // // console.log(categorias);
    const dispatch = useDispatch();
    const categorias = useSelector(selectAllCategories);

    // Llama al thunk para obtener las categorías cuando el componente se monta
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Identifica la categoría marcada actualmente como Banner
    const currentBannerCategory = categorias.find(categoria => categoria.isBanner);

  // Ordena las categorías, colocando la categoría marcada como banner primero
    const categoriasOrdenadas = [...categorias].sort((a, b) => {
        if (a.isBanner) return -1; // La categoría a es marcada como banner
        if (b.isBanner) return 1; // La categoría b es marcada como banner
        return 0; // Ninguna de las categorías es marcada como banner
    });

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