import { useEffect, useRef } from "react";
import song from "@/assets/song.mp4";

const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3; // Set volume to 30%

    // Try to auto-play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented, will need user interaction
        // Listen for first user interaction to start audio
        const startAudio = () => {
          audio.play().catch(() => {
            // ignore if play still fails
          });
          document.removeEventListener("click", startAudio);
          document.removeEventListener("keydown", startAudio);
        };
        document.addEventListener("click", startAudio);
        document.addEventListener("keydown", startAudio);
      });
    }

    return () => {
      document.removeEventListener("click", () => {});
      document.removeEventListener("keydown", () => {});
    };
  }, []);

  return <audio ref={audioRef} src={song} />;
};

export default BackgroundAudio;
