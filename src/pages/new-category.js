// Importa React y componentes
import React from "react";
import MainContainer from "../Components/MainContainer/MainContainer";
import FormNuevaCategoria from "../features/categories/components/FormNuevaCategoria/FormNuevaCategoria";

// Componente principal para la página de agregar una nueva categoría
function NewCategory () {
    return(
        // Usa el componente MainContainer como contenedor principal y aplica una clase para estilizarlo
        <MainContainer className={"main-container-form"}>
            {/* Renderiza el formulario para agregar una nueva categoría */}
            <FormNuevaCategoria />
        </MainContainer>
    );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default NewCategory;