// Importa React y el componente FormNuevaCategoria
import React from "react";
import FormNuevaCategoria from "../FormNuevaCategoria/FormNuevaCategoria";

// Definición del componente FormEditarCategoria
function FormEditarCategoria({ initialValuesForEdit }) {
    // Retorna el componente FormNuevaCategoria con los valores iniciales para la edición
    return (
        <FormNuevaCategoria initialValuesForEdit={initialValuesForEdit} />
    );
}

// Exporta el componente FormEditarCategoria para su uso en otras partes de la aplicación
export default FormEditarCategoria;