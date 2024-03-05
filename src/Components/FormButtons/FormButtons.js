import './FormButtonsStyle.css'; // Importa los estilos específicos para este componente
import React from 'react'; // Importa React
import { Box, Button } from '@mui/material'; // Importa los componentes Box y Button de Material-UI

// Función del componente FormButtons
function FormButtons ({ isSubmitting, resetForm }) {
    // Renderiza los botones de guardar y limpiar
    return(
        <Box className='container-botones'>{/* Contenedor de los botones */}
            {/* Botón de guardar */}
            <Button 
                type='submit' // Tipo de botón para enviar el formulario
                disabled={isSubmitting} // Deshabilita el botón si el formulario se está enviando
                size='large' // Tamaño del botón
                variant='outlined' // Estilo del botón
                sx={{ // Estilos personalizados usando sx prop de Material-UI
                    width: '47%', // Ancho del botón
                    backgroundColor: 'var(--boton-blue)', // Color de fondo del botón obtenido de variables CSS
                    color: 'var(--text-primary)', // Color del texto del botón obtenido de variables CSS
                    fontSize: '75%' // Tamaño de la fuente del botón
                }}
            >
                Guardar {/* Texto del botón */}
            </Button>
            {/* Botón de limpiar */}
            <Button  
                disabled={isSubmitting} // Deshabilita el botón si el formulario se está enviando
                size='large' // Tamaño del botón
                variant='outlined' // Estilo del botón
                type='button' // Tipo de botón
                onClick={() => resetForm()} // Manejador de clic para reiniciar el formulario
                sx={{ // Estilos personalizados usando sx prop de Material-UI
                    width: '47%', // Ancho del botón
                    backgroundColor: 'var(--boton-gray)', // Color de fondo del botón obtenido de variables CSS
                    color: 'var(--text-primary)', // Color del texto del botón obtenido de variables CSS
                    fontSize: '75%' // Tamaño de la fuente del botón
                }}
            >
                Limpiar {/* Texto del botón */}
            </Button>
        </Box>
    );
}
// Exporta el componente FormButtons
export default FormButtons;