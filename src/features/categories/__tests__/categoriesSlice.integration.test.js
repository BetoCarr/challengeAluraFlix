import React from 'react'
// import { http, HttpResponse, delay } from 'msw'
// import { setupServer } from 'msw/node'
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
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
// export const handlers = [
//     http.get('/categorias', async () => {
//         await delay(150)
//         return HttpResponse.json({
//             data: [
//                 {
//                     id: 1,
//                     nombre: 'Fut-bol',
//                     isBanner: false,
//                     color: '#FF0000'
//                 },
//                 {
//                     id: 2,
//                     nombre: 'Frontenis',
//                     isBanner: false,
//                     color: '#00FF00'
//                 },
//                 {
//                     id: 3,
//                     nombre: 'Longboarding',
//                     isBanner: true,
//                     color: '#0000FF'
//                 }
//             ]
//         })
//     })
// ]

// const server = setupServer(...handlers)

// // Enable API mocking before tests.
// beforeAll(() => server.listen())

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers())

// // Disable API mocking after the tests are done.
// afterAll(() => server.close())



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
        expect(screen.queryByText('Deportes')).not.toBeInTheDocument();

    })
});

