import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

function MainContainer ({ children }) {
    const theme = useTheme();

    const containerStyles = {
        backgroundColor: theme.palette.primary.carousel
    };

    return(
        <Box
            component="main"
            sx={{
                ...containerStyles,
                display: "flex",
                flexDirection: "column",
                flex: "1",
                maxWidth: "100%",
            }}
        >
            {children}
        </Box>
    );
}

export default MainContainer;
