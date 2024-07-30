// Importación de redux y funcion axios
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { buscar, agregarCategoria, editarCategoria } from '../../api/api';

// Crear un adaptador para manejar las categorías de videos
const videoCategoriesAdapter = createEntityAdapter({
    selectId: (category) => category.id,
    // Configurar un comparador de ordenación para colocar las categorías marcadas como banner al inicio
    sortComparer: (a, b) => {
        if (a.isBanner) return -1; // La categoría a es marcada como banner
        if (b.isBanner) return 1; // La categoría b es marcada como banner
        return 0; // Ninguna de las categorías es marcada como banner
    }
});

// Estado inicial utilizando el adaptador, con estado de carga y error
const initialState = videoCategoriesAdapter.getInitialState({
    status: 'idle',
    error: null,
});

// Thunk para obtener las categorías de la API de forma asíncrona
export const fetchCategories = createAsyncThunk(
    'videoCategories/fetchCategories',
    async () => {
        const response = await buscar('/categorias')
        return response;
    }
);

// Thunk para agregar categoria
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (newCategory, { rejectWithValue }) => {
        try {
            const response = await agregarCategoria(newCategory);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error adding category:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Thunk para editar categoria
export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ categoryId, updatedCategory }, { rejectWithValue }) => {
        try {
            const response = await editarCategoria(categoryId, updatedCategory);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// Crear un slice para manejar las categorías de videos
const videoCategoriesSlice = createSlice({
    name: 'videoCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // OBTENER CATEGORIAS
            // Estado de carga mientras se obtienen las categorías
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading'
            })
            // Estado de éxito cuando se obtienen las categorías, e inserta categorias al estado
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                videoCategoriesAdapter.upsertMany(state, action.payload);
            })
            // Estado de error si la obtención falla
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
            // AGREGAR CATEGORIA
            .addCase(addCategory.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                videoCategoriesAdapter.addOne(state, action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
    },
});

// Exportar el reductor del slice
export default videoCategoriesSlice.reducer;

// Exportar selectores del adaptador para obtener todas las categorías
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds,
} = videoCategoriesAdapter.getSelectors(state => state.videoCategories);

// // Selector memoizado para obtener los videos de una categoría específica
// export const selectVideosByCategoryId = createSelector(
//     [selectCategoryById],
//     (category) => category?.videos || []
// );