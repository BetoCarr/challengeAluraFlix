import React from "react";
import FormNuevoVideo from "../FormNuevoVideo/FormNuevoVideo";
import { useSelector } from "react-redux";
import { selectVideoById } from "../../videosSlice";
function FormEditarVideo({ categoryId, videoId  }) {

    const video = useSelector(state => selectVideoById(state, videoId));
    const { title, videoUrl, imageUrl } = video

    // console.log(imageUrl, title, videoUrl)

    // Crea los valores iniciales para el formulario de edición
    const initialValuesForEdit = {
        title, 
        videoUrl,
        imageUrl 
    };

    // console.log(initialValuesForEdit)

    return (    
        <>
            <FormNuevoVideo 
                initialValuesForEdit={initialValuesForEdit}
                isEditing={true}
                categoryId={categoryId}
            />
        </>
    )
}

export default FormEditarVideo;