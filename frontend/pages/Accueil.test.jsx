import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Accueil from './Accueil';

// Mock components
jest.mock('../components/Hero', () => () => <div>Hero Component</div>);
jest.mock('../components/ServiceCarousel', () => () => <div>ServiceCarousel Component</div>);
jest.mock('../components/StatsAndCTA', () => ({
  StatsStrip: () => <div>StatsStrip Component</div>,
  CTABanner: () => <div>CTABanner Component</div>
}));

describe('Accueil Page', () => {
  test('renders all main components', () => {
    render(
      <MemoryRouter>
        <Accueil />
      </MemoryRouter>
    );
    expect(screen.getByText(/Hero Component/i)).toBeInTheDocument();
    expect(screen.getByText(/ServiceCarousel Component/i)).toBeInTheDocument();
    expect(screen.getByText(/StatsStrip Component/i)).toBeInTheDocument();
    expect(screen.getByText(/CTABanner Component/i)).toBeInTheDocument();
  });

  test('page title and metadata', () => {
    render(
      <MemoryRouter>
        <Accueil />
      </MemoryRouter>
    );
    expect(document.title).toBe('Accueil - Grâce Divine');
  });
});