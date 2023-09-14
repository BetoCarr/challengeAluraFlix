import React from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { colorNegro } from "../UI/variables";

const StyleDefaultPage = styled.div`
    width: 100%; 
    margin: 0 auto; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
function DefaultPage ({ children }) {
    return(
        <StyleDefaultPage>
            <Header />
            {children}
            <Footer />
        </StyleDefaultPage>
    );
}

export default DefaultPage;