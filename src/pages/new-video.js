import React from "react";
import MainContainer from "../Components/MainContainer/MainContainer";
import FormNuevoVideo from "../Components/FormNuevoVideo/FormNuevoVideo";

function NewVideo () {
    return(
        <MainContainer className={"main-container-form"}>
            <FormNuevoVideo />
        </MainContainer>
    );
}

export default NewVideo;