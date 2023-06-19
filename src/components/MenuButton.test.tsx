import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuButton from './MenuButton';

test('renders button in the MenuButton component', () => {
  render(
    <MenuButton
      options={[]}
      selectMenuOption={() => {}}
      selectedRegister={{
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      }}
      functionTableUpdate={() => {}}
    />,
  );
  const elementCheck = screen.getByRole('button');
  expect(elementCheck).toBeInTheDocument();
});
