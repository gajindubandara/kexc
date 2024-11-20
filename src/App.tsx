import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import ExclusiveCollection from './components/ExclusiveCollection';
import SpecialOffers from './components/SpecialOffers';
import Categories from './components/Categories';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
      <>
        <Navbar />
        <main>
          <HeroSection />
          <ExclusiveCollection />
          <SpecialOffers />
          <Categories />
          {/*<Newsletter />*/}
        </main>
        <Footer />
      </>
  );
};

export default App;
