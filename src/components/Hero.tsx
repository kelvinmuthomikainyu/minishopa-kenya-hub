import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-earth">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold font-display text-foreground leading-tight">
                Shop Local,
                <span className="block text-transparent bg-gradient-hero bg-clip-text">
                  Support Kenya
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Discover fresh produce, local goods, and authentic products from Kenyan sellers. 
                Faster, simpler, and more affordable than ever before.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Mobile First</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-sm font-medium">Quick Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium">Buyer Protection</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex-1 sm:flex-none">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="chukua" size="lg" className="flex-1 sm:flex-none">
                Chukua Sasa
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-secondary">1M+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">47</div>
                <div className="text-sm text-muted-foreground">Counties</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-warm">
              <img 
                src={heroImage} 
                alt="African marketplace with local vendors and fresh produce"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border rounded-xl p-4 shadow-soft">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🥭</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Fresh Mangoes</div>
                  <div className="text-xs text-muted-foreground">From Embu • KSh 150/kg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;