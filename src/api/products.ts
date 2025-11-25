import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { Product, NewProduct } from '../types/product';


export const fetchProducts = async (): Promise<Product[]> => {
    try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
} catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
}
}

export const fetchProductById = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch product with id ${id}:`, error);
        throw error;
    }
};

export const createProduct = async (product: NewProduct): Promise<Product> => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to create product:", error);
        throw error;
    }
};