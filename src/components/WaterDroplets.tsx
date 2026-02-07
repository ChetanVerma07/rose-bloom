import { motion } from "framer-motion";

interface WaterDrop {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface WaterDropletsProps {
  isActive: boolean;
  count?: number;
}

const WaterDroplets = ({ isActive, count = 6 }: WaterDropletsProps) => {
  // Generate random water drops
  const drops: WaterDrop[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // -50 to 50 for spread
    y: 0,
    delay: Math.random() * 0.2, // Stagger drops slightly
    duration: 0.8 + Math.random() * 0.4, // 0.8-1.2s fall time
  }));

  return (
    <>
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute pointer-events-none"
          initial={{ x: drop.x, y: drop.y, opacity: 1, scale: 1 }}
          animate={{ 
            y: 120 + Math.random() * 60,
            opacity: [1, 0.8, 0],
          }}
          transition={{
            delay: drop.delay,
            duration: drop.duration,
            ease: [0.42, 0, 1, 1],
          }}
          style={{
            left: "50%",
            top: "-10px",
            transform: "translateX(-50%)",
          }}
        >
          {/* Water droplet SVG */}
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main drop body */}
            <path
              d="M4 0C2.5 2 1 3.5 1 5.5C1 7.433 2.343 9 4 9C5.657 9 7 7.433 7 5.5C7 3.5 5.5 2 4 0Z"
              fill="url(#waterGradient)"
              opacity="0.85"
            />
            {/* Highlight for realism */}
            <circle
              cx="3"
              cy="4"
              r="1.5"
              fill="white"
              opacity="0.6"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient
                id="waterGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="10"
              >
                <stop offset="0%" stopColor="hsl(200, 100%, 85%)" />
                <stop offset="100%" stopColor="hsl(200, 90%, 65%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </>
  );
};

export default WaterDroplets;
