import './StylesMainContainer.css';
import React from 'react';
import Box from '@mui/material/Box';

function MainContainer ({ children }) {
    return(
        <Box component="main" className='main-container'>
            {children}
        </Box>
    );
}

export default MainContainer;
