import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Gift, Users, Camera, RotateCcw, Wallet, Scan, Dice3, UserPlus, Share2 } from "lucide-react";
import fladeoLogo from "@/assets/fladeo-logo-red.jpeg";

const Index = () => {
  const navigate = useNavigate();
  const [userPoints] = useState(1250);

  const features = [
    {
      icon: Scan,
      title: "Scan QR",
      subtitle: "Dapat poin instan!",
      path: "/scan",
      className: "btn-primary",
    },
    {
      icon: Dice3,
      title: "Spin Harian",
      subtitle: "Menangkan hadiah",
      path: "/spin",
      className: "btn-secondary",
    },
    {
      icon: UserPlus,
      title: "Ajak Teman",
      subtitle: "Bonus voucher!",
      path: "/referral",
      className: "btn-success",
    },
    {
      icon: Share2,
      title: "Bangga Pakai Fladeo",
      subtitle: "Upload OOTD",
      path: "/ootd",
      className: "btn-primary",
    },
  ];

  return (
    <div className="mobile-container bg-gradient-to-br from-background to-primary-light/20 min-h-screen">
      {/* Header with Logo */}
      <div className="text-center py-6 animate-slide-up">
        <img
          src={fladeoLogo}
          alt="Fladeo Logo"
          className="w-24 h-24 mx-auto mb-4 animate-bounce-in"
        />
        <h1 className="text-2xl font-bold text-primary mb-2">
          Fladeo Loyalty
        </h1>
        <p className="text-muted-foreground text-sm">
          Kumpulkan poin, dapatkan hadiah!
        </p>
      </div>

      {/* Points Display */}
      <Card 
        className="points-display mb-6 cursor-pointer animate-slide-up"
        onClick={() => navigate("/profile")}
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-90">Total Poin Anda</p>
              <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Menuju Bronze</p>
            <div className="w-20 h-2 bg-white/30 rounded-full mt-1">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(userPoints % 2000) / 20}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Main Features Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className="card-mobile cursor-pointer animate-slide-up"
            onClick={() => navigate(feature.path)}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className="text-center py-4">
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${feature.className}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <Button
          className="w-full btn-primary text-lg"
          size="lg"
          onClick={() => navigate("/scan")}
        >
          <QrCode className="w-6 h-6 mr-3" />
          Scan QR Sekarang
        </Button>
        
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-muted-foreground text-sm"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;