import './StylesFooter.css'
import React from 'react';
import logo from '../../assets/img/LogoMain.png'
import { LogotipoGrande } from '../Logotipo/Logotipo';
import Box from '@mui/material/Box';

function Footer () {
    return(
        <Box component='footer' className='footer'>
            <LogotipoGrande src={logo} />
        </Box>
    );
}

export default Footer;