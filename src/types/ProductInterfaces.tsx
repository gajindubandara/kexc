export interface SizeDetails {
    S: number;
    M: number;
    L: number;
    XL: number;
}

export interface InventoryDetail {
    color: string;
    sizes: SizeDetails;
    total:number;
}

export interface Product {
    productId: string;
    productName: string;
    category: string;
    description: string;
    price: number;
    discount: number;
    disPrice: number;
    img:string;
    exclusive:boolean;
    offers:boolean;
    details: InventoryDetail[];
}