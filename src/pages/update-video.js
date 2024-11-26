// Importa React y componentes
import React from "react";
import { useParams } from 'react-router-dom';
import UpdateVideoForm from "../features/videos/components/UpdateVideoForm/UpdateVideoForm";
import MainContainer from "../Components/MainContainer/MainContainer";

// Componente principal para la página de edición de videos
function UpdateVideo () {
    // Obtiene los IDs de la categoría y del video desde los parámetros de la URL
    const { categoryId, videoId } = useParams();
    
    return(
        // Usa el componente MainContainer como contenedor principal
        <MainContainer>
            {/* Renderiza el formulario para editar un video, pasando los IDs de categoría y video como props */}
            <UpdateVideoForm 
                categoryId={categoryId}
                videoId={videoId}
            />
        </MainContainer>
    )
}

// Exporta el componente para que pueda ser usado en otras partes de la aplicación
export default UpdateVideo;