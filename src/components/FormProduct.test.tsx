import React from 'react';
import { render, screen } from '@testing-library/react';
import FormProduct from './FormProduct';

test('renders Formulario text in the FormProduct component', () => {
  render(
    <FormProduct
      dataForm={{
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      }}
      updateListProducts={() => {}}
    />,
  );
  const elementCheck = screen.getByText(/Formulario/);
  expect(elementCheck).toBeInTheDocument();
});
