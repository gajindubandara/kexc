// import React from 'react';
// import {Button, Input, message} from 'antd';
// import {useCart} from '../cartContext';
//
// const Cart: React.FC = () => {
//     const {items, removeItem, updateQuantity} = useCart();
//
//     const clearCart = () => {
//         items.forEach((item) => removeItem(item.productId));
//         message.success('Cart cleared!');
//     };
//
//     const placeOrder = () => {
//         if (items.length === 0) {
//             message.warning('Your cart is empty. Add items before placing an order.');
//             return;
//         }
//
//         // Simulating order placement
//         console.log('Order placed:', items);
//         message.success('Order placed successfully!');
//         clearCart(); // Optionally clear the cart after placing the order
//     };
//
//     return (
//         <div>
//             <h2>Your Cart</h2>
//             {items.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <>
//                     {items.map((item) => (
//                         <div key={item.productId} style={{marginBottom: '16px'}}>
//                             <p>
//                                 <strong>{item.productName}</strong> - {new Intl.NumberFormat("en-LK", {
//                                 style: "currency",
//                                 currency: "LKR"
//                             }).format(item.price)} x {item.quantity}
//                             </p>
//                             <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
//                                 <Input
//                                     type="number"
//                                     value={item.quantity}
//                                     min={1}
//                                     onChange={(e) => updateQuantity(item.productId, +e.target.value)}
//                                     style={{width: '80px'}}
//                                 />
//                                 <Button
//                                     type="text"
//                                     danger
//                                     onClick={() => removeItem(item.productId)}
//                                 >
//                                     Remove
//                                 </Button>
//                             </div>
//                         </div>
//                     ))}
//                     <div style={{marginTop: '24px', display: 'flex', justifyContent: 'space-between'}}>
//                         <Button type="default" onClick={clearCart}>
//                             Clear Cart
//                         </Button>
//                         <Button type="primary" onClick={placeOrder}>
//                             Place Order
//                         </Button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };
//
// export default Cart;
import React from 'react';
import { Button, Input, message, Divider } from 'antd';
import {
    ShoppingCartOutlined,
    DeleteOutlined,
    PlusOutlined,
    MinusOutlined
} from '@ant-design/icons';
import { useCart } from '../CartContext';

interface CartProps {
    closeCartDrawer: () => void;  // Add closeCartDrawer as a prop type
}

const Cart: React.FC<CartProps> = ({ closeCartDrawer }) => {
    const {items, removeItem, updateQuantity} = useCart();

    const placeOrder = () => {
        if (items.length === 0) {
            message.warning('Your cart is empty. Add items before placing an order.');
            return;
        }

        console.log('Order placed:', items);
        message.success('Order placed successfully!');
        items.forEach((item) => removeItem(item.productId));
        closeCartDrawer();
    };

    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="bg-white rounded-2xl overflow-hidden max-w-md mx-auto" >

            {items.length === 0 ? (
                <div className="text-center py-16 px-4">
                    <ShoppingCartOutlined className="text-7xl text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Explore our products and add some items</p>
                </div>
            ) : (
                <div >
                    {/* Cart Items */}
                    <div className="space-y-4">
                        {items.map((item) => (
                            <>
                            <div
                                key={item.productId}
                                className="flex items-center justify-between bg-gray-50  rounded-lg  mb-4 "
                            >
                                <div className="flex-grow">
                                    <h6 className="font-semibold text-gray-800 mb-1">
                                        {item.productName}
                                    </h6>
                                    <p className="text-gray-600 text-sm">
                                        {new Intl.NumberFormat("en-LK", {
                                            style: "currency",
                                            currency: "LKR"
                                        }).format(item.price)}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-3">
                                        <Button
                                            type="text"
                                            icon={<MinusOutlined/>}
                                            className="px-2"
                                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                        />
                                        <span className="px-3 text-sm">{item.quantity}</span>
                                        <Button
                                            type="text"
                                            icon={<PlusOutlined/>}
                                            className="px-2"
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        />

                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined/>}
                                        onClick={() => removeItem(item.productId)}
                                        className="ml-2"
                                        style={{marginLeft:"50%"}}
                                    />
                                </div>
                            </div>
                            <Divider/>
                            </>
                        ))}
                    </div>

                    {/* Order Summary */}
                    {/*<Divider/>*/}
                    <div className="flex justify-between items-center ">
                        <div>
                            <p className="text-gray-600">Total Items: {items.length}</p>
                            <h3 className="font-bold text-xl text-gray-800">
                                {new Intl.NumberFormat("en-LK", {
                                    style: "currency",
                                    currency: "LKR"
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
