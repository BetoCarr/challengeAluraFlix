import React from 'react';
// import { colorVerde, colorNaranja, colorGrisLigero, colorTurquesa } from '../UI/variables';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function ContainerTitulo({ title, color, width, height, fontSize }) {
    return(
        <Paper
            elevation={2} // Puedes ajustar la elevación según tus preferencias
            style={{
                backgroundColor: color,
                padding: "16px",
                marginBottom: "8px", 
                width: width,
                height: height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // border: "none"
            }}
        >
            <Typography variant='h4' style={{fontSize, fontWeight:"400"}} color="text.primary">{title}</Typography>
        </Paper>
    );
}

export default ContainerTitulo;

