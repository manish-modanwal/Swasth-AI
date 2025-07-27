import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from '../components/Banner';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="space-y-20">
      <div data-aos="fade-up">
        <Header />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <SpecialityMenu />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <TopDoctors />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Banner/>
      </div>
    </div>
  );
};

export default Home;
