import React, {useEffect, useState} from 'react';
import {Divider, Radio, Select, Slider, Typography} from "antd";
import ProductDetailsPopup from "../popups/ProductDetailsPopup";
import ProductCard from "../cards/ProductCard";
import {Product} from "../../types/ProductInterfaces";
const { Text } = Typography;
const { Option } = Select;

interface AllCollectionProps {
    items: Product[]; // Replace `any` with a specific type if your items have a known structure
}
const AllCollection: React.FC<AllCollectionProps> = ({ items }) => {
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    const uniqueCategories = [...new Set(items.map(item => item.category))];
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [marks, setMarks] = useState<{ [key: number]: string }>({});

    // const options = [ 'All','S', 'M', 'L', 'XL'].map(size => ({
    //     label: size,
    //     value: size,
    // }));

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


    useEffect(() => {
        const [min, max] = priceRange;

        setMarks({
            [min]: `LKR ${min}`,
            [max]: `LKR ${max}`
        });
    }, [priceRange]);

    const handleCategoryChange = (value: string[]) => {
        setSelectedCategories(value);
    };

    // Filter the items based on selected categories
    const filteredItems = selectedCategories.length
        ? items.filter(item => selectedCategories.includes(item.category))
        : items;

    const handleViewDetails = (product: any) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };




    const onChange = (value: number | number[]) => {
        console.log('onChange: ', value);
    };

    return (
        <section className="py-5 white-section" id="categories">
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
                                        placeholder="Select Categories"
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

                                {/* Size Filter */}
                                {/*<div className="col-md-3 mb-3">*/}
                                {/*    <h6 className="mb-2">Size</h6>*/}
                                {/*    <Radio.Group*/}
                                {/*        block*/}
                                {/*        options={options}*/}
                                {/*        defaultValue="All"  // Default selected value*/}
                                {/*        optionType="button"*/}
                                {/*        buttonStyle="solid"*/}
                                {/*        onChange={(e) => console.log('Selected size:', e.target.value)}  // Optional: handle selection change*/}
                                {/*        className="custom-radio-group"  // Custom class for styling*/}
                                {/*    />*/}
                                {/*</div>*/}


                                {/*Price Range */}
                                <div className="col-md-6 mb-3" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                    <h6 className="mb-2">Price Range</h6>
                                    <Slider
                                        range
                                        min={priceRange[0]}
                                        max={priceRange[1]}
                                        defaultValue={priceRange}
                                        onChange={onChange}
                                        marks={marks}
                                    />
                                </div>
                                {/*<div className="col-md-3 mb-3 mt-4">*/}
                                {/*    <button className="btn btn-dark btn-sm" >Filter</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className="row">
                    {items.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-lg">No items available at the moment.</p>
                        </div>
                    ) : (
                        <>
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                                {filteredItems.map((product) => (
                                    <ProductCard
                                        key={product.productId}
                                        product={product}
                                        onCardClick={() => handleViewDetails(product)} // Open the product details on click
                                    />
                                ))}
                                {/*{items.map((product) => (*/}
                                {/*    <ProductCard*/}
                                {/*        key={product.productId}*/}
                                {/*        product={product}*/}
                                {/*        onCardClick={() => handleViewDetails(product)} // Open the product details on click*/}
                                {/*    />*/}
                                {/*))}*/}
                            </div>
                            {/*{hasMoreItems && (*/}
                            {/*    <div className="text-center mt-4">*/}
                            {/*        <button*/}
                            {/*            className="btn btn-outline-light px-4"*/}
                            {/*            onClick={handleToggleView}*/}
                            {/*        >*/}
                            {/*            {showAll ? 'See Less' : 'See More'}*/}
                            {/*        </button>*/}
                            {/*    </div>*/}
                            {/*)}*/}
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