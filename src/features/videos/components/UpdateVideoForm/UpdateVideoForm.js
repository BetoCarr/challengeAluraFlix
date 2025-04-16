// Importación de React, componentes y hooks
import React from "react";
import { useSelector } from "react-redux";
import { selectVideoById } from "../../videosSlice";
import NewVideoForm from "../NewVideoForm/NewVideoForm";

// Componente funcional para editar un video existente. Reutiliza el componente `NewVideoForm` con valores iniciales preestablecidos.
function UpdateVideoForm({ categoryId, videoId  }) {
    // Obtiene los datos del video del estado global utilizando Redux
    const video = useSelector(state => selectVideoById(state, videoId));
    // Desestructuración de las propiedades del video.
    const { title, videoUrl, imageUrl } = video

    // Valores iniciales para el formulario de edición
    const initialValuesForEdit = {
        title, 
        videoUrl,
        imageUrl 
    };

    return (    
        <>
            {/* Reutiliza el componente `NewVideoForm` con valores específicos para edición */}
            <NewVideoForm 
                initialValuesForEdit={initialValuesForEdit} // Pasa los valores iniciales al formulario
                isEditing={true} // Indica que se trata de un formulario de edición
                videoId={videoId} // ID del video a editar
                categoryId={categoryId} // ID de la categoría asociada
            />
        </>
    )
}

export default UpdateVideoForm;