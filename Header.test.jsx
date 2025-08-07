import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));

describe('Header Component', () => {
  it('renders the header component correctly with all elements and styles', () => {
    render(<Header />);

    //Check for main elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list of trusted doctors/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Group Profiles/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Header Visual/i })).toBeInTheDocument();


    //Check for inline styles and animations (indirectly)
    expect(screen.getByText('Book Appointment')).toHaveStyle('animation: fadeInLeft 1s ease-out forwards');
    expect(screen.getByRole('img', { name: /Header Visual/i })).toHaveStyle('animation: fadeInRight 1s ease-out forwards');
    const typingHeading = screen.getByText(/Book Appointment/i);
    expect(typingHeading).toHaveStyle(/animation: typing 3s steps\(39, end\), blink 0.75s step-end infinite/);


    //Simulate resize event for responsiveness testing.  Note:  This is a simplified test and doesn't fully cover all aspects of responsiveness.  More robust testing may require a library like `resize-observer-polyfill`.
    fireEvent.resize(window, { target: { innerWidth: 767 } });
    expect(typingHeading).toHaveStyle(/animation: typing 2\.5s steps\(30, end\), blink 0.75s step-end infinite/i);


  });

  it('handles missing image sources gracefully', () => {
    jest.mock('../assets/assets', () => ({
      assets: {
        group_profiles: null,
        arrow_icon: '/arrow_icon.png',
        header_img: null,
      },
    }));
    render(<Header />);
    // Check that the component still renders without crashing even if images are missing.  More robust error handling could be added to the component itself.
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();

  });
});