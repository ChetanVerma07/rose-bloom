import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeRevealProps {
  onContinue: () => void;
}

const EnvelopeReveal = ({ onContinue }: EnvelopeRevealProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-md w-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="font-cursive text-3xl sm:text-4xl text-foreground text-glow mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        A Letter for You 💌
      </motion.p>

      {!opened && (
        <motion.p
          className="font-serif text-muted-foreground italic mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Tap to open
        </motion.p>
      )}

      {/* Envelope */}
      <motion.div
        className="relative w-72 sm:w-80 h-48 sm:h-52 rounded-xl cursor-pointer mx-auto"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--rose-blush)), hsl(var(--primary)))",
          boxShadow: "0 15px 35px hsl(var(--primary) / 0.25)",
        }}
        onClick={() => !opened && setOpened(true)}
        whileHover={!opened ? { y: -8, scale: 1.02 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Envelope flap pattern */}
        {!opened && (
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(45deg, transparent 48%, hsl(0 0% 100% / 0.2) 50%, transparent 52%)",
            }}
          />
        )}

        {/* Heart seal */}
        {!opened && (
          <motion.span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl z-10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💗
          </motion.span>
        )}

        {/* Letter inside */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute inset-3 bg-card rounded-lg p-5 sm:p-6 text-left overflow-hidden shadow-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3
                className="font-cursive text-2xl sm:text-3xl text-primary mb-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                My Dear
              </motion.h3>
              <motion.p
                className="font-serif text-xs sm:text-sm text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Happy Rose Day! Just like this rose, you bring color and fragrance to my life.
                Every petal represents a smile you've given me. You make my world brighter just by being in it. 🌹
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Continue button */}
      <AnimatePresence>
        {opened && (
          <motion.button
            onClick={onContinue}
            className="mt-8 font-serif text-lg text-primary hover:text-foreground transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ x: 5 }}
          >
            One last thing →
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnvelopeReveal;
