import React, { useState } from 'react';
import { useCart } from "../cart/CartContext";
import ProductDetailsPopup from "../popups/ProductDetailsPopup";
import { Button, Typography } from 'antd';
import { Product } from "../../types/ProductInterfaces";
import ProductCard from "../cards/ProductCard";

const { Title } = Typography;

interface ExclusiveCollectionProps {
    items: Product[]; // Replace `any` with a specific type if your items have a known structure
}

const ExclusiveCollection: React.FC<ExclusiveCollectionProps> = ({ items }) => {
    const [showAll, setShowAll] = useState(false); // State to toggle between showing more or fewer products
    const { addItem } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    // Only show the first 4 items or all items depending on showAll state
    const displayedProducts = showAll ? items : items.slice(0, 4);
    const hasMoreItems = items.length > 4; // Check if there are more than 4 items

    const handleToggleView = () => {
        if (showAll) {
            // When showing less, scroll to the exclusive section
            const exclusiveSection = document.getElementById('exclusive');
            if (exclusiveSection) {
                exclusiveSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setShowAll(!showAll);
    };

    // Handle opening the product details popup
    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product); // Set the selected product
    };

    // Handle closing the product details popup
    const handleClosePopup = () => {
        setSelectedProduct(null); // Close the popup
    };

    return (
        <section className="py-5 white-section" id="exclusive">
            <div className="container">
                    <h1 className="text-center mb-5" data-aos="fade-up">Exclusive Collection</h1>
                {items.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No exclusive items available at the moment.</p>
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                            {displayedProducts.map((product) => (
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                    onCardClick={() => handleViewDetails(product)} // Open the product details on click
                                />
                            ))}
                        </div>

                        {/* See More / See Less Button */}
                        {hasMoreItems && (
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-outline-dark px-4"
                                    onClick={handleToggleView}
                                >
                                    {showAll ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Product Details Popup */}
                {selectedProduct && (
                    <ProductDetailsPopup
                        product={selectedProduct} // Pass the selected product to the popup
                        visible={!!selectedProduct} // Control visibility
                        onClose={handleClosePopup} // Close the popup on action
                    />
                )}
            </div>
        </section>
    );
};

export default ExclusiveCollection;