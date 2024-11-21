// Importación de React y componentes
import React from "react";
import { useParams } from 'react-router-dom';
import FormNuevoVideo from "../features/videos/components/FormNuevoVideo/FormNuevoVideo";
import MainContainer from "../Components/MainContainer/MainContainer";

// Componente principal para la página de agregar un nuevo video
function AddVideo () {
    const { categoryId } = useParams(); // Obtiene el `categoryId` desde los parámetros de la URL usando el hook `useParams`
    return(
        // Usa el componente MainContainer como contenedor principal, aplicando una clase específica
        <MainContainer className={"main-container-form"}>
            {/* Renderiza el formulario para agregar un nuevo video, pasando el `categoryId` como prop */}
            <FormNuevoVideo categoryId={categoryId}/>
        </MainContainer>
    );
}

// Exporta el componente para su uso en otras partes de la aplicación
export default AddVideo;