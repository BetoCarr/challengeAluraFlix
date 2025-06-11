import { screen } from '@testing-library/react';

export const domHelpers = {
    getLoadingMessage: () => screen.queryByText(/Loading.../i),
    getErrorMessage: () => screen.queryByTestId('error'),
    getCategoryByName: (nombre) => screen.queryByText(nombre),
};