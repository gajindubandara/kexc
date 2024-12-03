import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Badge, Button, Drawer, message, Space } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import Cart from '../cart/Cart';
import { useCart } from "../cart/CartContext"; // Import the Cart component

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const { items, removeItem } = useCart();
    const [isCartDrawerVisible, setIsCartDrawerVisible] = useState(false);

    const navRef = useRef<HTMLDivElement>(null); // Reference for the nav container

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

    const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

    const showCartDrawer = () => {
        setIsCartDrawerVisible(true);
    };

    const closeCartDrawer = () => {
        setIsCartDrawerVisible(false);
    };

    const clearCart = () => {
        items.forEach((item) =>
            removeItem(item.product.productId, item.selectedSize, item.selectedColor)
        );
        message.success('Cart cleared!');
        closeCartDrawer();
    };

    // Function to close the mobile menu after clicking on a nav item
    const closeMobileMenu = () => {
        setIsNavExpanded(false);
    };

    // Close the menu if the user clicks outside the nav
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavExpanded(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : 'transparent'}`} ref={navRef}>
                <div className="container">
                    <a className="navbar-brand fw-bold" href="#">Ken Exclusive</a>
                    <div className="nav-container">
                        <li className="nav-item cart-icon-wrapper" style={{ listStyleType: "none" }} id="mobile-view-cart">
                            <Space size="middle">
                                <Badge
                                    size="small"
                                    count={cartItemCount > 0 ? cartItemCount : null}
                                    showZero={false}
                                >
                                    <Avatar
                                        shape="square"
                                        onClick={showCartDrawer}
                                        style={{ cursor: 'pointer', background: 'transparent' }}
                                        size="large"
                                        icon={<ShoppingCartOutlined />}
                                    />
                                </Badge>
                            </Space>
                        </li>
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => setIsNavExpanded(!isNavExpanded)}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div className={`collapse navbar-collapse ${isNavExpanded ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#home" onClick={closeMobileMenu}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#categories" onClick={closeMobileMenu}>Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#exclusive" onClick={closeMobileMenu}>Exclusive</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#offers" onClick={closeMobileMenu}>Offers</a>
                            </li>
                            <li className="nav-item cart-icon-wrapper" id="desktop-view-cart">
                                <Space size="middle">
                                    <Badge
                                        size="small"
                                        count={cartItemCount > 0 ? cartItemCount : null}
                                        showZero={false}
                                    >
                                        <Avatar
                                            shape="square"
                                            onClick={showCartDrawer}
                                            style={{ cursor: 'pointer', background: 'transparent' }}
                                            size="large"
                                            icon={<ShoppingCartOutlined />}
                                        />
                                    </Badge>
                                </Space>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Drawer
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Your Cart</span>
                        {items.length !== 0 ? (
                            <Button
                                color="danger"
                                variant="link"
                                onClick={clearCart}
                                size="small"
                                style={{ padding: '0 8px' }}
                            >
                                Clear Cart
                            </Button>
                        ) : null}
                    </div>
                }
                placement="right"
                onClose={closeCartDrawer}
                visible={isCartDrawerVisible}
            >
                <Cart closeCartDrawer={closeCartDrawer} />
            </Drawer>
        </>
    );
};

export default Navbar;