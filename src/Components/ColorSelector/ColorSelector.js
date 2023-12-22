import React, { useState } from "react";
import { ChromePicker } from 'react-color';

function ColorSelector () {
    const [selectedColor, setSelectedColor] = useState('#02FCE1'); // Color predeterminado

    const handleColorChange = (newColor) => {
        setSelectedColor(newColor.hex);
    
    };
    return(
        <>
            <ChromePicker 
                color={selectedColor}
                onChangeComplete={handleColorChange}
            />
        </>
    );
}

export default ColorSelector;