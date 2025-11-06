import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Product3DViewer } from "@/components/Product3DViewer";
import { products } from "@/data/products";
import { Star, ShoppingCart, Heart, Minus, Plus, ArrowLeft, Rotate3D } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [view3D, setView3D] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button variant="hero">Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  // For demo, we'll use the same image multiple times
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images / 3D Viewer */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/20 border border-border relative">
              {view3D ? (
                <Product3DViewer imageUrl={product.image} productName={product.name} />
              ) : (
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              <Button
                variant="glass"
                size="lg"
                className="absolute top-4 right-4"
                onClick={() => setView3D(!view3D)}
              >
                <Rotate3D className="h-5 w-5 mr-2" />
                {view3D ? "2D View" : "3D View"}
              </Button>
            </div>
            {!view3D && (
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-primary scale-95"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="animate-fade-in animation-delay-200">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
            
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {product.category}
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-5xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-sm text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            <p className="text-muted-foreground text-lg mb-8">{product.description}</p>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                variant="hero"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleWishlist}
                className={isWishlisted ? "border-accent text-accent" : ""}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/20 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Free</div>
                <div className="text-xs text-muted-foreground">Shipping</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-2xl font-bold text-primary mb-1">30</div>
                <div className="text-xs text-muted-foreground">Day Returns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-border pt-20">
          <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20 mb-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <span className="text-xl font-bold text-primary">
                    ${relatedProduct.price.toFixed(2)}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
