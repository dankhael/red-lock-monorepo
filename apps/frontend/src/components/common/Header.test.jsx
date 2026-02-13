import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test('renders header with navigation links', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
    </MemoryRouter>
  );
  
  // Check if the logo text is rendered
  expect(screen.getByText('RED')).toBeInTheDocument();
  expect(screen.getByText('BOX')).toBeInTheDocument();

  // Check if navigation links are rendered
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Blog')).toBeInTheDocument();
  expect(screen.getByText('Games')).toBeInTheDocument();
  expect(screen.getByText('Sobre mim')).toBeInTheDocument();
}); 