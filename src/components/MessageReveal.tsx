import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mainMessage = `Happy Rose Day 🌹

This rose is for you—
because some people don't just exist,
they quietly make everything better.`;

const secondaryMessage = `You're special in ways words never fully explain.`;

const MessageReveal = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showSecondary, setShowSecondary] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < mainMessage.length) {
        setDisplayedText(mainMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => setShowSecondary(true), 3000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto px-6">
      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glow behind text */}
        <div
          className="absolute inset-0 -m-8 rounded-3xl opacity-30"
          style={{
            background: "radial-gradient(ellipse, hsl(340 80% 70% / 0.4), transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <p className="font-cursive text-3xl sm:text-4xl md:text-5xl text-foreground text-glow whitespace-pre-line leading-relaxed relative z-10">
          {displayedText}
          {!done && (
            <motion.span
              className="inline-block w-0.5 h-8 bg-primary ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </p>
      </motion.div>

      <AnimatePresence>
        {showSecondary && (
          <motion.p
            className="font-serif text-lg sm:text-xl text-muted-foreground italic text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {secondaryMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageReveal;
