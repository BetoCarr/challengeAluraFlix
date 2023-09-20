import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000"
})

export async function buscar (url, setData) {
    const respuesta = await api.get(url)
    setData(respuesta.data)
}