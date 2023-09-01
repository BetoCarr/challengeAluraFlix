import React from "react";
import DefaultPage from "./Components/DefaultPage/DefaultPage";
import MainContainer from "./Components/MainContainer/MainContainer";
import Banner from "./Components/Banner/Banner";


function App() {
    return(
        <>
            <DefaultPage>
            <MainContainer>
                <Banner />
            </MainContainer>
            </DefaultPage>
        </>

    );
}

export default App;
