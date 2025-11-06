import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface CartItem {
  productId: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", quantity: 2 },
    { productId: "2", quantity: 1 },
    { productId: "5", quantity: 1 },
  ]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId));
    toast.success("Item removed from cart");
  };

  const cartProducts = cartItems.map((item) => ({
    ...products.find((p) => p.id === item.productId)!,
    quantity: item.quantity,
  }));

  const subtotal = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 29.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start shopping to add items to your cart
          </p>
          <Link to="/shop">
            <Button size="lg" variant="hero">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shopping <span className="text-gradient">Cart</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-xl animate-fade-in hover-lift"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg bg-secondary/20"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                  <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>

                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-card border border-border rounded-xl space-y-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <div className="p-3 bg-accent/10 text-accent-foreground rounded-lg text-sm">
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <div className="space-y-3 pt-4">
                <Input placeholder="Promo code" />
                <Button variant="outline" className="w-full">
                  Apply Code
                </Button>
              </div>

              <Link to="/checkout" className="block">
                <Button size="lg" variant="hero" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/shop" className="block">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
