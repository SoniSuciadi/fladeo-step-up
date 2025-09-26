import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Gift, Zap, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DailySpin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [lastSpinResult, setLastSpinResult] = useState<{
    type: string;
    value: string;
    points?: number;
  } | null>(null);

  const spinPrizes = [
    { type: "points", value: "10 Poin", color: "bg-blue-500" },
    { type: "points", value: "25 Poin", color: "bg-green-500" },
    { type: "points", value: "50 Poin", color: "bg-purple-500" },
    { type: "voucher", value: "Gratis Ongkir", color: "bg-orange-500" },
    { type: "points", value: "15 Poin", color: "bg-blue-500" },
    { type: "pulsa", value: "Pulsa 10k", color: "bg-red-500" },
    { type: "points", value: "30 Poin", color: "bg-green-500" },
    { type: "voucher", value: "Diskon 10%", color: "bg-yellow-500" },
  ];

  const spinHistory = [
    { date: "22 Sep 2024", prize: "25 Poin", type: "points" },
    { date: "21 Sep 2024", prize: "Gratis Ongkir", type: "voucher" },
    { date: "20 Sep 2024", prize: "15 Poin", type: "points" },
    { date: "19 Sep 2024", prize: "Pulsa 10k", type: "pulsa" },
    { date: "18 Sep 2024", prize: "50 Poin", type: "points" },
  ];

  const handleSpin = () => {
    if (!canSpin) return;
    
    setIsSpinning(true);
    setCanSpin(false);
    
    // Simulate spin animation time
    setTimeout(() => {
      const randomPrize = spinPrizes[Math.floor(Math.random() * spinPrizes.length)];
      setLastSpinResult(randomPrize);
      setIsSpinning(false);
      
      let toastMessage = "";
      if (randomPrize.type === "points") {
        toastMessage = `Selamat! Anda mendapat ${randomPrize.value}! 🎉`;
      } else if (randomPrize.type === "voucher") {
        toastMessage = `Selamat! Anda mendapat voucher ${randomPrize.value}! 🎁`;
      } else if (randomPrize.type === "pulsa") {
        toastMessage = `Selamat! Anda mendapat ${randomPrize.value}! 📱`;
      }
      
      toast({
        title: "Spin Berhasil! 🎊",
        description: toastMessage,
        duration: 4000,
      });
    }, 3000);
  };

  const getNextSpinTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}j ${minutes}m`;
  };

  return (
    <div className="mobile-container bg-gradient-to-br from-background to-warning-light/20 min-h-screen">
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
          <div className="w-20 h-20 bg-gradient-to-r from-warning to-warning-light rounded-full flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-10 h-10 text-warning-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Spin Harian</h1>
          <p className="text-muted-foreground">
            Putar roda keberuntungan setiap hari!
          </p>
        </div>

        {/* Spin Wheel */}
        <Card className="card-mobile mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="text-center">
            <div className="relative mx-auto mb-6" style={{ width: "280px", height: "280px" }}>
              {/* Spin Wheel */}
              <div 
                className={`w-full h-full rounded-full border-8 border-white shadow-lg transition-transform duration-3000 ${
                  isSpinning ? 'animate-spin' : ''
                }`}
                style={{
                  background: `conic-gradient(
                    ${spinPrizes.map((prize, index) => 
                      `${prize.color} ${index * 45}deg ${(index + 1) * 45}deg`
                    ).join(', ')}
                  )`,
                  animationDuration: isSpinning ? '3s' : '0s',
                  animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  animationIterationCount: isSpinning ? '3' : '1'
                }}
              >
                {/* Prize segments */}
                {spinPrizes.map((prize, index) => (
                  <div
                    key={index}
                    className="absolute flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      width: '50%',
                      height: '2px',
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                      transform: `rotate(${index * 45 + 22.5}deg) translate(50px, -1px)`,
                    }}
                  >
                    <span className="bg-black/30 px-2 py-1 rounded whitespace-nowrap">
                      {prize.value}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-primary shadow-lg z-10" />
              
              {/* Pointer */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary z-20" />
            </div>

            {canSpin ? (
              <Button
                className="btn-primary text-xl px-8 py-4"
                onClick={handleSpin}
                disabled={isSpinning}
                size="lg"
              >
                {isSpinning ? (
                  <>
                    <div className="w-6 h-6 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Memutar...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-6 h-6 mr-3" />
                    SPIN SEKARANG!
                  </>
                )}
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Spin berikutnya dalam:</p>
                <p className="text-2xl font-bold text-primary mb-4">{getNextSpinTime()}</p>
                <Button
                  variant="outline"
                  disabled
                  size="lg"
                >
                  <RotateCcw className="w-6 h-6 mr-3" />
                  Tunggu Besok
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Last Result */}
        {lastSpinResult && (
          <Card className="card-mobile mb-6 animate-bounce-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-success to-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-success-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">Selamat! 🎉</h3>
              <p className="text-muted-foreground mb-4">
                Anda baru saja mendapat:
              </p>
              <div className="bg-gradient-to-r from-success-light to-success text-success-foreground rounded-lg p-4">
                <p className="text-2xl font-bold">{lastSpinResult.value}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Today's Chances */}
        <Card className="card-mobile mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-warning" />
            Kesempatan Hari Ini
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary-light/20 rounded-lg">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Kesempatan</p>
              <p className="text-2xl font-bold">{canSpin ? "1" : "0"}</p>
            </div>
            
            <div className="text-center p-3 bg-success-light/20 rounded-lg">
              <Gift className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Hadiah Didapat</p>
              <p className="text-2xl font-bold">{lastSpinResult ? "1" : "0"}</p>
            </div>
          </div>
        </Card>

        {/* Spin History */}
        <Card className="card-mobile animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="font-semibold mb-4">Riwayat Spin</h3>
          
          <div className="space-y-3">
            {spinHistory.map((spin, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{spin.prize}</p>
                  <p className="text-xs text-muted-foreground">{spin.date}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    spin.type === 'points' ? 'bg-blue-100 text-blue-800' :
                    spin.type === 'voucher' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {spin.type === 'points' ? '🎯 Poin' : 
                     spin.type === 'voucher' ? '🎁 Voucher' : '📱 Pulsa'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DailySpin;