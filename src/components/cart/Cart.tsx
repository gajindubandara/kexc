import React from 'react';
import {Button, message, Divider, notification} from 'antd';
import {
    ShoppingCartOutlined,
    DeleteOutlined,
    PlusOutlined,
    MinusOutlined
} from '@ant-design/icons';
import { useCart } from './CartContext';

interface CartProps {
    closeCartDrawer: () => void; // Add closeCartDrawer as a prop type
}

const Cart: React.FC<CartProps> = ({ closeCartDrawer }) => {
    const { items, removeItem, updateQuantity } = useCart();
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    const placeOrder = () => {
        if (items.length === 0) {
            notification.warning({
                message: 'Cart is Empty',
                description: 'Your cart is empty. Add items before placing an order.',
                placement: 'topRight', // You can change placement to other positions like 'topLeft', 'bottomRight', etc.
            });
            return;
        }

        notification.success({
            message: 'Order Placed Successfully',
            description: 'Your order has been placed successfully.',
            placement: 'topRight',
        });

        // Remove items from cart
        items.forEach((item) => removeItem(item.product.productId, item.selectedSize, item.selectedColor));
        closeCartDrawer();
    };

    const totalPrice = items.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
    );

    return (
        <div className="bg-white rounded-2xl overflow-hidden max-w-md mx-auto">
            {items.length === 0 ? (
                <div className="text-center py-16 px-4">
                    <ShoppingCartOutlined className="text-7xl text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Explore our products and add some items</p>
                </div>
            ) : (
                <div>
                    {/* Cart Items */}
                    <div className="space-y-4">
                        {items.map((item) => (
                            <>
                            <div
                                key={item.product.productId}
                                className="flex items-center justify-between bg-gray-50 rounded-lg mb-4"
                            >
                                <div className="flex-grow">
                                    <h6 className="font-semibold text-gray-800 mb-1">
                                        {item.product.productName} ( {item.selectedSize} - {item.selectedColor})
                                    </h6>
                                    <p className="text-gray-600 text-sm">
                                        {new Intl.NumberFormat('en-LK', {
                                            style: 'currency',
                                            currency: 'LKR'
                                        }).format(item.product.price)}
                                    </p>
                                    {/*<p className="text-gray-600 text-sm">*/}
                                    {/*    Size: {item.selectedSize}, Color: {item.selectedColor}*/}
                                    {/*</p>*/}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Button
                                        type="text"
                                        icon={<MinusOutlined/>}
                                        className="px-2"
                                        onClick={() =>
                                            updateQuantity(item.product.productId, Math.max(1, item.quantity - 1))
                                        }
                                    />
                                    <span className="px-3 text-sm">{item.quantity}</span>
                                    <Button
                                        type="text"
                                        icon={<PlusOutlined/>}
                                        className="px-2"
                                        onClick={() => updateQuantity(item.product.productId, item.quantity + 1)}
                                    />

                                    <Button
                                        type="text"
                                        danger
                                        style={{marginLeft:"50%"}}
                                        icon={<DeleteOutlined/>}
                                        onClick={() => removeItem(item.product.productId, item.selectedSize, item.selectedColor)}
                                        className="ml-2"
                                    />
                                </div>
                            </div>
                            <Divider/>
                            </>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-600">Total Items: {items.length}</p>
                            <h3 className="font-bold text-xl text-gray-800">
                                {new Intl.NumberFormat('en-LK', {
                                    style: 'currency',
                                    currency: 'LKR'
                                }).format(totalPrice)}
                            </h3>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            className="bg-black text-white hover:bg-gray-800 rounded-full px-6"
                            onClick={placeOrder}
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
