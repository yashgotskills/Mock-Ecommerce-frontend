import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success("Added to cart!");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden hover-lift border-border bg-card animate-fade-in">
        <div className="relative aspect-square overflow-hidden bg-secondary/20">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <Button
              size="icon"
              variant="glass"
              className="h-9 w-9"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-accent" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="glass"
              className="h-9 w-9"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
            <Button
              size="sm"
              variant="hero"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
