import React, {useEffect, useState} from 'react';
import {Divider, Empty, Radio, Select, Slider, Typography} from "antd";
import ProductDetailsPopup from "../popups/ProductDetailsPopup";
import ProductCard from "../cards/ProductCard";
import {Product} from "../../types/ProductInterfaces";

const {Text} = Typography;
const {Option} = Select;

interface AllCollectionProps {
    items: Product[]; // Replace `any` with a specific type if your items have a known structure
}

const AllCollection: React.FC<AllCollectionProps> = ({items}) => {
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [showAll, setShowAll] = useState(false);
    const uniqueCategories = [...new Set(items.map(item => item.category))];
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const getPriceRange = (products: Product[]): [number, number] => {
        if (products.length === 0) {
            return [0, 0]; // Default range if no products
        }

        let minPrice = Infinity;
        let maxPrice = -Infinity;

        products.forEach(product => {
            const price = product.offers ? product.disPrice : product.price; // Consider discount price if available
            if (price < minPrice) minPrice = price;
            if (price > maxPrice) maxPrice = price;
        });

        return [minPrice, maxPrice];
    };
    const [priceRange, setPriceRange] = useState<[number, number]>(() => getPriceRange(items));


    const handleCategoryChange = (value: string[]) => {
        setSelectedCategories(value);
    };

    // Filter items based on selected categories and price range
    const filteredItems = items.filter((item) => {
        const price = item.offers ? item.disPrice! : item.price;

        // Check category filter (if any categories are selected)
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(item.category);

        // Check price range filter
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

        return matchesCategory && matchesPrice;
    });

    // Slice the filtered items into sets of 8 based on showAll
    const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 8);

    // Check if there are more items to display
    const hasMoreItems = filteredItems.length > 8;

    const handleViewDetails = (product: any) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };


    const handleToggleView = () => {
        if (showAll) {
            // When showing less, scroll to the exclusive section
            const collectionSection = document.getElementById('collection');
            if (collectionSection) {
                collectionSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setShowAll(!showAll);
    };

    const onChange = (newRange: number[]) => {
        // Ensure the range is updated correctly
        setPriceRange([newRange[0], newRange[1]]);
    };

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
                                        style={{width: '100%'}}
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

                                {/*Price Range */}
                                <div className="col-md-6 mb-3">
                                    <h6 className="mb-2">Price Range</h6>

                                    <Slider
                                        range
                                        min={getPriceRange(items)[0]} // Minimum price from the products
                                        max={getPriceRange(items)[1]} // Maximum price from the products
                                        value={priceRange} // Current price range
                                        onChange={onChange} // Update state when slider changes
                                        style={{marginBottom: "0px"}}
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
                <Divider/>
                <div className="row">
                    {displayedItems.length === 0 ? (
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