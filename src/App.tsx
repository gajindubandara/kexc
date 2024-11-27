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
import Cart from "./components/Cart";
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
      try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzpfRoPvlcMNXVlnHdxuZzepeJ__v5qbemAX6O8uJBnLngnipJ_F_3KmZZ6crDAutQI/exec" // Replace with your API URL
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json(); // Parse JSON response
        setExclusiveItems(data.filter((item: any) => item.exclusive === true));
        setOfferItems(data.filter((item: any) => item.offers === true));
        setAllItems(data.filter((item: any) => item.offers === false));
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
          <SpecialOffers />
          <Categories />
          <Newsletter />
        </main>
        <Footer />
      </>
  );
};

export default App;
