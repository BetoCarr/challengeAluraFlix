import './FormNuevaCategoria.css';
import React from "react";
import {Typography, Switch, Box, Button} from '@mui/material';
import { Formik, Form } from 'formik';
import TextInput from "../TextInput/TextInput";
import ColorSelector from '../ColorSelector/ColorSelector';

function FormNuevaCategoria() {

    const initialValues = {
        nombreCategoria: '',
        isBanner: false,
        color: '#FFFFFF'
    };

    return(
        <>
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            <Formik
                initialValues={initialValues}

                validate={values => {
                    const { nombreCategoria, isBanner, color } = values;
                    const errors = {};

                    if(!nombreCategoria) {
                        errors.nombreCategoria = 'El nombre de la categoria es requerido';
                        console.log(errors)
                    }

                    if(!color) {
                        errors.color ='El color es requerido';
                    }
                    
                    return errors;
                }}

                onSubmit={async (values, { resetForm }) => {
                    alert("Formulario enviado con éxito!")
                    console.log(initialValues)
                }}

            >
                {({errors}) => (
                    <Form className='form-container'>
                        <TextInput
                            label="Nombre"
                            name="nombre-categoria"
                            placeholder="Introduce el nombre de la nueva categoria"
                        />
                        <Box className='switch-container'>
                            <Typography className='switch-text'>Activa el switch para destacar en el banner</Typography><Switch disabled size='large'/>
                        </Box>
                        <ColorSelector
                            initialColor={initialValues.color}
                        />
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