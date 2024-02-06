import React, { useState }  from 'react';
import FormEditarCategoria from '../FormEditarCategoria/FormEditarCategoria';
import ManageCategoryMenuItem from '../ManageCategoryMenuItem/ManageCategoryMenuItem';

function EditCategroyMenuItem({ categoryId, categoryName, categoryColor, isBanner, handleClose }) {
    // Estado para controlar la visibilidad del formulario de edición
    const [showEditForm, setShowEditForm] = useState(false);       

    
    const initialValuesForEdit = {
        nombre: categoryName,
        color: categoryColor,
        isBanner: isBanner
    }

    // const handleEditCategory = () => {
    
    // }

    // Función para manejar la apertura del formulario de edición
    const handleEditClick = () => {
        setShowEditForm(true);
    };

    // Función para manejar el cierre del formulario de edición
    const handleEditClose = () => {
        setShowEditForm(false);
    };
    
    return(
        <>
            <ManageCategoryMenuItem 
                operation="Editar"
                categoryId={categoryId}
                categoryName={categoryName}
                handleClose={handleClose}
                handleClick={handleEditClick}
                // handleBackendOperation={handleEditCategory}
            />
            {/* Renderiza el formulario de edición condicionalmente */}
            {showEditForm && (
                <FormEditarCategoria
                initialValuesForEdit={initialValuesForEdit}
                handleClose={handleEditClose}
                />
            )}
        </>
    );
}

export default EditCategroyMenuItem;