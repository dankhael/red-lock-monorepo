import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('renders header with navigation links', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  
  // Check if the logo is rendered
  expect(screen.getByText('Red Lock')).toBeInTheDocument();
  
  // Check if navigation links are rendered
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Blog')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Games')).toBeInTheDocument();
}); 