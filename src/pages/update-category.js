import React from "react";
import { useParams } from 'react-router-dom';
import FormNuevoVideo from "../features/videocategories/components/FormNuevoVideo/FormNuevoVideo";
import MainContainer from "../Components/MainContainer/MainContainer";

function UpdateCategory () {

    const { categoryId } = useParams(); // Extrae el categoryId de la URL

    return(
        <MainContainer className={"main-container-form"}>
            <FormNuevoVideo 
                categoryId={categoryId} 
            />
        </MainContainer>
    );
}

export default UpdateCategory;