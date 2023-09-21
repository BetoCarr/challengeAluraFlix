import React, { useState, useEffect } from "react";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import Home from "./pages/home";
import { ThemeProvider } from '@mui/material/styles';
import tema from "./Components/Temas/tema";
import { buscar } from "./api/api";

function App() {
    const [categorias, setCategorias] = useState([]);
    
    useEffect(() => {
        buscar("/categorias", setCategorias)
    }, [])

    return(
        <ThemeProvider theme={tema}>
            <>
                <DefaultPage>
                    <Home categorias={categorias} />
                </DefaultPage>
            </>
        </ThemeProvider>
    );
}

export default App;
