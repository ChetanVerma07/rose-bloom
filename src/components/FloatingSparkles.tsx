import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
  size: number;
}

const FloatingSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        size: 3 + Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[6] overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute animate-sparkle rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "hsl(38 80% 80%)",
            boxShadow: "0 0 6px hsl(38 80% 80%)",
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingSparkles;
