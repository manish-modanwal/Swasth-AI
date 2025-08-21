import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header'; // Adjust path as needed
import { assets } from '../assets/assets'; // Adjust path as needed

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));


describe('Header Component', () => {
  it('renders correctly with animations and styles', () => {
    render(<Header />);

    // Check for presence of elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();


    // Check for inline styles (animation classes)
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('fade-in-left');
    expect(screen.getByAltText('Header Visual')).toHaveClass('fade-in-right');
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('typing-heading');


    // Simulate media query (requires more sophisticated testing for comprehensive coverage)
    //  This is a basic example - more robust media query testing would be needed in a real-world scenario.

    //Check for responsiveness (simplified example - needs more robust testing)
    const heading = screen.getByRole('heading', { name: /Book Appointment/i });
    const originalFontSize = window.getComputedStyle(heading).fontSize;


    //Simulate smaller screen
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 700,
    });
    window.dispatchEvent(new Event('resize'));

    expect(window.getComputedStyle(heading).fontSize).not.toBe(originalFontSize);
    


    //Image loading check (simplified - needs more robust error handling)
    expect(screen.getByAltText('Group Profiles')).toHaveAttribute('src', '/group_profiles.jpg');
    expect(screen.getByAltText('arrow icon')).toHaveAttribute('src', '/arrow_icon.png');
    expect(screen.getByAltText('Header Visual')).toHaveAttribute('src', '/header_img.png');
  });
});