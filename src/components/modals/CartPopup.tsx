import React, { useState } from 'react';
import {
    Modal,
    List,
    Typography,
    Button,
    Space,
    InputNumber,
    Popconfirm,
    Empty,
    Tag,
    message
} from 'antd';
import {
    ShoppingCartOutlined,
    DeleteOutlined,
    ClearOutlined
} from '@ant-design/icons';
import {useCart} from "../cart/CartContext";
import OrderConfirmationPopup from "./OrderConfirmationPopup";

const { Title, Text } = Typography;

interface CartProps {
    visible: boolean;
    onClose: () => void;
}

const CartPopup: React.FC<CartProps> = ({ onClose, visible }) => {
    const { items, removeItem, updateQuantity } = useCart();
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);

    const totalPrice = items.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
    );

    const placeOrder = () => {
        if (items.length === 0) {
            Modal.warning({
                title: 'Cart is Empty',
                content: 'Please add items to your cart before placing an order.',
            });
            return;
        }

        setIsOrderModalVisible(true);
    };

    const handleClearCart = () => {
        items.forEach((item) => removeItem(item.product.productId, item.selectedSize, item.selectedColor));
        message.success('Cart has been cleared');
        onClose();
    };

    const handleOrderConfirmation = (orderDetails: any) => {
        console.log('Order Details:', orderDetails);
        items.forEach((item) => removeItem(item.product.productId, item.selectedSize, item.selectedColor));
        onClose();
    };

    return (
        <>
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ShoppingCartOutlined style={{ marginRight: 10, color: '#000000' }} />
                            <Title level={4} style={{ margin: 0 }}>Your Cart</Title>
                        </div>
                        {items.length > 0 && (
                            <Button
                                style={{marginRight:"10px"}}
                                type="text"
                                danger
                                icon={<ClearOutlined />}
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </Button>
                        )}
                    </div>
                }
                open={visible}
                onCancel={onClose}
                footer={[
                    <Button key="back" onClick={onClose} className="cancel-button">
                        Continue Shopping
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        className="custom-primary-button"
                        onClick={placeOrder}
                        disabled={items.length === 0}
                    >
                        Proceed to Checkout
                    </Button>,

                ]}
                width={600}
            >
                {items.length === 0 ? (
                    <Empty
                        image={<ShoppingCartOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />}
                        description={
                            <span style={{ color: '#8c8c8c' }}>
                                Your cart is empty
                            </span>
                        }
                    />
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Space>
                                        <InputNumber
                                            size="small"
                                            min={1}
                                            value={item.quantity}
                                            onChange={(value) =>
                                                updateQuantity(
                                                    item.product.productId,
                                                    value || 1
                                                )
                                            }
                                            style={{ width: 70 }}
                                        />
                                            <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => removeItem(item.product.productId, item.selectedSize, item.selectedColor)}
                                            />
                                    </Space>
                                ]}
                            >
                                <List.Item.Meta
                                    title={
                                        <div>
                                            {item.product.productName}
                                            <Space style={{ marginLeft: 10 }}>
                                                <Tag color="default">{item.selectedSize}</Tag>
                                                <Tag color="default">{item.selectedColor}</Tag>
                                            </Space>
                                        </div>
                                    }
                                    description={
                                        <Text strong>
                                            {new Intl.NumberFormat('en-LK', {
                                                style: 'currency',
                                                currency: 'LKR'
                                            }).format(item.product.price)}
                                        </Text>
                                    }
                                />
                                <div>
                                    <Text strong>
                                        {new Intl.NumberFormat('en-LK', {
                                            style: 'currency',
                                            currency: 'LKR'
                                        }).format(item.product.price * item.quantity)}
                                    </Text>
                                </div>
                            </List.Item>
                        )}
                    />
                )}

                {items.length > 0 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        padding: '10px 0',
                        borderTop: '1px solid #f0f0f0'
                    }}>
                        <div>
                            <Text>Total Items: {items.length}</Text>
                        </div>
                        <div>
                            <Title level={4} style={{ margin: 0 }}>
                                Total: {new Intl.NumberFormat('en-LK', {
                                style: 'currency',
                                currency: 'LKR'
                            }).format(totalPrice)}
                            </Title>
                        </div>
                    </div>
                )}
            </Modal>

            <OrderConfirmationPopup
                visible={isOrderModalVisible}
                onClose={() => setIsOrderModalVisible(false)}
                onConfirm={handleOrderConfirmation}
            />
        </>
    );
};

export default CartPopup;
// import React, {useState} from 'react';
// import {Button, message, Divider, notification, Modal} from 'antd';
// import {
//     ShoppingCartOutlined,
//     DeleteOutlined,
//     PlusOutlined,
//     MinusOutlined
// } from '@ant-design/icons';
// import {useCart} from '../cart/CartContext';
// import OrderConfirmationPopup from "./OrderConfirmationPopup";
//
// interface CartProps {
//     visible: boolean;
//     onClose: () => void;
//     onConfirm: (orderDetails: any) => void;
// }
//
// const CartPopup: React.FC<CartProps> = ({onClose, onConfirm, visible}) => {
//     const {items, removeItem, updateQuantity} = useCart();
//     const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
//     const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
//
//     const placeOrder = () => {
//         if (items.length === 0) {
//             notification.warning({
//                 message: 'Cart is Empty',
//                 description: 'Your cart is empty. Add items before placing an order.',
//                 placement: 'topRight', // You can change placement to other positions like 'topLeft', 'bottomRight', etc.
//             });
//             return;
//         }
//
//         setIsOrderModalVisible(true);
//         // notification.success({
//         //     message: 'Order Placed Successfully',
//         //     description: 'Your order has been placed successfully.',
//         //     placement: 'topRight',
//         // });
//
//         // Remove items from cart
//         // items.forEach((item) => removeItem(item.product.productId, item.selectedSize, item.selectedColor));
//         onClose();
//     };
//
//     const totalPrice = items.reduce(
//         (total, item) => total + (item.product.price * item.quantity),
//         0
//     );
//
//     const handleOrderConfirmation = (orderDetails: any) => {
//         // Process the order (you can add more logic here)
//         console.log('Order Details:', orderDetails);
//
//         // Clear cart and close drawer
//         items.forEach((item) => removeItem(item.product.productId, item.selectedSize, item.selectedColor));
//         onClose();
//     };
//
//     return (
//         <>
//             <Modal
//                 title="Your Cart"
//                 open={visible}
//                 onCancel={onClose}
//                 footer={[
//                     <Button key="back" onClick={onClose} className="cancel-button">
//                         Cancel
//                     </Button>,
//                     <Button
//                         key="submit"
//                         type="primary"
//                         className="custom-primary-button"
//                         onClick={placeOrder}
//                     >
//                         Continue
//                     </Button>
//                 ]}
//                 width={600}
//             >
//                 <div className="bg-white rounded-2xl overflow-hidden max-w-md mx-auto">
//                     {items.length === 0 ? (
//                         <div className="text-center py-16 px-4">
//                             <ShoppingCartOutlined className="text-7xl text-gray-300 mb-4"/>
//                             <p className="text-gray-500 text-lg">Your cart is empty</p>
//                             <p className="text-gray-400 text-sm">Explore our products and add some items</p>
//                         </div>
//                     ) : (
//                         <div>
//                             {/* Cart Items */}
//                             <div className="space-y-4">
//                                 {items.map((item) => (
//                                     <>
//                                         <div
//                                             key={item.product.productId}
//                                             className="flex items-center justify-between bg-gray-50 rounded-lg mb-4"
//                                         >
//                                             <div className="flex-grow">
//                                                 <h6 className="font-semibold text-gray-800 mb-1">
//                                                     {item.product.productName} ( {item.selectedSize} - {item.selectedColor})
//                                                 </h6>
//                                                 <p className="text-gray-600 text-sm">
//                                                     {new Intl.NumberFormat('en-LK', {
//                                                         style: 'currency',
//                                                         currency: 'LKR'
//                                                     }).format(item.product.price)}
//                                                 </p>
//                                                 {/*<p className="text-gray-600 text-sm">*/}
//                                                 {/*    Size: {item.selectedSize}, Color: {item.selectedColor}*/}
//                                                 {/*</p>*/}
//                                             </div>
//
//                                             <div className="flex items-center space-x-3">
//                                                 <Button
//                                                     type="text"
//                                                     icon={<MinusOutlined/>}
//                                                     className="px-2"
//                                                     onClick={() =>
//                                                         updateQuantity(item.product.productId, Math.max(1, item.quantity - 1))
//                                                     }
//                                                 />
//                                                 <span className="px-3 text-sm">{item.quantity}</span>
//                                                 <Button
//                                                     type="text"
//                                                     icon={<PlusOutlined/>}
//                                                     className="px-2"
//                                                     onClick={() => updateQuantity(item.product.productId, item.quantity + 1)}
//                                                 />
//
//                                                 <Button
//                                                     type="text"
//                                                     danger
//                                                     style={{marginLeft: "50%"}}
//                                                     icon={<DeleteOutlined/>}
//                                                     onClick={() => removeItem(item.product.productId, item.selectedSize, item.selectedColor)}
//                                                     className="ml-2"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <Divider/>
//                                     </>
//                                 ))}
//                             </div>
//
//                             {/* Order Summary */}
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-gray-600">Total Items: {items.length}</p>
//                                     <h3 className="font-bold text-xl text-gray-800">
//                                         {new Intl.NumberFormat('en-LK', {
//                                             style: 'currency',
//                                             currency: 'LKR'
//                                         }).format(totalPrice)}
//                                     </h3>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </Modal>
//
//             <OrderConfirmationPopup
//                 visible={isOrderModalVisible}
//                 onClose={() => setIsOrderModalVisible(false)}
//                 onConfirm={handleOrderConfirmation}
//             />
//         </>
//     );
// };
//
// export default CartPopup;
