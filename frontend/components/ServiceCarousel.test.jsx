import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceCarousel from './ServiceCarousel';

// Mock services data
const mockServices = [
  {
    id: 1,
    name: 'Forage',
    description: 'Service de forage professionnel',
    price: 150.00,
    image: 'forage.jpg'
  },
  {
    id: 2,
    name: 'Entretien',
    description: 'Entretien de puits',
    price: 200.00,
    image: 'entretien.jpg'
  }
];

describe('ServiceCarousel Component', () => {
  test('renders correct number of slides', () => {
    render(<ServiceCarousel services={mockServices} />);
    const slides = screen.getAllByRole('listitem');
    expect(slides).toHaveLength(2);
  });

  test('displays navigation buttons', () => {
    render(<ServiceCarousel services={mockServices} />);
    const prevButton = screen.getByLabelText(/Previous service/i);
    const nextButton = screen.getByLabelText(/Next service/i);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('shows active slide indicator', () => {
    render(<ServiceCarousel services={mockServices} />);
    const indicators = screen.getAllByRole('button', { name: /Go to slide/i });
    expect(indicators).toHaveLength(2);
    expect(indicators[0]).toHaveAttribute('aria-selected', 'true');
  });
});