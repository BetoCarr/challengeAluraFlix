import React from "react";
import Header from "./Components/Header/Header";
import MainContainer from "./Components/MainContainer/MainContainer";
import Banner from "./Components/Banner/Banner";
function App() {

    return(
        <>
            <Header />
            <MainContainer>
                <Banner />
            </MainContainer>
        </>

    );
}

export default App;
