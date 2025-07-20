import React from 'react';
import { assets } from '../assets/assets';

export const Header = () => {
  return (
    <>
      {/* Inline styles for animation */}
      <style>
  {`
    @keyframes fadeInLeft {
      0% { opacity: 0; transform: translateX(-40px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      0% { opacity: 0; transform: translateX(40px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .fade-in-left {
      animation: fadeInLeft 1s ease-out forwards;
    }
    .fade-in-right {
      animation: fadeInRight 1s ease-out forwards;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 39ch }
    }

    @keyframes blink {
      50% { border-color: transparent }
    }

    .typing-heading {
      overflow: hidden;
      white-space: nowrap;
      border-right: 2px solid white;
      animation:
        typing 3s steps(39, end),
        blink 0.75s step-end infinite;
      width: 39ch;
      display: inline-block;
    }

    @media (max-width: 768px) {
      .typing-heading {
        font-size: 1.5rem;
        width: 30ch;
        animation:
          typing 2.5s steps(30, end),
          blink 0.75s step-end infinite;
      }
    }
  `}
</style>


      <div className="flex flex-col md:flex-row flex-wrap bg-blue-600 rounded-2xl px-6 md:px-10 lg:px-20 py-10 md:py-16 overflow-hidden">
        
        {/* Left Side */}
        <div className="flex md:w-1/2 flex-col items-start justify-center gap-6 m-auto fade-in-left">
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight tracking-tight">
            Book Appointment <br ></br> With Trusted Doctors
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light">
            <img src={assets.group_profiles} alt="Group Profiles" className="w-28 md:w-32" />
            <p className="text-center md:text-left">
              Simply browse through our extensive list of trusted doctors, <br />
              schedule your appointment hassle-free.
            </p>
          </div>

          <a
            href="#speciality"
            className="mt-2 inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2 rounded-full font-medium shadow-md hover:bg-blue-100 transition-all duration-300"
          >
            Book Appointment
            <img src={assets.arrow_icon} alt="arrow icon" className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 relative flex items-end justify-center mt-10 md:mt-0 fade-in-right">
          <img
            className="w-full max-w-md md:max-w-full h-auto rounded-xl transform hover:scale-105 transition-transform duration-500 ease-in-out"
            src={assets.header_img}
            alt="Header Visual"
          />
        </div>
      </div>
    </>
  );
};
