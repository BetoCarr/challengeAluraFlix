// Importa React y los componentes necesarios
import React, {useEffect} from 'react';
import { CircularProgress } from '@mui/material';
import MainContainer from "../Components/MainContainer/MainContainer";
import VideoList from '../features/videos/components/VideoList/VideoList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../features/videocategories/videoCategoriesSlice';
import { fetchVideos } from '../features/videos/videosSlice';
import { useFeedback } from '../features/feedbackdialog/feedBackDialogContext';


// Función principal del componente Home
function Home () {


    const { feedback, openFeedback } = useFeedback()
    console .log({ feedback, openFeedback })


    // Obtiene el dispatch de Redux para enviar acciones
    const dispatch = useDispatch()

    // Obtiene los ids de las categorías del estado de Redux usando un selector
    const categories = useSelector(selectAllCategories)

    // Obtiene el estado de las categorías y el posible error del estado de Redux
    const categoriesStatus = useSelector(state => state.videoCategories.status)
    const videosStatus = useSelector(state => state.videos.status)
    const error = useSelector(state => state.videoCategories.error)

    // Llama al thunk para obtener las categorías cuando el componente se monta
    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories())
            dispatch(fetchVideos());
        }
    }, [categoriesStatus, dispatch])


    // Variable para almacenar el contenido a renderizar
    let content

    // Determina qué contenido mostrar basado en el estado de las categorías
    if (categoriesStatus === 'loading' && videosStatus === 'loading') {
        content = <CircularProgress />
    } else if (categoriesStatus === 'succeeded' && videosStatus === 'succeeded') {
        content = categories.map((category) => {
            return (
                <VideoList
                    key={category.id}
                    category={category}
                />
            );
        });
    } else if (categoriesStatus === 'failed') {
        content = <p>Error: {error}</p>
    }

    return(
        <MainContainer> 
            <button 
                onClick={() => openFeedback("FeedbackDialog", { message: "Quieres eliminar el video", showActions: true})}
            >
                Oprime
            </button>
            {content}
        </MainContainer>
    )
}

// Exporta el componente Home
export default Home