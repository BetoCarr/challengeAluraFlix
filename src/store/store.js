import { configureStore } from '@reduxjs/toolkit';
import videoCategoriesReducer from '../features/videocategories/videoCategoriesSlice'; // Importa tu slice aquí

const store = configureStore({
    reducer: {
        videoCategories: videoCategoriesReducer,
    },
});

export default store;
