import React from "react";
import { useParams } from 'react-router-dom';
import FormEditarVideo from "../features/videos/components/FormEditarVideo/FormEditarVideo";
import MainContainer from "../Components/MainContainer/MainContainer";

function UpdateVideo () {

    const { categoryId, videoId } = useParams(); // Extrae el categoryId de la URL
    console.log(videoId)
    return(
        <MainContainer>
            <FormEditarVideo 
                categoryId={categoryId}
            />
        </MainContainer>
    )
}

export default UpdateVideo;