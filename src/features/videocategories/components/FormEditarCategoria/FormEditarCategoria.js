// Importa React y el componente FormNuevaCategoria
import './FormEditarCategoria.css';
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormNuevaCategoria from "../FormNuevaCategoria/FormNuevaCategoria";

// Definición del componente FormEditarCategoria
function FormEditarCategoria({ initialValuesForEdit, onClose, categoryId }) {

   // Manejar el cierre del formulario de edición
    const handleDialogClose = () => {
        onClose(); // Cierra el formulario de edición
    }

    // Retorna el componente FormNuevaCategoria con los valores iniciales para la edición dentro de un dialogo
    return (
        <>
            <Dialog open={true} onClose={handleDialogClose}>
                <DialogContent className='dialog-form'>
                    <FormNuevaCategoria
                        initialValuesForEdit={initialValuesForEdit} 
                        isEditing={true}
                        categoryId={categoryId}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

// Exporta el componente FormEditarCategoria para su uso en otras partes de la aplicación
export default FormEditarCategoria;