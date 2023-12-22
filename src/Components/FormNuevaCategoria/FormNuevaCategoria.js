import './FormNuevaCategoria.css';
import React from "react";
import {Typography, Switch, Box} from '@mui/material';
import { Formik, Form } from 'formik';
import TextInput from "../TextInput/TextInput";

function FormNuevaCategoria() {

    return(
        <>
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            <Formik>
                <Form className='form-container'>
                    <TextInput
                        label="Nombre"
                        name="nombre-categoria"
                        placeholder="Introduce el nombre de la nueva categoria"
                    />
                    <Box className='switch-container'>
                        <Typography className='switch-text'>Activa el switch para destacar en el banner</Typography><Switch disabled size='large'/>
                    </Box>
                </Form>
            </Formik>
        </>

    );
}

export default FormNuevaCategoria;