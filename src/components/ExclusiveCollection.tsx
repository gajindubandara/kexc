import React, {useState} from 'react';
import img from "../assets/images/shop/product-13.jpg"
import {useCart} from "../CartContext";
import {ShoppingCartOutlined} from "@ant-design/icons";

interface ExclusiveCollectionProps {
    items: any[]; // Replace `any` with a specific type if your items have a known structure
}

const ExclusiveCollection: React.FC<ExclusiveCollectionProps> = ({ items }) => {
    const [showAll, setShowAll] = useState(false);
    const { addItem } = useCart();

    // const exclusiveProducts: Product[] = [
    //     {
    //         id: 1,
    //         title: "Limited Edition Leather Jacket",
    //         price: 299.99,
    //         description: "Only 50 pieces available",
    //         image: img
    //     },
    //     {
    //         id: 2,
    //         title: "Designer Evening Dress",
    //         price: 399.99,
    //         description: "Limited Collection",
    //         image: img
    //     },
    //     {
    //         id: 3,
    //         title: "Stylish Sneakers",
    //         price: 199.99,
    //         description: "Limited Stock",
    //         image: img
    //     },
    //     {
    //         id: 4,
    //         title: "Elegant Handbag",
    //         price: 249.99,
    //         description: "Exclusive Design",
    //         image: img
    //     },
    //     {
    //         id: 5,
    //         title: "Stylish Sneakers",
    //         price: 199.99,
    //         description: "Limited Stock",
    //         image: img
    //     },
    //     {
    //         id: 6,
    //         title: "Elegant Handbag",
    //         price: 249.99,
    //         description: "Exclusive Design",
    //         image: img
    //     }
    // ];


    const displayedProducts = showAll ? items : items.slice(0, 4);
    const hasMoreItems = items.length > 4;

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

    const handleAddToCart = (product: { productId: number; productName: string; price: number }) => {
        addItem({ ...product, quantity: 1 });
    };

    return (
        <section className="py-5 exclusive-section" id="exclusive">
            <div className="container">
                <h2 className="text-center mb-5" data-aos="fade-up">Exclusive Collection</h2>
                {items.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No exclusive items available at the moment.</p>
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                            {displayedProducts.map((product) => (
                                <div className="col" key={product.id} data-aos="fade-up">
                                    <div className="card product-card h-100 position-relative">
                                        <div className="exclusive-badge">Exclusive</div>
                                        <button
                                            className="btn btn-dark position-absolute cart-button"
                                            onClick={() => handleAddToCart(product)}

                                        >
                                            <ShoppingCartOutlined />
                                        </button>
                                        <img src={product.imgUrl} className="card-img-top" alt={product.title}/>

                                        {/* Cart Icon Button Positioned Absolutely */}


                                        <div className="card-body">
                                            <h5 className="card-title">{product.productName}</h5>
                                            <p className="card-text">
                                                {new Intl.NumberFormat("en-LK", {
                                                    style: "currency",
                                                    currency: "LKR"
                                                }).format(product.price)}
                                            </p>

                                            <p className="text-muted" style={{marginBottom:"0px"}}>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*<div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">*/}
                        {/*/!*<div className="row g-4 justify-content-center">*!/*/}
                        {/*    {displayedProducts.map((product) => (*/}
                        {/*        <div className="col" key={product.id} data-aos="fade-up">*/}
                        {/*        /!*<div className="col-sm-6 col-md-3" key={product.id} data-aos="fade-up">*!/*/}
                        {/*            <div className="card product-card h-100">*/}
                        {/*                <div className="exclusive-badge">Exclusive</div>*/}
                        {/*                <img src={product.imgUrl} className="card-img-top" alt={product.title} />*/}
                        {/*                <div className="card-body">*/}
                        {/*                    <h5 className="card-title">{product.productName}</h5>*/}
                        {/*                    <p className="card-text">*/}
                        {/*                        {new Intl.NumberFormat("en-LK", {*/}
                        {/*                            style: "currency",*/}
                        {/*                            currency: "LKR"*/}
                        {/*                        }).format(product.price)}*/}
                        {/*                    </p>*/}

                        {/*                    <p className="text-muted">{product.description}</p>*/}
                        {/*                    <button className="btn btn-dark w-100" onClick={() => handleAddToCart(product)}>Add to Cart</button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
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