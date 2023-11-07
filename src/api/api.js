import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000"
})

export async function buscar (url, setData) {
    const respuesta = await api.get(url)
    setData(respuesta.data)
}

export async function agregarNuevoVideo(ruta, nuevoVideo) {
    try {
        const respuesta = await api.post(ruta, nuevoVideo);

        if(respuesta.status === 2000) {
            const resultado = await respuesta;
            return resultado.data;
        } else {
            throw new Error('La solicitud no fue exitosa.');
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al agregar nuevo video:", error);
        throw error; // Puedes propagar el error para que lo manejes donde llames a esta función
    }
}