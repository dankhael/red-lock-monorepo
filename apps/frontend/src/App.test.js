import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders header with site name', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText('RED')).toBeInTheDocument();
  expect(screen.getByText('BOX')).toBeInTheDocument();
});
