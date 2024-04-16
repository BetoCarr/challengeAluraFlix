import React from "react";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import Home from "./pages/home";
import NewCategory from "./pages/new-category";
import { ThemeProvider } from '@mui/material/styles';
import tema from "./Components/Temas/tema";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CategoriaProvider } from "./CategoriaContext";

function App() {
    return(
        <ThemeProvider theme={tema}>
            <CategoriaProvider>
                <Router>
                    <DefaultPage>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/nueva-categoria" element={<NewCategory />} />
                            <Route exact path="*" element={<h1>No existe :C</h1>} />
                        </Routes>
                    </DefaultPage>
                </Router>
            </CategoriaProvider>
        </ThemeProvider>
    );
}

export default App;
