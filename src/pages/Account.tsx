import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Heart, Settings } from "lucide-react";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const Account = () => {
  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-11-05",
      total: 749.98,
      status: "Delivered",
      items: [products[0], products[1]],
    },
    {
      id: "ORD-002",
      date: "2024-10-28",
      total: 1299.99,
      status: "In Transit",
      items: [products[2]],
    },
  ];

  const wishlist = [products[3], products[4], products[5]];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Account</span>
          </h1>
          <p className="text-xl text-muted-foreground">Manage your profile and orders</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 py-3">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2 py-3">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 py-3">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profileFirstName">First Name</Label>
                  <Input id="profileFirstName" defaultValue="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="profileLastName">Last Name</Label>
                  <Input id="profileLastName" defaultValue="Doe" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="profileEmail">Email</Label>
                  <Input id="profileEmail" type="email" defaultValue="john@example.com" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="profilePhone">Phone</Label>
                  <Input id="profilePhone" defaultValue="+1 234 567 8900" className="mt-1" />
                </div>
              </div>
              <Button className="mt-6" variant="hero">
                Save Changes
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Main Street" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="New York" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" defaultValue="10001" className="mt-1" />
                </div>
              </div>
              <Button className="mt-6" variant="hero">
                Update Address
              </Button>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            {orderHistory.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Order {order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg bg-secondary/20"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                  <span className="text-lg font-bold">Total: ${order.total.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <Button variant="outline">Track Order</Button>
                    <Button variant="hero">Reorder</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <Card key={product.id} className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg mb-4 bg-secondary/20"
                    />
                  </Link>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button variant="hero" className="flex-1">
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-1" />
                </div>
              </div>
              <Button className="mt-6" variant="hero">
                Update Password
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-muted-foreground">Get notified about sales and offers</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
