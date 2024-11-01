import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import Home from "./pages/home";
import NewCategory from "./pages/new-category";
import UpdateCategory from "./pages/update-category";
import AddVideo from "./pages/add-video";
import { ThemeProvider } from '@mui/material/styles';
import tema from "./Components/Temas/tema";
import FeedbackDialogManager from "./features/feedbackdialog/FeedbackDialog/FeedbackDialogManager";
import { FeedbackProvider } from "./features/feedbackdialog/feedBackDialogContext";

function App() {
    return(
        <FeedbackProvider>
            <FeedbackDialogManager />
            <Router>
                <ThemeProvider theme={tema}>
                    <DefaultPage>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/nueva-categoria" element={<NewCategory />} />
                            <Route exact path="/editar-categoria/:categoryId" element={<UpdateCategory />} />
                            <Route exact path="/agregar-video/:categoryId" element={<AddVideo />} />
                            <Route exact path="*" element={<h1>No existe :C</h1>} />
                        </Routes>
                    </DefaultPage>
                </ThemeProvider>
            </Router>
        </FeedbackProvider>
    );
}

export default App;
