import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Sprout, Building } from "lucide-react";
import communitySellerImage from "@/assets/community-seller.jpg";

const CommunitySection = () => {
  const communityTypes = [
    {
      icon: Users,
      title: "Women's Groups",
      description: "Chamas and savings groups creating collective stores",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Sprout,
      title: "Local Farmers",
      description: "Fresh produce directly from the source",
      color: "text-secondary", 
      bg: "bg-secondary/10"
    },
    {
      icon: Building,
      title: "Small Businesses",
      description: "Micro-enterprises growing their reach",
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground">
                Empowering
                <span className="block text-transparent bg-gradient-hero bg-clip-text">
                  Local Communities
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From rural farmers to urban entrepreneurs, Mini Shop Africa is designed 
                to boost Kenya's local economy. Join thousands of sellers who are building 
                their businesses with us.
              </p>
            </div>

            {/* Community Types */}
            <div className="space-y-4">
              {communityTypes.map((type, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className={`w-10 h-10 ${type.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <type.icon className={`w-5 h-5 ${type.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-earth rounded-2xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15K+</div>
                <div className="text-xs text-muted-foreground">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">800+</div>
                <div className="text-xs text-muted-foreground">Women's Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">KSh 2.5M</div>
                <div className="text-xs text-muted-foreground">Monthly Revenue</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg">
                Start Selling Today
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-warm">
              <img 
                src={communitySellerImage}
                alt="Smiling African woman entrepreneur with smartphone"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Success Story Card */}
            <div className="absolute -top-6 -right-6 bg-card border rounded-xl p-4 shadow-soft max-w-xs">
              <div className="text-sm">
                <div className="font-semibold text-foreground mb-1">
                  "My sales increased 400% in 3 months!"
                </div>
                <div className="text-xs text-muted-foreground">
                  - Mary Wanjiku, Nakuru Farmer
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-accent rounded-full" />
                ))}
              </div>
            </div>

            {/* Revenue Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border rounded-xl p-4 shadow-soft">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">KSh</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Monthly Earnings</div>
                  <div className="text-lg font-bold text-primary">KSh 85,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;