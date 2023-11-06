import './StylesFormNuevoVideo.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextInput from '../TextInput/TextInput';
import { Link } from 'react-router-dom';
import { useCategorias } from '../../CategoriaContext';
import { agregarNuevoVideo } from '../../api/api';

function FormNuevoVideo () {
    const categorias = useCategorias();

    return (
        <>
            <Typography variant='h3' color='text.primary'>Nuevo Video</Typography>
            <Formik
                initialValues={{
                    titulo: '',
                    linkVideo: '',
                    linkImagen: '',
                    categoria: '',
                }}

                validate={values => {
                    const { titulo, linkVideo, linkImagen, categoria, descripcion } = values;
                    const errors = {};

                    if (!titulo) {
                        errors.titulo = 'El título es requerido';
                    } else if(!/^[a-zA-Z0-9\s\-,.]{3,100}$/.test(titulo)) {
                        errors.titulo = 'El título del video debe contener entre 3 y 100 caracteres y solo puede incluir letras, números, espacios, guiones y comas.'
                    }

                    if (!linkVideo) {
                        errors.linkVideo = 'El link del video es requerido';
                    } else if(!/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/.test(linkVideo)) {
                        errors.linkVideo = 'Por favor, ingresa un enlace de video válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.'
                    }

                    if (!linkImagen) {
                        errors.linkImagen = 'El link de la imagen requerido';
                    } else if(!/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/.test(linkImagen)) {
                        errors.linkImagen = 'Por favor, ingresa un enlace de imagen válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.'
                    }

                    if (!categoria) {
                        errors.categoria = 'Debes elegir una categoria';
                    }

                    return errors;
                }}

                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    
                    setSubmitting(true);

                    // const nuevoVideo = {
                    //     id: values.id,
                    //     titulo: values.titulo,
                    //     linkVideo: values.linkVideo,
                    //     linkImagen: values.linkImagen,
                    // }   
                    // console .log(values);
                    const categoriaSeleccionada = values.categoria;
                    console.log(categoriaSeleccionada)
                    try {
                        // console.log(nuevoVideo);
                        // const rutaParaAgregarVideo = `/categorias/${categoriaSeleccionada}/videos`;
                        // console.log(typeof rutaParaAgregarVideo, rutaParaAgregarVideo);

                        resetForm();
                    } catch(error) {
                        console.error("Error al agregar el video:", error);
                    } finally {
                        setSubmitting(false);
                    }

                
                }}
            >
                {({ isSubmitting, errors, resetForm }) => (
                    <Form className='form-container'>
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

                        <div className='input-container'>
                            <label htmlFor='categoria'></label>
                            <Field as="select" name="categoria">
                                <option value="" label="Seleccione una categoría" disabled defaultValue="" hidden />
                                {categorias.map((categoria, index) => (
                                    <option key={index} value={categoria.id}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoria" component={() => (<div className="error">{errors.categoria}</div>)} />
                        </div>

                        <div className='container-botones'>
                            <div className='container-botones-izquierda'>
                                <Button type="submit" disabled={isSubmitting} size='large' variant='outlined' className='boton-azul'>
                                    Guardar
                                </Button>
                                <Button  disabled={isSubmitting} size='large' variant='outlined' className='boton-gris' type='button' onClick={() => resetForm()}>
                                    Limpiar
                                </Button>
                            </div>
                            <Link to="/nueva-categoria">
                                <Button disabled={isSubmitting} size='large' variant='outlined' className='boton-azul'>
                                    Nueva Categoria
                                </Button>
                            </Link>
                        </div>

                        {isSubmitting && <Typography variant='h6' color='text.primary'>Formulario enviado con exito!</Typography>}

                    </Form>
                )}
            </Formik>
        </>
    );
}
export default FormNuevoVideo;
