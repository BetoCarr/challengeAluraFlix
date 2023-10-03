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
        }
    },
});

document.documentElement.style.setProperty('--boton-primary', tema.palette.boton.primary);
document.documentElement.style.setProperty('--text-primary', tema.palette.text.primary);
document.documentElement.style.setProperty('--main-primary', tema.palette.primary.main);
document.documentElement.style.setProperty('--carousel-primary', tema.palette.primary.carousel);
document.documentElement.style.setProperty('--inputs-primary', tema.palette.primary.inputs);

export default tema;