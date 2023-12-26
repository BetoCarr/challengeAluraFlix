import './FormNuevaCategoria.css';
import React from "react";
import {Typography, Switch, Box, Button} from '@mui/material';
import { Formik, Form } from 'formik';
import TextInput from "../TextInput/TextInput";
import ColorSelector from '../ColorSelector/ColorSelector';

function FormNuevaCategoria() {

    const initialValues = {
        color: '#FFFFFF'
    };

    return(
        <>
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            <Formik
                initialValues={initialValues}

                onSubmit={async () => {
                    alert("Formulario enviado con éxito!")
                }}

            >
                {() => (
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