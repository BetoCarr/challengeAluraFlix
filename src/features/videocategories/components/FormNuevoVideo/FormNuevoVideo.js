import './StylesFormNuevoVideo.css'; // Importación de estilos CSS específicos para el formulario
import React, { useState } from 'react'; // Importación de React y el hook useState
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../../videoCategoriesSlice';
import { Formik, Form } from 'formik'; // Importación de componentes de Formik para manejar formularios
import { Typography } from '@mui/material'; // Importación de componente Typography de Material-UI
import TextInput from '../../../../Components/TextInput/TextInput'; // Importación de componente personalizado de entrada de texto
import FormButtons from '../../../../Components/FormButtons/FormButtons'; // Importación de componente personalizado para botones de formulario
// import FeedbackDialog from '../FeedbackDialog/FeedbackDialog'; // Importación de componente de cuadro de diálogo de retroalimentación
// import { agregarNuevoVideo } from '../../api/api'; // Importación de función para agregar un nuevo video desde la API
import { useNavigate } from 'react-router-dom'; // Importación de hook para navegar en la aplicación

function FormNuevoVideo ({ handleClose, categoryId }) {

    const category = useSelector(state => selectCategoryById(state, categoryId))
    const { nombre } = category

    console.log(nombre)

    const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null }); // Estado para manejar el cuadro de diálogo de retroalimentación
    const navigate = useNavigate(); // Obtención de la función de navegación desde el hook useNavigate()

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

                    // Llamada a la función para agregar un nuevo video a través de la API
                    // agregarNuevoVideo(categoryId, newVideo)
                    // .then((responseData) => {
                    //     console.log("¡Video agregado exitosamente!", responseData);
                    //     resetForm();// Reinicia el formulario después de agregar el video
                    //     // Configura el feedback para mostrar un mensaje de éxito
                    //     setFeedback({
                    //         isOpen: true,
                    //         message: "¡Video agregado exitosamente! La página se recargará para mostrar el nuevo video.",
                    //         onConfirm: () => {
                    //             setFeedback({ isOpen: false });  // Cierra el feedback
                    //             navigate('/', { replace: true }); // Navega a la página principal
                    //             window.location.reload(); // Recarga la página para mostrar los cambios
                    //         }
                    //     });
                    // })
                    // .catch((error) => {
                    //     console.error("Error al agregar el video:", error);
                    //     // Configura el feedback para mostrar un mensaje de error
                    //     setFeedback({
                    //         isOpen: true,
                    //         message: `Video NO agregado. Error: ${error}`,
                    //         onConfirm: () => setFeedback({ isOpen: false })  // Cierra el feedback
                    //     });
                    // })
                    // .finally(() => {
                    //     setSubmitting(false); // Establece el estado de envío del formulario a falso
                    // });
                }}
            >
                {({ isSubmitting, resetForm }) => (
                    <Form className='form-container'>
                        {/* Sección para mostrar la categoría seleccionada */}
                        <div className='input-container-category '>
                            <Typography >Categoria seleccionada: </Typography>
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
            {/* Componente FeedbackDialog que se muestra según el estado del feedback */}
            {/* <FeedbackDialog
                isOpen={feedback.isOpen}
                onClose={() => setFeedback({ isOpen: false })}
                message={feedback.message}
                onConfirm={feedback.onConfirm} */}
            {/* /> */}
        </>
    );
}
// Exporta formulario
export default FormNuevoVideo;
