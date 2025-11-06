export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Advanced noise cancellation and 30-hour battery life.",
    image: "/src/assets/product-headphones.png",
    category: "Electronics",
    rating: 4.8,
    reviews: 245,
    inStock: true,
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Premium sound quality",
    ],
  },
  {
    id: "2",
    name: "Luxury Smart Watch",
    price: 449.99,
    description: "Stay connected in style with our luxury smart watch. Track your fitness, receive notifications, and more.",
    image: "/src/assets/product-watch.png",
    category: "Electronics",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant",
      "5-day battery life",
    ],
  },
  {
    id: "3",
    name: "Ultra Portable Laptop",
    price: 1299.99,
    description: "Power meets portability. Our ultra-thin laptop delivers exceptional performance wherever you go.",
    image: "/src/assets/product-laptop.png",
    category: "Electronics",
    rating: 4.9,
    reviews: 412,
    inStock: true,
    features: [
      "Intel i7 processor",
      "16GB RAM",
      "512GB SSD",
      "14-inch display",
    ],
  },
  {
    id: "4",
    name: "Modern Smartphone",
    price: 899.99,
    description: "Capture life's moments with our flagship smartphone. Advanced camera system and all-day battery.",
    image: "/src/assets/product-phone.png",
    category: "Electronics",
    rating: 4.6,
    reviews: 567,
    inStock: true,
    features: [
      "Triple camera system",
      "5G connectivity",
      "6.5-inch OLED display",
      "Fast charging",
    ],
  },
  {
    id: "5",
    name: "Designer Sunglasses",
    price: 199.99,
    description: "Make a statement with our designer sunglasses. UV protection meets timeless style.",
    image: "/src/assets/product-sunglasses.png",
    category: "Accessories",
    rating: 4.5,
    reviews: 123,
    inStock: true,
    features: [
      "UV400 protection",
      "Polarized lenses",
      "Lightweight frame",
      "Premium materials",
    ],
  },
  {
    id: "6",
    name: "Professional Camera",
    price: 1899.99,
    description: "Capture stunning photos and videos with our professional-grade camera. Perfect for content creators.",
    image: "/src/assets/product-camera.png",
    category: "Electronics",
    rating: 4.9,
    reviews: 298,
    inStock: true,
    features: [
      "4K video recording",
      "24MP sensor",
      "Interchangeable lenses",
      "Weather sealed",
    ],
  },
];
