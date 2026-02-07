import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  alt: boolean;
  opacity: number;
}

const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 14,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 10,
      alt: Math.random() > 0.5,
      opacity: 0.4 + Math.random() * 0.4,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={petal.alt ? "animate-petal-fall-alt" : "animate-petal-fall"}
          style={{
            position: "absolute",
            left: `${petal.left}%`,
            top: "-20px",
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            borderRadius: "50% 0 50% 50%",
            background: `linear-gradient(135deg, hsl(340 60% 75%), hsl(340 50% 85%))`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            opacity: petal.opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
};

export default FallingPetals;
