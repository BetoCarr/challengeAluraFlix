import styled from "styled-components";

import { colorNegro, colorAzul, colorGris, colorBlanco, colorGrisLigero } from "./variables";

export const Btn = styled.button`
    min-width: 180px;
    height: 54px;
    border: none;
    border-radius: 7px;
    font-size: 21px;
    text-align: center;
    background-color:${colorAzul};
    color: ${colorBlanco};
`
export const BtnGris = styled(Btn)`
    background-color:${colorGris};
`
export const BtnGrisLigero = styled(Btn)`
    background-color: ${colorGrisLigero};
    color: ${colorNegro};
    min-width: 120px;
    height: 35px;
`
export const BtnTransparente = styled(Btn)`
    background-color: transparent;
    border: solid 1px ${colorBlanco};
    @media (max-width: 768px) {
        display: none;
    }  
    
`