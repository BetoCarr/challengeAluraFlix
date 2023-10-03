import './StylesMainContainer.css';
import React from 'react';
import Box from '@mui/material/Box';

function MainContainer ({ children, className }) {
    const containerClassName = `main-container ${className}`;

    return(
        <Box component="main" className={containerClassName}>
            {children}
        </Box>
    );
}

export default MainContainer;
