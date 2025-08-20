import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Share2, 
  Instagram, 
  Facebook, 
  Twitter,
  Youtube,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";

const InfluencerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    socialPlatform: "",
    followersCount: "",
    contentNiche: "",
    experience: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Earn 15% Commission",
      description: "Get 15% commission on every product sold through your unique referral link"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Track your sales, earnings, and performance with detailed analytics dashboard"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Marketing Materials",
      description: "Access professional product photos, videos, and marketing content"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Join our exclusive influencer community and get dedicated support"
    }
  ];

  const socialPlatforms = [
    { value: "instagram", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
    { value: "facebook", label: "Facebook", icon: <Facebook className="w-4 h-4" /> },
    { value: "twitter", label: "Twitter/X", icon: <Twitter className="w-4 h-4" /> },
    { value: "youtube", label: "YouTube", icon: <Youtube className="w-4 h-4" /> },
    { value: "tiktok", label: "TikTok", icon: <Share2 className="w-4 h-4" /> }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in becoming a Mini Shop Africa influencer. 
              We'll review your application and get back to you within 24-48 hours.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 Check your email for confirmation</p>
              <p>📱 We'll contact you at {formData.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Become a Mini Shop Africa Influencer
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Turn your social media influence into income. Promote authentic Kenyan products 
            and earn commission on every sale.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>15% Commission</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>500+ Active Influencers</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Real-time Tracking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
              <p className="text-muted-foreground mb-8">
                Join Kenya's fastest-growing marketplace and help connect communities 
                while earning substantial commissions.
              </p>
            </div>

            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Success Stats */}
            <Card className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Influencer Success Stories</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">KSh 50K+</div>
                    <div className="text-sm opacity-90">Avg Monthly Earnings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1,200+</div>
                    <div className="text-sm opacity-90">Products Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm opacity-90">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sign-up Form */}
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Join Our Influencer Program</CardTitle>
              <CardDescription>
                Fill out the form below to start your journey as a Mini Shop Africa influencer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="0700 000 000"
                      required
                    />
                  </div>
                </div>

                {/* Social Media Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Social Media Presence</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Platform *</label>
                    <select
                      name="socialPlatform"
                      value={formData.socialPlatform}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    >
                      <option value="">Select your main platform</option>
                      {socialPlatforms.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Followers Count *</label>
                    <select
                      name="followersCount"
                      value={formData.followersCount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    >
                      <option value="">Select follower range</option>
                      <option value="1k-5k">1K - 5K followers</option>
                      <option value="5k-10k">5K - 10K followers</option>
                      <option value="10k-50k">10K - 50K followers</option>
                      <option value="50k-100k">50K - 100K followers</option>
                      <option value="100k+">100K+ followers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content Niche *</label>
                    <select
                      name="contentNiche"
                      value={formData.contentNiche}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    >
                      <option value="">Select your niche</option>
                      <option value="lifestyle">Lifestyle & Fashion</option>
                      <option value="food">Food & Cooking</option>
                      <option value="health">Health & Wellness</option>
                      <option value="business">Business & Entrepreneurship</option>
                      <option value="family">Family & Parenting</option>
                      <option value="agriculture">Agriculture & Farming</option>
                      <option value="general">General Content</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Influencer Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">New to influencer marketing</option>
                      <option value="intermediate">Some experience (1-2 years)</option>
                      <option value="experienced">Experienced (3+ years)</option>
                      <option value="professional">Professional influencer</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                  We'll review your application and contact you within 24-48 hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSignup;
