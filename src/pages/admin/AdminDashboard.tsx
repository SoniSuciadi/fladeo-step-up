import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  MapPin, 
  Share2, 
  ShoppingBag,
  Trophy,
  BarChart3,
  Calendar
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Sample data
  const [stats] = useState({
    totalUsers: 2847,
    activeUsers: 1923,
    totalScans: 8451,
    totalShares: 3276,
    conversionRate: 68,
    avgPointsPerUser: 847
  });

  const cityData = [
    { city: "Jakarta", users: 856, scans: 2341, growth: "+12%" },
    { city: "Surabaya", users: 623, scans: 1789, growth: "+8%" },
    { city: "Bandung", users: 445, scans: 1267, growth: "+15%" },
    { city: "Medan", users: 334, scans: 945, growth: "+6%" },
    { city: "Semarang", users: 289, scans: 823, growth: "+10%" },
  ];

  const productData = [
    { name: "Fladeo Sport Classic Blue", scans: 1456, shares: 567, conversion: "72%" },
    { name: "Fladeo Casual Orange", scans: 1234, shares: 489, conversion: "68%" },
    { name: "Fladeo Running White", scans: 1123, shares: 445, conversion: "65%" },
    { name: "Fladeo Street Style Black", scans: 998, shares: 398, conversion: "63%" },
    { name: "Fladeo Classic Red", scans: 876, shares: 321, conversion: "60%" },
  ];

  const viralMetrics = [
    { platform: "WhatsApp", shares: 1567, clicks: 3245, conversion: "15.2%" },
    { platform: "Instagram Story", shares: 892, clicks: 2156, conversion: "12.8%" },
    { platform: "Facebook", shares: 456, clicks: 1123, conversion: "8.4%" },
    { platform: "TikTok", shares: 361, clicks: 897, conversion: "6.7%" },
  ];

  const recentActivity = [
    { time: "2 menit lalu", action: "User baru mendaftar", location: "Jakarta", user: "Siti R." },
    { time: "5 menit lalu", action: "QR scan berhasil", location: "Bandung", user: "Andi K." },
    { time: "8 menit lalu", action: "Share ke WhatsApp", location: "Surabaya", user: "Deni S." },
    { time: "12 menit lalu", action: "OOTD upload", location: "Medan", user: "Maya L." },
    { time: "15 menit lalu", action: "Referral berhasil", location: "Jakarta", user: "Budi P." },
  ];

  return (
    <div className="mobile-container bg-gradient-to-br from-background to-primary-light/20 min-h-screen">
      <div className="py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke App
        </Button>

        {/* Header */}
        <div className="text-center mb-6 animate-slide-up">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Pantau performa program loyalitas Fladeo
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="card-mobile text-center p-4 animate-slide-up">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Pengguna</p>
          </Card>
          
          <Card className="card-mobile text-center p-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalScans.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Scan QR</p>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="locations" className="text-xs">Lokasi</TabsTrigger>
            <TabsTrigger value="products" className="text-xs">Produk</TabsTrigger>
            <TabsTrigger value="viral" className="text-xs">Viral</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <Card className="card-mobile animate-slide-up">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Metrik Utama
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-success-light/20 rounded-lg">
                  <p className="text-2xl font-bold text-success">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Pengguna Aktif</p>
                </div>
                
                <div className="text-center p-3 bg-secondary-light/20 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">{stats.totalShares.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Share</p>
                </div>
                
                <div className="text-center p-3 bg-warning-light/20 rounded-lg">
                  <p className="text-2xl font-bold text-warning">{stats.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                </div>
                
                <div className="text-center p-3 bg-primary-light/20 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{stats.avgPointsPerUser}</p>
                  <p className="text-xs text-muted-foreground">Avg Poin/User</p>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="card-mobile animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Aktivitas Terbaru
              </h3>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex justify-between items-start border-b border-border/50 pb-3 last:border-b-0">
                    <div>
                      <p className="font-semibold text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user} • {activity.location}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card className="card-mobile animate-slide-up">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Sebaran Pengguna per Kota
              </h3>
              
              <div className="space-y-3">
                {cityData.map((city, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-primary-light/10 rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">{city.city}</p>
                      <p className="text-xs text-muted-foreground">{city.scans.toLocaleString()} scan QR</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{city.users.toLocaleString()}</p>
                      <span className="text-xs text-success font-semibold">{city.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="card-mobile animate-slide-up">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-secondary" />
                Performa Produk
              </h3>
              
              <div className="space-y-3">
                {productData.map((product, index) => (
                  <div key={index} className="p-3 bg-secondary-light/10 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <span className="text-xs text-secondary font-semibold">{product.conversion}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <p>Scan QR: <span className="font-semibold">{product.scans.toLocaleString()}</span></p>
                      </div>
                      <div>
                        <p>Share: <span className="font-semibold">{product.shares.toLocaleString()}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="viral" className="space-y-6">
            <Card className="card-mobile animate-slide-up">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-success" />
                Viral Score & Platform
              </h3>
              
              <div className="space-y-3">
                {viralMetrics.map((metric, index) => (
                  <div key={index} className="p-3 bg-success-light/10 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm">{metric.platform}</p>
                      <span className="text-xs text-success font-semibold">{metric.conversion}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <p>Shares: <span className="font-semibold">{metric.shares.toLocaleString()}</span></p>
                      </div>
                      <div>
                        <p>Clicks: <span className="font-semibold">{metric.clicks.toLocaleString()}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-mobile animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Top Viral Content
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-warning-light/20 rounded-lg">
                  <p className="font-semibold text-sm">OOTD Contest #PakaiFladeoBangga</p>
                  <p className="text-xs text-muted-foreground">2,456 uploads • 8,945 shares</p>
                </div>
                
                <div className="p-3 bg-success-light/20 rounded-lg">
                  <p className="font-semibold text-sm">Referral Challenge</p>
                  <p className="text-xs text-muted-foreground">1,234 referrals • 5,678 clicks</p>
                </div>
                
                <div className="p-3 bg-primary-light/20 rounded-lg">
                  <p className="font-semibold text-sm">Daily Spin Excitement</p>
                  <p className="text-xs text-muted-foreground">3,456 spins • 2,890 shares</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;