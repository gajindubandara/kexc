import React, {useEffect, useState} from 'react';
import {
    Modal,
    Row,
    Col,
    Typography,
    Badge,
    Button,
    Space,
    Tag,
    Radio,
    Alert,
    Tooltip,
    message,
    InputNumber
} from 'antd';
import {ShoppingCartOutlined, StarFilled, TagOutlined} from '@ant-design/icons';
import {useCart} from "../../context/CartContext";
import {Product} from "../../types/ProductInterfaces";
import {COLOR_MAP} from "../../utils/constants"; // Import your Product interface

const {Title, Text, Paragraph} = Typography;

interface ProductDetailsPopupProps {
    product: Product;
    visible: boolean;
    onClose: () => void;
}


const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({product, visible, onClose}) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<any>({});
    const {addItem} = useCart();
    const isStockEmpty = !product.details || product.details.length === 0 || product.details.every(detail => detail.total === 0);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        // Set initial selected color and size
        if (product.details.length > 0) {
            setSelectedColor(product.details[0].color);
            setSelectedSizes(product.details[0].sizes);
            setSelectedSize('S'); // Set default size to 'S'
        }
    }, [product.details]);

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
            quantity: quantity,
        };

        addItem(cartItem); // Add the item to the context
        onClose(); // Close the popup or modal
        message.success('Item added to your context!'); // Show a success message
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        const colorDetails = product.details.find((detail) => detail.color === color);
        if (colorDetails) {
            setSelectedSizes(colorDetails.sizes);
            setSelectedSize('S'); // Reset to default size on color change
        }
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
        setQuantity(1); // Reset quantity when size changes
    };

    const maxQuantity = selectedColor && selectedSize
        ? selectedSizes[selectedSize]
        : 0;

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            width={800}
            footer={[
                <Button key="back" onClick={onClose} className="cancel-button">
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor}
                    className="custom-primary-button"
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
                        {!isStockEmpty ? (
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
                                        onChange={(e) => handleSizeChange(e.target.value)}
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

                                {/* Quantity Selector */}
                                <div style={{marginTop: 16}}>
                                    <Text strong>Quantity: </Text>
                                    <InputNumber
                                        min={1}
                                        max={maxQuantity}
                                        value={quantity}
                                        onChange={(value) => setQuantity(value || 1)}
                                        style={{width: 100}}
                                    />
                                    <Text type="secondary" style={{marginLeft: 8}}>
                                        {maxQuantity} available in stock
                                    </Text>
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
                    </Space>
                </Col>
            </Row>
        </Modal>
    );
};

export default ProductDetailsPopup;
