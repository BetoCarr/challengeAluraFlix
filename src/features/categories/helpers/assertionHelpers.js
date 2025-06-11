import { waitFor } from '@testing-library/react';
import { domHelpers } from './domHelpers';

export const assertionHelpers = {
  async expectCategoriesToBeRendered(names = []) {
    await waitFor(() => {
        names.forEach(name => {
          expect(domHelpers.getCategoryByName(name)).toBeInTheDocument();
        });
    });
  },

  expectLoadingVisible() {
    expect(domHelpers.getLoadingMessage()).toBeInTheDocument();
  },

  async expectErrorVisible() {
    await waitFor(() => {
        expect(domHelpers.getErrorMessage()).toBeInTheDocument();
    });
  }
};
