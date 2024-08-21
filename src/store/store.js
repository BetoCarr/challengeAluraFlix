import { configureStore } from '@reduxjs/toolkit';
import videoCategoriesReducer from '../features/videocategories/videoCategoriesSlice'; // Importa tu slice aquí
import feedbackReducer from '../features/feedbackdialog/feedbackSlice'
// import listenerMiddleware from '../features/videocategories/deleteCategoryListener';

const store = configureStore({
    reducer: {
        videoCategories: videoCategoriesReducer,
        feedback: feedbackReducer,
    }
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;
