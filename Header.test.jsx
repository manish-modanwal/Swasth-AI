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
  it('renders correctly with animations and responsive styles', () => {
    render(<Header />);

    // Check for elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();

    //Check for inline styles (limited verification due to animation nature)

    const heading = screen.getByRole('heading', { name: /Book Appointment/i });
    expect(heading).toHaveStyle(`animation-name: fadeInLeft`);


    //Simulate resize event for responsive testing.  Note: This is a simplification and might not fully capture all animation aspects in the test environment.  A more robust solution would involve visual regression testing.
    fireEvent.resize(window, { target: {innerWidth: 500 } });
    const responsiveHeading = screen.getByRole('heading', { name: /Book Appointment/i });
    expect(responsiveHeading).toHaveStyle(`font-size: 1.5rem`);

  });
});