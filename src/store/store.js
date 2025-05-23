import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categoriesReducers from '../features/categories/categoriesSlice' // Importa tu slice aquí
import videosReducer from '../features/videos/videosSlice'

// Combinar reducers
const rootReducer = combineReducers({
    categories: categoriesReducers,
    videos: videosReducer,
});

// Creamos la función de setupStore, útil para testing
export function setupStore(preloadedState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState, // estado inicial opcional para tests
    });
}

// Este es el store real que usás en la app
const store = setupStore();

export default store;
