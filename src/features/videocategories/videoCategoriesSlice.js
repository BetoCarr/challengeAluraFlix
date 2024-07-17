import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { buscar } from '../../api/api';


const videoCategoriesAdapter = createEntityAdapter({
    selectId: (category) => category.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = videoCategoriesAdapter.getInitialState({
    // Puedes añadir más propiedades aquí si es necesario
    loading: false,
    error: null,
});

export const fetchCategories = createAsyncThunk(
    'videoCategories/fetchCategories',
    async () => {
        const response = await buscar('/categorias') // Reemplaza con tu URL de la API
        return response.data;
    }
);


const videoCategoriesSlice = createSlice({
    name: 'videoCategories',
    initialState,
    reducers: {
        // addCategory: videoCategoriesAdapter.addOne,
        // addCategories: videoCategoriesAdapter.addMany,
        // updateCategory: videoCategoriesAdapter.updateOne,
        // removeCategory: videoCategoriesAdapter.removeOne,
        // setCategories: (state, action) => {
        // videoCategoriesAdapter.setAll(state, action.payload);
        // },
        // // Puedes agregar más reducers si es necesario
    },
    extraReducers: (builder) => {
      // Puedes manejar acciones asíncronas aquí usando builder.addCase()
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                videoCategoriesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default videoCategoriesSlice.reducer;

export const {
    selectAll: selectAllCategories,
    // selectById: selectCategoryById,
    // selectIds: selectCategoryIds,
} = videoCategoriesAdapter.getSelectors((state) => state.videoCategories);