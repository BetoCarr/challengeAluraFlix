// Importación de estilos y componentes necesarios
import './StylesDefaultPage.css';
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';

// Componente para la estructura de página por defecto
function DefaultPage ({ children }) {
    // Contenedor principal que envuelve el contenido de la página
    return(
        <Box className='default-page'>
             <Header /> {/* Renderiza el componente Header */}
                {children} {/* Renderiza el contenido dinámico pasado como children */}
            <Footer /> {/* Renderiza el componente Footer */}
        </Box>
    );
}

// Exporta el componente DefaultPage para su uso en otras partes de la aplicación
export default DefaultPage;