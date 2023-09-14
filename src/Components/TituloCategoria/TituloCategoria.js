import React from 'react';
import styled from 'styled-components';
import { colorVerde, colorNaranja, colorGrisLigero, colorTurquesa } from '../UI/variables';

const StyleTitle = styled.div`
    width: 193px;
    height: 60px;
    color: ${ colorGrisLigero };
    font-size: 35px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ (props) => props.primary ? colorVerde : colorNaranja };
`
export const StyleTitleXL = styled(StyleTitle)`
    width: 48%;
    height: 5rem;
    font-size: 3rem;
    background-color: ${colorTurquesa};
    margin-bottom: 2rem;
`

function TituloCategoria ({ primary }) {
    return(
        <>
            <StyleTitle primary={primary}/>
        </>

    );
}

export default TituloCategoria;