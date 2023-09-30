import './StylesHeader.css'
import { Logotipo } from '../Logotipo/Logotipo';
import logo from '../../assets/img/LogoMain.png'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Header() {
    return(
        <AppBar position='static' color='primary'>
            <Toolbar className='tool-bar'>
                <Logotipo src={logo}/>
                <Button size='large' variant='outlined' className='theme-button'>
                    <Typography>Nuevo Video</Typography> 
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;