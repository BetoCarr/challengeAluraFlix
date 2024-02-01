import React, { useState }  from 'react';
import ManageCategoryMenuItem from '../ManageCategoryMenuItem/ManageCategoryMenuItem';

function EditCategroyMenuItem({ categoryId, categoryName, handleClose }) {

    const handleEditCategory = () => {
        console.log("Editando categoria")
    }
    
    return(
        <>
            <ManageCategoryMenuItem 
                operation="Editar"
                categoryId={categoryId}
                categoryName={categoryName}
                handleClose={handleClose}
                handleBackendOperation={handleEditCategory}
            />
        </>
    );
}

export default EditCategroyMenuItem;