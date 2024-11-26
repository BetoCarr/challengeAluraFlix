// Importa React y componentes
import React from "react";
import { useParams } from 'react-router-dom';
import UpdateCategoryForm from "../features/categories/components/UpdateCategoryForm/UpdateCategoryForm";
import MainContainer from "../Components/MainContainer/MainContainer";

// Componente principal para la página de actualización de categorías
function UpdateCategory () {
    // Obtiene el ID de la categoría desde los parámetros de la URL
    const { categoryId } = useParams(); // Extrae el categoryId de la URL

    return(
        // Usa el componente MainContainer como contenedor principal, con una clase para estilizar
        <MainContainer className={"main-container-form"}>
            {/* Renderiza el formulario para editar una categoría, pasándole el ID de la categoría como prop */}
            <UpdateCategoryForm categoryId={categoryId} />
        </MainContainer>
    );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default UpdateCategory;