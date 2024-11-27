import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.productId === item.productId);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prevItems, item];
        });
    };

    const removeItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.productId !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === id ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
