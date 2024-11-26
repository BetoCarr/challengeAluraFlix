import { configureStore } from '@reduxjs/toolkit'
import categoriesReducers from '../features/categories/categoriesSlice' // Importa tu slice aquí
import videosReducer from '../features/videos/videosSlice'

const store = configureStore({
    reducer: {
        categories: categoriesReducers,
        videos: videosReducer
    }
});

export default store;
