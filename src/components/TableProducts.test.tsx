import React from 'react';
import { render, screen } from '@testing-library/react';
import TableProducts from './TableProducts';

test('renders table in the TableProducts component', () => {
  render(
    <TableProducts
      tableContent={[]}
      updatePageIndex={() => {}}
      resultsCounterAPI={2}
      counterTable={3}
      indexOfPage={1}
      updateAllTable={() => {}}
    />,
  );
  const elementCheck = screen.getByRole('table');
  expect(elementCheck).toBeInTheDocument();
});

test('renders Logo text in the Modal component', () => {
  render(
    <TableProducts
      tableContent={[]}
      updatePageIndex={() => {}}
      resultsCounterAPI={2}
      counterTable={3}
      indexOfPage={1}
      updateAllTable={() => {}}
    />,
  );
  const elementCheck = screen.getByText(/Logo/);
  expect(elementCheck).toBeInTheDocument();
});
