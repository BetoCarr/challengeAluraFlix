import { createTheme } from '@mui/material/styles';

const tema = createTheme({
    palette: {
        primary: {
            main: "#000000",
            carousel: "#181717",
            inputs: "#53585D"
        },
        text: {
            primary: "#F5F5F5"
        },
        boton: {
            primary: "#00000000",
            blue: "#2A7AE4",
            gray: "#9E9E9E"
        }
    },
});

document.documentElement.style.setProperty('--boton-primary', tema.palette.boton.primary);
document.documentElement.style.setProperty('--text-primary', tema.palette.text.primary);

document.documentElement.style.setProperty('--main-primary', tema.palette.primary.main);
document.documentElement.style.setProperty('--carousel-primary', tema.palette.primary.carousel);
document.documentElement.style.setProperty('--inputs-primary', tema.palette.primary.inputs);
document.documentElement.style.setProperty('--boton-blue', tema.palette.boton.blue);
document.documentElement.style.setProperty('--boton-gray', tema.palette.boton.gray);


export default tema;