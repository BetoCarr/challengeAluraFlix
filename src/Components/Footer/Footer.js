// Importación de estilos y componentes necesarios
import './StylesFooter.css'
import React from 'react';
import logo from '../../assets/img/LogoMain.png'
import { LogotipoGrande } from '../Logotipo/Logotipo';
import Box from '@mui/material/Box';

// Componente para el footer de la página
function Footer () {
    // Contenedor principal del footer
    return(
        <Box component='footer' className='footer'>
            {/* Componente del logotipo grande */}
            <LogotipoGrande src={logo} />
        </Box>
    );
}

// Exporta el componente Footer para su uso en otras partes de la aplicación
export default Footer;