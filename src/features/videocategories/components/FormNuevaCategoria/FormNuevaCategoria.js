// Importar los estilos y los componentes necesarios
import './FormNuevaCategoria.css'; // Importa los estilos específicos para este componente
import React from "react"; // Importa React y el hook useState
import { useSelector, useDispatch } from 'react-redux';
import { showSimpleMessage, closeFeedback } from '../../../feedbackdialog/feedbackActions';
import {Typography} from '@mui/material'; // Importa el componente Typography de Material-UI
import { Formik, Form } from 'formik'; // Importa los componentes Formik y Form de Formik
import TextInput from "../../../../Components/TextInput/TextInput"; // Importa el componente TextInput
import SwitchIsBanner from '../../../../Components/SwitchIsBanner/SwitchIsBanner'; // Importa el componente SwitchIsBanner
import ColorSelector from '../../../../Components/ColorSelector/ColorSelector'; // Importa el componente ColorSelector
import FormButtons from '../../../../Components/FormButtons/FormButtons'; // Importa el componente FormButtons
import FeedbackDialog from '../../../feedbackdialog/FeedbackDialog/FeedbackDialog'; // Importa el componente FeedbackDialog
import { selectAllCategories, addCategory, updateCategory } from '../../videoCategoriesSlice'
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router

// Función del componente principal FormNuevaCategoria
function FormNuevaCategoria({ initialValuesForEdit, isEditing, categoryId }) {

    // Estado local para gestionar mensajes del formulario
    const navigate = useNavigate(); // Hook para navegar entre rutas
    const feedbackState = useSelector((state) => state.feedback);
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

                onSubmit={async (values, { resetForm }) => {
                    if (isEditing) {
                        dispatch(updateCategory({ categoryId, updatedCategory: values }))
                            // .unwrap()
                            // .then((response) => {
                            //     dispatch(showSimpleMessage({ message: "Categoría editada exitosamente!" }))
                            //     setTimeout(() => {
                            //         dispatch(closeFeedback());
                            //         // resetForm();
                            //         // navigate('/', { replace: true });
                            //     }, 2000);
                            // })
                            // .catch((error) => {
                            //     dispatch(showSimpleMessage({ message: `Categoría NO editada. Error: ${error}` }));
                            // });
                    } else {
                        dispatch(addCategory(values))
                            .unwrap()
                            .then((responseData) => {
                                dispatch(showSimpleMessage({ message: "Categoría agregada exitosamente!" }));
                                setTimeout(() => {
                                    dispatch(closeFeedback());
                                    resetForm();
                                    navigate('/', { replace: true });
                                }, 2000);
                            })
                            .catch((error) => {
                                dispatch(showSimpleMessage({ message: `Categoría NO agregada. Error: ${error}` }));
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
                isOpen={feedbackState.isOpen}
                onClose={() => dispatch(closeFeedback())}
                message={feedbackState.message}
                onCancel={feedbackState.showActions ? feedbackState.onCancel : null}
                onConfirm={feedbackState.showActions ? feedbackState.onConfirm : null}
                cancelLabel={feedbackState.cancelLabel}
                confirmLabel={feedbackState.confirmLabel}
            />
        </>
    );
}
// Exporta comoponente principal
export default FormNuevaCategoria;