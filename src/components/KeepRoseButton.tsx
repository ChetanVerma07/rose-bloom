import { motion } from "framer-motion";

interface KeepRoseButtonProps {
  onClick: () => void;
}

const KeepRoseButton = ({ onClick }: KeepRoseButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="mt-8 px-8 py-3 rounded-full font-serif text-lg
                 bg-card text-primary border-2 border-primary/30
                 animate-pulse-glow cursor-pointer
                 transition-all duration-300
                 hover:bg-primary hover:text-primary-foreground hover:border-primary"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Keep this rose 💕
    </motion.button>
  );
};

export default KeepRoseButton;
