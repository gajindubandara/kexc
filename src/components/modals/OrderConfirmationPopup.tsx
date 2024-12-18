import React, { useState } from 'react';
import {
    Modal,
    Form,
    Input,
    Button,
    Typography,
    Table,
    Space,
    notification
} from 'antd';
import {useCart} from "../context/CartContext";

const { Text, Title } = Typography;

interface OrderConfirmationPopup {
    visible: boolean;
    onClose: () => void;
    onConfirm: (orderDetails: any) => void;
}

const OrderConfirmationPopup: React.FC<OrderConfirmationPopup> = ({
                                                                           visible,
                                                                           onClose,
                                                                           onConfirm
                                                                       }) => {
    const { items } = useCart();
    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState(false);
    // Columns for context items table
    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (product: any, record: any) =>
                `${product?.productName || ''} (${record.selectedSize || ''} - ${record.selectedColor || ''})`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price (LKR)',
            dataIndex: 'product',
            key: 'price',
            render: (product: any, record: any) =>
                new Intl.NumberFormat('en-LK', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format((product?.price || 0) * record.quantity),
        },
    ];

    // Total price calculation
    const totalPrice = items.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
    );

    // Validation rules
    const validatePhoneNumber = (_: any, value: string) => {
        const phoneRegex = /^(?:0|94|\+94)?\d{9}$/;
        if (!value) {
            return Promise.reject(new Error('Phone number is required'));
        }
        if (!phoneRegex.test(value)) {
            return Promise.reject(new Error('Invalid phone number format. The number should start with 0, 94, or +94 and be followed by exactly 9 digits.'));
        }
        return Promise.resolve();
    };

    // Handle form validation
    // Handle form validation
    const handleFormValidation = () => {
        const hasErrors = form
            .getFieldsError()
            .some(({ errors }) => errors.length > 0);

        setIsFormValid(!hasErrors);
    };

    // Handle order confirmation
    const handleOrderConfirmation = () => {
        form.validateFields()
            .then(values => {
                // Combine form values with context items
                const orderDetails = {
                    ...values,
                    items: items,
                    totalPrice: totalPrice
                };

                // Close modal and trigger order confirmation
                onConfirm(orderDetails);
                onClose();

                // Show success notification
                notification.success({
                    message: 'Order Confirmed',
                    description: 'Your order has been successfully placed!'
                });
            })
            .catch(errorInfo => {
                console.log('Validation Failed:', errorInfo);
            });
    };

    return (
        <Modal
            title="Confirm Your Order"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose} className="cancel-button">
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    className="custom-primary-button"
                    disabled={!isFormValid}
                    onClick={handleOrderConfirmation}
                >
                    Confirm Order
                </Button>
            ]}
            width={600}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Order Summary */}
                <div>
                    <Title level={5}>Order Summary</Title>
                    <Table
                        columns={columns}
                        dataSource={items}
                        pagination={false}
                        rowKey={(record) => `${record.product.productId}-${record.selectedSize}-${record.selectedColor}`}
                        summary={() => (
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={2} index={0}>
                                    <Text strong>Total</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                    <Text strong>
                                        {new Intl.NumberFormat('en-LK', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(totalPrice)}
                                    </Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>

                        )}
                    />
                </div>

                {/* Order Details Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={() => handleFormValidation()}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your full name'
                            },
                            {
                                min: 2,
                                message: 'Name must be at least 2 characters long'
                            }
                        ]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            {
                                validator: validatePhoneNumber
                            }
                        ]}
                    >
                        <Input
                            placeholder="Enter your phone number"
                            addonBefore="+94"
                        />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Delivery Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your delivery address'
                            },
                            {
                                min: 10,
                                message: 'Address must be at least 10 characters long'
                            }
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Enter your full delivery address"
                        />
                    </Form.Item>
                </Form>
            </Space>
        </Modal>
    );
};

export default OrderConfirmationPopup;