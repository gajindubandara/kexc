import React from 'react';
import img from "../assets/images/shop/product-11.jpg"

const Categories: React.FC = () => {
    return (
        <section className="py-5" id="categories">
            <div className="container">
                <h2 className="text-center mb-5" data-aos="fade-up">Our Collection</h2>
                <div className="row">
                    {/* Filters Sidebar */}
                    <div className="col-md-3">
                        <div className="filter-sidebar" data-aos="fade-right">
                            <h5 className="mb-4">Filters</h5>

                            {/* Category Filter */}
                            <div className="mb-4">
                                <h6 className="mb-3">Category</h6>
                                {['T-Shirts', 'Jeans', 'Dresses', 'Jackets'].map((category) => (
                                    <div className="form-check mb-2" key={category}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={category.toLowerCase()}
                                        />
                                        <label className="form-check-label" htmlFor={category.toLowerCase()}>
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Size Filter */}
                            <div className="mb-4">
                                <h6 className="mb-3">Size</h6>
                                <div className="btn-group d-flex flex-wrap gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <button key={size} className="btn btn-outline-dark btn-sm">
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-4">
                                <h6 className="mb-3">Price Range</h6>
                                <input type="range" className="form-range" min="0" max="200" step="10" />
                                <div className="d-flex justify-content-between">
                                    <span>$0</span>
                                    <span>$200</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="col-md-9">
                        <div className="row g-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div className="col-md-3" key={item} data-aos="fade-up">
                                    <div className="card product-card">
                                        <img
                                            src={img}
                                            className="card-img-top"
                                            alt="Product"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Classic T-Shirt</h5>
                                            <p className="card-text">$29.99</p>
                                            <button className="btn btn-dark w-100">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;