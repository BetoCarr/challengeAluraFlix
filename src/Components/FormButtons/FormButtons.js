import './FormButtonsStyle.css';
import React from 'react';
import { Box, Button } from '@mui/material';

function FormButtons ({ isSubmitting, resetForm }) {
    return(
        <Box className='container-botones'>
            <Box className='container-botones-izquierda'>
                <Button type="submit" disabled={isSubmitting} size='large' variant='outlined' className='boton-azul'>
                    Guardar
                </Button>
                <Button  disabled={isSubmitting} size='large' variant='outlined' className='boton-gris' type='button' onClick={() => resetForm()}>
                    Limpiar
                </Button>
            </Box>
        </Box>
    );
}

export default FormButtons;