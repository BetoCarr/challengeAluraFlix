import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { obtnerVideosCategoryId } from '../../api/api';

export const fetchVideosByCategory = createAsyncThunk(
    'videos/fetchVideosByCategory',
    async ({ categoryId }, { rejectWithValue }) => {
        try {
            const response = await obtnerVideosCategoryId(categoryId)// Llama a la API para agregar el video
            // console.log(response)
            return { categoryId, videos: response.data.videos }; // Retorna el ID de la categoría y los videos
        } catch (error) {
            return rejectWithValue(error.message);
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
    initialState: {
        videosByCategory: {},  // Lista de videos
        status: 'idle',
        error: null
    },
    reducers: {
      // Puedes agregar más reducers si necesitas otras operaciones
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideosByCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideosByCategory.fulfilled, (state, action) => {
                const { categoryId, videos } = action.payload;
                state.status = 'succeeded';
                state.videosByCategory[categoryId] = videos; // Almacena los videos bajo el categoryId como clave
            })
            .addCase(fetchVideosByCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Selecciona el estado de los videos dentro del estado global
const selectVideosState = (state) => state.videos;

// Selecciona el objeto de videos por categoría
export const selectVideosByCategory = createSelector(
  [selectVideosState, (state, categoryId) => categoryId],  // Input selectors
  (videosState, categoryId) => videosState.videosByCategory[categoryId] || []  // Output selector que retorna un array de videos
);

export default videosSlice.reducer;