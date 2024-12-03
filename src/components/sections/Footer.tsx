import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Ken Exclusive</h5>
                        <p>Premium Fashion & Luxury Clothing Brand</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#home" className="text-white">Home</a></li>
                            <li><a href="#shop" className="text-white">Shop</a></li>
                            <li><a href="#exclusive" className="text-white">Exclusive</a></li>
                            <li><a href="#offers" className="text-white">Offers</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: info@kenexclusive.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;