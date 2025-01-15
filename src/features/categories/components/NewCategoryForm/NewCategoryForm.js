// Importar los estilos y los componentes necesarios
import './NewCategoryFormStyle.css'; // Importa los estilos específicos para este componente
import React from "react"; // Importa React y el hook useState
import { useSelector, useDispatch } from 'react-redux';
import {Typography} from '@mui/material'; // Importa el componente Typography de Material-UI
import { Formik, Form } from 'formik'; // Importa los componentes Formik y Form de Formik
import { selectAllCategories, addCategory, updateCategory } from '../../categoriesSlice'
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de React Router
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import { calculateColorDifference } from '../../../../Components/ColorSelector/ColorSelector';
import TextInput from "../../../../Components/TextInput/TextInput"; // Importa el componente TextInput
import SwitchIsBanner from '../../../../Components/SwitchIsBanner/SwitchIsBanner'; // Importa el componente SwitchIsBanner
import ColorSelector from '../../../../Components/ColorSelector/ColorSelector'; // Importa el componente ColorSelector
import FormButtons from '../../../../Components/FormButtons/FormButtons'; // Importa el componente FormButtons

// Función del componente principal NewCategoryForm
function NewCategoryForm({ initialValuesForEdit, isEditing, categoryId }) {

    // Hook para navegar entre rutas
    const navigate = useNavigate(); 

    // Hook para despachar acciones de Redux
    const dispatch = useDispatch(); 

    // Hooks del contexto de feedback para abrir y cerrar diálogos
    const { openFeedback, closeFeedback } = useFeedback()

    // Obtener las categorías y sus colores
    const categories = useSelector(selectAllCategories);
    const existingColors = categories.map(category => category.color);

    // Valores iniciales del formulario
    const initialValues = initialValuesForEdit || {
        nombre: '',
        color:'#FF0000', 
        isBanner: false,
    };

    // Función auxiliar para validar el color, utiliza la funcion importada de ColorSelector
    const validateColor = (value, existingColors, isEditing) => {
        let filteredColors = existingColors

        if(isEditing) {
            let categoryColor = initialValuesForEdit.color
            console.log(categoryColor)  
            // Excluir el color de la categoría actual de la validación
            filteredColors = existingColors.filter(color => color !== categoryColor);
            // console.log(filteredColors)
        }

        const threshold = 50; // Define el umbral para colores similares
    
        // Usar Array.some para detenerse en el primer conflicto
        const isTooSimilar = filteredColors.some(color => 
            calculateColorDifference(value, color) < threshold
        )

        if (isTooSimilar) {
            return `El color es demasiado similar a uno existente`;
        }
    
        return undefined; 
    }
    
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
                    const colorError = validateColor(color, existingColors, isEditing);
                    if (colorError) {
                        errors.color = colorError; // Asignar el mensaje de error devuelto por validateColor
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
                        .unwrap()
                        .then(() => {
                            console.log('Edición exitosa, abriendo FeedbackDialog...');
                            openFeedback("FeedbackDialog", {
                                message: "Categoria editada exitosamente!",
                            })                           
                            setTimeout(() => {
                                closeFeedback();
                                resetForm();
                                navigate('/', { replace: true });
                            }, 3000);
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    } else {
                        dispatch(addCategory(values))
                            .unwrap()
                            .then(() => {
                                openFeedback("FeedbackDialog", {
                                    message: "Categoria agregada exitosamente!",
                                })                                
                                setTimeout(() => {
                                    closeFeedback();
                                    resetForm();
                                    navigate('/', { replace: true });
                                }, 3000);
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    }
                }}
                
            >
                {({isSubmitting, resetForm}) => (
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
                        />
                        {/* Componente para seleccionar el color */}
                        <ColorSelector
                            name="color"
                            id="color" 
                            label="Selecciona un color"
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

// Exporta comoponente principal
export default NewCategoryForm;