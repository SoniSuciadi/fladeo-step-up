import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, QrCode, Gift, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import fladeoShoes from "@/assets/fladeo-shoes.jpg";

const QRScan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    points: number;
    product: string;
    progress: number;
  } | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR scan process
    setTimeout(() => {
      const pointsEarned = Math.floor(Math.random() * 100) + 50;
      const products = [
        "Fladeo Sport Classic Blue",
        "Fladeo Casual Orange",
        "Fladeo Running White",
        "Fladeo Street Style Black"
      ];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      setScanResult({
        points: pointsEarned,
        product: randomProduct,
        progress: 65 // Progress towards next reward
      });
      setIsScanning(false);
      
      toast({
        title: "QR Berhasil Discan! 🎉",
        description: `Anda mendapat ${pointsEarned} poin dari ${randomProduct}`,
        duration: 3000,
      });
    }, 2000);
  };

  const handleShare = () => {
    const message = `🎉 Aku baru dapat ${scanResult?.points} poin dari sepatu Fladeo! 👟\n\nYuk ikutan program loyalty Fladeo dan dapatkan hadiah menarik! \n\n#FladeoLoyalty #PakaiFladeoBangga`;
    
    if (navigator.share) {
      navigator.share({
        title: "Fladeo Loyalty - Dapat Poin!",
        text: message,
        url: window.location.origin + "?ref=user123"
      });
    } else {
      // Fallback to WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message + "\n\n" + window.location.origin + "?ref=user123")}`;
      window.open(whatsappUrl, "_blank");
    }
    
    toast({
      title: "Berhasil Dibagikan! 📱",
      description: "Terima kasih telah berbagi! Anda mendapat +20 poin bonus.",
      duration: 3000,
    });
  };

  if (scanResult) {
    return (
      <div className="mobile-container bg-gradient-to-br from-success-light to-success/20 min-h-screen">
        <div className="py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          
          <div className="text-center animate-bounce-in">
            <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-12 h-12 text-success-foreground" />
            </div>
            
            <h1 className="text-3xl font-bold text-success mb-2">
              Selamat! 🎉
            </h1>
            
            <p className="text-lg mb-6">
              Anda mendapat <span className="font-bold text-2xl">{scanResult.points}</span> poin!
            </p>
            
            <Card className="card-mobile mb-6">
              <img
                src={fladeoShoes}
                alt="Fladeo Shoes"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">{scanResult.product}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Produk berhasil didaftarkan!
              </p>
              
              <div className="bg-primary-light/30 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress ke voucher Rp50.000:</span>
                  <span className="font-semibold">{scanResult.progress}%</span>
                </div>
                <div className="w-full h-3 bg-white/50 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-1000"
                    style={{ width: `${scanResult.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {100 - scanResult.progress}% lagi untuk mendapat voucher!
                </p>
              </div>
            </Card>
            
            <div className="space-y-3">
              <Button
                className="w-full btn-secondary"
                size="lg"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 mr-3" />
                Bagikan ke WhatsApp (+20 Poin)
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/spin")}
              >
                <Gift className="w-5 h-5 mr-3" />
                Spin Harian Gratis
              </Button>
              
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Scan QR Code</h1>
          <p className="text-muted-foreground mb-8">
            Arahkan kamera ke QR code pada kotak sepatu Fladeo
          </p>
          
          <Card className="card-mobile mb-8 p-8">
            <div className="relative">
              {isScanning ? (
                <div className="animate-pulse">
                  <div className="w-48 h-48 border-4 border-dashed border-primary rounded-lg flex items-center justify-center mx-auto">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
                      <p className="text-primary font-semibold">Memindai...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-48 h-48 border-4 border-dashed border-muted rounded-lg flex items-center justify-center mx-auto cursor-pointer hover:border-primary transition-colors">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Ketuk untuk scan</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
          
          <Button
            className="w-full btn-primary"
            size="lg"
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memindai QR Code...
              </>
            ) : (
              <>
                <QrCode className="w-5 h-5 mr-3" />
                Mulai Scan QR
              </>
            )}
          </Button>
          
          <div className="mt-8 text-left">
            <h3 className="font-semibold mb-3">Tips Scan QR:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Pastikan pencahayaan cukup terang</li>
              <li>• Posisikan QR code di tengah layar</li>
              <li>• Jaga jarak sekitar 15-20 cm</li>
              <li>• QR code ada di dalam kotak sepatu Fladeo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScan;