import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Leaf, 
  ShoppingBasket, 
  Shirt, 
  Smartphone, 
  Coffee, 
  Wine, 
  Gem, 
  Gamepad2, 
  Home, 
  Heart, 
  Beef, 
  Palette 
} from "lucide-react";
import farmProduceImage from "@/assets/farm-produce.jpg";
import householdImage from "@/assets/household-items.jpg";

const Categories = () => {
  const categories = [
    {
      title: "Farm Produce",
      description: "Fresh fruits, vegetables, and grains directly from local farmers",
      icon: Leaf,
      image: farmProduceImage,
      color: "bg-green-100",
      textColor: "text-green-700",
      items: "500+ products"
    },
    {
      title: "Groceries & Food",
      description: "Essential food items, spices, and cooking ingredients",
      icon: ShoppingBasket,
      image: householdImage,
      color: "bg-orange-100", 
      textColor: "text-orange-700",
      items: "300+ products"
    },
    {
      title: "Clothing & Fashion",
      description: "Clothes, shoes, and fashion accessories",
      icon: Shirt,
      image: householdImage,
      color: "bg-purple-100",
      textColor: "text-purple-700",
      items: "200+ products"
    },
    {
      title: "Electronics",
      description: "Phones, computers, and electronic devices",
      icon: Smartphone,
      image: householdImage,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      items: "150+ products"
    },
    {
      title: "Drinks & Beverages",
      description: "Soft drinks, juices, and non-alcoholic beverages",
      icon: Coffee,
      image: householdImage,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
      items: "100+ products"
    },
    {
      title: "Liquor & Spirits",
      description: "Alcoholic beverages and spirits",
      icon: Wine,
      image: householdImage,
      color: "bg-red-100",
      textColor: "text-red-700",
      items: "80+ products"
    },
    {
      title: "Jewelry & Accessories",
      description: "Jewelry, watches, and fashion accessories",
      icon: Gem,
      image: householdImage,
      color: "bg-pink-100",
      textColor: "text-pink-700",
      items: "120+ products"
    },
    {
      title: "Toys & Games",
      description: "Children toys, games, and entertainment",
      icon: Gamepad2,
      image: householdImage,
      color: "bg-indigo-100",
      textColor: "text-indigo-700",
      items: "90+ products"
    },
    {
      title: "Household Items",
      description: "Home essentials, utensils, and daily necessities",
      icon: Home,
      image: householdImage,
      color: "bg-gray-100",
      textColor: "text-gray-700",
      items: "250+ products"
    },
    {
      title: "Health & Beauty",
      description: "Personal care, cosmetics, and health products",
      icon: Heart,
      image: householdImage,
      color: "bg-teal-100",
      textColor: "text-teal-700",
      items: "180+ products"
    },
    {
      title: "Livestock & Poultry",
      description: "Live animals, meat, and dairy products",
      icon: Beef,
      image: householdImage,
      color: "bg-amber-100",
      textColor: "text-amber-700",
      items: "60+ products"
    },
    {
      title: "Crafts & Handmade",
      description: "Traditional crafts and handmade items",
      icon: Palette,
      image: householdImage,
      color: "bg-rose-100",
      textColor: "text-rose-700",
      items: "140+ products"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find everything you need from trusted local sellers across Kenya
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl bg-card border shadow-soft hover:shadow-warm transition-all duration-300 hover:scale-105"
              >
                {/* Icon Header */}
                <div className={`p-4 ${category.color} flex items-center justify-center`}>
                  <IconComponent className={`w-8 h-8 ${category.textColor}`} />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${category.color} ${category.textColor}`}>
                      {category.items}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-between group-hover:bg-primary/5 transition-colors"
                  >
                    Browse
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;