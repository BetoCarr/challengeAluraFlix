import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../utils/testUtils'
import CategoriesTestComponent from '../CategoriesTestComponent'


// Mock de las funciones de API
jest.mock('../../../api/api', () => ({
    buscar: jest.fn(),
    //   agregarCategoria: jest.fn(),
    //   editarCategoria: jest.fn(),
    //   eliminarCategoria: jest.fn(),
}));

import { buscar } from '../../../api/api';


describe("categories Integration Tests", () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });
   test('should fetch and render categories', async () => {
        // Mock de la respuesta de la API
        const mockCategories = [
            { id: 1, nombre: 'Deportes', color: '#FF5733', isBanner: true },
            { id: 2, nombre: 'Entretenimiento', color: '#33C4FF', isBanner: false },
            { id: 3, nombre: 'Noticias', color: '#33FF57', isBanner: false }
        ];

        buscar.mockResolvedValue(mockCategories)

   
        const { store } = renderWithProviders(<CategoriesTestComponent />);

        // Verifica estado de loading
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Deportes')).toBeInTheDocument();
            expect(screen.getByText('Entretenimiento')).toBeInTheDocument();
            expect(screen.getByText('Noticias')).toBeInTheDocument();

            // Verifica que la API se llamó correctamente
            expect(buscar).toHaveBeenCalledTimes(1);
            expect(buscar).toHaveBeenCalledWith('/categorias');

            // Verifica que el estado en el store cambió
            const state = store.getState();
            expect(state.categories.status).toBe('succeeded');
            expect(state.categories.entities['1'].nombre).toBe('Deportes');
        });

   
    })
    test('should handle API error', async () => {
        buscar.mockRejectedValue(new Error('Error de red'));

        renderWithProviders(<CategoriesTestComponent />);

        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeInTheDocument();
        });

        expect(screen.getByText(/error/i)).toBeInTheDocument();
        expect(buscar).toHaveBeenCalledTimes(1);
    });
});

