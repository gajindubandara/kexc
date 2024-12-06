import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Typography, Space, Tooltip, Skeleton } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from "../../types/ProductInterfaces";

const { Meta } = Card;
const { Text } = Typography;

interface ProductCardProps {
    product: Product;
    onCardClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onCardClick }) => {
    const isStockEmpty = !product.details || product.details.length === 0 || product.details.every(detail => detail.total === 0);

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

    return (
        <div className="col" key={product.productId} data-aos="fade-up">
            <Badge.Ribbon
                text={product.exclusive ? "Exclusive" : product.offers ? "Offer" : ""}
                color={product.exclusive ? "blue" : product.offers ? "red" : ""}
                placement="start"
                style={{
                    display: product.exclusive || product.offers ? 'block' : 'none',
                    zIndex: 10,
                }}
            >
                <Card
                    hoverable
                    onClick={() => onCardClick(product)}
                    style={{ minHeight: '440px' }}
                    cover={
                        <div
                            style={{
                                height: '300px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                alt={product.productName}
                                src={product.img}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectPosition: 'center',
                                }}
                            />
                            {product.details.length >= 1
                                ? <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<ShoppingCartOutlined />}
                                    style={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        zIndex: 5,
                                        background: 'black',
                                    }}
                                />
                                : null}
                        </div>
                    }
                >
                    <Meta
                        title={product.productName}
                        description={
                            <>
                                {product.offers ? (
                                    <>
                                        <Text
                                            strong
                                            delete
                                            type="secondary"
                                            style={{ marginRight: '8px' }}
                                        >
                                            {new Intl.NumberFormat('en-LK', {
                                                style: 'currency',
                                                currency: 'LKR',
                                            }).format(product.price)}
                                        </Text>
                                        <Text strong type="danger">
                                            {new Intl.NumberFormat('en-LK', {
                                                style: 'currency',
                                                currency: 'LKR',
                                            }).format(product.disPrice)}
                                        </Text>
                                    </>
                                ) : (
                                    <Text strong type="secondary">
                                        {new Intl.NumberFormat('en-LK', {
                                            style: 'currency',
                                            currency: 'LKR',
                                        }).format(product.price)}
                                    </Text>
                                )}
                                <br />
                                <Text type="secondary" ellipsis>
                                    {product.description}
                                </Text>
                                <br />
                                {!isStockEmpty
                                    ? (
                                        <Space>
                                            {product.details.map((detail) => (
                                                <Tooltip title={detail.color} key={detail.color}>
                                                    <div
                                                        style={{
                                                            backgroundColor: COLOR_MAP[detail.color] || detail.color,
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: '50%',
                                                            display: 'inline-block',
                                                            border: 'gray 1px solid'
                                                        }}
                                                    />
                                                </Tooltip>
                                            ))}
                                        </Space>
                                    ) : (
                                        <Text type="danger">
                                            <strong>Out of Stock</strong>
                                        </Text>
                                    )
                                }
                            </>
                        }
                    />
                </Card>
            </Badge.Ribbon>
        </div>
    );
};

export default ProductCard;
