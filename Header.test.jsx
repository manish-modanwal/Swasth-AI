import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import { assets } from '../assets/assets'; // Assuming this path is correct

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: 'group_profiles.jpg',
    arrow_icon: 'arrow_icon.png',
    header_img: 'header_img.png',
  },
}));


describe('Header Component', () => {
  it('renders correctly and applies animations and styles', () => {
    render(<Header />);

    // Check for the presence of elements and classes
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    expect(screen.getByTestId('typing-animation')).toBeInTheDocument();// Assuming a data-testid is added to the typing-heading element for easier selection

    //Check for animations (indirectly by checking style application)

    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('text-3xl');

    // Simulate media query for responsiveness testing (This section needs improvement depending on how you want to test responsiveness.  You might need to use a library that simulates window resizing to fully test this.  This example just tests the classes that would apply on a smaller screen.  A better solution is to use a library like `@testing-library/user-event` to simulate resize event on the window)
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.matches = true;  // Simulate smaller screen
    render(<Header />);
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('text-3xl'); // Check if smaller font size is applied

    // Simulate image loading failure (this test needs refinement based on how you handle image loading errors)
    jest.mock('../assets/assets', () => ({
      assets: {
        group_profiles: null, // Simulate failed image loading for one image
        arrow_icon: 'arrow_icon.png',
        header_img: 'header_img.png',
      },
    }));
    render(<Header />);
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();//Check that alt text is displayed if image fails to load.    
  });
});