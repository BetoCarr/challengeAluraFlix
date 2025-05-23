import React from 'react'
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { setupStore } from '../store/store';


// Renderiza el componente envuelto en un BrowserRouter
export const renderWithRouter = (ui) => {
    return render(
        <BrowserRouter>
            {ui}
        </BrowserRouter>
    );
};

// Renderiza el componente envuelto en un MemoryRouter con rutas específicas
export const renderWithMemoryRouter = (ui, initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            {ui}
        </MemoryRouter>
    );
};

export function renderWithProviders(ui, extendedRenderOptions = {}) {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}

