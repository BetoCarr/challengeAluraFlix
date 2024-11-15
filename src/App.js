// Importación de React, componentes y Hooks 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { FeedbackProvider } from "./features/feedbackdialog/feedBackDialogContext";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import routesConfig from "./pages/routesConfig";
import tema from "./Components/Temas/tema";
import FeedbackDialogManager from "./features/feedbackdialog/FeedbackDialog/FeedbackDialogManager";

function App() {
    return(
        // Provee el tema global de Material-UI
        <ThemeProvider theme={tema}>
            {/* Contexto para manejar el estado de Feedback */}
            <FeedbackProvider>
                {/* Componente para manejar los diálogos de feedback */}
                <FeedbackDialogManager />
                <Router>
                    {/* Layout general de la aplicación */}
                    <DefaultPage>
                        <Routes>
                            {/* Configuración dinámica de rutas */}
                            {routesConfig.map(({ path, element, exact }, index) => (
                                <Route key={index} path={path} element={element} exact={exact} />
                            ))}
                            </Routes>
                    </DefaultPage>
                </Router>
            </FeedbackProvider>
        </ThemeProvider>
    );
}

export default App;
