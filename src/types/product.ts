// Тип данных для продукта из API fakestoreapi.com
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Расширенный тип для продукта с дополнительными полями
export interface ProductWithMeta extends Product {
  liked: boolean;
}

export interface NewProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ProductFilter = 'all' | 'favorites';
