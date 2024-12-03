import React, {useEffect, useState} from 'react';
import {Modal, Row, Col, Typography, Badge, Button, Space, Tag, Radio, Alert, Tooltip, message} from 'antd';
import {ShoppingCartOutlined, StarFilled, TagOutlined} from '@ant-design/icons';
import {useCart} from "../cart/CartContext";
import {Product} from "../../types/ProductInterfaces"; // Import your Product interface

const {Title, Text, Paragraph} = Typography;

interface ProductDetailsPopupProps {
    product: Product;
    visible: boolean;
    onClose: () => void;
}

const COLOR_MAP: { [key: string]: string } = {
    'Floral': '#FFD700',
    'Green': '#2ecc71',
    'Blue': '#3498db',
    'Red': '#e74c3c',
    'Black': '#000000',
    'White': '#ffffff',
    'Gray': '#95a5a6',
    'Pink': '#ff69b4',
    'Purple': '#9b59b6'
};

const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({product, visible, onClose}) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<any>({});
    const {addItem} = useCart();

    useEffect(() => {
        // Set initial selected color and size
        if (product.details.length > 0) {
            setSelectedColor(product.details[0].color);
            setSelectedSizes(product.details[0].sizes);
            setSelectedSize('S'); // Set default size to 'S'
        }
    }, [product.details]);

    const cartItem = {
        product: product,
        selectedSize: selectedSize,
        selectedColor: selectedColor
    };

    const handleAddToCart = () => {
        const finalSize = selectedSize || 'none';
        const finalColor = selectedColor || 'none';

        // Determine the price to use based on whether the product has an offer
        const finalPrice = product.offers ? product.disPrice : product.price;

        const cartItem = {
            product: {
                ...product,
                price: finalPrice, // Update the price dynamically
            },
            selectedSize: finalSize,
            selectedColor: finalColor,
            quantity: 1,
        };

        addItem(cartItem); // Add the item to the cart
        onClose(); // Close the popup or modal
        message.success('Item added to your cart!'); // Show a success message
    };

    // const handleAddToCart = () => {
    //     addItem({ ...cartItem, quantity: 1 });
    //     onClose();
    //     message.success('Item added to your cart!');
    // };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        const colorDetails = product.details.find((detail) => detail.color === color);
        if (colorDetails) {
            setSelectedSizes(colorDetails.sizes);
            setSelectedSize('S'); // Reset to default size on color change
        }
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            width={800}
            footer={[
                <Button key="back" onClick={onClose}>Cancel</Button>,
                <Button
                    key="submit"
                    type="primary"
                    icon={<ShoppingCartOutlined/>}
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor}
                >
                    Add to Cart
                </Button>
            ]}
        >
            <Row gutter={[16, 16]}>
                {/* Product Image Column */}
                <Col xs={24} sm={24} md={10}>
                    <div style={{
                        position: 'relative',
                        height: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px'
                    }}>
                        <img
                            src={product.img}
                            alt={product.productName}
                            style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </Col>

                {/* Product Details Column */}
                <Col xs={24} sm={24} md={14}>
                    <Space direction="vertical" size="middle" style={{width: '100%'}}>
                        {/* Product Name and Category */}
                        <div>
                            <Title level={3} style={{marginBottom: 0}}>
                                {product.productName}
                            </Title>
                            <Text type="secondary">{product.category}</Text>
                        </div>

                        {/* Pricing */}
                        <div>
                            <Space>
                                <Title level={4} type="danger" style={{marginBottom: 0}}>
                                    {new Intl.NumberFormat("en-LK", {
                                        style: "currency",
                                        currency: "LKR"
                                    }).format(product.disPrice)}
                                </Title>
                                {product.discount > 0 && (
                                    <>
                                        <Text delete>
                                            {new Intl.NumberFormat("en-LK", {
                                                style: "currency",
                                                currency: "LKR"
                                            }).format(product.price)}
                                        </Text>
                                        <Tag color="green">{product.discount}% OFF</Tag>
                                    </>
                                )}
                            </Space>
                        </div>

                        {/* Description */}
                        <Paragraph>{product.description}</Paragraph>


                        {/* Selection Alert */}
                        {product.details && product.details.length > 0 ? (
                            <>
                                {/* Color Selection */}
                                <div>
                                    <Text strong>Color: </Text>
                                    <Space>
                                        {product.details.map((detail) => (
                                            <Tooltip title={detail.color} key={detail.color}>
                                                <Button
                                                    shape="circle"
                                                    style={{
                                                        backgroundColor: COLOR_MAP[detail.color] || detail.color,
                                                        border: selectedColor === detail.color
                                                            ? '3px solid #1890ff'
                                                            : '1px solid #d9d9d9',
                                                        width: 30,
                                                        height: 30
                                                    }}
                                                    onClick={() => handleColorChange(detail.color)}
                                                />
                                            </Tooltip>
                                        ))}
                                    </Space>
                                </div>

                                {/* Size Selection */}
                                <div>
                                    <Text strong>Size: </Text>
                                    <Radio.Group
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        value={selectedSize}
                                    >
                                        {Object.keys(selectedSizes).map((size) => (
                                            <Radio.Button
                                                key={size}
                                                value={size}
                                                disabled={selectedSizes[size] === 0}
                                            >
                                                {size} ({selectedSizes[size]})
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </div>


                                {(!selectedSize || !selectedColor) && (
                                    <Alert
                                        message="Please select both size and color before adding to cart"
                                        type="warning"
                                        showIcon
                                    />
                                )}

                                <Space>
                                    {product.offers && (
                                        <Tag icon={<TagOutlined/>} color="red">
                                            Special Offers Available
                                        </Tag>
                                    )}
                                    {product.exclusive && (
                                        <Tag icon={<TagOutlined/>} color="blue">
                                            Exclusive
                                        </Tag>
                                    )}
                                    <Tag icon={<StarFilled/>} color="gold">
                                        {product.category}
                                    </Tag>
                                </Space>


                            </>
                        ) : (
                            <Text type="danger" strong>
                                Out of Stock
                            </Text>
                        )}


                        {/* Additional Product Information */}
                        {/*<Space>*/}
                        {/*    {product.offers && (*/}
                        {/*        <Tag icon={<TagOutlined />} color="red">*/}
                        {/*            Special Offers Available*/}
                        {/*        </Tag>*/}
                        {/*    )}*/}
                        {/*    {product.exclusive && (*/}
                        {/*        <Tag icon={<TagOutlined />} color="blue">*/}
                        {/*            Exclusive*/}
                        {/*        </Tag>*/}
                        {/*    )}*/}
                        {/*    <Tag icon={<StarFilled />} color="gold">*/}
                        {/*        {product.category}*/}
                        {/*    </Tag>*/}
                        {/*</Space>*/}
                    </Space>
                </Col>
            </Row>
        </Modal>
    );
};

export default ProductDetailsPopup;
