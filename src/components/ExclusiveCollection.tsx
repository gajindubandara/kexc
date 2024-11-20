import React, {useState} from 'react';
import img from "../assets/images/shop/product-13.jpg"

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

const ExclusiveCollection: React.FC = () => {
    const [showAll, setShowAll] = useState(false);

    const exclusiveProducts: Product[] = [
        {
            id: 1,
            title: "Limited Edition Leather Jacket",
            price: 299.99,
            description: "Only 50 pieces available",
            image: img
        },
        {
            id: 2,
            title: "Designer Evening Dress",
            price: 399.99,
            description: "Limited Collection",
            image: img
        },
        {
            id: 3,
            title: "Stylish Sneakers",
            price: 199.99,
            description: "Limited Stock",
            image: img
        },
        {
            id: 4,
            title: "Elegant Handbag",
            price: 249.99,
            description: "Exclusive Design",
            image: img
        },
        {
            id: 5,
            title: "Stylish Sneakers",
            price: 199.99,
            description: "Limited Stock",
            image: img
        },
        {
            id: 6,
            title: "Elegant Handbag",
            price: 249.99,
            description: "Exclusive Design",
            image: img
        }
    ];


    const displayedProducts = showAll ? exclusiveProducts : exclusiveProducts.slice(0, 4);
    const hasMoreItems = exclusiveProducts.length > 4;

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

    return (
        <section className="py-5 exclusive-section" id="exclusive">
            <div className="container">
                <h2 className="text-center mb-5" data-aos="fade-up">Exclusive Collection</h2>
                {exclusiveProducts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No exclusive items available at the moment.</p>
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                        {/*<div className="row g-4 justify-content-center">*/}
                            {displayedProducts.map((product) => (
                                <div className="col" key={product.id} data-aos="fade-up">
                                {/*<div className="col-sm-6 col-md-3" key={product.id} data-aos="fade-up">*/}
                                    <div className="card product-card h-100">
                                        <div className="exclusive-badge">Exclusive</div>
                                        <img src={product.image} className="card-img-top" alt={product.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">${product.price}</p>
                                            <p className="text-muted">{product.description}</p>
                                            {/*<button className="btn btn-dark w-100">Shop Now</button>*/}
                                        </div>
                                    </div>
                                </div>
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
            </div>
        </section>
    );
    // return (
    //     <section className="py-5 exclusive-section" id="exclusive">
    //         <div className="container">
    //             <h2 className="text-center mb-5" data-aos="fade-up">Exclusive Collection</h2>
    //             <div className="row g-4">
    //                 {exclusiveProducts.map((product) => (
    //                     <div className="col-md-3" key={product.id} data-aos="fade-up">
    //                         <div className="card product-card">
    //                             <div className="exclusive-badge">Exclusive</div>
    //                             <img src={product.image} className="card-img-top" alt={product.title} />
    //                             <div className="card-body">
    //                                 <h5 className="card-title">{product.title}</h5>
    //                                 <p className="card-text">${product.price}</p>
    //                                 <p className="text-muted">{product.description}</p>
    //                                 <button className="btn btn-dark w-100">Shop Now</button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </section>
    // );
};

export default ExclusiveCollection;