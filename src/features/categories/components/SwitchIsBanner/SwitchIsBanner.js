// Importacion de React y componentes necesarios
import React from 'react';
import { Typography, Switch, Box } from '@mui/material';
import { useField } from 'formik'; // Importa el hook useField de Formik

function SwitchIsBanner ({ name }) {
    const [field] = useField(name); // name se refiere a "isBanner"

    // Retorna componente 
    return(
        <Box className='switch-container'>
            {/* Texto que indica la función del switch */}
            <Typography className='switch-text'>Activa el switch para destacar en el banner</Typography>
            {/* Componente Switch */}
            <Switch 
                {...field} // Propaga los props del campo de Formik al Switch
                checked={field.value} // Establece el estado del switch basado en el valor del campo de Formik
                name={name}
                size='large' // Tamaño del switch
            />
        </Box>
    );
}

// Exporta SwitchIsBanner
export default SwitchIsBanner;