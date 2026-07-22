import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceCard from './ServiceCard';

const mockService = {
  id: 1,
  name: 'Service de forage',
  description: 'Forage professionnel de puits',
  price: 150.00,
  category: { name: 'Forage' },
  image: 'forage.jpg'
};

describe('ServiceCard Component', () => {
  test('renders service name', () => {
    render(<ServiceCard service={mockService} />);
    const nameElement = screen.getByText(/Service de forage/i);
    expect(nameElement).toBeInTheDocument();
  });

  test('renders service price', () => {
    render(<ServiceCard service={mockService} />);
    const priceElement = screen.getByText(/150,00 €/i);
    expect(priceElement).toBeInTheDocument();
  });

  test('renders service description', () => {
    render(<ServiceCard service={mockService} />);
    const descElement = screen.getByText(/Forage professionnel/i);
    expect(descElement).toBeInTheDocument();
  });

  test('displays image when provided', () => {
    render(<ServiceCard service={mockService} />);
    const imageElement = screen.getByAltText(/Service de forage/i);
    expect(imageElement).toBeInTheDocument();
  });
});