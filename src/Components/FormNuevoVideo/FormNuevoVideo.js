import './StylesFormNuevoVideo.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Typography from '@mui/material/Typography';

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
                    codigoSeguridad: '',
                }}
                validate={values => {
                    const errors = {};

                    if (!values.titulo) {
                        errors.titulo = 'Requerido';
                    }

                    if (!values.linkVideo) {
                        errors.linkVideo = 'Requerido';
                    }

                    if (!values.linkImagen) {
                        errors.linkImagen = 'Requerido';
                    }

                    if (!values.categoria) {
                        errors.categoria = 'Requerida';
                    }

                    if (!values.descripcion) {
                        errors.descripcion = 'Requerida';
                    }

                    // Puedes agregar validación personalizada para el código de seguridad aquí

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='form-container'>
                        <div className='input-container'>
                            <label htmlFor="titulo"></label>
                            <Field type="text" name="titulo" id="titulo" placeholder="Introduce el título" />
                            <ErrorMessage name="titulo" component="div" />
                        </div>
                        
                        <div>
                            <label>Link del Video</label>
                            <Field type="text" name="linkVideo" />
                            <ErrorMessage name="linkVideo" component="div" />
                        </div>

                        <div>
                            <label>Link de la Imagen del Video</label>
                            <Field type="text" name="linkImagen" />
                            <ErrorMessage name="linkImagen" component="div" />
                        </div>

                        <div>
                            <label>Categoría</label>
                            <Field as="select" name="categoria">
                            <option value="" label="Seleccione una categoría" />
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria}>
                                {categoria}
                                </option>
                            ))}
                            </Field>
                            <ErrorMessage name="categoria" component="div" />
                        </div>

                        <div>
                            <label>Descripción</label>
                            <Field as="textarea" name="descripcion" />
                            <ErrorMessage name="descripcion" component="div" />
                        </div>

                        <div>
                            <label>Código de Seguridad</label>
                            <Field type="password" name="codigoSeguridad" />
                            <ErrorMessage name="codigoSeguridad" component="div" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Enviar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
export default FormNuevoVideo;
