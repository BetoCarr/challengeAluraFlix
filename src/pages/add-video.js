import React from "react";
import { useParams } from 'react-router-dom';
import FormNuevoVideo from "../features/videos/components/FormNuevoVideo/FormNuevoVideo";
import MainContainer from "../Components/MainContainer/MainContainer";

function AddVideo () {

    const { categoryId } = useParams(); // Extrae el categoryId de la URL
    // console.log(categoryId)
    return(
        <MainContainer className={"main-container-form"}>
            <FormNuevoVideo 
                categoryId={categoryId} 
            />
        </MainContainer>
    );
}

export default AddVideo;