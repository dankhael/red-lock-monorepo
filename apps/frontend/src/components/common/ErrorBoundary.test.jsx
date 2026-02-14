import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function ThrowError() {
  throw new Error('Test error');
}

// Suppress console.error for expected error boundary output
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

test('renders children when no error', () => {
  render(
    <ErrorBoundary>
      <div>Child content</div>
    </ErrorBoundary>
  );

  expect(screen.getByText('Child content')).toBeInTheDocument();
});

test('renders error fallback when child throws', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
});
