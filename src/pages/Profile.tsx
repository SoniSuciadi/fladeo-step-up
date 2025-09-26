import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Trophy, Gift, Star, History } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [userData] = useState({
    name: "Andi Setiawan",
    phone: "081234567890",
    points: 1250,
    level: "Silver",
    totalScans: 12,
    totalRewards: 3,
    joinDate: "15 Sep 2024"
  });

  const recentActivity = [
    { date: "23 Sep 2024", action: "Scan QR", points: "+75", product: "Fladeo Sport Blue" },
    { date: "22 Sep 2024", action: "Share WhatsApp", points: "+20", product: "-" },
    { date: "21 Sep 2024", action: "Scan QR", points: "+60", product: "Fladeo Casual White" },
    { date: "20 Sep 2024", action: "Daily Spin", points: "+15", product: "-" },
  ];

  const availableVouchers = [
    { title: "Diskon 20%", desc: "Pembelian min. Rp300.000", points: 500, expires: "30 Sep 2024" },
    { title: "Gratis Ongkir", desc: "Untuk semua produk", points: 200, expires: "31 Sep 2024" },
    { title: "Voucher Rp50.000", desc: "Pembelian min. Rp500.000", points: 1000, expires: "15 Okt 2024" },
  ];

  const levelProgress = {
    current: userData.points,
    nextLevel: 2000,
    nextLevelName: "Gold"
  };

  return (
    <div className="mobile-container bg-gradient-to-br from-background to-primary-light/20 min-h-screen">
      <div className="py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        {/* Profile Header */}
        <Card className="card-mobile mb-6 animate-slide-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground">{userData.phone}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-semibold text-warning">{userData.level} Member</span>
              </div>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="bg-primary-light/20 rounded-lg p-3">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress ke {levelProgress.nextLevelName}:</span>
              <span className="font-semibold">
                {userData.points.toLocaleString()} / {levelProgress.nextLevel.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2 bg-white/50 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-1000"
                style={{ width: `${(userData.points / levelProgress.nextLevel) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {(levelProgress.nextLevel - userData.points).toLocaleString()} poin lagi untuk level {levelProgress.nextLevelName}!
            </p>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="card-mobile text-center p-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{userData.points.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Poin</p>
          </Card>
          
          <Card className="card-mobile text-center p-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Gift className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{userData.totalScans}</p>
            <p className="text-xs text-muted-foreground">Total Scan</p>
          </Card>
          
          <Card className="card-mobile text-center p-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Star className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">{userData.totalRewards}</p>
            <p className="text-xs text-muted-foreground">Hadiah Didapat</p>
          </Card>
        </div>

        {/* Available Vouchers */}
        <Card className="card-mobile mb-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-success" />
            Voucher Tersedia
          </h3>
          
          <div className="space-y-3">
            {availableVouchers.map((voucher, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-success-light/20 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-sm">{voucher.title}</p>
                  <p className="text-xs text-muted-foreground">{voucher.desc}</p>
                  <p className="text-xs text-warning">Berlaku s/d {voucher.expires}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{voucher.points} poin</p>
                  <Button
                    size="sm"
                    className="btn-success mt-1"
                    disabled={userData.points < voucher.points}
                  >
                    {userData.points >= voucher.points ? "Tukar" : "Kurang Poin"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="card-mobile animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Aktivitas Terakhir
          </h3>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-start border-b border-border/50 pb-3 last:border-b-0">
                <div>
                  <p className="font-semibold text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                  {activity.product !== "-" && (
                    <p className="text-xs text-primary">{activity.product}</p>
                  )}
                </div>
                <span className="text-sm font-semibold text-success">{activity.points}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;