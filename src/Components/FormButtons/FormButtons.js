import './FormButtonsStyle.css';
import React from 'react';
import { Box, Button } from '@mui/material';

function FormButtons ({ isSubmitting, resetForm }) {
    return(
        <Box className='container-botones'>
            <Button 
                type='submit' 
                disabled={isSubmitting} 
                size='large' 
                variant='outlined' 
                sx={{
                    width: '47%',
                    backgroundColor: 'var(--boton-blue)',
                    color: 'var(--text-primary)',
                    fontSize: '75%'
                }}
            >
                Guardar
            </Button>
            <Button  
                disabled={isSubmitting} 
                size='large' 
                variant='outlined' 
                type='button' 
                onClick={() => resetForm()}
                sx={{
                    width: '47%',
                    backgroundColor: 'var(--boton-gray)',
                    color: 'var(--text-primary)',
                    fontSize: '75%'
                }}
            >
                Limpiar
            </Button>
        </Box>
        
    );
}

export default FormButtons;