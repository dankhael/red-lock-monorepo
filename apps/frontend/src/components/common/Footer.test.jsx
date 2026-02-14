import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

jest.mock('../../services/blogService', () => ({
  getQuote: jest.fn().mockResolvedValue({
    quote: 'Test quote',
    author: 'Test Author',
  }),
}));

test('renders footer with copyright', async () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByText(/Red Box/)).toBeInTheDocument();
  expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
});

test('renders RSS feed link', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByText('RSS Feed')).toBeInTheDocument();
});
