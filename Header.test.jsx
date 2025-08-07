import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header'; // Assuming Header.jsx is in the same directory

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

    // Check for existence of key elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list of trusted doctors/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();

    //Check for inline styles and classes.  This is limited due to the nature of testing inline styles. More robust solution would involve inspecting the DOM directly.

    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('text-3xl');


    //Simulate media query changes.  This is a simplified approach.  A more thorough approach would involve using a library to simulate media queries more accurately.
    const { rerender } = render(<Header />);
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    fireEvent.resize(window, {width: 700, height: 600});  //Simulate smaller screen

    rerender(<Header/>);  //Rerender to let component re-evaluate media query
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle('font-size: 1.5rem');
    
    fireEvent.resize(window, {width: 1024, height: 768});  //Simulate larger screen
    rerender(<Header/>);
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle('font-size: 3rem');

    //Simulate missing image - requires more sophisticated mocking to fully test error handling. This test only verifies that the component does not crash.
    jest.mock('../assets/assets', () => ({
        assets: {
          group_profiles: null,
          arrow_icon: '/arrow_icon.png',
          header_img: '/header_img.png',
        },
      }));
      rerender(<Header/>);

  });
});