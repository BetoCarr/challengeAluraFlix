import { configureStore } from '@reduxjs/toolkit'
import videoCategoriesReducer from '../features/categories/videoCategoriesSlice' // Importa tu slice aquí
import videosReducer from '../features/videos/videosSlice'

const store = configureStore({
    reducer: {
        videoCategories: videoCategoriesReducer,
        videos: videosReducer
    }
});

export default store;
