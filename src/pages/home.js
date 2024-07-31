// Importa React y los componentes necesarios
import React, {useEffect} from 'react';
import { CircularProgress } from '@mui/material';
import MainContainer from "../Components/MainContainer/MainContainer";
import VideoList from '../features/videocategories/components/VideoList/VideoList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../features/videocategories/videoCategoriesSlice';

// Función principal del componente Home
function Home () {
    // Obtiene el dispatch de Redux para enviar acciones
    const dispatch = useDispatch()

    // Obtiene los ids de las categorías del estado de Redux usando un selector
    const categories = useSelector(selectAllCategories)
    console.log(categories)
    // Obtiene el estado de las categorías y el posible error del estado de Redux
    const categoriesStatus = useSelector(state => state.videoCategories.status)
    const error = useSelector(state => state.videoCategories.error)

    // Llama al thunk para obtener las categorías cuando el componente se monta
    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories())
        }
    }, [categoriesStatus, dispatch])

    // Variable para almacenar el contenido a renderizar
    let content

    // Determina qué contenido mostrar basado en el estado de las categorías
    if (categoriesStatus === 'loading') {
        content = <CircularProgress />
    } else if (categoriesStatus === 'succeeded') {
        content = categories.map((category) => (
            <VideoList
                key={category.id}
                category={category}
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