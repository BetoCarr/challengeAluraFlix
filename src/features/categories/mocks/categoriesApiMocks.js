import { jest } from '@jest/globals';

export const mockBuscar = jest.fn();


export const mockCategoriesData = {
    // Categorías básicas para testing
    basic: [
        { id: 1, nombre: 'Deportes', color: '#FF5733', isBanner: true },
        { id: 2, nombre: 'Entretenimiento', color: '#33C4FF', isBanner: false },
        { id: 3, nombre: 'Noticias', color: '#33FF57', isBanner: false }
    ]
}
// Funciones helper para configurar mocks
export const setupSuccessfulFetchMock = (data = mockCategoriesData.basic) => {
  mockBuscar.mockResolvedValue(data);
};

export const setupFailedFetchMock = (errorMessage = 'Error de red') => {
  mockBuscar.mockRejectedValue(new Error(errorMessage));
};

// export const clearAllMocks = () => {
//     mockBuscar.mockClear();
// };

// // Función para resetear todos los mocks (incluyendo implementaciones)
// export const resetAllMocks = () => {
//     mockBuscar.mockReset();
// };