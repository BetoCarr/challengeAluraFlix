import './ColorSelector.css'
import React, { useState } from "react";
import { Box, Typography } from '@mui/material';

function ColorSelector ({ initialColor, onColorChange, name, error }) {

    const [selectedColor, setSelectedColor] = useState(initialColor);

    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setSelectedColor(newColor);
        onColorChange(newColor); // Enviar el nuevo color al componente padre si es necesario
    };


    return (
        <div>
            <Box className='colorSelector-container'>
                <Typography className='switch-text'>Selecciona un color</Typography>
                <input  
                    type="color"
                    className='color-selector-input'
                    id={name}
                    name={name}
                    value={selectedColor}
                    onChange={handleColorChange}
                />
            </Box>
            {error && (
                <div className='error'>{error}</div>
            )}
        </div>
    );
}

export default ColorSelector;   