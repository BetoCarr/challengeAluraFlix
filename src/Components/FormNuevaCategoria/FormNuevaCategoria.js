import './FormNuevaCategoria.css';
import React, { useState } from "react";
import {Typography} from '@mui/material';
import { Formik, Form } from 'formik';
import TextInput from "../TextInput/TextInput";
import SwitchIsBanner from '../SwitchIsBanner/SwitchIsBanner';
import ColorSelector from '../ColorSelector/ColorSelector';
import FormButtons from '../FormButtons/FormButtons';

function FormNuevaCategoria() {

    const [isBanner, setIsBanner] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#02FCE1'); // Color inicial

    const handleColorChange = (newColor) => {
        setSelectedColor(newColor);
        // Puedes realizar cualquier lógica adicional con el nuevo color aquí si es necesario
        // console.log('El estado del color es:', selectedColor);

    }; 

    const handleSwitchChange = (isChecked) => {
        setIsBanner(isChecked);

        console.log('El estado del Switch es:', isChecked);
        // Realiza cualquier lógica adicional con el valor del Switch aquí
    };

    const initialValues = {
        nombreCategoria: ''
    };

    return(
        <>
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            <Formik
                initialValues={initialValues}

                validate={values => {
                    const { nombreCategoria } = values;
                    const errors = {};


                    //Validación del nombre de la categoria
                    if(!nombreCategoria) {
                        errors.nombreCategoria = 'El nombre de la categoria es requerido';
                    } else if(!/^[a-zA-Z0-9À-ÿ\s\-]{3,50}$/.test(nombreCategoria)) {
                        errors.nombreCategoria = 'El nombre de la categoría solo puede incluir letras, números, espacios y guiones';
                    }

                    // // Validación de color
                    // if(!color) {
                    //     errors.color ='El color es requerido';
                    // }
                    
                    return errors;
                }}

                onSubmit={async (values, { resetForm }) => {
                    alert("Formulario enviado con éxito!")
                    const updatedValues = { ...values, isBanner, selectedColor }; // Obteniendo el valor actual de isBanner
                    console.log(updatedValues);
                }}

            >
                {({isSubmitting, resetForm, errors}) => (
                    <Form className='form-container'>
                        <TextInput
                            label="Nombre"
                            name="nombreCategoria"
                            placeholder="Introduce el nombre de la nueva categoria"
                        />
                        <SwitchIsBanner onSwitchChange={handleSwitchChange} />
                        <ColorSelector
                            initialColor={selectedColor}
                            onColorChange={handleColorChange}
                        />
                        <FormButtons
                            isSubmitting={isSubmitting} 
                            resetForm={resetForm}
                        />
                    </Form>
                )}
            </Formik>
        </>

    );
}

export default FormNuevaCategoria;