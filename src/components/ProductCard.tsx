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
      <Card className="group overflow-hidden hover-professional professional-shadow border-border/50 bg-card animate-fade-in">
        <div className="relative aspect-square overflow-hidden bg-secondary/10">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
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

        <div className="p-6">
          <h3 className="font-semibold text-lg mb-3 line-clamp-1 group-hover:text-primary transition-colors duration-300 tracking-tight">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary tracking-tight">${price.toFixed(2)}</span>
            <Button
              size="sm"
              variant="hero"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
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
