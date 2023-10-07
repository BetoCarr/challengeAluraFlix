import React, { createContext, useContext, useEffect, useState } from 'react';
import { buscar } from './api/api';
const CategoriaContext = createContext();

export function useCategoriaContext() {
    return useContext(CategoriaContext);
}

export function CategoriaProvider({ children }) {
    const [categorias, setCategorias] = useState([]);
    
    useEffect(() => {
        buscar("/categorias", setCategorias)
    }, []);
    return (
        <CategoriaContext.Provider value={categorias}>
            {children}
        </CategoriaContext.Provider>
    )
}

export function useCategorias() {
    const context = useContext(CategoriaContext);
    if (!context) {
        throw new Error('useCategorias debe ser usado dentro de un CategoriaProvider');
    }
    return context;
}