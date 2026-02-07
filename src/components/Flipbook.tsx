import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FlipbookProps {
  onComplete: () => void;
}

const Flipbook = ({ onComplete }: FlipbookProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Flipbook Container */}
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
        <iframe
          ref={iframeRef}
          src="/book-flip/index.html"
          className="w-full h-full border-none"
          title="Flipbook"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Continue Button */}
      {isLoaded && (
        <motion.button
          onClick={onComplete}
          className="absolute bottom-6 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-cursive text-xl hover:shadow-lg hover:shadow-rose-500/50 transition-all z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue 💕
        </motion.button>
      )}
    </motion.div>
  );
};

export default Flipbook;
