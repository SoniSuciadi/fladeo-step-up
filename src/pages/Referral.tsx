import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, Share2, Copy, Gift, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Referral = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralCode] = useState("ANDI2024");
  const [referralLink] = useState(`${window.location.origin}?ref=${referralCode}`);
  
  const [stats] = useState({
    totalReferred: 8,
    pointsEarned: 400,
    vouchersEarned: 2,
    activeReferrals: 6
  });

  const referralHistory = [
    { name: "Budi S.", date: "22 Sep 2024", status: "Active", reward: "+50 poin" },
    { name: "Sari K.", date: "20 Sep 2024", status: "Active", reward: "+50 poin" },
    { name: "Dedi R.", date: "18 Sep 2024", status: "Active", reward: "Voucher Rp50k" },
    { name: "Maya L.", date: "15 Sep 2024", status: "Active", reward: "+50 poin" },
    { name: "Andi P.", date: "12 Sep 2024", status: "Active", reward: "+50 poin" },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Kode Referral Disalin! 📋",
      description: "Kode referral sudah disalin ke clipboard",
      duration: 2000,
    });
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Referral Disalin! 🔗",
      description: "Link referral sudah disalin ke clipboard",
      duration: 2000,
    });
  };

  const shareWhatsApp = () => {
    const message = `🎉 Halo! Aku mau ajak kamu join Fladeo Loyalty!\n\n👟 Dapatkan poin setiap beli sepatu Fladeo\n🎁 Tukar poin dengan voucher menarik\n💫 Gratis ongkir & diskon eksklusif\n\nPakai kode referral ku: ${referralCode}\nAtau klik link ini: ${referralLink}\n\nYuk gabung sekarang! #FladeoLoyalty`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Berhasil Dibagikan! 📱",
      description: "Link referral dibagikan ke WhatsApp",
      duration: 2000,
    });
  };

  const shareInstagram = () => {
    const message = `Check out Fladeo Loyalty! Use my code: ${referralCode} ${referralLink}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Join Fladeo Loyalty",
        text: message,
        url: referralLink
      });
    } else {
      copyReferralLink();
      toast({
        title: "Link Disalin! 📱",
        description: "Paste link ini di Instagram Story kamu",
        duration: 3000,
      });
    }
  };

  return (
    <div className="mobile-container bg-gradient-to-br from-background to-success-light/20 min-h-screen">
      <div className="py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        {/* Header */}
        <div className="text-center mb-6 animate-slide-up">
          <div className="w-20 h-20 bg-gradient-to-r from-success to-success-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-success-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Ajak Teman</h1>
          <p className="text-muted-foreground">
            Dapatkan voucher Rp50.000 setiap teman yang join!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="card-mobile text-center p-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalReferred}</p>
            <p className="text-xs text-muted-foreground">Teman Diajak</p>
          </Card>
          
          <Card className="card-mobile text-center p-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Trophy className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.pointsEarned}</p>
            <p className="text-xs text-muted-foreground">Poin Didapat</p>
          </Card>
        </div>

        {/* Referral Code Section */}
        <Card className="card-mobile mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="font-semibold mb-4">Kode Referral Kamu</h3>
          
          <div className="bg-primary-light/20 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Kode Referral:</p>
                <p className="text-2xl font-bold text-primary">{referralCode}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyReferralCode}
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin
              </Button>
            </div>
            
            <div className="border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground mb-2">Link Referral:</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-primary truncate flex-1">{referralLink}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyReferralLink}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full btn-success"
              size="lg"
              onClick={shareWhatsApp}
            >
              <Share2 className="w-5 h-5 mr-3" />
              Bagikan ke WhatsApp
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={shareInstagram}
            >
              <Share2 className="w-5 h-5 mr-3" />
              Bagikan ke Instagram Story
            </Button>
          </div>
        </Card>

        {/* How it Works */}
        <Card className="card-mobile mb-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-success" />
            Cara Kerja Referral
          </h3>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Bagikan Kode/Link</p>
                <p className="text-xs text-muted-foreground">Share kode referral atau link ke teman-teman kamu</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-secondary-foreground">2</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Teman Join & Scan</p>
                <p className="text-xs text-muted-foreground">Teman daftar dan scan QR pertama kali</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-success-foreground">3</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Dapatkan Voucher!</p>
                <p className="text-xs text-muted-foreground">Kamu dapat voucher Rp50.000, teman dapat bonus 50 poin</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Referral History */}
        <Card className="card-mobile animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="font-semibold mb-4">Teman yang Sudah Join</h3>
          
          <div className="space-y-3">
            {referralHistory.map((ref, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-success-light/10 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{ref.name}</p>
                  <p className="text-xs text-muted-foreground">{ref.date}</p>
                  <span className="inline-block px-2 py-1 bg-success-light text-success text-xs rounded-full mt-1">
                    {ref.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">{ref.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Referral;