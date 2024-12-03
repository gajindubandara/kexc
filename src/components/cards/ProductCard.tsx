import React from 'react';
import {Card, Button, Badge, Typography} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {Product} from "../../types/ProductInterfaces";

const {Meta} = Card;
const {Text} = Typography;

interface ProductCardProps {
    product: Product;
    onCardClick: (product: Product) => void; // Added prop to handle card click
}

const ProductCard: React.FC<ProductCardProps> = ({product, onCardClick}) => {
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
                {/*{product.details && product.details.length === 0 && (*/}
                {/*    <Badge.Ribbon*/}
                {/*        placement="end"*/}
                {/*        style={{*/}
                {/*            zIndex: 10,*/}
                {/*        }}*/}
                {/*        color="red"*/}
                {/*        text="Out of Stock"*/}
                {/*    />*/}
                {/*)}*/}

                <Card
                    hoverable
                    onClick={() => onCardClick(product)} // Trigger onCardClick when the card is clicked
                    style={{minHeight: '440px'}} // Ensure the card has a minimum height
                    cover={
                        <div
                            style={{
                                height: '300px', // Fixed height for the image section
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
                                    objectPosition: 'center', // Centers the image within the container
                                }}
                            />
                            {product.details.length >= 1
                                ? <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<ShoppingCartOutlined/>}
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
                                            style={{marginRight: '8px'}}
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
                                <br/>

                                <Text type={product.details?.length > 0 ? "secondary" : "danger"} strong={product.details?.length === 0}>
                                    {product.details?.length > 0
                                        ? `${product.details.length} ${product.details.length > 1 ? "Colors" : "Color"}`
                                        : "Out of Stock"
                                    }
                                </Text>
                                <br/>
                                <Text type="secondary" ellipsis>
                                    {product.description}
                                </Text>

                                {/*{product.details && product.details.length > 0 ? (*/}
                                {/*    <>*/}

                                {/*        <Text type="secondary">*/}
                                {/*            {product.details.length > 1*/}
                                {/*                ? `${product.details.length} Colors`*/}
                                {/*                : `${product.details.length} Color`}*/}
                                {/*        </Text>*/}
                                {/*        <br/>*/}
                                {/*        <Text type="secondary" ellipsis>*/}
                                {/*            {product.description}*/}
                                {/*        </Text>*/}
                                {/*    </>*/}
                                {/*) : (*/}
                                {/*    <>*/}
                                {/*        <Text type="danger" strong>*/}
                                {/*            Out of Stock*/}
                                {/*        </Text>*/}
                                {/*        <br/>*/}
                                {/*        <Text type="secondary" ellipsis>*/}
                                {/*            {product.description}*/}
                                {/*        </Text>*/}
                                {/*    </>*/}
                                {/*)}*/}

                            </>
                        }
                    />
                </Card>

            </Badge.Ribbon>
        </div>
    );
};

export default ProductCard;