// Importa Hooks de Redux y funciones axios de la API
import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { obtnerVideos, agregarNuevoVideo, editarVideo, eliminarVideo } from '../../api/api';

// Configuración del adaptador para manejar el estado de videos
const videosAdapter = createEntityAdapter({
    selectId: (video) => video.id, // Define que el 'id' es el campo identificador único de cada video
    sortComparer: (a, b) => a.id - b.id // Ordena los videos por su ID
});

// Estado inicial utilizando el adaptador y campos personalizados
const initialState = videosAdapter.getInitialState({
    status: 'idle', // Estado para la carga general de videos
    addVideoStatus: 'idle', // Estado específico para agregar un video
    deleteVideoStatus: 'idle', // Estado específico para eliminar un video
    updateVideoStatus: 'idle', // Estado específico para actualizar un video
    likes: {}, // Estado para manejar los "me gusta" de cada video
    error: null, // Manejo de errores
});

// AsyncThunk para obtener videos desde la API
export const fetchVideos = createAsyncThunk(
    'videos/fetchVideos',
    async (_, { rejectWithValue }) => { // '_' porque no hay argumentos para pasar a la API
        try {
            const response = await obtnerVideos(); // Asegúrate de que la función de la API esté bien definida
            return response.data; // Retorna los datos del backend (videos)
        } catch (error) {
            return rejectWithValue(error.message); // Maneja errores
        }
    }
)

// AsyncThunk para agregar un nuevo video
export const addNewVideo = createAsyncThunk(
    'videos/agregarNuevoVideo',
    async ({ categoryId, newVideo }, { rejectWithValue }) => {
        try {
            const response = await agregarNuevoVideo(categoryId, newVideo); // Llama a la API para agregar el video
            return response.data.video; // Retorna los datos del video agregado
        } catch (error) {
            return rejectWithValue(error.message); // Manejo de errores
        }
    }
)

// AsyncThunk para actualizar un video
export const updateVideo = createAsyncThunk(
    'videos/editarVideo',
    async ({ videoId, updatedVideoData }, { rejectWithValue }) => {
        try {
            const response = await editarVideo(videoId, updatedVideoData); // Llama a la API para agregar el video
            return response.data; // Retorna los datos del video editado
        } catch (error) {
            return rejectWithValue(error.message); // Manejo de errores
        }
    }
)

// AsyncThunk para eliminar un video
export const deleteVideo = createAsyncThunk(
    'videos/eliminarVideo',
    async ({ categoryId, videoId }, { rejectWithValue }) => {
        try {
            const response = await eliminarVideo(categoryId, videoId); // Llama a la API para eliminar el video
            if (response.status === 200) {
                console.log(response)
                return { videoId } // Retorna el ID del video eliminado
            } else {
                return rejectWithValue('Unexpected response status');
            }
        } catch (error) {
            return rejectWithValue(error.message); // Manejo de respuesta inesperada
        }
    }
)

// Slice para manejar el estado de videos
const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        // Reducer para alternar el estado de "me gusta" de un video
        toggleLike: (state, action) => {
            const videoId = action.payload;
            state.likes[videoId] = !state.likes[videoId]; // Alterna el estado de "like" del video en el estado local
        }
    },
    extraReducers: (builder) => {
        builder
            // OBTENER VIDEOS
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                videosAdapter.upsertMany(state, action.payload) // Actualiza los videos en el estado
                action.payload.forEach(video => {
                    if (!(video.id in state.likes)) {
                        state.likes[video.id] = false; // Inicializa el estado de "me gusta" para cada video
                    }
                })
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // AGREGAR VIDEO
            .addCase(addNewVideo.pending, (state) => {
                state.addVideoStatus = 'loading';
            })
            .addCase(addNewVideo.fulfilled, (state, action) => {
                const newVideo = action.payload; // Obtiene datos de payload
                videosAdapter.addOne(state, newVideo) // Agrega el video al estado
                state.addVideoStatus = 'succeeded'
                // Inicializa "me gusta" en "false" para el nuevo video
                if (!(newVideo.id in state.likes)) {
                    state.likes[newVideo.id] = false;
                }  
            })
            .addCase(addNewVideo.rejected, (state, action) => {
                state.addVideoStatus = 'failed';
                state.error = action.payload;
            })
            // EDITAR VIDEO
            .addCase(updateVideo.pending, (state) => {
                state.updateVideoStatus = 'loading';
            })
            .addCase(updateVideo.fulfilled, (state, action) => {
                state.updateVideoStatus = 'succeeded';
                const { id, title, videoUrl, imageUrl } = action.payload.video || {}; // Destructuración de datos del video a editar
                if (id) {
                    videosAdapter.updateOne(state, { // Actualiza los datos del video editado
                        id,
                        changes: {
                            title,
                            videoUrl,
                            imageUrl,
                        },
                    });
                } else {
                    console.warn("No se encontró el ID del video en los datos recibidos."); // Ayuda a detectar si falta el ID
                }
            })
            .addCase(updateVideo.rejected, (state, action) => {
                state.updateVideoStatus = 'failed';
                state.error = action.payload;
            })
            // ELIMINAR VIDEO
            .addCase(deleteVideo.pending, (state) => {
                state.deleteVideoStatus = 'loading';
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                const { videoId } = action.payload; // Desestructura el categoryId del payload
                state.deleteVideoStatus = 'succeeded';
                videosAdapter.removeOne(state, videoId); // Elimina video del estado
            })
            .addCase(deleteVideo.rejected, (state, action) => {
                state.deleteVideoStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

// Exporta las acciones del slice
export const { toggleLike } = videosSlice.actions;

// Configuración de los selectores para extraer datos del estado
export const {
    selectAll: selectAllVideos,
    selectById: selectVideoById,
    selectIds: selectVideoIds
} = videosAdapter.getSelectors(state => state.videos);


// Selector memoizado para obtener los videos de una categoría específica
export const selectVideosByCategory = createSelector(
    [selectAllVideos, (state, categoryId) => categoryId],
    (videos, categoryId) => {
        // Si videos es un objeto, conviértelo a array y filtra por categoría
        return Object.values(videos).filter(video => video.categoria_id === categoryId);
    }
)

// Exporta el reducer del slice
export default videosSlice.reducer;