import React, {useState} from 'react';
import img from "../assets/images/shop/product-10.jpg"

interface OfferProduct {
    id: number;
    title: string;
    originalPrice: number;
    discountPrice: number;
    image: string;
    discount: number;
}

const SpecialOffers: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const offerProducts: OfferProduct[] = [
        {
            id: 1,
            title: "Casual Shirt",
            originalPrice: 49.99,
            discountPrice: 34.99,
            image: img,
            discount: 30
        },
        {
            id: 2,
            title: "Denim Jeans",
            originalPrice: 69.99,
            discountPrice: 54.99,
            image: img,
            discount: 21
        },
        {
            id: 3,
            title: "Sneakers",
            originalPrice: 79.99,
            discountPrice: 59.99,
            image: img,
            discount: 25
        },
        {
            id: 4,
            title: "Leather Jacket",
            originalPrice: 129.99,
            discountPrice: 99.99,
            image: img,
            discount: 23
        },
        {
            id: 5,
            title: "Sports Watch",
            originalPrice: 99.99,
            discountPrice: 69.99,
            image: img,
            discount: 30
        },
        {
            id: 6,
            title: "Backpack",
            originalPrice: 49.99,
            discountPrice: 39.99,
            image: img,
            discount: 20
        }
    ];

    const displayedProducts = showAll ? offerProducts : offerProducts.slice(0, 4);
    const hasMoreItems = offerProducts.length > 4;
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

    return (
        <section className="py-5 offers-section" id="offers">
            <div className="container">
                <h2 className="text-center mb-5" data-aos="fade-up">Special Offers</h2>
                {offerProducts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No offers available at the moment.</p>
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                            {/*<div className="row g-4 justify-content-center">*/}
                            {displayedProducts.map((product) => (
                                <div className="col" key={product.id} data-aos="fade-up">
                                    <div className="card product-card">
                                        <div className="offer-badge">-{product.discount}%</div>
                                        <img src={product.image} className="card-img-top" alt={product.title}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">
                                                <span className="price-strike me-2">${product.originalPrice}</span>
                                                <span className="text-danger">${product.discountPrice}</span>
                                            </p>
                                            <button className="btn btn-dark w-100">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
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
                {/*<div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">*/}
                {/*    {offerProducts.map((product) => (*/}
                {/*        <div className="col" key={product.id} data-aos="fade-up">*/}
                {/*            <div className="card product-card">*/}
                {/*                <div className="offer-badge">-{product.discount}%</div>*/}
                {/*                <img src={product.image} className="card-img-top" alt={product.title} />*/}
                {/*                <div className="card-body">*/}
                {/*                    <h5 className="card-title">{product.title}</h5>*/}
                {/*                    <p className="card-text">*/}
                {/*                        <span className="price-strike me-2">${product.originalPrice}</span>*/}
                {/*                        <span className="text-danger">${product.discountPrice}</span>*/}
                {/*                    </p>*/}
                {/*                    <button className="btn btn-dark w-100">Add to Cart</button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
        </section>
    );
};

export default SpecialOffers;