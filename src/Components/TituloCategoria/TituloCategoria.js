import React from 'react';
// import { colorVerde, colorNaranja, colorGrisLigero, colorTurquesa } from '../UI/variables';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// const StyleTitle = styled.div`
//     width: 193px;
//     height: 60px;
//     color: ${ colorGrisLigero };
//     font-size: 35px;
//     font-weight: 400;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: ${ (props) => props.primary ? colorVerde : colorNaranja };
// `
// export const StyleTitleXL = styled(StyleTitle)`
//     width: 48%;
//     height: 5rem;
//     font-size: 3rem;
//     background-color: ${colorTurquesa};
//     margin-bottom: 2rem;
// `

function ContainerTitulo({ title, color, width, height }) {
    return(
        <Paper
            elevation={3} // Puedes ajustar la elevación según tus preferencias
            style={{
                backgroundColor: color,
                padding: "16px",
                marginBottom: "8px", 
                width: width,
                height: height
            }}
        >
            <Typography>{title}</Typography>
        </Paper>
    );
}

export default ContainerTitulo;

