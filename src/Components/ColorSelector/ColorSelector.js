// Importar los estilos y los componentes necesarios
import './ColorSelector.css'
import React from "react";
import {HuePicker} from "react-color";
import { useSelector } from 'react-redux';
import { selectCategoryColors } from '../../features/categories/categoriesSlice';
import { useField, useFormikContext } from 'formik'; // Importa el hook useField de Formik
import { Box, Typography, TextField } from '@mui/material';

// Función para calcular la distancia de los colores
export const calculateColorDifference = (color1, color2) => {
    // Convertir colores hexadecimales a valores RGB
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    // Extraer componentes R, G, B
    const { r: r1, g: g1, b: b1 } = rgb1;
    const { r: r2, g: g2, b: b2 } = rgb2;
    // Calcular la diferencia euclidiana
    const distance = Math.sqrt(
        Math.pow((r2 - r1), 2) +
        Math.pow((g2 - g1), 2) +
        Math.pow((b2 - b1), 2)
    );
    return distance;
};

// Función para convertir colores hexadecimales a RGB
const hexToRgb = (hex) => {
    // Eliminar el # del inicio si está presente
    hex = hex.replace("#", "");
    // Obtener componentes R, G, B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
};

function ColorSelector({ colors, ...props }) {

    // Usa el hook useField para obtener los props del campo de Formik
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers; 

    // const { setFieldError, values, setFieldValue } = useFormikContext(); // Para actualizar errores globales en Formik
    // console.log(values)


    // const isColorTooSimilar = (newColor, threshold) => {
    // return existingColors.some(
    //     (existingColor) =>
    //         calculateColorDifference(newColor, existingColor) < threshold
    // );
    // };

    // // Función para calcular la distancia de los colores
    // const calculateColorDifference = (color1, color2) => {
    //     // Convertir colores hexadecimales a valores RGB
    //     const rgb1 = hexToRgb(color1);
    //     const rgb2 = hexToRgb(color2);
    //     // Extraer componentes R, G, B
    //     const { r: r1, g: g1, b: b1 } = rgb1;
    //     const { r: r2, g: g2, b: b2 } = rgb2;
    //     // Calcular la diferencia euclidiana
    //     const distance = Math.sqrt(
    //         Math.pow((r2 - r1), 2) +
    //         Math.pow((g2 - g1), 2) +
    //         Math.pow((b2 - b1), 2)
    //     );
    //     return distance;
    // };

    // // Función para convertir colores hexadecimales a RGB
    // const hexToRgb = (hex) => {
    //     // Eliminar el # del inicio si está presente
    //     hex = hex.replace("#", "");
    //     // Obtener componentes R, G, B
    //     const r = parseInt(hex.substring(0, 2), 16);
    //     const g = parseInt(hex.substring(2, 4), 16);
    //     const b = parseInt(hex.substring(4, 6), 16);
    //     return { r, g, b };
    // };

    // Manejo del cambio de color
    const handleChange = (color) => {
        setValue(color.hex); // Actualiza el valor en Formik
    };

    return (
        <>
            {/* Contenedor del selector de color */}
            <Box className='colorSelector-container'>
                <Typography className='switch-text'>Selecciona un color</Typography>
                {/* Selector de color */}
                <HuePicker
                    {...props}
                    color={field.value}
                    onChange={handleChange}
                />
            </Box>
            {/* Muestra el mensaje de error si el campo ha sido tocado y hay un error */}
            {/* {meta.error && (
                <div className='error'>{meta.error}</div>
            )}        */}
        </>
    );
}

// Exporta componente ColorSelector
export default ColorSelector;