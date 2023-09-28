import { createTheme } from '@mui/material/styles';
// import { colorNegro } from "../UI/variables";

const tema = createTheme({
    palette: {
        primary: {
            main: "#000000",
            carousel: "#5A5F5E"
        },
        text: {
            primary: "#F5F5F5"
        },
        boton: {
            primary: "#00000000",
        }
    },
});

export default tema;