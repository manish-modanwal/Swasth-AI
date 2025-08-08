import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header'; // Adjust path as needed

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

    // Check for existence of elements
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByText(/Simply browse through our extensive list/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book Appointment/i })).toBeInTheDocument();
    expect(screen.getByAltText('Header Visual')).toBeInTheDocument();
    expect(screen.getByAltText('Group Profiles')).toBeInTheDocument();
    expect(screen.getByAltText('arrow icon')).toBeInTheDocument();


    // Check inline styles (animations) -  indirectly through element presence and visual inspection (limited in this context)
    expect(screen.getByText(/Book Appointment/i).parentElement?.classList.contains('fade-in-left')).toBe(true);
    expect(screen.getByAltText('Header Visual').parentElement?.classList.contains('fade-in-right')).toBe(true);
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle(`animation: typing 3s steps(39, end), blink 0.75s step-end infinite;`);


    //Simulate media query (requires a more robust testing setup for complete accuracy)
    //This is a simplification and might not capture all aspects of media query behavior
    const { rerender } = render(<Header/>);
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 700 });
    rerender(<Header/>);
    expect(screen.getByRole('heading', { name: /Book Appointment/i })).toHaveStyle(`animation: typing 2.5s steps(30, end), blink 0.75s step-end infinite;`);



    // Check for image rendering (indirectly through existence)
    expect(screen.getByRole('img', { name: /Group Profiles/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /arrow icon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Header Visual/i })).toBeInTheDocument();

  });
});