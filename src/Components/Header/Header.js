// Importación de estilos y componentes necesarios
import './StylesHeader.css'
import { Logotipo } from '../Logotipo/Logotipo';
import logo from '../../assets/img/LogoMain.png'
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Componente para la cabecera de la página
function Header() {
    return(
        // Barra de navegación principal
        <AppBar position='static' color='primary'>
            {/* Barra de herramientas */}
            <Toolbar className='tool-bar'>
                {/* Enlace al inicio con el logotipo */}
                <Link to="/">
                    <Logotipo src={logo}/>
                </Link>
                {/* Contenedor de botones */}
                <Box className='button-container'>
                    {/* Enlace para agregar una nueva categoría */}
                    <Link to="/nueva-categoria">
                        <Button disableRipple size='medium' variant='outlined' className='theme-button'>
                            {/* Texto del botón */}
                            <Typography>Nueva Categoria</Typography>
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

// Exporta el componente Header para su uso en otras partes de la aplicación
export default Header;