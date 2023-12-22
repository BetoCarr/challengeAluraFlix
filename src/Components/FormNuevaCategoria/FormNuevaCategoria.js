import './FormNuevaCategoria.css';
import React from "react";
import {Typography, Switch, Box, Button} from '@mui/material';
import { Formik, Form } from 'formik';
import TextInput from "../TextInput/TextInput";
import ColorSelector from '../ColorSelector/ColorSelector';

function FormNuevaCategoria() {
    function enviarFormulario () {
        console.log("Envio de Formulario")
    }

    return(
        <>
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            <Formik
                onSubmit={async () => {

                    enviarFormulario()

                    // agregarNuevoVideo(rutaParaAgregarVideo, nuevoVideo)
                    // .then((responseData) => {
                    //     console.log("¡Video agregado exitosamente!", responseData);
                    //     resetForm();
                    //     const confirmMessage = "¡Video agregado exitosamente! La página se recargará para mostrar el nuevo video.";
                    //     if(window.confirm(confirmMessage)) {
                    //         navigate('/', { replace: true });
                    //         window.location.reload();
                    //     }

                    // })
                    // .catch((error) => {
                    //     // Aquí manejas el caso de error, por ejemplo, mostrando un mensaje de error al usuario
                    //     console.error("Error al agregar el video:", error);
                    //     alert("Video NO agregado. Error: " + error); // Puedes mostrar el mensaje de error al usuario
                    // })
                    // .finally(() => {
                    //     // Esto se ejecutará independientemente de si la solicitud fue exitosa o no
                    //     // Puedes realizar acciones adicionales aquí, como restablecer formularios o estados
                    //     setSubmitting(false); // Por ejemplo, puedes restablecer el estado de submitting
                    // });
                
                }}
            >
                <Form className='form-container'>
                    <TextInput
                        label="Nombre"
                        name="nombre-categoria"
                        placeholder="Introduce el nombre de la nueva categoria"
                    />
                    <Box className='switch-container'>
                        <Typography className='switch-text'>Activa el switch para destacar en el banner</Typography><Switch disabled size='large'/>
                    </Box>
                    <ColorSelector />
                    <Button type="submit" size='large' variant='outlined' className='boton-azul'>
                        Enviarr
                    </Button>
                </Form>
            </Formik>
        </>

    );
}

export default FormNuevaCategoria;