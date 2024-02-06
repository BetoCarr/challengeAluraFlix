import React, { useState }  from 'react';
import FormEditarCategoria from '../FormEditarCategoria/FormEditarCategoria';
import ManageCategoryMenuItem from '../ManageCategoryMenuItem/ManageCategoryMenuItem';
import { handleCloseDialog } from '../ManageCategoryMenuItem/ManageCategoryMenuItem';

function EditCategroyMenuItem({ categoryId, categoryName, categoryColor, isBanner, handleClose }) {
    // Estado para controlar la visibilidad del formulario de edición
    const [showEditForm, setShowEditForm] = useState(false);       

    
    const initialValuesForEdit = {
        nombre: categoryName,
        color: categoryColor,
        isBanner: isBanner
    }

    // // Función para manejar la operación de edición en el backend
    // const handleEditOperation = async (editedCategory) => {
    //     try {
    //         // Realizar la solicitud al backend con la categoría editada
    //         // await yourBackendEditCategoryFunction(categoryId, editedCategory);
    //         // Cerrar el formulario de edición después de completar la operación
    //         handleEditClose();
    //     } catch (error) {
    //         console.error('Error al editar la categoría:', error);
    //         // Manejar el error si ocurre
    //         // Puedes mostrar un mensaje de error al usuario si lo deseas
    //     }
    // };

    // Función para manejar la apertura del formulario de edición
    const handleEditClick = () => {
        setShowEditForm(true);
        handleCloseDialog();
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
                handleBackendOperation={handleEditClick}
            />
            {/* Renderiza el formulario de edición condicionalmente */}
            {showEditForm && (
                <FormEditarCategoria
                    initialValuesForEdit={initialValuesForEdit}
                    handleClose={handleEditClose}
                    // Pasa handleEditOperation como prop al formulario de edición
                    // handleEditOperation={handleEditOperation}
                />
            )}
        </>
    );
}

export default EditCategroyMenuItem;