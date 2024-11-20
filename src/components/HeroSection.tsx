import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section" id="home">
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-md-6">
                        <h1 className="display-4 fw-bold" data-aos="fade-up">
                            Discover Luxury Fashion
                        </h1>
                        <p className="lead" data-aos="fade-up" data-aos-delay="100">
                            Explore our exclusive collection of premium clothing and accessories.
                        </p>
                        <div data-aos="fade-up" data-aos-delay="200">
                            <a href="#categories" className="btn btn-dark btn-lg">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

