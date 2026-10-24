import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

import { getQuote } from '../../services/blogService';

jest.mock('../../services/blogService', () => ({
  getQuote: jest.fn(),
}));

// CRA roda com resetMocks: true, então a implementação precisa ser definida a cada teste
beforeEach(() => {
  getQuote.mockResolvedValue({
    quote: 'Test quote',
    author: 'Test Author',
  });
});

test('renders footer with copyright', async () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByText(/Red Box/)).toBeInTheDocument();
  expect(await screen.findByText(/Test quote/)).toBeInTheDocument();
  expect(screen.getByText(/Test Author/)).toBeInTheDocument();
});

test('renders RSS feed link', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByText('RSS Feed')).toBeInTheDocument();
});
