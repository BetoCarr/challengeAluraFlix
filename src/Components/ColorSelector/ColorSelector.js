// Importar los estilos y los componentes necesarios
import './ColorSelector.css'
import React from "react";
import { useSelector } from 'react-redux';
import { selectCategoryColors } from '../../features/categories/categoriesSlice';
import { useField } from 'formik'; // Importa el hook useField de Formik
import { Box, Typography } from '@mui/material';

function ColorSelector({ name }) {

    // Usa el hook useField para obtener los props del campo de Formik
    const [field, meta, helpers] = useField(name);

    const existingColors = useSelector(selectCategoryColors)

    // Función para verificar la similitud de colores
    const isColorTooSimilar = (newColor, threshold) => {
        for (const color of existingColors) {
            // Calcula la diferencia de colores (por ejemplo, distancia euclidiana en RGB)
            const distance = calculateColorDifference(newColor, color);
            // Si la distancia es menor que el umbral, considera los colores como similares
            if (distance < threshold) {
                return true;
            }
        }
        return false; // No se encontraron colores similares
    };

    // Función para calcular la distancia de los colores
    const calculateColorDifference = (color1, color2) => {
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

    // Manejo del cambio de color
    const handleChange = (e) => {
        const newColor = e.target.value;
        console.log(newColor)
        if (isColorTooSimilar(newColor, 50 )) {
            helpers.setError("El color es demasiado similar a uno existente.");
        } else {
            helpers.setValue(newColor); // Actualizar el valor en Formik
            helpers.setError(undefined); // Limpiar cualquier error previo
        }
    };

    return (
        <>
            {/* Contenedor del selector de color */}
            <Box className='colorSelector-container'>
                <Typography className='switch-text'>Selecciona un color</Typography>
                {/* Selector de color */}
                <input
                    type="color"
                    {...field} // Integra el campo con Formik
                    onChange={handleChange} // Manejo personalizado
                    style={{ width: "30%", height: "40px", border: "none", cursor: "pointer" }}
                />
            </Box>
            {/* Muestra el mensaje de error si el campo ha sido tocado y hay un error */}
            {meta.error && (
                <div className='error'>{meta.error}</div>
            )}       
        </>
    );
}

// Exporta componente ColorSelector
export default ColorSelector;