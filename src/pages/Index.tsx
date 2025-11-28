import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { VoiceButton } from '@/components/VoiceButton';
import { DealCard, Deal } from '@/components/DealCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock deals data with Indian pricing
const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Cotton Slim Fit Casual Shirt',
    brand: 'Allen Solly',
    originalPrice: 2499,
    discountedPrice: 1249,
    discount: 50,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
    description: 'Premium cotton fabric with modern slim fit. Perfect for casual outings.',
    platform: 'Myntra',
    isHotDeal: true,
  },
  {
    id: '2',
    title: 'Floral Print Maxi Dress',
    brand: 'FabIndia',
    originalPrice: 3999,
    discountedPrice: 1999,
    discount: 50,
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    description: 'Elegant floral print with comfortable fit. Made from breathable fabric.',
    platform: 'Ajio',
  },
  {
    id: '3',
    title: 'Denim Jacket - Blue',
    brand: 'Levi\'s',
    originalPrice: 4999,
    discountedPrice: 2999,
    discount: 40,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    description: 'Classic denim jacket with vintage wash. Durable and stylish.',
    platform: 'Amazon',
    isHotDeal: true,
  },
  {
    id: '4',
    title: 'Formal Trousers - Black',
    brand: 'Peter England',
    originalPrice: 1999,
    discountedPrice: 999,
    discount: 50,
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80',
    description: 'Comfortable formal trousers with perfect fit. Wrinkle-free fabric.',
    platform: 'Flipkart',
  },
  {
    id: '5',
    title: 'Ethnic Kurta Set',
    brand: 'Manyavar',
    originalPrice: 5999,
    discountedPrice: 3599,
    discount: 40,
    imageUrl: 'https://images.unsplash.com/photo-1583391733981-12e644c2fc4f?w=500&q=80',
    description: 'Traditional kurta with modern touch. Perfect for festive occasions.',
    platform: 'Myntra',
  },
  {
    id: '6',
    title: 'Sports Track Pants',
    brand: 'Puma',
    originalPrice: 2499,
    discountedPrice: 1499,
    discount: 40,
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80',
    description: 'Comfortable track pants with moisture-wicking technology.',
    platform: 'Ajio',
    isHotDeal: true,
  },
];

const Index = () => {
  const { transcript, isListening, startListening, stopListening, isSupported, resetTranscript } = useSpeechRecognition();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(mockDeals);
  const { toast } = useToast();

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      if (!isSupported) {
        toast({
          title: "Speech Recognition Not Supported",
          description: "Your browser doesn't support speech recognition. Please use Chrome or Edge.",
          variant: "destructive",
        });
        return;
      }
      startListening();
      toast({
        title: "🎤 Listening...",
        description: "Tell me what you're looking for!",
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockDeals.filter(deal => 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDeals(filtered);
    } else {
      setFilteredDeals(mockDeals);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border-b-4 border-primary"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="relative container mx-auto px-4 py-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10 text-secondary animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-black text-foreground">
                VoiceShop<span className="text-primary">AI</span>
              </h1>
            </div>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Badge className="bg-deal-hot text-white text-lg px-6 py-2 shadow-glow">
                🔥 MEGA SALE - Up to 70% OFF
              </Badge>
            </motion.div>

            <p className="text-xl md:text-2xl text-foreground font-semibold max-w-2xl mx-auto">
              Find the Best Fashion Deals with Your Voice! 🛍️
            </p>

            {/* Voice Search */}
            <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 w-full">
                <Input
                  placeholder="Search for clothes, brands, or say it with voice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg border-2 border-primary/50 focus-visible:border-primary"
                />
                <VoiceButton 
                  isListening={isListening}
                  onToggle={handleVoiceToggle}
                  disabled={!isSupported}
                />
              </div>
              
              {isListening && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground"
                >
                  🎤 Listening: <span className="text-foreground font-semibold">{transcript || "Say something..."}</span>
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Trending Banner */}
        <motion.div 
          className="bg-secondary text-secondary-foreground py-3 overflow-hidden"
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 animate-pulse">
            <TrendingUp className="h-5 w-5" />
            <p className="text-lg font-bold">FLASH DEALS: Extra 20% off on orders above ₹2,999</p>
            <TrendingUp className="h-5 w-5" />
          </div>
        </motion.div>
      </motion.div>

      {/* Deals Grid */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            {searchQuery ? `Results for "${searchQuery}"` : '🔥 Hot Deals Today'}
          </h2>
          
          {filteredDeals.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No deals found. Try a different search!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DealCard deal={deal} onSpeak={speakText} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
