import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../utils/testUtils'
import CategoriesTestComponent from '../CategoriesTestComponent'

// 👉 Importas el mock centralizado
import { 
    mockBuscar,
    mockCategoriesData,
    setupSuccessfulFetchMock
    
 } from '../mocks/categoriesApiMocks';

// Mock de las funciones de API
jest.mock('../../../api/api', () => ({
    buscar: require('../mocks/categoriesApiMocks').mockBuscar,

}));

describe("categories Integration Tests", () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });
   test('should fetch and render categories', async () => {
        setupSuccessfulFetchMock(mockCategoriesData.basic);
   
        const { store } = renderWithProviders(<CategoriesTestComponent />);

        // Verifica estado de loading
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Deportes')).toBeInTheDocument();
            expect(screen.getByText('Entretenimiento')).toBeInTheDocument();
            expect(screen.getByText('Noticias')).toBeInTheDocument();

            // Verifica que la API se llamó correctamente
            expect(mockBuscar).toHaveBeenCalledWith('/categorias');
            expect(mockBuscar).toHaveBeenCalledTimes(1);

            // Verifica que el estado en el store cambió
            const state = store.getState();
            expect(state.categories.status).toBe('succeeded');
            expect(state.categories.entities['1'].nombre).toBe('Deportes');
        });

   
    })
    // test('should handle API error', async () => {
    //     buscar.mockRejectedValue(new Error('Error de red'));

    //     renderWithProviders(<CategoriesTestComponent />);

    //     await waitFor(() => {
    //         expect(screen.getByTestId('error')).toBeInTheDocument();
    //     });

    //     expect(screen.getByText(/error/i)).toBeInTheDocument();
    //     expect(buscar).toHaveBeenCalledTimes(1);
    // });
});

