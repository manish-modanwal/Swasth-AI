import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-4 rounded-2xl bg-gradient-to-br from-[#b1ccf8] to-blue-100 shadow-md flex items-center justify-between mt-4 mb-6 mx-0">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-36 cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => navigate('/')}
      />

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-6 font-medium text-blue-900">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'hover:text-blue-600 transition-all duration-200'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'hover:text-blue-600 transition-all duration-200'
          }
        >
          All Doctors
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'hover:text-blue-600 transition-all duration-200'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'hover:text-blue-600 transition-all duration-200'
          }
        >
          Contact
        </NavLink>
      </ul>

      {/* Profile or Login */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            <img
              className="w-10 h-10 rounded-full border border-white shadow"
              src={assets.profile_pic}
              alt="profile"
            />
            <img className="w-3" src={assets.dropdown_icon} alt="dropdown" />

            <div className="absolute top-10 right-0 z-30 hidden group-hover:flex flex-col gap-2 bg-white rounded-md shadow-lg p-4 min-w-[160px] text-gray-700">
              <p
                onClick={() => navigate('/my-profile')}
                className="hover:text-blue-600 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate('/my-appointments')}
                className="hover:text-blue-600 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => setToken(false)}
                className="hover:text-red-500 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
