import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { assets } from '../assets/assets'; // Assuming this file exists

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));

describe('Header Component', () => {
  it('renders correctly and includes all elements', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/With Trusted Doctors/i)).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list of trusted doctors,/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();


    // Check for inline styles (limited check due to dynamic nature)
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle('font-weight: bold');

    // Check responsiveness (simplified check - more robust checks might require more sophisticated testing)
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.matches = true;
    render(<Header />);
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle(`font-size: 1.5rem`);
    mediaQuery.matches = false;


  });
});