import React from "react";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import MainContainer from "./Components/MainContainer/MainContainer";
import Banner from "./Components/Banner/Banner";
import { ThemeProvider } from '@mui/material/styles';
import tema from "./Components/Temas/tema";
import datos from "./datos/datos-iniciales.json"
function App() {
    console.log(datos)
    return(
        <ThemeProvider theme={tema}>
            <>
                <DefaultPage>
                    <MainContainer>
                        <Banner />
                        {/* <Carousel /> */}
                    </MainContainer>
                </DefaultPage>
            </>
        </ThemeProvider>
    );
}

export default App;
