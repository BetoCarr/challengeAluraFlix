import React from "react";
import { useParams } from 'react-router-dom';
import FormEditarCategoria from "../features/videocategories/components/FormEditarCategoria/FormEditarCategoria";
import MainContainer from "../Components/MainContainer/MainContainer";

function UpdateCategory () {

    const { categoryId } = useParams(); // Extrae el categoryId de la URL

    return(
        <MainContainer className={"main-container-form"}>
            <FormEditarCategoria 
                categoryId={categoryId} 
            />
        </MainContainer>
    );
}

export default UpdateCategory;