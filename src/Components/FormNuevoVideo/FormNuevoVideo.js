import './StylesFormNuevoVideo.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
                        
                        <div className='input-container'>
                            <label htmlFor="linkVideo"></label>
                            <Field type="text" name="linkVideo" id="linkvideo" placeholder="Introduce el link del video"/>
                            <ErrorMessage name="linkVideo" component="div" />
                        </div>

                        <div className='input-container'>
                            <label htmlFor='linkImagen'></label>
                            <Field type="text" name="linkImagen" id="linkimagen" placeholder="Introduce el link de la imagen"/>
                            <ErrorMessage name="linkImagen" component="div" />
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
                            <ErrorMessage name="categoria" component="div" />
                        </div>

                        <div className='input-container'>
                            <label htmlFor='descripcion'></label>
                            <Field type="text" name="descripcion" id="descripcion" placeholder="Introduce una descripcion del video"/>
                            <ErrorMessage name="descripcion" component="div" />
                        </div>

                        <div className='input-container'>
                            <label htmlFor='codigoSeguridad'></label>
                            <Field type="text" name="codigoSeguridad" id="codigo" placeholder="Introduce codigo de seguridad"/>
                            <ErrorMessage name="codigoSeguridad" component="div" />
                        </div>

                        <div className='container-botones'>
                            <div className='container-botones-izquierda'>
                                <Button type="submit" disabled={isSubmitting} size='large' variant='outlined' className='boton-azul'>
                                    Guardar
                                </Button>
                                <Button  disabled={isSubmitting} size='large' variant='outlined' className='boton-gris'>
                                    Limpiar
                                </Button>
                            </div>
                            <Button type="submit" disabled={isSubmitting} size='large' variant='outlined' className='boton-azul'>
                                    Nueva Categoria
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
export default FormNuevoVideo;
