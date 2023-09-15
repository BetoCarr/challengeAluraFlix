import React from 'react';
import Box from '@mui/material/Box';

function MainContainer ({ children }) {
    return(
        <Box
            component="main"
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: "1"
            }}
        >
            {children}
        </Box>
    );
}

export default MainContainer;
