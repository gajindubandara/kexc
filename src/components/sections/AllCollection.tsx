import React, { useState, useEffect } from 'react';
import { Typography, Select, Slider, Divider, Empty } from 'antd';
import ProductCard from "../cards/ProductCard";
import ProductDetailsPopup from "../popups/ProductDetailsPopup"; // Ensure this import exists
import { Product } from "../../types/ProductInterfaces";
import SkeletonSection from "../preloader/SkeletonSection";

const { Text } = Typography;
const { Option } = Select;

interface AllCollectionProps {
    items: Product[];
    dataReceived: boolean;
}

const AllCollection: React.FC<AllCollectionProps> = ({ items, dataReceived }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showAll, setShowAll] = useState(false);

    // Safely get unique categories with fallback
    const uniqueCategories = items ? [...new Set(items.map(item => item.category || 'Uncategorized'))] : [];

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [filteredItems, setFilteredItems] = useState<Product[]>([]);

    // Improved price range calculation with null/undefined checks
    const getPriceRange = (products: Product[]): [number, number] => {
        if (!products || products.length === 0) {
            return [0, 1000]; // Default range if no products
        }

        const validPrices = products
            .map(product => product.offers ? product.disPrice : product.price)
            .filter(price => price != null && !isNaN(price));

        if (validPrices.length === 0) {
            return [0, 1000];
        }

        return [
            Math.floor(Math.min(...validPrices)),
            Math.ceil(Math.max(...validPrices))
        ];
    };

    // Initialize price range state with a safe default
    const [priceRange, setPriceRange] = useState<[number, number]>(() =>
        getPriceRange(items || [])
    );

    // Handlers
    const handleCategoryChange = (value: string[]) => {
        setSelectedCategories(value);
    };

    const onChange = (newRange: number[]) => {
        setPriceRange([newRange[0], newRange[1]]);
    };

    const filterItems = () => {
        const filtered = items.filter((item) => {
            const price = item.offers && item.disPrice !== undefined
                ? item.disPrice
                : (item.price || 0);
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(item.category || 'Uncategorized');

            const matchesPrice =
                price >= priceRange[0] &&
                price <= priceRange[1];

            return matchesCategory && matchesPrice;
        });
        setFilteredItems(filtered);
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    const handleToggleView = () => {
        setShowAll(prevShowAll => !prevShowAll);
    };

    // Effect for filtering items
    useEffect(() => {
        if (dataReceived && items && items.length > 0) {
            filterItems();
        }
    }, [dataReceived, items, selectedCategories,priceRange]);


    useEffect(() => {
        if (dataReceived && items && items.length > 0) {
            const [min, max] = getPriceRange(items);

            // Only update if the calculated range is different from current range
            if (min !== priceRange[0] || max !== priceRange[1]) {
                setPriceRange([min, max]);
            }
        }
    }, [dataReceived, items]);

    // Loading state
    if (!dataReceived || !items) {
        return (
            <section className="py-5 white-section" id="collection">
                <div className="container">
                    <h1 className="text-center mb-5" data-aos="fade-up">Our Collection</h1>
                    <SkeletonSection numberOfCards={4} />
                </div>
            </section>
        );
    }

    const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 8);
    const hasMoreItems = filteredItems.length > 8;

    return (
        <section className="py-5 white-section" id="collection">
            <div className="container">
                <h1 className="text-center mb-5" data-aos="fade-up">Our Collection</h1>
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="filter-sidebar" data-aos="fade-down">
                            <div className="row align-items-center">
                                {/* Category Filter - Dropdown */}
                                <div className="col-md-6 mb-3">
                                    <h6 className="mb-2">Categories</h6>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Filter by Category"
                                        value={selectedCategories}
                                        onChange={handleCategoryChange}
                                    >
                                        {uniqueCategories.map(category => (
                                            <Option key={category} value={category}>
                                                {category}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                {/* Price Range */}
                                <div className="col-md-6 mb-3">
                                    <h6 className="mb-2">Price Range</h6>

                                    <Slider
                                        range
                                        min={getPriceRange(items)[0]} // Minimum price from the products
                                        max={getPriceRange(items)[1]} // Maximum price from the products
                                        value={priceRange} // Current price range
                                        onChange={onChange} // Update state when slider changes
                                        style={{ marginBottom: "0px" }}
                                    />
                                    <Text type="secondary" ellipsis>
                                        {`${new Intl.NumberFormat('en-LK', {
                                            style: 'currency',
                                            currency: 'LKR',
                                            minimumFractionDigits: 2,
                                        }).format(priceRange[0])} - ${new Intl.NumberFormat('en-LK', {
                                            style: 'currency',
                                            currency: 'LKR',
                                            minimumFractionDigits: 2,
                                        }).format(priceRange[1])}`}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="row">
                    {filteredItems.length === 0 ? (
                        <div className="flex justify-center items-center w-full h-full p-6 mt-5 mb-5">
                            <Empty
                                description={
                                    <span className="text-gray-500">
                                        No products available at the moment
                                    </span>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                                {displayedItems.map((product) => (
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
                                        className="btn btn-outline-dark px-4"
                                        onClick={handleToggleView}
                                    >
                                        {showAll ? 'See Less' : 'See More'}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {selectedProduct && (
                    <ProductDetailsPopup
                        product={selectedProduct}
                        visible={!!selectedProduct}
                        onClose={handleClosePopup}
                    />
                )}
            </div>
        </section>
    );
};

export default AllCollection;
