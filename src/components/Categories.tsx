import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import farmProduceImage from "@/assets/farm-produce.jpg";
import householdImage from "@/assets/household-items.jpg";

const Categories = () => {
  const categories = [
    {
      title: "Farm Produce",
      description: "Fresh fruits, vegetables, and grains directly from local farmers",
      image: farmProduceImage,
      color: "bg-secondary/10",
      textColor: "text-secondary",
      items: "15,000+ products"
    },
    {
      title: "Groceries & Food",
      description: "Essential food items, spices, and cooking ingredients",
      image: householdImage,
      color: "bg-primary/10", 
      textColor: "text-primary",
      items: "25,000+ products"
    },
    {
      title: "Household Items",
      description: "Home essentials, utensils, and daily necessities",
      image: householdImage,
      color: "bg-accent/10",
      textColor: "text-accent",
      items: "12,000+ products"
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
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card border shadow-soft hover:shadow-warm transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${category.color} ${category.textColor}`}>
                    {category.items}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full justify-between group-hover:bg-primary/5 transition-colors"
                >
                  Browse Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
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