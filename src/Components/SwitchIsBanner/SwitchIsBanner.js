// Importacion de React y componentes necesarios
import React from 'react';
import { Typography, Switch, Box } from '@mui/material';
import { useField } from 'formik'; // Importa el hook useField de Formik

function SwitchIsBanner ({ name }) {
    const [field] = useField(name); // name se refiere a "isBanner"

    // // Usa el hook useField para obtener los props del campo de Formik relacionado con el switch
    // const [field, meta, helpers] = useField(name);

    // // Función para manejar el cambio del switch
    // const handleChange = (event) => {
    //     // Actualiza el valor del campo de Formik con el nuevo estado del switch
    //     helpers.setValue(event.target.checked);
    // }

    // Retorna componente 
    return(
        <Box className='switch-container'>
            {/* Texto que indica la función del switch */}
            <Typography className='switch-text'>Activa el switch para destacar en el banner</Typography>
            {/* Componente Switch */}
            <Switch 
                {...field} // Propaga los props del campo de Formik al Switch
                checked={field.value} // Establece el estado del switch basado en el valor del campo de Formik
                // onChange={handleChange} // Maneja el cambio del switch
                name={name}
                size='large' // Tamaño del switch
            />
        </Box>
    );
}

// Exporta SwitchIsBanner
export default SwitchIsBanner;