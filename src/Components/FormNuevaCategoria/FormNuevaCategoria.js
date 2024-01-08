import './FormNuevaCategoria.css';
import React, { useState } from "react";
import {Typography} from '@mui/material';
import { Formik, Form } from 'formik';
import TextInput from "../TextInput/TextInput";
import SwitchIsBanner from '../SwitchIsBanner/SwitchIsBanner';
import ColorSelector from '../ColorSelector/ColorSelector';
import FormButtons from '../FormButtons/FormButtons';
import { useCategorias } from '../../CategoriaContext';


function FormNuevaCategoria() {

    const [isBanner, setIsBanner] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#02FCE1'); // Color inicial
    const [formErrors, setFormErrors] = useState({});


    const categories = useCategorias();
    const categoriesColors = categories.map(category => category.color);
    // console.log(categoriesColors)



    // Función para verificar la similitud de colores
    const isColorTooSimilar = (newColor, existingColors, threshold) => {
        const errors = {};

        for (const color of existingColors) {
            // Calcula la diferencia de colores (por ejemplo, distancia euclidiana en RGB)
            const distance = calculateColorDifference(newColor, color);
            // Si la distancia es menor que el umbral, considera los colores como similares
            if (distance < threshold) {
                console.log("Elige un color diferente")
                errors.selectedColor = 'Elige un color diferente'; // Se agrega un error al campo
                return errors; // Colores similares            
            }
        }
        return errors; // No se encontraron colores similares
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

    const handleColorChange = (newColor) => {
        setSelectedColor(newColor);
        // Puedes realizar cualquier lógica adicional con el nuevo color aquí si es necesario
        const colorErrors = isColorTooSimilar(newColor, categoriesColors, 50);
        setFormErrors((prevErrors) => ({ ...prevErrors, ...colorErrors }));
    }; 

    const handleSwitchChange = (isChecked) => {
        setIsBanner(isChecked);
        // Realiza cualquier lógica adicional con el valor del Switch aquí
    };

    const initialValues = {
        nombreCategoria: ''
    };

    return(
        <>
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            <Formik
                initialValues={initialValues}

                validate={values => {
                    const { nombreCategoria } = values;
                    const errors = {};

                    //Validación del nombre de la categoria
                    if(!nombreCategoria) {
                        errors.nombreCategoria = 'El nombre de la categoria es requerido';
                    } else if(!/^[a-zA-Z0-9À-ÿ\s\-]{3,50}$/.test(nombreCategoria)) {
                        errors.nombreCategoria = 'El nombre de la categoría solo puede incluir letras, números, espacios y guiones';
                    }
                    
                    return errors;
                }}

                onSubmit={async (values, { resetForm }) => {
                    
                    const colorErrors = isColorTooSimilar(selectedColor, categoriesColors, 50);
                    setFormErrors({ ...colorErrors });

                    if (Object.keys(colorErrors).length === 0) {
                        // No hay errores de color, enviar el formulario
                        alert("Formulario enviado con éxito!");
                        const updatedValues = { ...values, isBanner, selectedColor };
                        console.log(updatedValues);
                        resetForm();
                    }
                    // alert("Formulario enviado con éxito!")
                    // const updatedValues = { ...values, isBanner, selectedColor }; // Obteniendo el valor actual de isBanner
                    // console.log(updatedValues);
                }}

            >
                {({isSubmitting, resetForm, errors}) => (
                    <Form className='form-container'>
                        <TextInput
                            label="Nombre"
                            name="nombreCategoria"
                            placeholder="Introduce el nombre de la nueva categoria"
                        />
                        <SwitchIsBanner onSwitchChange={handleSwitchChange} />
                        <ColorSelector
                            initialColor={selectedColor}
                            onColorChange={handleColorChange}
                        />
                        {/* {colorErrors.selectedColor && (
                            <div className="error-message">{colorErrors.selectedColor}</div>
                        )} */}
                        <FormButtons
                            isSubmitting={isSubmitting} 
                            resetForm={resetForm}
                        />
                    </Form>
                )}
            </Formik>
        </>

    );
}

export default FormNuevaCategoria;