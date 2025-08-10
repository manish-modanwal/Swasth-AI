import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));

describe('Header Component', () => {
  it('renders the Header component correctly with all elements and styles', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Group Profiles/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list of trusted doctors,/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /arrow icon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Header Visual/i })).toBeInTheDocument();

    // Check for inline styles (animations and media queries - indirect check)
    expect(screen.getByText(/@keyframes fadeInLeft/i)).toBeInTheDocument();
    expect(screen.getByText(/@keyframes fadeInRight/i)).toBeInTheDocument();
    expect(screen.getByText(/@media \(max-width: 768px\)/i)).toBeInTheDocument();

    //Simulate media query to check responsiveness (simplified approach)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 700,
    });
    render(<Header />);
    expect(screen.getByText(/@keyframes fadeInLeft/i)).toBeInTheDocument(); //Check styles persist

  });
});