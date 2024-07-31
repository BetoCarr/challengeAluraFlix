import React from "react";
import MainContainer from "../Components/MainContainer/MainContainer";
import FormNuevaCategoria from "../features/videocategories/components/FormNuevaCategoria/FormNuevaCategoria";

function NewCategory () {
    return(
        <MainContainer className={"main-container-form"}>
            <FormNuevaCategoria />
        </MainContainer>
    );
}

export default NewCategory;