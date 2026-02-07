import { useEffect, useState } from "react";

interface BokehDot {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

const BokehLights = () => {
  const [dots, setDots] = useState<BokehDot[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 20,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="animate-bokeh rounded-full"
          style={{
            position: "absolute",
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            background: `radial-gradient(circle, hsl(38 70% 75% / 0.5), hsl(340 50% 80% / 0.2))`,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BokehLights;
