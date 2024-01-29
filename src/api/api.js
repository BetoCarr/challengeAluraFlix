import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000"
})

export async function buscar (url, setData) {
    const respuesta = await api.get(url)
    setData(respuesta.data)
}
export function agregarNuevoVideo(ruta, nuevoVideo) {
    return new Promise((resolve, reject) => {
        api
        .post(ruta, nuevoVideo)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response ? error.response.data : error.message); // Puedes manejar el error aquí
        })
    });
}
export function agregarCategoria(newCategory) {
    const rutaAgregarCategoria = `/categorias/agregar`;
    return new Promise((resolve, reject) => {
        api
        .post(rutaAgregarCategoria, newCategory)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response ? error.response.data : error.message); // Puedes manejar el error aquí
        })
    });
}
export function eliminarCategoria(categoryId) {
    const rutaEliminarCategoria = `/categoria/${categoryId}/eliminar`;
    return new Promise((resolve, reject) => {
        api
        .delete(rutaEliminarCategoria)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response ? error.response.data : error.message); // Puedes manejar el error aquí
        })
    });
}

export function obtenerListaVideos(categoryId) {
    const rutaObtenerListaVideos = `/videos/${categoryId}/obtener`;
    return new Promise((resolve, reject) => {
        api
        .get(rutaObtenerListaVideos)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response ? error.response.data : error.message); // Puedes manejar el error aquí
        })
    });
}

export function eliminarVideo(categoryId, id) {
    const rutaEliminarVid = `/categoria/${categoryId}/eliminar_video/${id}`;
    return new Promise((resolve, reject) => {
        api
        .delete(rutaEliminarVid)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response ? error.response.data : error.message); // Puedes manejar el error aquí
        })
    });
}

export function obtenerEstadoLike(videoId) {
    const rutaEstadoLike = `/video/${videoId}/liked`
    return new Promise((resolve, reject) => {
        api
        .get(rutaEstadoLike)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response ? error.response.data : error.message); // Puedes manejar el error aquí
        })
    });
}

export function darLikeVideo(videoId, liked) {
    const rutaLikeVideo = `/video/${videoId}/like`
    return new Promise((resolve, reject) => {
        api
        .put(
            rutaLikeVideo, 
            { liked }, 
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response ? error.response.data : error.message); // Puedes manejar el error aquí
        })
    });
}