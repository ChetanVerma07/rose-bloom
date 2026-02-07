import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartAnimationProps {
  active: boolean;
  onComplete: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const HeartAnimation = ({ active, onComplete }: HeartAnimationProps) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Generate hearts that swirl
    const generated: FloatingHeart[] = Array.from({ length: 30 }, (_, i) => {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 100 + Math.random() * 100;
      return {
        id: i,
        x: 50 + Math.cos(angle) * (radius / 5),
        y: 50 + Math.sin(angle) * (radius / 8),
        size: 12 + Math.random() * 16,
        delay: i * 0.08,
      };
    });
    setHearts(generated);

    // Trigger glow
    setTimeout(() => setGlowing(true), 1500);
    setTimeout(() => {
      setGlowing(false);
      onComplete();
    }, 3500);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {glowing && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(340 70% 80% / 0.3), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.5],
            y: [0, -30, -50],
          }}
          transition={{
            duration: 2.5,
            delay: heart.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          💗
        </motion.div>
      ))}
    </div>
  );
};

export default HeartAnimation;
