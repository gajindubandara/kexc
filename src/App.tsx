import React, { useEffect, useState } from 'react';
import Navbar from './components/sections/Navbar';
import Preloader from './components/preloader/Preloader';
import HeroSection from './components/sections/HeroSection';
import ExclusiveCollection from './components/sections/ExclusiveCollection';
import SpecialOffers from './components/sections/SpecialOffers';
import AllCollection from './components/sections/AllCollection';
import Newsletter from './components/sections/Newsletter';
import Footer from './components/sections/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Cart from "./components/cart/Cart";
import {Product} from "./types/ProductInterfaces";
// import ProductCard from "./components/ProductCard";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [exclusiveItems, setExclusiveItems] = useState<any[]>([]);
  const [offerItems, setOfferItems] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const MIN_LOADING_TIME = 2000; // Minimum time for the loader
    const startTime = Date.now(); // Record the start time

    const fetchProducts = async () => {
      const startTime = Date.now(); // Start time to calculate elapsed time
      try {
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyrZ-w6FDvVv7g5CUof8qI_wpJmagaO23A_HRj-qY13QB8qRCZQkOq1zlZlEthP8w_3/exec' // Replace with your API URL
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json(); // Parse JSON response with type safety

        // Filter the data into respective categories
        setExclusiveItems(data.filter((item) => item.exclusive));
        setOfferItems(data.filter((item) => item.offers));
        setAllItems(data);
      } catch (error: any) {
        setError(error.message); // Handle error
      } finally {
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time
        const remainingTime = Math.max(MIN_LOADING_TIME - elapsedTime, 0); // Calculate remaining time

        // Ensure the loader runs for at least MIN_LOADING_TIME
        setTimeout(() => setLoading(false), remainingTime);
      }
    };
    fetchProducts(); // Call the fetch function

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
      <>
        <Navbar />
        <main>
          <HeroSection />
          <ExclusiveCollection items={exclusiveItems} />
          <SpecialOffers items={offerItems} />
          <AllCollection items={allItems} />
          {/*<Newsletter />*/}
        </main>
        <Footer />
      </>
  );
};

export default App;
