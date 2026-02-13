import { render, screen, act } from '@testing-library/react';
import App from './App';

test('renders header with site name', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText('RED')).toBeInTheDocument();
  expect(screen.getByText('BOX')).toBeInTheDocument();
});
