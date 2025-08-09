import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { assets } from '../assets/assets';


jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));

describe('Header Component', () => {
  it('renders the Header component correctly and handles responsiveness and image loading', () => {
    // Mock window.innerWidth for different screen sizes
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1000,
    });

    render(<Header />);

    // Assertions for desktop view
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list of trusted doctors/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toHaveAttribute('href', '#speciality');
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();


    // Simulate smaller screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 700,
    });
    //rerender to reflect changes.  Jest doesn't automatically handle window resize.
    render(<Header />);

    // Assertions for mobile view (adjust as needed based on your responsive design)
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list of trusted doctors/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toHaveAttribute('href', '#speciality');
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();


    // Test for missing image (replace with your error handling mechanism if any)
    jest.mock('../assets/assets', () => ({
      assets: {
        group_profiles: '/group_profiles.jpg',
        arrow_icon: '/arrow_icon.png',
        header_img: null, // Simulate missing image
      },
    }));
    render(<Header />);
    // Assertion to check if component renders gracefully, no errors, etc.  This depends heavily on how the application handles missing images
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();

  });
});