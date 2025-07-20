import React from "react";
import { assets } from "../assets/assets";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#dcefff] to-[#b4d4fc] text-[#063970] px-6 md:px-16 lg:px-28 py-14 rounded-t-[1.2rem] shadow-lg mt-20 mb-10">
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-36 mb-4" />
          <p className="text-sm leading-relaxed">
            Empowering healthcare through intelligent digital solutions. Your well-being is our priority.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl text-[#063970]">
            <a href="#"><FaFacebook className="hover:text-blue-600 transition" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-500 transition" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500 transition" /></a>
            <a href="#"><FaLinkedin className="hover:text-blue-700 transition" /></a>
          </div>
        </div>

        {/* Center */}
        <div>
          <p className="font-bold text-lg mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-700 cursor-pointer">🏠 Home</li>
            <li className="hover:text-blue-700 cursor-pointer">👨‍⚕️ About Us</li>
            <li className="hover:text-blue-700 cursor-pointer">📞 Contact Us</li>
            <li className="hover:text-blue-700 cursor-pointer">🔐 Privacy Policy</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <p className="font-bold text-lg mb-3">Contact Info</p>
          <ul className="space-y-2 text-sm">
            <li>📱 +91 678956-XYZW</li>
            <li>📧 manishmodanwal500@gmail.com</li>
            <li>📍 Noida, Uttar Pradesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-blue-300 pt-4 text-center text-sm text-blue-800">
        © 2024 <span className="font-semibold">Swasth</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
