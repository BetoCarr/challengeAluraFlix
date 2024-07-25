// Importar los estilos y los componentes necesarios
import './FormNuevaCategoria.css'; // Importa los estilos específicos para este componente
import React, { useState } from "react"; // Importa React y el hook useState
import { useSelector, useDispatch } from 'react-redux';
import {Typography} from '@mui/material'; // Importa el componente Typography de Material-UI
import { Formik, Form } from 'formik'; // Importa los componentes Formik y Form de Formik
import TextInput from "../TextInput/TextInput"; // Importa el componente TextInput
import SwitchIsBanner from '../SwitchIsBanner/SwitchIsBanner'; // Importa el componente SwitchIsBanner
import ColorSelector from '../ColorSelector/ColorSelector'; // Importa el componente ColorSelector
import FormButtons from '../FormButtons/FormButtons'; // Importa el componente FormButtons
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog'; // Importa el componente FeedbackDialog
// import { useCategorias } from '../../CategoriaContext'; // Importa el hook useCategorias del contexto de categorías
import { selectAllCategories, addCategory } from '../../features/videocategories/videoCategoriesSlice';
import { editarCategoria } from '../../api/api'; // Importa las funciones de agregar y editar categoría de la API
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router

// Función del componente principal FormNuevaCategoria
function FormNuevaCategoria({ initialValuesForEdit, isEditing, categoryId }) {

    // Estado local para gestionar mensajes del formulario
    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });
    const navigate = useNavigate(); // Hook para navegar entre rutas
    const dispatch = useDispatch(); // Hook para despachar acciones de Redux

    // Función para verificar la similitud de colores
    const isColorTooSimilar = (newColor, existingColors, threshold) => {
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

   // Obtener las categorías y sus colores
    const categories = useSelector(selectAllCategories);
    console.log(categories)
    const categoriesColors = categories.map(category => category.color);

    // Valores iniciales del formulario
    const initialValues = initialValuesForEdit || {
        nombre: '',
        color:'#00fff8', 
        isBanner: false
    };

    return(
        <>
            {/* Encabezado */}
            <Typography variant='h3' color='text.primary'>
                {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
            </Typography>
            {/* Formulario con Formik */}
            <Formik
                initialValues={initialValues}
                validateOnChange={true} // Activar la validación en cada cambio del campo

                // Validación del formulario
                validate={values => {
                    const { nombre, color, isBanner } = values;
                    const errors = {};
                    
                    //Validación del nombre de la categoria
                    if(!nombre) {
                        errors.nombre = 'El nombre de la categoria es requerido';
                    } else if(!/^[a-zA-Z0-9À-ÿ\s\-]{3,50}$/.test(nombre)) {
                        errors.nombre = 'El nombre de la categoría solo puede incluir letras, números, espacios y guiones';
                    }

                    // Validación del color
                    const colorIsSimilar = isColorTooSimilar(color, categoriesColors, 50);
                    if (colorIsSimilar) {
                        errors.color = 'Ya existe una categoría con el color seleccionado';
                    }

                    // Validación de isBanner
                    if (typeof isBanner !== 'boolean') {
                        errors.isBanner = 'El valor de isBanner debe ser booleano';
                    }

                    return errors;
                }}

                // Enviar el formulario
                onSubmit={async (values, { resetForm }) => {
                    // Verificar si se está editando una categoría existente
                    if(isEditing) {
                        // Crear un objeto con los datos actualizados de la categoría
                        const updatedVideoData = { ...values };
                        // Llamar a la función para editar la categoría en la API
                        editarCategoria(categoryId, updatedVideoData)
                        // Manejar la respuesta exitosa
                        .then((responseData) => {
                            console.log("Categoria editada exitosamente!", responseData);
                            // Mostrar un mensaje de éxito y recargar la página
                            setFeedback({
                                isOpen: true,
                                message: "Categoria editada exitosamente! La página se recargará para mostrar los cambios.",
                                onConfirm: () => {
                                    navigate('/', { replace: true });
                                    window.location.reload();
                                    resetForm();
                                    setFeedback({ isOpen: false });
                                }
                            });
                        })
                        // Manejar cualquier error que ocurra
                        .catch((error) => {
                            console.error("Error al editar la categoria:", error);
                            // Mostrar un mensaje de error
                            setFeedback({
                                isOpen: true,
                                message: `Categoria NO editada. Error: ${error}`,
                                onConfirm: () => setFeedback({ isOpen: false })
                            });
                        })
                        // Ejecutar acciones adicionales independientemente de si la solicitud fue exitosa o no
                        .finally(() => {
                            console.log('La solicitud ha finalizado, ejecutando acciones adicionales...');
                            resetForm();
                        });
                    } else {
                        dispatch(addCategory(values))
                        .unwrap()
                        .then((responseData) => {
                            console.log("Categoria agregada exitosamente!", responseData);
                            setFeedback({
                                isOpen: true,
                                message: "Categoria agregada exitosamente! La página se recargará para mostrar y que agregues videos a la categoria.",
                                onConfirm: () => {
                                    // window.location.reload();
                                    resetForm();
                                    setFeedback({ isOpen: false });
                                    navigate('/', { replace: true });
                                }
                            });
                        })
                        // Manejar cualquier error que ocurra
                        .catch((error) => {
                            console.error("Error al agregar la categoria:", error);
                            // Mostrar un mensaje de error
                            setFeedback({
                                isOpen: true,
                                message: `Categoria NO agregada. Error: ${error}`,
                                onConfirm: () => setFeedback({ isOpen: false })
                            });
                        })
                        // Ejecutar acciones adicionales independientemente de si la solicitud fue exitosa o no
                        .finally(() => {
                            console.log('La solicitud ha finalizado, ejecutando acciones adicionales...');
                            resetForm();
                        });
                    }
                }}
            >
                {({isSubmitting, resetForm, values, errors}) => (
                    <Form className='form-container'>
                        {/* Componente para el nombre */}
                        <TextInput
                            label="Nombre"
                            name="nombre"
                            placeholder="Introduce el nombre de la nueva categoria"
                        />
                        {/* Componente para el banner */}
                        <SwitchIsBanner
                            name="isBanner"
                            onChange={isBanner => {
                                values.isBanner = isBanner;
                            }} 
                            categories={categories}
                        />
                        {/* Componente para seleccionar el color */}
                        <ColorSelector
                            name="color"
                            id="color" 
                            label={("PROJET.COLOR")}
                            onChange={color => {
                                values.color = color;
                            }}
                            error={errors.color} // Pasa el error del campo de color como una propiedad
                        />
                        {/* Componente para los botones del formulario */}                       
                        <FormButtons
                            isSubmitting={isSubmitting} 
                            resetForm={resetForm}
                        />
                    </Form>
                )}
            </Formik>
            {/* Componente FeedbackDialog */}
            <FeedbackDialog
                isOpen={feedback.isOpen}
                onClose={() => setFeedback({ isOpen: false })}
                message={feedback.message}
                onConfirm={feedback.onConfirm}
                confirmLabel="Aceptar"
            />
        </>
    );
}
// Exporta comoponente principal
export default FormNuevaCategoria;