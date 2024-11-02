import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { obtnerVideos, agregarNuevoVideo, eliminarVideo } from '../../api/api';

const videosAdapter = createEntityAdapter({
    selectId: (video) => video.id, // define que el 'id' es el campo identificador único de cada video
    sortComparer: (a, b) => a.id - b.id
});

const initialState = videosAdapter.getInitialState({
    status: 'idle',
    addVideoStatus: 'idle',
    deleteVideoStatus: 'idle',
    error: null,
});

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
);

export const addNewVideo = createAsyncThunk(
    'videos/agregarNuevoVideo',
    async ({ categoryId, newVideo }, { rejectWithValue }) => {
        try {
            const response = await agregarNuevoVideo(categoryId, newVideo); // Llama a la API para agregar el video
            // console.log(response)
            return response.data.video; // Retorna los datos del video agregado
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteVideo = createAsyncThunk(
    'videos/eliminarVideo',
    async ({ categoryId, videoId }, { rejectWithValue }) => {
        try {
            const response = await eliminarVideo(categoryId, videoId); // Llama a la API para agregar el video
            if (response.status === 200) {
                console.log(response)
                return { videoId }
            } else {
                return rejectWithValue('Unexpected response status');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
      // Puedes agregar más reducers si necesitas otras operaciones
    },
    extraReducers: (builder) => {
        builder
            // OBTENER VIDEOS
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Utilizas el adaptador para insertar los videos en el estado
                videosAdapter.upsertMany(state, action.payload);
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
                const newVideo = action.payload;
                videosAdapter.addOne(state, newVideo)
                state.addVideoStatus = 'succeeded';
            })
            .addCase(addNewVideo.rejected, (state, action) => {
                state.addVideoStatus = 'failed';
                state.error = action.payload;
            })
            // ELIMINAR VIDEO
            .addCase(deleteVideo.pending, (state) => {
                state.deleteVideoStatus = 'loading';
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                const { videoId } = action.payload; // Desestructura el categoryId del payload
                state.deleteVideoStatus = 'succeeded';
                videosAdapter.removeOne(state, videoId);
            })
            .addCase(deleteVideo.rejected, (state, action) => {
                state.deleteVideoStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

// Asumiendo que tienes un videosAdapter en tu videosSlice
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

export default videosSlice.reducer;