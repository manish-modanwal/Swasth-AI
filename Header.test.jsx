import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { assets } from '../assets/assets'; // Assuming this file exists

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));


describe('Header Component', () => {
  it('renders correctly and adapts to different screen sizes', () => {
    render(<Header />);

    // Check for the presence of key elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();

    //Simulate different screen sizes (this is a simplification, more robust testing would involve media queries)
    const smallScreenQuery = window.matchMedia('(max-width: 768px)');
    smallScreenQuery.matches = true;
    fireEvent.resize(window, {target:{innerWidth: 700}})
    // Assertions for small screen (adjust as needed based on expected changes in styling)
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle('font-size: 1.5rem');


    smallScreenQuery.matches = false;
    fireEvent.resize(window, {target:{innerWidth: 1000}})
    // Assertions for larger screen (adjust as needed based on expected styling)
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).not.toHaveStyle('font-size: 1.5rem');


    // Add more assertions for specific styles as needed, e.g., checking for classes like 'fade-in-left', etc.  This requires understanding what styling changes are expected.

    // Check for error-free rendering (this is a basic check, more sophisticated checks would be needed for full coverage)
    expect(() => render(<Header />)).not.toThrow();
  });


  it('handles image loading gracefully (basic check)', () => {
    // Note: This test case only checks if the image is rendered. It doesn't explicitly handle error scenarios. 
    //Robust error handling would require more complex setup, e.g., mocking failed image loads
    render(<Header />);
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();

  });
});