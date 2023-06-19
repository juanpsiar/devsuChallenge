import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

test('renders Data text in the Modal component', () => {
  render(<Modal children={<div>Data</div>} setShowModal={() => {}} showModal={true} />);
  const elementCheck = screen.getByText(/Data/);
  expect(elementCheck).toBeInTheDocument();
});

test('renders button tag in the Modal component', () => {
  render(<Modal children={<div>Data</div>} setShowModal={() => {}} showModal={true} />);
  const elementCheck = screen.getByRole('button');
  expect(elementCheck).toBeInTheDocument();
});
