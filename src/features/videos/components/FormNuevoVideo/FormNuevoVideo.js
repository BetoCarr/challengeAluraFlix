import './StylesFormNuevoVideo.css'; // Importación de estilos CSS específicos para el formulario
import React from 'react'; // Importación de React y el hook useState
import { useSelector, useDispatch } from 'react-redux';
import { selectCategoryById } from '../../../videocategories/videoCategoriesSlice';
import { Formik, Form } from 'formik'; // Importación de componentes de Formik para manejar formularios
import { Typography } from '@mui/material'; // Importación de componente Typography de Material-UI
import TextInput from '../../../../Components/TextInput/TextInput'; // Importación de componente personalizado de entrada de texto
import FormButtons from '../../../../Components/FormButtons/FormButtons'; // Importación de componente personalizado para botones de formulario
import { addNewVideo } from '../../videosSlice';
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext';
import { useNavigate } from 'react-router-dom'; // Importación de hook para navegar en la aplicación

function FormNuevoVideo ({ categoryId }) {

    const dispatch = useDispatch(); // Hook para despachar acciones de Redux
    const navigate = useNavigate(); // Obtención de la función de navegación desde el hook useNavigate()

    const { openFeedback, closeFeedback } = useFeedback()

    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre } = category

    return (
        <>
            {/* Título del formulario */}
            <Typography variant='h3' color='text.primary'>Nuevo Video</Typography>
            {/* Componente Formik para manejar el formulario */}
            <Formik
                initialValues={{
                    titulo: '',
                    linkVideo: '',
                    linkImagen: ''
                }}

                // Validación de los valores del formulario
                validate={values => {
                    const { titulo, linkVideo, linkImagen } = values;
                    const errors = {};

                    if (!titulo) {
                        errors.titulo = 'El título es requerido';
                    } else if(!/^[a-zA-Z0-9\s,.-]{3,100}$/.test(titulo)) {
                        errors.titulo = 'El título del video debe contener entre 3 y 100 caracteres y solo puede incluir letras, números, espacios, comas, guiones y puntos.';
                    }

                    if (!linkVideo) {
                        errors.linkVideo = 'El link del video es requerido';
                    } else if(!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/.test(linkVideo)) {
                        errors.linkVideo = 'Por favor, ingresa un enlace de video válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.';
                    }

                    if (!linkImagen) {
                        errors.linkImagen = 'El link de la imagen requerido';
                    } else if(!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/.test(linkImagen)) {
                        errors.linkImagen = 'Por favor, ingresa un enlace de imagen válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.';
                    }

                    return errors;
                }}

                // Manejo de la acción de envío del formulario
                onSubmit={async (values, { setSubmitting, resetForm }) => {

                    setSubmitting(true);

                    const newVideo = {
                        titulo: values.titulo,
                        linkVideo: values.linkVideo,
                        linkImagen: values.linkImagen,
                    }   

                    dispatch(addNewVideo({ categoryId, newVideo }))
                    .unwrap()
                    .then(() => {
                        console.log('Video agregado exitosamente');
                        openFeedback("FeedbackDialog", {
                            message: "VIdeo agregado exitosamente!",
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
                            name="titulo"
                            placeholder="Introduce el título"
                        />
                        
                        <TextInput 
                            label="Link de video"
                            name="linkVideo"
                            placeholder="Introduce el link del video"
                        />

                        <TextInput 
                            label="Link de imagen"
                            name="linkImagen"
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