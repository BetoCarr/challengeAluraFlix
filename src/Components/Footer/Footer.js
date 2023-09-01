import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/LogoMain.png"
import { colorNegro, colorAzul } from "../UI/variables";
import { LogotipoGrande } from "../Logotipo/Logotipo";


const StyleFooter = styled.footer`
    background-color: ${colorNegro};
    width: 100%;
    height: 5.5rem;
    border-top: 1px solid ${colorAzul};
    padding: 1rem;
    display: flex;
    justify-content: center;
`
function Footer () {
    return(
        <StyleFooter>
            <LogotipoGrande src={logo} />
        </StyleFooter>
    );
}

export default Footer;