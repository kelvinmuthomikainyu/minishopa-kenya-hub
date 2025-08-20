import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star, ShoppingCart } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Fresh Avocados",
      description: "Premium quality Hass avocados, perfectly ripe and ready to eat.",
      price: 150,
      originalPrice: 200,
      category: "Farm Produce",
      seller: "John Kamau",
      location: "Nairobi, Nairobi",
      image: "/uploads/avocados.jpg",
      rating: 4.8,
      reviews: 24,
      stock: 50,
      isFeatured: true,
      isOrganic: true
    },
    {
      id: 2,
      name: "Samsung Galaxy A14",
      description: "Latest Samsung smartphone with excellent camera and long battery life.",
      price: 18500,
      category: "Electronics",
      seller: "Mary Wanjiku",
      location: "Nairobi, Nairobi",
      image: "/uploads/samsung-a14.jpg",
      rating: 4.5,
      reviews: 12,
      stock: 15,
      isFeatured: true
    },
    {
      id: 3,
      name: "Kikoy Kitchen Towels",
      description: "Traditional Kikoy fabric kitchen towels. Highly absorbent and quick-drying.",
      price: 600,
      category: "Household Items",
      seller: "Grace Nyong",
      location: "Mombasa, Mombasa",
      image: "/uploads/kikoy-towels.jpg",
      rating: 4.7,
      reviews: 18,
      stock: 60
    },
    {
      id: 4,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice from Kenyan oranges. No preservatives.",
      price: 120,
      category: "Drinks & Beverages",
      seller: "Peter Mwangi",
      location: "Machakos, Machakos",
      image: "/uploads/orange-juice.jpg",
      rating: 4.6,
      reviews: 31,
      stock: 100,
      isOrganic: true
    },
    {
      id: 5,
      name: "Maasai Beaded Jewelry Set",
      description: "Authentic Maasai beaded jewelry set including necklace and bracelet.",
      price: 2500,
      category: "Jewelry & Accessories",
      seller: "Sarah Kimani",
      location: "Kajiado, Kajiado",
      image: "/uploads/maasai-jewelry.jpg",
      rating: 4.9,
      reviews: 8,
      stock: 15
    },
    {
      id: 6,
      name: "Cotton T-Shirts",
      description: "High-quality cotton t-shirts available in multiple colors and sizes.",
      price: 800,
      category: "Clothing & Fashion",
      seller: "David Ochieng",
      location: "Kisumu, Kisumu",
      image: "/uploads/cotton-tshirts.jpg",
      rating: 4.4,
      reviews: 22,
      stock: 45
    }
  ];

  const categories = [
    "Farm Produce", "Groceries & Food", "Clothing & Fashion", "Electronics",
    "Drinks & Beverages", "Liquor & Spirits", "Jewelry & Accessories", 
    "Toys & Games", "Household Items", "Health & Beauty", 
    "Livestock & Poultry", "Crafts & Handmade"
  ];

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", 
    "Machakos", "Meru", "Nyeri", "Kajiado"
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || product.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold font-display mb-2">
            Browse Products
          </h1>
          <p className="text-lg opacity-90">
            Discover amazing products from local sellers across Kenya
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filter Products</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {counties.map(county => (
                  <SelectItem key={county} value={county}>{county}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedLocation("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] bg-gray-100 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <ShoppingCart className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Product Image</p>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isFeatured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    {product.isOrganic && (
                      <Badge className="bg-green-100 text-green-700">Organic</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{product.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      KSh {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.stock} in stock
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Sold by {product.seller}
                </p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedLocation("all");
            }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
