import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface VoiceButtonProps {
  isListening: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const VoiceButton = ({ isListening, onToggle, disabled }: VoiceButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        size="lg"
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          "relative h-16 w-16 rounded-full shadow-lg transition-all duration-300",
          isListening 
            ? "bg-deal-hot text-white shadow-[0_0_40px_rgba(255,70,70,0.6)]" 
            : "bg-primary text-primary-foreground hover:shadow-[var(--shadow-deal)]"
        )}
      >
        {isListening ? (
          <>
            <MicOff className="h-6 w-6" />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-deal-hot"
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </motion.div>
  );
};