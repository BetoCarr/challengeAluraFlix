// Importa React y el componente FormNuevaCategoria
import './FormEditarCategoria.css';
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormNuevaCategoria from "../FormNuevaCategoria/FormNuevaCategoria";

// Definición del componente FormEditarCategoria
function FormEditarCategoria({ initialValuesForEdit, handleClose, setShowEditForm }) {

    const handleEditFormOpen = () => {
        setShowEditForm(true); // Actualiza el estado en EditCategoryMenuItem para mostrar el formulario
        handleClose(); // Cierra el cuadro de diálogo después de abrir el formulario
    };
    
    // Retorna el componente FormNuevaCategoria con los valores iniciales para la edición
    return (
        <>
            <Dialog open={true} onClose={handleClose}>
                <DialogContent className='dialog-form'>
                    <FormNuevaCategoria
                        initialValuesForEdit={initialValuesForEdit} 
                        headerText={"Editar Categoria"}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

// Exporta el componente FormEditarCategoria para su uso en otras partes de la aplicación
export default FormEditarCategoria;