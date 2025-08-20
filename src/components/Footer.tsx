import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  Phone
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        "Farm Produce",
        "Groceries & Food", 
        "Household Items",
        "Categories",
        "Local Sellers",
        "Chukua Sasa"
      ]
    },
    {
      title: "Sell",
      links: [
        "Start Selling",
        "Seller Dashboard",
        "Upload Products",
        "Seller Support",
        "Become Influencer",
        "Success Stories"
      ]
    },
    {
      title: "Support", 
      links: [
        "Help Center",
        "Contact Us",
        "Buyer Protection",
        "Delivery Info",
        "Payment Methods",
        "Returns Policy"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Mission",
        "Careers",
        "Press Kit",
        "Partners",
        "Blog"
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MSA</span>
                </div>
                <span className="font-display font-bold text-xl">
                  Mini Shop Africa
                </span>
              </div>
              
              <p className="text-sm text-background/70 leading-relaxed">
                Kenya's fastest-growing local marketplace. Connecting communities, 
                empowering sellers, and delivering fresh products to your doorstep.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-background">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-sm text-background/70 hover:text-background transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & App Download */}
        <div className="py-8 border-t border-background/20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-background">
                Get in Touch
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-background/70">
                  <Phone className="w-4 h-4" />
                  <span>0706325807</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-background/70">
                  <Mail className="w-4 h-4" />
                  <span>muthomikelvin23@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-background/70">
                  <MapPin className="w-4 h-4" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* App Download */}
            <div className="space-y-4">
              <h3 className="font-semibold text-background">
                Download Our App
              </h3>
              <p className="text-sm text-background/70">
                Get the full Mini Shop Africa experience on your mobile device
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Download App
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-background/70">
              © 2024 Mini Shop Africa. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;