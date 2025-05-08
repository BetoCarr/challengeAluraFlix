import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

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
