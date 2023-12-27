import './FormNuevaCategoria.css';
import React, { useState } from "react";
import {Typography, Button} from '@mui/material';
import { Formik, Form } from 'formik';
import TextInput from "../TextInput/TextInput";
import SwitchIsBanner from '../SwitchIsBanner/SwitchIsBanner';
import ColorSelector from '../ColorSelector/ColorSelector';

function FormNuevaCategoria() {

    const [isBanner, setIsBanner] = useState(false);


    const handleSwitchChange = (isChecked) => {
        setIsBanner(isChecked);

        console.log('El estado del Switch es:', isChecked);
        // Realiza cualquier lógica adicional con el valor del Switch aquí
    };

    const initialValues = {
        nombreCategoria: '',
        isBanner,
        color: '#FFFFFF'
    };

    return(
        <>
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            <Formik
                initialValues={initialValues}

                validate={values => {
                    const { nombreCategoria, color } = values;
                    const errors = {};


                    //Validación del nombre de la categoria
                    if(!nombreCategoria) {
                        errors.nombreCategoria = 'El nombre de la categoria es requerido';
                    } else if(!/^[a-zA-Z0-9À-ÿ\s\-]{3,50}$/.test(nombreCategoria)) {
                        errors.nombreCategoria = 'El nombre de la categoría solo puede incluir letras, números, espacios y guiones';
                    }

                    // Validación de color
                    if(!color) {
                        errors.color ='El color es requerido';
                    }
                    
                    return errors;
                }}

                onSubmit={async (values, { resetForm }) => {
                    alert("Formulario enviado con éxito!")
                    console.log(values)
                }}

            >
                {({errors}) => (
                    <Form className='form-container'>
                        <TextInput
                            label="Nombre"
                            name="nombreCategoria"
                            placeholder="Introduce el nombre de la nueva categoria"
                        />
                        <SwitchIsBanner onSwitchChange={handleSwitchChange} />
                        {/* <ColorSelector
                            initialColor={initialValues.color}
                        /> */}
                        <Button type="submit" size='large' variant='outlined' className='boton-azul'>
                            Enviarr
                        </Button>
                    </Form>
                )}
            </Formik>
        </>

    );
}

export default FormNuevaCategoria;