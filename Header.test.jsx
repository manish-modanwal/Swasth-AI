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
  it('renders correctly with all elements and animations', () => {
    render(<Header />);

    // Check for presence of elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();

    //Check for inline styles (indirectly by checking animation effect)

    // This is a simplification.  Robust animation testing often requires more sophisticated methods
    // like checking computed styles or using libraries specifically for animation testing.
    //  Here we are just checking if the class names are present, which is a minimal check.
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('fade-in-left');
    expect(screen.getByAltText('Header Visual')).toHaveClass('fade-in-right');
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('typing-heading');


    //Simulate resize event for responsive testing (crude approximation)
    fireEvent.resize(window, { target: { clientWidth: 500 } }); //Simulate mobile width

    // Check for responsive changes - again a simplified check
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle({ fontSize: '1.5rem' });
  });


  it('handles missing image gracefully', () => {
    jest.mock('../assets/assets', () => ({
      assets: {
        group_profiles: '/group_profiles.jpg',
        arrow_icon: '/arrow_icon.png',
        header_img: null, //Simulate missing image
      },
    }));
    render(<Header />);
    // Expect no errors and that the component still renders
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument(); //Should render an empty image
  });

});