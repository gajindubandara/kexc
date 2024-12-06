import React, {useState} from 'react';
import img from "../../assets/images/shop/product-10.jpg"
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useCart} from "../cart/CartContext";
import {Badge, Button, Card, Empty, Typography} from "antd";
import ProductDetailsPopup from "../popups/ProductDetailsPopup";
import ProductCard from "../cards/ProductCard";
import {Product} from "../../types/ProductInterfaces";
const { Text } = Typography;

interface OffersCollectionProps {
    items: Product[]; // Replace `any` with a specific type if your items have a known structure
}

const SpecialOffers: React.FC<OffersCollectionProps> = ({ items }) => {
    const [showAll, setShowAll] = useState(false);
    const { addItem } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);


    const displayedProducts = showAll ? items : items.slice(0, 4);
    const hasMoreItems = items.length > 4;
    const handleToggleView = () => {
        if (showAll) {
            // When showing less, scroll to the exclusive section
            const offersSection = document.getElementById('offers');
            if (offersSection) {
                offersSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setShowAll(!showAll);
    };


    const handleViewDetails = (product: any) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <section className="py-5 black-section" id="offers">
            <div className="container">
                <h1 className="text-center mb-5" data-aos="fade-up">Special Offers</h1>
                {items.length === 0 ? (
                        <div className="flex justify-center items-center w-full h-full p-6 mt-5 mb-5">
                            <Empty
                                description={
                                    <span className="text-gray-500">
                                      No offers available at the moment.
                                    </span>
                                }
                            />
                        </div>
                ) : (
                    <>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                            {/*<div className="row g-4 justify-content-center">*/}
                            {displayedProducts.map((product) => (
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                    onCardClick={() => handleViewDetails(product)} // Open the product details on click
                                />
                            ))}
                        </div>
                        {hasMoreItems && (
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-outline-light px-4"
                                    onClick={handleToggleView}
                                >
                                    {showAll ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {selectedProduct && (
                    <ProductDetailsPopup
                        product={selectedProduct}
                        visible={!!selectedProduct}
                        onClose={handleClosePopup}
                        // onAddToCart={handleAddToCart}
                    />
                )}
            </div>
        </section>
    );
};

export default SpecialOffers;