# DeshCity API & Database Schema

## Entities

### User (Admin)
- id (string)
- email (string)
- password (string, hashed)

### Category
- id (string)
- name_en (string)
- name_bn (string)
- slug (string)
- image (string)

### Product
- id (string)
- name_en (string)
- name_bn (string)
- description_en (text)
- description_bn (text)
- price (number)
- sale_price (number, optional)
- category_id (string)
- stock_status (string: 'in_stock' | 'out_of_stock')
- image_url (string)
- gallery (json array of strings)
- variants (json array of {size, color})
- reviews (json array)
- is_featured (boolean)
- is_best_seller (boolean)
- is_flash_sale (boolean)

### Order
- id (string)
- full_name (string)
- mobile_number (string)
- full_address (string)
- area_city (string)
- order_note (text, optional)
- items (json array of {product_id, quantity, price, variant})
- total_amount (number)
- status (string: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled')
- created_at (timestamp)

### Banner
- id (string)
- title (string)
- image_url (string)
- link (string)

### Review
- id (string)
- product_id (string)
- customer_name (string)
- rating (number)
- comment (text)
- created_at (timestamp)
