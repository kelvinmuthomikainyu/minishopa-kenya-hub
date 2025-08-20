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
  DollarSign, 
  TrendingUp, 
  Users, 
  Package,
  Eye,
  Share2,
  Copy,
  ExternalLink,
  Calendar,
  BarChart3
} from "lucide-react";

const InfluencerDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [referralCode] = useState("MSA-INF-2024-001");

  // Mock data - in real app this would come from API
  const stats = {
    totalEarnings: 45750,
    thisMonthEarnings: 12300,
    totalSales: 156,
    thisMonthSales: 23,
    clickThroughRate: 8.5,
    conversionRate: 3.2
  };

  const recentSales = [
    { id: 1, product: "Fresh Avocados (1kg)", commission: 450, date: "2024-01-15", customer: "Jane K." },
    { id: 2, product: "Organic Tomatoes (2kg)", commission: 320, date: "2024-01-14", customer: "Peter M." },
    { id: 3, product: "Farm Fresh Eggs (30pcs)", commission: 180, date: "2024-01-13", customer: "Mary W." },
    { id: 4, product: "Sweet Potatoes (3kg)", commission: 270, date: "2024-01-12", customer: "John D." },
    { id: 5, product: "Green Vegetables Bundle", commission: 390, date: "2024-01-11", customer: "Grace N." }
  ];

  const topProducts = [
    { name: "Fresh Avocados", sales: 45, commission: 6750 },
    { name: "Organic Tomatoes", sales: 32, commission: 4800 },
    { name: "Farm Fresh Eggs", sales: 28, commission: 4200 },
    { name: "Sweet Potatoes", sales: 25, commission: 3750 },
    { name: "Green Vegetables", sales: 26, commission: 3900 }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    // In real app, show toast notification
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Influencer Dashboard</h1>
              <p className="text-white/90">Track your performance and earnings</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-sm">Your Referral Code: </span>
                <span className="font-mono font-bold">{referralCode}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyReferralCode}
                  className="ml-2 text-white hover:bg-white/20"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">KSh {stats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+12.5%</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">KSh {stats.thisMonthEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-muted-foreground">{stats.thisMonthSales} sales this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">{stats.totalSales}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-muted-foreground">Conversion: {stats.conversionRate}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Click Rate</p>
                  <p className="text-2xl font-bold">{stats.clickThroughRate}%</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Eye className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-muted-foreground">Above average</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Sales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Sales
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardTitle>
              <CardDescription>
                Your latest commission earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{sale.product}</p>
                      <p className="text-xs text-muted-foreground">
                        {sale.customer} • {sale.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        +KSh {sale.commission}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>
                Products generating the most commission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">KSh {product.commission.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Marketing Tools
            </CardTitle>
            <CardDescription>
              Resources to help you promote products effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <BarChart3 className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Product Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track which products perform best with your audience
                </p>
                <Button variant="outline" size="sm">View Analytics</Button>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <Package className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Marketing Materials</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download high-quality images and promotional content
                </p>
                <Button variant="outline" size="sm">Download Assets</Button>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other influencers and share strategies
                </p>
                <Button variant="outline" size="sm">Join Community</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
