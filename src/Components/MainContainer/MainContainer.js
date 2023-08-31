import React from 'react';
import styled from 'styled-components';

const StyleMain = styled.main`
    display: flex;
    flex-direction: column;
`

function MainContainer ({ children }) {
    return <StyleMain>{children}</StyleMain>;
}

export default MainContainer;
