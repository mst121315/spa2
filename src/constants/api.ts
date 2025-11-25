// API базовый URL для fakestoreapi.com
export const API_BASE_URL = 'https://fakestoreapi.com';

// Endpoints для работы с продуктами
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
} as const;
