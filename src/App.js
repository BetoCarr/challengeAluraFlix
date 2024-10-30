import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import Home from "./pages/home";
import NewCategory from "./pages/new-category";
import UpdateCategory from "./pages/update-category";
import AddVideo from "./pages/add-video";
import { ThemeProvider } from '@mui/material/styles';
import tema from "./Components/Temas/tema";
import FeedbackDialog from "./features/feedbackdialog/FeedbackDialog/FeedbackDialog";
import { FeedbackProvider } from "./features/feedbackdialog/feedBackDialogContext";

function App() {
    return(
        <ThemeProvider theme={tema}>
            <Router>
                <DefaultPage>
                    <FeedbackProvider>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/nueva-categoria" element={<NewCategory />} />
                            <Route exact path="/editar-categoria/:categoryId" element={<UpdateCategory />} />
                            <Route exact path="/agregar-video/:categoryId" element={<AddVideo />} />
                            <Route exact path="*" element={<h1>No existe :C</h1>} />
                        </Routes>
                        <FeedbackDialog />
                    </FeedbackProvider>
                </DefaultPage>
            </Router>
        </ThemeProvider>
    );
}

export default App;
