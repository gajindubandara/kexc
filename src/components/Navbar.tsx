import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            const isDesktop = window.innerWidth >= 992;

            if (isDesktop) {
                setIsScrolled(currentScroll > 50);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : 'transparent'}`}>
            <div className="container">
                <a className="navbar-brand fw-bold" href="#">Ken Exclusive</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsNavExpanded(!isNavExpanded)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavExpanded ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#categories">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#exclusive">Exclusive</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#offers">Offers</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;