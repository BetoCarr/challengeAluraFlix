// Importar los estilos y los componentes necesarios
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
    // Estado local para gestionar el banner, color seleccionado y errores del formulario
    const [isBanner, setIsBanner] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#02FCE1'); // Color inicial
    const [formErrors, setFormErrors] = useState({});

    // Obtener las categorías y sus colores
    const categories = useCategorias();
    const categoriesColors = categories.map(category => category.color);

    // Función para verificar la similitud de colores
    const isColorTooSimilar = (newColor, existingColors, threshold) => {
        const errors = {};
        for (const color of existingColors) {
            // Calcula la diferencia de colores (por ejemplo, distancia euclidiana en RGB)
            const distance = calculateColorDifference(newColor, color);
            // Si la distancia es menor que el umbral, considera los colores como similares
            if (distance < threshold) {
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

    // Obtener las categorías y sus colores
    const handleColorChange = (newColor) => {
        setSelectedColor(newColor);
        // Verificar la similitud de colores y actualizar los errores del formulario
        const colorErrors = isColorTooSimilar(newColor, categoriesColors, 50);
        setFormErrors((prevErrors) => ({ ...prevErrors, ...colorErrors }));
    }; 

    // Manejar el cambio del banner
    const handleSwitchChange = (isChecked) => {
        setIsBanner(isChecked);
        // Realiza cualquier lógica adicional con el valor del Switch aquí
    };

    // Valores iniciales del formulario
    const initialValues = {
        nombreCategoria: ''
    };

    return(
        <>
            {/* Encabezado */}
            <Typography variant='h3' color='text.primary'>Nueva Categoria</Typography>
            {/* Formulario con Formik */}
            <Formik
                initialValues={initialValues}

                // Validación del formulario
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

                // Enviar el formulario
                onSubmit={async (values, { resetForm }) => {
                    // Verificar errores de color al enviar el formulario
                    const colorErrors = isColorTooSimilar(selectedColor, categoriesColors, 50);
                    setFormErrors({ ...colorErrors });
                    // Si no hay errores, enviar el formulario
                    if (Object.keys(colorErrors).length === 0) {
                        // No hay errores de color, enviar el formulario
                        alert("Formulario enviado con éxito!");
                        const updatedValues = { ...values, isBanner, selectedColor };
                        console.log(updatedValues);
                        resetForm();
                    }
                }}

            >
                {({isSubmitting, resetForm, errors}) => (
                    <Form className='form-container'>
                        {/* Componente para el nombre */}
                        <TextInput
                            label="Nombre"
                            name="nombreCategoria"
                            placeholder="Introduce el nombre de la nueva categoria"
                        />
                        {/* Componente para el banner */}
                        <SwitchIsBanner onSwitchChange={handleSwitchChange} />
                        {/* Componente para seleccionar el color */}
                        <ColorSelector
                            name="selectedColor"
                            initialColor={selectedColor}
                            onColorChange={handleColorChange}
                            error={formErrors.selectedColor}
                        />
                        {/* Componente para los botones del formulario */}                       
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