export interface Category {
  id: string;
  name_en: string;
  name_bn: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  name_en: string;
  name_bn: string;
  description_en: string;
  description_bn: string;
  price: number;
  sale_price?: number;
  category_id: string;
  stock_status: 'in_stock' | 'out_of_stock';
  image_url: string;
  gallery: string[];
  variants: { size?: string; color?: string }[];
  is_featured: boolean;
  is_best_seller: boolean;
  is_flash_sale: boolean;
}

export interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  variant?: { size?: string; color?: string };
}

export interface Order {
  id: string;
  full_name: string;
  mobile_number: string;
  full_address: string;
  area_city: string;
  order_note?: string;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export type Language = 'en' | 'bn';
