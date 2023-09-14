import { Logotipo } from "../Logotipo/Logotipo";
import logo from "../../assets/img/LogoMain.png"
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function Header() {
    return(
        <AppBar position='static' color="primary">
            <Toolbar>
                <Logotipo src={logo}/>
            </Toolbar>
        </AppBar>
    );
}

export default Header;