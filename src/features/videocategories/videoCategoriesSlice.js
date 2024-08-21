// Importación de redux y funcion axios
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { buscar, agregarCategoria, editarCategoria, eliminarCategoria } from '../../api/api';
import { showFeedbackToUser, closeFeedback } from '../feedbackdialog/feedbackActions';

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


// Thunk para eliminar categoria
export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async ( categoryId, { dispatch, rejectWithValue } ) => {
        try {
            const response = await eliminarCategoria(categoryId);
            if (response.status === 200) {
                console.log(response)
                dispatch(showFeedbackToUser({ message: `Categoría eliminada correctamente.`,}));
                // Retrasar el retorno del categoryId para permitir que el mensaje se muestre
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(categoryId);
                    }, 5000); // Retraso de 2 segundos
                });
            } else {
                return rejectWithValue('Unexpected response status');
            }
        } catch (error) {
            return rejectWithValue(error.message);
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
            .addCase(fetchCategories.pending, (state) => { // Estado de carga mientras se obtienen las categorías
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => { // Estado de éxito cuando se obtienen las categorías, e inserta categorias al estado
                state.status = 'succeeded'
                videoCategoriesAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchCategories.rejected, (state, action) => { // Estado de error si la obtención falla
                state.status = 'failed'
                state.error = action.error.message;
            })
            // AGREGAR CATEGORIA
            .addCase(addCategory.pending, (state) => { // Estado de carga mientras se agrega la categoria
                state.status = 'loading'
            })
            .addCase(addCategory.fulfilled, (state, action) => { // Estado de exito mientras se agrega la categoria
                state.status = 'succeeded';
                videoCategoriesAdapter.addOne(state, action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => { // Estado de error
                state.status = 'failed'
                state.error = action.error.message;
            })
            // ELIMINAR CATEGORIA
            .addCase(deleteCategory.fulfilled, (state, action) => { // Estado de exito mientras se elimina la categoria
                state.status = 'succeeded';
                videoCategoriesAdapter.removeOne(state, action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => { // Estado de error
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