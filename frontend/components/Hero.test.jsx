import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  test('renders hero title', () => {
    render(<Hero />);
    const titleElement = screen.getByText(/Votre partenaire/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders call to action button', () => {
    render(<Hero />);
    const ctaButton = screen.getByRole('button', { type: 'button' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveTextContent(/Contactez-nous/i);
  });

  test('displays service images carousel', () => {
    render(<Hero />);
    const carousel = screen.getByRole('list');
    expect(carousel).toBeInTheDocument();
  });
});