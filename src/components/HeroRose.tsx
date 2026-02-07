import { useState } from "react";
import { motion } from "framer-motion";
import heroRose from "@/assets/hero-rose.png";

interface HeroRoseProps {
  onBloom: () => void;
}

const HeroRose = ({ onBloom }: HeroRoseProps) => {
  const [bloomed, setBloomed] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleClick = () => {
    if (!bloomed) {
      setBloomed(true);
      setTimeout(onBloom, 800);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="cursor-pointer relative"
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        onClick={handleClick}
        animate={{
          rotate: hovering && !bloomed ? [0, -2, 2, -1, 1, 0] : 0,
          scale: bloomed ? [1, 1.15, 1.05] : 1,
          filter: bloomed ? "brightness(1.15)" : "brightness(1)",
        }}
        transition={{
          rotate: { duration: 1.5, repeat: hovering ? Infinity : 0 },
          scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
          filter: { duration: 1.5 },
        }}
      >
        {/* Glow behind rose */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(340 80% 70% / 0.4), transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{
            scale: bloomed ? 1.5 : 1,
            opacity: bloomed ? 0.8 : 0.4,
          }}
          transition={{ duration: 1.5 }}
        />
        <img
          src={heroRose}
          alt="A beautiful rose for you"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain relative z-10 drop-shadow-2xl"
          draggable={false}
        />
      </motion.div>

      {!bloomed && (
        <motion.p
          className="text-muted-foreground font-serif text-sm italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Tap the rose to bloom ✨
        </motion.p>
      )}
    </div>
  );
};

export default HeroRose;
