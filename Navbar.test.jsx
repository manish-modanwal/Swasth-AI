import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar.jsx is in the same directory
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../assets/assets', () => ({
  assets: {
    logo: '/logo.png',
    profile_pic: '/profile.png',
    dropdown_icon: '/dropdown.png',
  },
}));


describe('Navbar Component', () => {
  it('renders correctly when logged in and verifies navigation', () => {
    const navigate = useNavigate();
    navigate.mockImplementation((path) => {
      // Simulate navigation
      //In a real test you might check if the component re-renders with new props or state reflecting the navigation.
    });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check for navigation links
    const homeLink = screen.getByText('Home');
    const doctorsLink = screen.getByText('All Doctors');
    const aboutLink = screen.getByText('About');
    const contactLink = screen.getByText('Contact');
    expect(homeLink).toBeInTheDocument();
    expect(doctorsLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    //Check profile elements
    const profileImage = screen.getByAltText('profile');
    const myProfileLink = screen.getByText('My Profile');
    const myAppointmentsLink = screen.getByText('My Appointments');
    const logoutLink = screen.getByText('Logout');
    expect(profileImage).toBeInTheDocument();
    expect(myProfileLink).toBeInTheDocument();
    expect(myAppointmentsLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();


    fireEvent.click(homeLink);
    expect(navigate).toHaveBeenCalledWith('/');

    fireEvent.click(myProfileLink);
    expect(navigate).toHaveBeenCalledWith('/my-profile');

    fireEvent.click(logoutLink);

  });

  it('renders correctly when logged out and verifies navigation', () => {
    const navigate = useNavigate();
    navigate.mockImplementation((path) => {
      // Simulate navigation
    });
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const createAccountButton = screen.getByRole('button', { name: /Create Account/i });
    expect(createAccountButton).toBeInTheDocument();

    fireEvent.click(createAccountButton);
    expect(navigate).toHaveBeenCalledWith('/login');

    const profileImage = screen.queryByAltText('profile');
    expect(profileImage).not.toBeInTheDocument();
  });
});