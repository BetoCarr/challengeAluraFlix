import './StylesFormNuevoVideo.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const categorias = ["Categoría 1", "Categoría 2", "Categoría 3"]; // Supongamos que tienes un array de opciones

function FormNuevoVideo () {
    return (
        <>
            <Typography variant='h3' color='text.primary'>Nuevo Video</Typography>
            <Formik
                initialValues={{
                    titulo: '',
                    linkVideo: '',
                    linkImagen: '',
                    categoria: '',
                    descripcion: '',
                }}

                validate={values => {
                    const errors = {};

                    if (!values.titulo) {
                        errors.titulo = 'El título es requerido';
                    } else if(!/^[a-zA-Z0-9\s\-,.]{3,100}$/.test(values.titulo)) {
                        errors.titulo = 'El título del video debe contener entre 3 y 100 caracteres y solo puede incluir letras, números, espacios, guiones y comas.'
                    }

                    if (!values.linkVideo) {
                        errors.linkVideo = 'El link del video es requerido';
                    } else if(!/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/.test(values.linkVideo)) {
                        errors.linkVideo = 'Por favor, ingresa un enlace de video válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.'
                    }

                    if (!values.linkImagen) {
                        errors.linkImagen = 'El link de la imagen requerido';
                    } else if(!/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/.test(values.linkImagen)) {
                        errors.linkImagen = 'Por favor, ingresa un enlace de imagen válido. Asegúrate de que comience con http:// o https:// y que contenga solo letras, números, guiones, puntos y otros caracteres válidos.'
                    }

                    if (!values.categoria) {
                        errors.categoria = 'Debes elegir una categoria';
                    }

                    if (!/^[a-zA-Z0-9\s\-,.]+$/.test(values.descripcion)) {
                        errors.descripcion = 'Proporciona una descripción para el video. Puedes utilizar letras, números y la mayoría de los caracteres especiales.';
                    }


                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    setTimeout(() => {
                        console.log("Envio de formulario exitoso", JSON.stringify(values, null, 2))
                        setSubmitting(false);
                        resetForm();
                    }, 5000);
                }}
            >
                {({ isSubmitting, errors, resetForm }) => (
                    <Form className='form-container'>
                        <div className='input-container'>
                            <label htmlFor="titulo"></label>
                            <Field type="text" name="titulo" id="titulo" placeholder="Introduce el título" />
                            <ErrorMessage name="titulo" component={() => (<div className="error">{errors.titulo}</div>)}/>
                        </div>
                        
                        <div className='input-container'>
                            <label htmlFor="linkVideo"></label>
                            <Field type="text" name="linkVideo" id="linkvideo" placeholder="Introduce el link del video"/>
                            <ErrorMessage name="linkVideo" component={() => (<div className="error">{errors.linkVideo}</div>)} />
                        </div>

                        <div className='input-container'>
                            <label htmlFor='linkImagen'></label>
                            <Field type="text" name="linkImagen" id="linkimagen" placeholder="Introduce el link de la imagen"/>
                            <ErrorMessage name="linkImagen" component={() => (<div className="error">{errors.linkImagen}</div>)} />
                        </div>

                        <div className='input-container'>
                            <label htmlFor='categoria'></label>
                            <Field as="select" name="categoria">
                                <option value="" label="Seleccione una categoría" />
                                {categorias.map((categoria, index) => (
                                    <option key={index} value={categoria}>
                                    {categoria}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoria" component={() => (<div className="error">{errors.categoria}</div>)} />
                        </div>

                        <div className='input-container'>
                            <label htmlFor='descripcion'></label>
                            <Field type="text" name="descripcion" id="descripcion" placeholder="Introduce una descripcion del video"/>
                            <ErrorMessage name="descripcion" component={() => (<div className="error">{errors.descripcion}</div>)} />
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
