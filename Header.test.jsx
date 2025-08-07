import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header'; // Assuming Header.jsx is in the same directory

jest.mock('../assets/assets', () => ({
  assets: {
    group_profiles: '/group_profiles.jpg',
    arrow_icon: '/arrow_icon.png',
    header_img: '/header_img.png',
  },
}));


describe('Header Component', () => {
  it('renders the Header component correctly with all elements and styles', () => {
    render(<Header />);

    // Check for existence of main elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Header Visual/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Group Profiles/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /arrow icon/i })).toBeInTheDocument();


    // Check for inline styles and animations (indirectly through class names)
    expect(screen.getByTestId('fade-in-left')).toHaveClass('fade-in-left');
    expect(screen.getByTestId('fade-in-right')).toHaveClass('fade-in-right');
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveClass('typing-heading');


    //Simulate media query (indirect check - requires more sophisticated testing for complete media query coverage)
    const {container} = render(<Header/>);
    const styleSheet = container.querySelector('style');
    expect(styleSheet.textContent).toContain('@media (max-width: 768px)');


  });

  it('handles missing assets gracefully', () => {
    jest.mock('../assets/assets', () => ({
      assets: {
        group_profiles: null,
        arrow_icon: null,
        header_img: null,
      },
    }));
    render(<Header />);
    //Check for alt text rendering in place of missing images - This needs to be improved by making the images testable.
    expect(screen.getByAltText(/Group Profiles/i)).toBeInTheDocument();
    expect(screen.getByAltText(/arrow icon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Header Visual/i)).toBeInTheDocument();
  });
});