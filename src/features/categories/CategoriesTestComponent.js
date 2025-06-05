// src/features/categories/__tests__/CategoriesTestComponent.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from './categoriesSlice';

export default function CategoriesTestComponent() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <div>
      <div data-testid="status">{status}</div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p data-testid="error">{error}</p>}
      {status === 'succeeded' && (
        <ul data-testid="category-list">
          {categories.map((cat) => (
            <li key={cat.id}>{cat.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
