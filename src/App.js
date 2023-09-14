import React from "react";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import MainContainer from "./Components/MainContainer/MainContainer";
import Banner from "./Components/Banner/Banner";
import { ThemeProvider } from '@mui/material/styles';
import tema from "./Components/Temas/tema";
function App() {
    return(
        <ThemeProvider theme={tema}>
            <>
                <DefaultPage>
                    <MainContainer>
                        <Banner />
                    </MainContainer>
                </DefaultPage>
            </>
        </ThemeProvider>
    );
}

export default App;
