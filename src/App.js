import React, { useState, useEffect } from "react";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import Home from "./pages/home";
import NewVideo from "./pages/new-video";
import NewCategory from "./pages/new-category";
import { ThemeProvider } from '@mui/material/styles';
import tema from "./Components/Temas/tema";
import { buscar } from "./api/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const [categorias, setCategorias] = useState([]);
    
    useEffect(() => {
        buscar("/categorias", setCategorias)
    }, [])

    return(
        <ThemeProvider theme={tema}>
            <Router>
                <DefaultPage>
                    <Routes>
                        <Route exact path="/" element={<Home categorias={categorias} />} />
                        <Route exact path="/nuevo-video" element={<NewVideo />} />
                        <Route exact path="/nueva-categoria" element={<NewCategory />} />
                        <Route exact path="*" element={<h1>No existe :C</h1>} />
                    </Routes>
                </DefaultPage>
            </Router>
        </ThemeProvider>
    );
}

export default App;
