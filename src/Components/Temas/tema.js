import { createTheme } from '@mui/material/styles';
// import { colorNegro } from "../UI/variables";

const tema = createTheme({
    palette: {
        primary: {
            main: "#000000"
        },
        text: {
            primary: "#F5F5F5", 
        },
    },
});

export default tema;