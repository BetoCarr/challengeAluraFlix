// Importa React y los componentes necesarios
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../features/videocategories/videoCategoriesSlice';
import { fetchVideos } from '../features/videos/videosSlice';
import MainContainer from "../Components/MainContainer/MainContainer";
import HomePageSkeleton from '../Components/HomePageSkeleton/HomePageSkeleton';
import VideoList from '../features/videos/components/VideoList/VideoList';


function Home () {

    // Obtiene el dispatch de Redux para enviar acciones
    const dispatch = useDispatch()

    // Obtiene los ids de las categorías del estado de Redux usando un selector
    const categories = useSelector(selectAllCategories)

    // Obtiene el estado de las categorías y el posible error del estado de Redux
    const categoryStatus = useSelector(state => state.videoCategories.status)
    const videosStatus = useSelector(state => state.videos.status)
    const categoryError = useSelector(state => state.videoCategories.error)
    const videoError = useSelector((state) => state.videos.error);

    // Llama al thunk para obtener las categorías y videos cuando el componente se monta
    useEffect(() => {
        if (categoryStatus === 'idle' || videosStatus === 'idle') {
            dispatch(fetchCategories());
            dispatch(fetchVideos());
        }
    }, [categoryStatus, videosStatus, dispatch]);

    const renderCategories = () =>
        categories.map((category) => (
            <VideoList key={category.id} category={category} />
        ));

    // Variable para almacenar el contenido a renderizar
    let content

    // Determina qué contenido mostrar basado en el estado de las categorías
    if (categoryStatus === 'loading' && videosStatus === 'loading') {
        content = (
            <HomePageSkeleton />
        )
    } else if (categoryStatus === 'succeeded' && videosStatus === 'succeeded') {
        content = renderCategories();
    } else if (categoryStatus === 'failed' || videosStatus === 'failed') {
        content = (
            <p>
                Error en categorías: {categoryError} <br />
                Error en videos: {videoError}
            </p>
        );
    }

    return(
        <MainContainer>{content}</MainContainer>
    )
}

// Exporta el componente Home
export default Home