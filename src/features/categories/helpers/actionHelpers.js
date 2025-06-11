import { fireEvent, screen } from '@testing-library/react';

export const actionHelpers = {
  clickAddCategoryButton: () => {
    const button = screen.getByTestId('add-category-btn');
    fireEvent.click(button);
  }
};
