// Importación de React, componentes y hooks
import React from "react";
import { useSelector } from "react-redux";
import { selectVideoById } from "../../videosSlice";
import FormNuevoVideo from "../FormNuevoVideo/FormNuevoVideo";

// Componente funcional para editar un video existente. Reutiliza el componente `FormNuevoVideo` con valores iniciales preestablecidos.
function FormEditarVideo({ categoryId, videoId  }) {
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
            {/* Reutiliza el componente `FormNuevoVideo` con valores específicos para edición */}
            <FormNuevoVideo 
                initialValuesForEdit={initialValuesForEdit} // Pasa los valores iniciales al formulario
                isEditing={true} // Indica que se trata de un formulario de edición
                videoId={videoId} // ID del video a editar
                categoryId={categoryId} // ID de la categoría asociada
            />
        </>
    )
}

export default FormEditarVideo;