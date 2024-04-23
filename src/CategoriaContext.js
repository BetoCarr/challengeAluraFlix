// Importa React y los componentes necesarios
import React, { createContext, useContext, useEffect, useState } from 'react';
import { buscar } from './api/api'; // Importa la función buscar del archivo api.js

// Crea el contexto para las categorías
const CategoriaContext = createContext();

// Hook personalizado para utilizar el contexto de las categorías
export function useCategoriaContext() {
    return useContext(CategoriaContext);
}

// Proveedor de contexto para las categorías
export function CategoriaProvider({ children }) {

    // Estado para almacenar la lista de categorías
    const [categorias, setCategorias] = useState([]);

    // Efecto para cargar las categorías desde la API al cargar el componente
    useEffect(() => {
        // Llama a la función buscar para obtener las categorías de la API y actualizar el estado
        buscar("/categorias", setCategorias)
    }, []);

    // Retorna el proveedor de contexto con la lista de categorías como valor
    return (
        <CategoriaContext.Provider value={categorias}>
            {children}
        </CategoriaContext.Provider>
    )
}

// Hook personalizado para acceder al contexto de las categorías
export function useCategorias() {

    // Obtiene el contexto de las categorías
    const context = useContext(CategoriaContext);

    // Verifica si el contexto existe
    if (!context) {
        // Si no existe, lanza un error
        throw new Error('useCategorias debe ser usado dentro de un CategoriaProvider');
    }

    // Retorna el contexto de las categorías
    return context;
}