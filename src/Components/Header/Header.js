import './StylesHeader.css'
import { Logotipo } from '../Logotipo/Logotipo';
import logo from '../../assets/img/LogoMain.png'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <AppBar position='static' color='primary'>
            <Toolbar className='tool-bar'>
                <Link to="/">
                    <Logotipo src={logo}/>
                </Link>
                <Link to="/nuevo-video">
                    <Button size='large' variant='outlined' className='theme-button'>
                        <Typography>Nuevo Video</Typography> 
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Header;