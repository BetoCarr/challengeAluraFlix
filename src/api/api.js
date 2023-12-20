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

export function eliminarVideo(categoryId, id) {
    const rutaEliminarVid = `/categoria/${categoryId}/eliminar_video/${id}`;
    console.log(rutaEliminarVid);
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
    console.log(rutaLikeVideo);
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