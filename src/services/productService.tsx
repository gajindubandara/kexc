import {Product} from "../types/ProductInterfaces";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyrZ-w6FDvVv7g5CUof8qI_wpJmagaO23A_HRj-qY13QB8qRCZQkOq1zlZlEthP8w_3/exec'
        );
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message); // Handle error
    }
};