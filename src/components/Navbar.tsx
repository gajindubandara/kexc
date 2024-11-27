import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Button, Drawer, message, Space} from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import Cart from './Cart';
import {useCart} from "../CartContext"; // Import the Cart component

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const { items,removeItem } = useCart();
    // const {items, removeItem, updateQuantity} = useCart();
    const [isCartDrawerVisible, setIsCartDrawerVisible] = useState(false);



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
        items.forEach((item) => removeItem(item.productId));
        message.success('Cart cleared!');
        closeCartDrawer()
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : 'transparent'}`}>
                <div className="container">
                    <a className="navbar-brand fw-bold" href="#">Ken Exclusive</a>
                    <div className="nav-container">
                        <li className="nav-item cart-icon-wrapper" style={{listStyleType:"none"}} id="mobile-view-cart">
                            <Space size="middle">
                                <Badge
                                    size="small"
                                    count={cartItemCount > 0 ? cartItemCount : null}
                                    showZero={false}
                                >
                                    <Avatar
                                        shape="square"
                                        onClick={showCartDrawer}
                                        style={{cursor: 'pointer', background: 'transparent'}}
                                        size="large"
                                        icon={<ShoppingCartOutlined/>}
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

                    {/*<button*/}
                    {/*    className="navbar-toggler"*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => setIsNavExpanded(!isNavExpanded)}*/}
                    {/*>*/}
                    {/*    <span className="navbar-toggler-icon"></span>*/}
                    {/*</button>*/}
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
                                            style={{cursor: 'pointer', background: 'transparent'}}
                                            size="large"
                                            icon={<ShoppingCartOutlined/>}
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
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>Your Cart</span>
                        {items.length != 0 ? (
                            <Button
                                color="danger"
                                variant="link"
                                onClick={clearCart}
                                size="small"
                                style={{padding: '0 8px'}}
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
                <Cart closeCartDrawer={closeCartDrawer}/>
            </Drawer>
        </>
    );
};

export default Navbar;