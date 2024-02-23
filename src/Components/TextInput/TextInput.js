// Importar los estilos y los componentes necesarios
import './TextInput.css';
import React from "react";
import { Field, ErrorMessage } from "formik";

function TextInput ({ name, placeholder}) {
    return(
        // Contenedor del campo de texto
        <div className="input-container">
            {/* Etiqueta del campo de texto */}
            <label htmlFor={name}></label>
            {/* Campo de texto utilizando el componente Field de Formik */}
            <Field
                type="text" // Tipo de campo: texto
                id={name} // ID del campo
                name={name} // Nombre del campo
                placeholder={placeholder} // Placeholder del campo
                className="text-input" // Clase para estilos del campo
            />
            {/* Mensaje de error asociado al campo de texto */}
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    );
}

// Exporta el componente TextInput
export default TextInput;
