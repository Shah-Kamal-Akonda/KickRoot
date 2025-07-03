export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  images: string[]; // Changed to support multiple images
  description: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  products: Product[];
}


export interface CartItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
}