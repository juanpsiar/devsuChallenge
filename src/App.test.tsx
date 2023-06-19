import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders body App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Agregar/);
  expect(linkElement).toBeInTheDocument();
});
