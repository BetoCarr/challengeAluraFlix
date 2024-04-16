// Importación de estilos y componentes necesarios
import './StylesMainContainer.css';
import React from 'react';
import Box from '@mui/material/Box';

// Componente para el contenedor principal de la aplicación
function MainContainer ({ children, className }) {
    // Concatena las clases de estilo proporcionadas con la clase base del contenedor principal
    const containerClassName = `main-container ${className}`;

    return(
        // Contenedor principal del contenido de la página
        <Box component="main" className={containerClassName}>
            {children} {/* Renderiza el contenido dinámico pasado como children */}
        </Box>
    );
}

// Exporta el componente MainContainer para su uso en otras partes de la aplicación
export default MainContainer;
