// Importa React y los componentes necesarios
import React, {useEffect} from 'react';
import MainContainer from "../Components/MainContainer/MainContainer";
import Carousel from "../features/videocategories/components/Carrusel/Carrusel";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, selectAllCategories, selectCategoryIds } from '../features/videocategories/videoCategoriesSlice';

// Función principal del componente Home
function Home () {
    // Obtiene el dispatch de Redux para enviar acciones
    const dispatch = useDispatch()

    // Obtiene las categorías del estado de Redux usando un selector
    const categorias = useSelector(selectAllCategories)

    const categoriasIds = useSelector(selectCategoryIds)
    console.log(categoriasIds)
    // Obtiene el estado de las categorías y el posible error del estado de Redux
    const categoriesStatus = useSelector(state => state.videoCategories.status)
    const error = useSelector(state => state.videoCategories.error)

    // Llama al thunk para obtener las categorías cuando el componente se monta
    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories())
        }
    }, [categoriesStatus, dispatch])

    // Identifica la categoría marcada actualmente como Banner
    const currentBannerCategory = categorias.find(categoria => categoria.isBanner)

    // Variable para almacenar el contenido a renderizar
    let content

    // Determina qué contenido mostrar basado en el estado de las categorías
    if (categoriesStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (categoriesStatus === 'succeeded') {
        content = categorias.map((categoria, index) => (
            <Carousel
                key={index}
                categoria={categoria}
                isBanner={categoria === currentBannerCategory}
            />
        ))
    } else if (categoriesStatus === 'failed') {
        content = <p>Error: {error}</p>
    }

    return(
        <MainContainer>
            {content}
        </MainContainer>
    )
}

// Exporta el componente Home
export default Home