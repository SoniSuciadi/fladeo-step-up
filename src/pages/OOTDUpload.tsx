import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Camera, Upload, Share2, Heart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OOTDUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const featuredOOTDs = [
    {
      id: 1,
      user: "Sari K.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop",
      likes: 24,
      shoes: "Fladeo Sport Blue",
      caption: "Casual Friday with my new Fladeo! 💙 #FladeoStyle"
    },
    {
      id: 2,
      user: "Dedi R.",
      image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=300&h=400&fit=crop",
      likes: 18,
      shoes: "Fladeo Casual White",
      caption: "Perfect for weekend hangout! ✨ #PakaiFladeoBangga"
    },
    {
      id: 3,
      user: "Maya L.",
      image: "https://images.unsplash.com/photo-1506629905607-d405b6b8dd24?w=300&h=400&fit=crop",
      likes: 31,
      shoes: "Fladeo Running Orange",
      caption: "Morning run energy! 🏃‍♀️ #FladeoLoyalty"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processOOTD = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "OOTD Berhasil Diproses! 🎉",
        description: "Foto kamu sudah ditambahkan frame Fladeo. Siap untuk dibagikan!",
        duration: 3000,
      });
    }, 2000);
  };

  const shareToWhatsApp = () => {
    const message = `🔥 Check out my OOTD with Fladeo! 👟\n\n#PakaiFladeoBangga #FladeoStyle #OOTD\n\nJoin Fladeo Loyalty dan dapatkan poin untuk setiap pembelian!\n${window.location.origin}?ref=user123`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Berhasil Dibagikan! 📱",
      description: "OOTD kamu dibagikan ke WhatsApp. +30 poin bonus!",
      duration: 3000,
    });
  };

  const shareToInstagram = () => {
    toast({
      title: "Instagram Story! 📸",
      description: "Simpan foto dan upload ke Instagram Story kamu. Jangan lupa tag @fladeo_official!",
      duration: 5000,
    });
  };

  return (
    <div className="mobile-container bg-gradient-to-br from-background to-secondary-light/20 min-h-screen">
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
          <div className="w-20 h-20 bg-gradient-to-r from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Bangga Pakai Fladeo</h1>
          <p className="text-muted-foreground">
            Upload OOTD kamu dan dapatkan +30 poin!
          </p>
        </div>

        {/* Upload Section */}
        <Card className="card-mobile mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="font-semibold mb-4">Upload OOTD Kamu</h3>
          
          {uploadedImage ? (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded OOTD"
                  className="w-full h-64 object-cover rounded-lg"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm">Menambahkan frame Fladeo...</p>
                    </div>
                  </div>
                )}
                {/* Simulated Fladeo frame overlay */}
                <div className="absolute bottom-2 left-2 bg-white/90 rounded px-2 py-1">
                  <p className="text-xs font-bold text-primary">#PakaiFladeoBangga</p>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                  <img 
                    src="/src/assets/fladeo-logo.png" 
                    alt="Fladeo" 
                    className="w-6 h-6"
                  />
                </div>
              </div>
              
              {!isProcessing ? (
                <div className="space-y-3">
                  <Button
                    className="w-full btn-secondary"
                    onClick={shareToWhatsApp}
                  >
                    <Share2 className="w-5 h-5 mr-3" />
                    Bagikan ke WhatsApp (+30 Poin)
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={shareToInstagram}
                  >
                    <Share2 className="w-5 h-5 mr-3" />
                    Bagikan ke Instagram Story
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setUploadedImage(null)}
                  >
                    Upload Foto Lain
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full btn-primary"
                  onClick={processOOTD}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Memproses..." : "Proses Foto"}
                </Button>
              )}
            </div>
          ) : (
            <div>
              <label htmlFor="photo-upload" className="block">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Ketuk untuk upload foto</p>
                  <p className="text-xs text-muted-foreground">
                    Pastikan sepatu Fladeo terlihat jelas
                  </p>
                </div>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <div className="mt-4 space-y-3">
                <Button
                  className="w-full btn-primary"
                  onClick={() => document.getElementById("photo-upload")?.click()}
                >
                  <Upload className="w-5 h-5 mr-3" />
                  Pilih Foto dari Galeri
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const input = document.getElementById("photo-upload") as HTMLInputElement;
                    input?.click();
                  }}
                >
                  <Camera className="w-5 h-5 mr-3" />
                  Ambil Foto Baru
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Tips */}
        <Card className="card-mobile mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-semibold mb-3">Tips Foto OOTD Terbaik:</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Pastikan sepatu Fladeo terlihat jelas</li>
            <li>• Gunakan pencahayaan yang baik</li>
            <li>• Pose yang natural dan percaya diri</li>
            <li>• Kombinasikan dengan outfit favoritmu</li>
            <li>• Jangan lupa senyum! 😊</li>
          </ul>
        </Card>

        {/* Featured OOTDs */}
        <Card className="card-mobile animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-warning" />
            OOTD Populer
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {featuredOOTDs.map((ootd) => (
              <div key={ootd.id} className="border border-border rounded-lg p-3">
                <div className="flex gap-3">
                  <img
                    src={ootd.image}
                    alt={`OOTD by ${ootd.user}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm">{ootd.user}</p>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-xs">{ootd.likes}</span>
                      </div>
                    </div>
                    <p className="text-xs text-primary font-semibold mb-1">{ootd.shoes}</p>
                    <p className="text-xs text-muted-foreground">{ootd.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OOTDUpload;