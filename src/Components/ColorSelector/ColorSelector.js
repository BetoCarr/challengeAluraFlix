import './ColorSelector.css'
import React from "react";
import { Box, Typography } from '@mui/material';

function ColorSelector ({ initialColor }) {

    return (
        <Box className='switch-container'>
            <Typography className='switch-text'>Selecciona un color</Typography>
            <input  
                type="color"
                className='color-selector-input'
                value={initialColor}
            />
        </Box>
    );
}

export default ColorSelector;