import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { assets } from '../assets/assets'; // Assuming this file exists and exports image data

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));


describe('Header Component', () => {
  it('renders correctly and handles responsiveness', () => {
    // Mock window dimensions for different screen sizes
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });

    render(<Header />);

    // Assertions for larger screen size
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();


    //Simulate smaller screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 700,
    });
    render(<Header />);

    // Assertions for smaller screen size (adjust as needed based on your responsive design)
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();

    //Check for errors (optional, but good practice)
    expect(() => render(<Header />)).not.toThrow();


  });
});