import { useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
    // Audio would be controlled here if a real audio source were provided
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
                 bg-card/80 backdrop-blur-md border border-border
                 flex items-center justify-center
                 text-primary hover:bg-card transition-colors
                 shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? <Music className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </motion.button>
  );
};

export default MusicToggle;
