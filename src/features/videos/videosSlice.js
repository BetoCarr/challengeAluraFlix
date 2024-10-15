import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { obtnerVideos } from '../../api/api';

const videosAdapter = createEntityAdapter({
    selectId: (video) => video.id, // define que el 'id' es el campo identificador único de cada video
    sortComparer: (a, b) => a.title.localeCompare(b.title), // opcional: define cómo ordenar los videos
});

const initialState = videosAdapter.getInitialState({
    status: 'idle',
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

// export const addNewVideo = createAsyncThunk(
//     'videos/agregarNuevoVideo',
//     async ({ categoryId, newVideo }, { rejectWithValue }) => {
//         try {
//             const response = await agregarNuevoVideo(categoryId, newVideo); // Llama a la API para agregar el video
//             return response.data; // Retorna los datos del video agregado
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
      // Puedes agregar más reducers si necesitas otras operaciones
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Utilizas el adaptador para insertar los videos en el estado
                videosAdapter.setAll(state, action.payload);
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Selecciona el estado de los videos dentro del estado global
// const selectVideosState = (state) => state.videos;

// Selecciona el objeto de videos por categoría
// export const selectVideosByCategory = createSelector(
//   [selectVideosState, (state, categoryId) => categoryId],  // Input selectors
//   (videosState, categoryId) => videosState.videosByCategory[categoryId] || []  // Output selector que retorna un array de videos
// );

export default videosSlice.reducer;