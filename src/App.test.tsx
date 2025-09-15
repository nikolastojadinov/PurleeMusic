import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PurpleBeats login page', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /PurpleBeats/i });
  expect(headingElement).toBeInTheDocument();
});

test('renders Pi Network login button', () => {
  render(<App />);
  const loginButton = screen.getByRole('button', { name: /Login with Pi Network/i });
  expect(loginButton).toBeInTheDocument();
});
