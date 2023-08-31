import React from "react";
import styled from "styled-components";
import { colorNegro } from "../UI/variables";
import { Logotipo } from "../Logotipo/Logotipo";
import { BtnTransparente } from "../UI/Ui";
import logo from "../../assets/img/LogoMain.png"


const StyleHeader = styled.header`
    background-color: ${colorNegro};
    padding: 27px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media (max-width: 768px) {
        justify-content: center;
    }  
`
function Header() {
    return(
        <StyleHeader>
            <Logotipo src={logo}/>
            <BtnTransparente>Nuevo Video</BtnTransparente>
        </StyleHeader>
    );
}

export default Header;