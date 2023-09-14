import React from "react";
import logo from "../../assets/img/LogoMain.png"
import { LogotipoGrande } from "../Logotipo/Logotipo";
import Box from '@mui/material/Box';

function Footer () {
    return(
        <Box component="footer" sx={{ display: "flex", justifyContent: "center", padding: "0.7rem", backgroundColor: (theme) => theme.palette.primary.main }}>
            <LogotipoGrande src={logo} />
        </Box>
    );
}

export default Footer;