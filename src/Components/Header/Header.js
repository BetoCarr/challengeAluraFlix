import './StylesHeader.css'
import { Logotipo } from '../Logotipo/Logotipo';
import logo from '../../assets/img/LogoMain.png'
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <AppBar position='static' color='primary'>
            <Toolbar className='tool-bar'>
                <Link to="/">
                    <Logotipo src={logo}/>
                </Link>
                <Box className='button-container'>
                    {/* <Link to="/nuevo-video">
                        <Button size='medium' variant='outlined' className='theme-button'>
                            <Typography>Nuevo Video</Typography> 
                        </Button>
                    </Link> */}
                    <Link to="/nueva-categoria">
                        <Button size='medium' variant='outlined' className='theme-button'>
                            <Typography>Nueva Categoria</Typography>
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;