// Importa React y el componente FormNuevaCategoria
import React from "react";
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../categoriesSlice';
import NewCategoryForm from "../NewCategoryForm/NewCategoryForm";

// Definición del componente FormEditarCategoria
function UpdateCategoryForm({ categoryId }) {

    const category = useSelector(state => selectCategoryById(state, categoryId))

    const { nombre, color, isBanner } = category

    // Crea los valores iniciales para el formulario de edición
    const initialValuesForEdit = {
        nombre,
        color,
        isBanner
    };

    // Retorna el componente NewCategoryForm con los valores iniciales para la edición dentro de un dialogo
    return (
        <>
            <NewCategoryForm
                initialValuesForEdit={initialValuesForEdit} 
                isEditing={true}
                categoryId={categoryId}
            />
        </>
    );
}

// Exporta el componente UpdateCategoryForm para su uso en otras partes de la aplicación
export default UpdateCategoryForm;