// Importación de React, componentes y hooks
import './StylesFormNuevoVideo.css'; // Importación de estilos CSS específicos para el formulario
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewVideo, updateVideo } from '../../videosSlice';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import { useNavigate } from 'react-router-dom';
import { selectCategoryById } from '../../../categories/videoCategoriesSlice';
import { Formik, Form } from 'formik';
import { Typography } from '@mui/material';
import TextInput from '../../../../Components/TextInput/TextInput';
import FormButtons from '../../../../Components/FormButtons/FormButtons';

// Componente principal UpdateVideoIcon
function FormNuevoVideo ({ initialValuesForEdit, isEditing, videoId, categoryId }) {

    // Inicializa hooks de Redux y navegación
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Hooks del contexto de feedback para abrir y cerrar diálogos
    const { openFeedback, closeFeedback } = useFeedback()

    // Obtiene información de la categoría seleccionada usando su ID
    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre } = category

    // Valores iniciales del formulario, que varían según si es edición o creación
    const initialValues = initialValuesForEdit || {
        title: '',
        videoUrl: '',
        imageUrl: ''
    }

    return (
        <>
            {/* Título del formulario */}
            <Typography variant='h3' color='text.primary'>
                {isEditing ? 'Editar Video' : 'Nuevo Video'}
            </Typography>           
            {/* Componente Formik para manejar el formulario */}
            <Formik
                initialValues={initialValues}
                enableReinitialize
                // Validación de los valores del formulario
                validate={values => {
                    const { title, videoUrl, imageUrl } = values;
                    const errors = {};
                    // Validación del título
                    if (!title) {
                        errors.title = 'El título es requerido';
                    } else if(!/^[a-zA-Z0-9\s,.-]{3,100}$/.test(title)) {
                        errors.title = 'El título del video debe contener entre 3 y 100 caracteres y solo puede incluir letras, números, espacios, comas, guiones y puntos.';
                    }
                    // Validación del link del video
                    if (!videoUrl) {
                        errors.videoUrl = 'El link del video es requerido';
                    } else if(!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/.test(videoUrl)) {
                        errors.videoUrl = 'Por favor, ingresa un enlace de video válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.';
                    }
                    // Validación del link de la imagen
                    if (!imageUrl) {
                        errors.imageUrl = 'El link de la imagen requerido';
                    } else if(!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/.test(imageUrl)) {
                        errors.imageUrl = 'Por favor, ingresa un enlace de imagen válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.';
                    }

                    return errors;
                }}

                // Manejo de la acción de envío del formulario
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    // Lógica para editar un video existente
                    if(isEditing) {
                        // Datos actualizados
                        const updatedVideoData = {
                            title: values.title,
                            videoUrl: values.videoUrl,
                            imageUrl: values.imageUrl,
                        }
                        dispatch(updateVideo({videoId, updatedVideoData})) // Llama a la acción de Redux
                        .unwrap()
                        .then(() => {
                            openFeedback("FeedbackDialog", { // Muestra un cuadro de diálogo de éxito
                                message: "VIdeo editado exitosamente!",
                            })                           
                            setTimeout(() => { // Cierra el diálogo, restablece el formulario y navega a "home" después de 3 segundos
                                closeFeedback();
                                resetForm();
                                navigate('/', { replace: true });
                            }, 3000);
                        })
                        .catch((error) => {
                            console.log(error)
                            openFeedback("FeedbackDialog", { // Configura el cuadro de diálogo de retroalimentación con un mensaje de error
                                message: "Video NO editado!",
                            })
                            setTimeout(() => { // Cierra el diálogo después de 3 segundos
                                closeFeedback();
                            }, 3000);
                        });
                    } else { // Lógica para agregar un video
                        setSubmitting(true)
                        // Nuevos datos de video
                        const newVideo = {
                            title: values.title,
                            videoUrl: values.videoUrl,
                            imageUrl: values.imageUrl,
                        }  
                        dispatch(addNewVideo({ categoryId, newVideo }))// Llama a la acción de Redux
                        .unwrap()
                        .then(() => {
                            openFeedback("FeedbackDialog", { // Muestra un cuadro de diálogo de éxito
                                message: "VIdeo agregado exitosamente!",
                            })                           
                            setTimeout(() => { // Cierra el diálogo, restablece el formulario y navega a "home" después de 3 segundos
                                closeFeedback();
                                resetForm();
                                navigate('/', { replace: true });
                            }, 3000);
                        })
                        .catch((error) => {
                            console.log(error)
                            openFeedback("FeedbackDialog", { // Configura el cuadro de diálogo de retroalimentación con un mensaje de error
                                message: "Video NO agregado!",
                            })
                            setTimeout(() => { // Cierra el diálogo después de 3 segundos
                                closeFeedback();
                            }, 3000);
                        });
                    }
                }}
            >
                {({ isSubmitting, resetForm }) => (
                    <Form className='form-container'>
                        {/* Sección para mostrar la categoría seleccionada */}
                        <div className='input-container-category '>
                            <Typography >Categoria seleccionada: {nombre} </Typography>
                        </div>
                        {/* Componentes TextInput para los campos del formulario */}
                        <TextInput 
                            label="Título"
                            name="title"
                            placeholder="Introduce el título"
                        />
                        
                        <TextInput 
                            label="Link de video"
                            name="videoUrl"
                            placeholder="Introduce el link del video"
                        />

                        <TextInput 
                            label="Link de imagen"
                            name="imageUrl"
                            placeholder="Introduce el link de la imagen"
                        />

                        {/* Componente FormButtons para los botones de envío y restablecimiento del formulario */}
                        <FormButtons
                            isSubmitting={isSubmitting} 
                            resetForm={resetForm}
                        />
                        {/* Mensaje de éxito al enviar el formulario */}
                        {isSubmitting && <Typography variant='h6' color='text.primary'>Formulario enviado con exito!</Typography>}
                    </Form>
                )}
            </Formik>
        </>
    );
}

// Exporta formulario
export default FormNuevoVideo;