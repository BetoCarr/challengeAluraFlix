import './ColorSelector.css'
import React, { useState } from "react";
import { HuePicker } from 'react-color';
import { useField } from 'formik'; // Importa el hook useField de Formik
import { Box, Typography } from '@mui/material';

function ColorSelector({ name, error }) {
    // Usa el hook useField para obtener los props del campo de Formik
    const [field, meta, helpers] = useField("color");

    // Estado local para rastrear si el campo de color ha sido tocado
    const [touched, setTouched] = useState(false);

    // Función para manejar el cambio de color
    const handleChange = color => {
        helpers.setValue(color.hex); // Actualiza el valor del campo de Formik con el nuevo color seleccionado
        setTouched(true); // Marcar el campo como tocado cuando se cambia el color

    };

    // Función para manejar la selección completa del color
    const onComplete = color => {
        helpers.setValue(color.hex); // Actualiza el valor del campo de Formik cuando se completa la selección del color
        setTouched(true); // Marcar el campo como tocado cuando se cambia el color
    };

    return (
        <>
            <Box className='colorSelector-container'>
                <Typography className='switch-text'>Selecciona un color</Typography>
                <HuePicker
                    color={field.value}
                    onChange={handleChange}
                    onChangeComplete={onComplete}
                    name={name}
                />
            </Box>
            {/* Muestra el mensaje de error si el campo ha sido tocado y hay un error */}
            {touched && error && (
                <div className='error'>{error}</div>
            )}        
        </>
    );
}

export default ColorSelector;