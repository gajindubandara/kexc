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
import {fetchProducts} from "./components/services/ productService";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [exclusiveItems, setExclusiveItems] = useState<any[]>([]);
  const [offerItems, setOfferItems] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  setTimeout(() => setLoading(false), 1800);


  useEffect(() => {
    const loadProducts = async () => {
      const startTime = Date.now(); // Start time to calculate elapsed time
      try {
        const data = await fetchProducts(); // Use the fetch function from productService

        // Check if data is not empty and set dataReceived accordingly
        if (data.length > 0) {
          setExclusiveItems(data.filter((item) => item.exclusive));
          setOfferItems(data.filter((item) => item.offers));
          setAllItems(data);
          setDataReceived(true); // Data is received successfully and is not empty
        } else {
          setDataReceived(false); // Data is empty
        }
      } catch (error: any) {
        setError(error.message); // Handle error
        setDataReceived(false); // Set dataReceived to false if there was an error
      }
    };
    loadProducts(); // Call the function to load products

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
          <ExclusiveCollection items={exclusiveItems} dataReceived={dataReceived}/>
          <SpecialOffers items={offerItems} dataReceived={dataReceived}/>
          <AllCollection items={allItems} dataReceived={dataReceived}/>
          {/*<Newsletter />*/}
        </main>
        <Footer />
      </>
  );
};

export default App;
