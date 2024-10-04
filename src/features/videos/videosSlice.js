// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { agregarNuevoVideo } from '../../api/api';

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

// const videosSlice = createSlice({
//     name: 'videos',
//     initialState: {
//         videos: [],  // Lista de videos
//         status: 'idle',
//         error: null
//     },
//     reducers: {
//       // Puedes agregar más reducers si necesitas otras operaciones
//     },
//     extraReducers: (builder) => {
//         builder
//             // .addCase(agregarNuevoVideo.pending, (state) => {
//             //     state.status = 'loading';
//             // })
//             // .addCase(agregarNuevoVideo.fulfilled, (state, action) => {
//             //     state.status = 'succeeded';
//             //     state.videos.push(action.payload);  // Agrega el nuevo video al estado
//             // })
//             // .addCase(agregarNuevoVideo.rejected, (state, action) => {
//             //     state.status = 'failed';
//             //     state.error = action.payload;
//             // });
//     }
// });

// export default videosSlice.reducer;