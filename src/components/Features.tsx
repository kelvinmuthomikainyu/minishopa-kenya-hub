import { 
  Smartphone, 
  Clock, 
  Shield, 
  MapPin, 
  CreditCard, 
  Users,
  Zap,
  Heart
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Chukua Sasa",
      description: "Instant farm-to-home delivery within hours. No waiting, just fresh produce at your doorstep.",
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      icon: CreditCard,
      title: "M-Pesa & Local Payments",
      description: "Pay with M-Pesa, Airtel Money, or Equity Pay. No credit cards needed, just local convenience.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: MapPin,
      title: "Hyper-Local Discovery",
      description: "Find sellers in your neighborhood. Support your community while getting the freshest products.",
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Works perfectly on any phone with minimal data usage. Built for Kenya's mobile-first lifestyle.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Shield,
      title: "Buyer Protection",
      description: "Your money is protected until delivery. If something goes wrong, we've got your back.",
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    {
      icon: Users,
      title: "Community Groups",
      description: "Enable chamas, women's groups, and co-ops to create collective stores and boost local economy.",
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Faster than Jumia, simpler than Jiji. One-click checkout and instant product uploads.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Heart,
      title: "Support Local",
      description: "Every purchase directly supports Kenyan farmers, artisans, and small business owners.",
      color: "text-secondary",
      bg: "bg-secondary/10"
    }
  ];

  return (
    <section className="py-16 bg-gradient-earth">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-4">
            Why Choose Mini Shop Africa?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're not just another marketplace. We're built specifically for Kenya, 
            by Kenyans, with features that matter to our community.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-card border shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur">
            <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
            <div className="text-sm text-muted-foreground">Delivery Success Rate</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur">
            <div className="text-3xl font-bold text-secondary mb-2">2 Hours</div>
            <div className="text-sm text-muted-foreground">Average Delivery Time</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur">
            <div className="text-3xl font-bold text-accent mb-2">Zero</div>
            <div className="text-sm text-muted-foreground">Hidden Fees</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;