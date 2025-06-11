import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../utils/testUtils'
import CategoriesTestComponent from '../CategoriesTestComponent'

// 👉 Importas el mock centralizado
import { 
    mockBuscar,
    mockCategoriesData,
    setupSuccessfulFetchMock,
    setupFailedFetchMock,
    mockAddCategory,
    setupSuccessfulAddCategoryMock,
    clearAllMocks,
    resetAllMocks
} from '../mocks/categoriesApiMocks';

import { assertionHelpers } from '../helpers/assertionHelpers';
import { actionHelpers } from '../helpers/actionHelpers';
import { createPreloadedCategoryState } from '../helpers/stateHelpers';

// Mock de las funciones de API
jest.mock('../../../api/api', () => ({
    buscar: require('../mocks/categoriesApiMocks').mockBuscar,
    agregarCategoria : require('../mocks/categoriesApiMocks').mockAddCategory
}));

describe("categories Integration Tests", () => {

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        clearAllMocks()
        resetAllMocks()
    });
    
    test('should fetch and render categories', async () => {
        setupSuccessfulFetchMock(mockCategoriesData.basic);
        const { store } = renderWithProviders(<CategoriesTestComponent />);

        // Verifica estado de loading
        assertionHelpers.expectLoadingVisible();

        // Assert: categories render
        await assertionHelpers.expectCategoriesToBeRendered([
            'Fut-bol',
            'Frontenis',
            'Longboarding'
        ]);

        // Verifica que la API se llamó correctamente
        expect(mockBuscar).toHaveBeenCalledWith('/categorias');
        expect(mockBuscar).toHaveBeenCalledTimes(1);
    
        const state = store.getState();
        expect(state.categories.status).toBe('succeeded');
        expect(state.categories.entities['1'].nombre).toBe('Fut-bol');
    })
    test('should handle API error gracefully', async () => {
        setupFailedFetchMock('Error de red');

        renderWithProviders(<CategoriesTestComponent />);

        await assertionHelpers.expectErrorVisible();

        expect(mockBuscar).toHaveBeenCalledTimes(1);
    });

    test('should add a new category using helper', async () => {
 
        const preloadedState = createPreloadedCategoryState(mockCategoriesData.basic);

        // Configura el mock con el nuevo listado incluyendo la nueva categoría
        setupSuccessfulAddCategoryMock();

        const { store } = renderWithProviders(<CategoriesTestComponent />, { preloadedState });
        actionHelpers.clickAddCategoryButton()

        // Assert: verifica que la nueva categoría aparece en el DOM
        await assertionHelpers.expectCategoriesToBeRendered([
            'Fut-bol',
            'Frontenis',
            'Longboarding',
            'Natacion' // La nueva
        ]);
        // Verifica que la API fue llamada correctamente
        expect(mockAddCategory).toHaveBeenCalledTimes(1);
         // Verifica que el estado global del store fue actualizado correctamente
        const state = store.getState();
        expect(state.categories.entities['4']).toEqual(
            expect.objectContaining({
                nombre: 'Natacion',
                color: '#123456',
                isBanner: false
            })
        );
    });
});

