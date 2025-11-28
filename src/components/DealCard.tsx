import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Volume2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Deal {
  id: string;
  title: string;
  brand: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  imageUrl: string;
  description: string;
  platform: string;
  isHotDeal?: boolean;
}

interface DealCardProps {
  deal: Deal;
  onSpeak: (text: string) => void;
}

export const DealCard = ({ deal, onSpeak }: DealCardProps) => {
  const handleSpeak = () => {
    const description = `${deal.brand} ${deal.title}. Originally ${deal.originalPrice} rupees, now ${deal.discountedPrice} rupees. ${deal.discount}% off. ${deal.description}`;
    onSpeak(description);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "overflow-hidden border-2 transition-all duration-300 hover:shadow-xl",
        deal.isHotDeal && "border-deal-hot shadow-[var(--shadow-deal)]"
      )}>
        <div className="relative">
          <img 
            src={deal.imageUrl} 
            alt={deal.title}
            className="h-64 w-full object-cover"
          />
          {deal.isHotDeal && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 right-4"
            >
              <Badge className="bg-deal-hot text-white text-lg font-bold px-4 py-2 shadow-glow">
                🔥 HOT DEAL
              </Badge>
            </motion.div>
          )}
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-lg font-bold px-4 py-2">
            {deal.discount}% OFF
          </Badge>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground font-semibold">{deal.brand}</p>
            <h3 className="text-xl font-bold text-foreground mt-1">{deal.title}</h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">₹{deal.discountedPrice.toLocaleString('en-IN')}</span>
            <span className="text-lg text-muted-foreground line-through">₹{deal.originalPrice.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Badge variant="secondary" className="text-xs">{deal.platform}</Badge>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSpeak}
                className="gap-2"
              >
                <Volume2 className="h-4 w-4" />
                Describe
              </Button>
              <Button size="sm" className="gap-2 bg-success text-white hover:bg-success/90">
                <ShoppingCart className="h-4 w-4" />
                View Deal
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};