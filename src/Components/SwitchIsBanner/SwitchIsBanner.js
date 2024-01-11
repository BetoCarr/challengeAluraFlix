import React, { useState } from 'react';
import { Typography, Switch, Box } from '@mui/material';

function SwitchIsBanner ({ onSwitchChange }) {

    const [checked, setChecked] = useState(false); 

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onSwitchChange(isChecked); // Llamada a la función proporcionada por el padre
    }

    return(
        <Box className='switch-container'>
            <Typography className='switch-text'>Activa el switch para destacar en el banner</Typography>
            <Switch 
                checked={checked}
                onChange={handleChange}
                // disabled
                size='large'
            />
        </Box>
    );
}

export default SwitchIsBanner;