import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));

describe('Header Component', () => {
  it('renders correctly and is responsive', () => {
    render(<Header />);

    // Check for the presence of elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();

    // Check inline styles and animations (indirectly by checking for classes)
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('typing-heading');
    expect(screen.getByText(/Book Appointment/i).closest('div')).toHaveClass('fade-in-left');
    expect(screen.getByAltText('Header Visual').closest('div')).toHaveClass('fade-in-right');


    // Simulate media query change (simplified approach)
    const originalInnerWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { writable: true });
    window.innerWidth = 700; // Simulate smaller screen
    render(<Header />);
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle(`font-size: 1.5rem`);

    window.innerWidth = originalInnerWidth;

    // Check link functionality (partial check - requires more setup for full navigation)
    fireEvent.click(screen.getByRole('link', { name: /Book Appointment/i }));
    expect(window.location.href).toContain('#speciality');

  });
});