import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FlipbookProps {
  onComplete: () => void;
}

const Flipbook = ({ onComplete }: FlipbookProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      // Accept the flipbookEnded message only from the embedded iframe window
      if (!e.data || e.data.type !== "flipbookEnded") return;
      try {
        if (!iframeRef.current) return;
        // ensure the message came from the iframe's contentWindow
        if (e.source !== iframeRef.current.contentWindow) return;
      } catch (err) {
        return;
      }

      // give the flip animation a short moment to settle, then reveal the button
      setTimeout(() => {
        // allow clicks through the iframe so the button underneath becomes clickable
        try {
          if (iframeRef.current) iframeRef.current.style.pointerEvents = "none";
        } catch (err) {}
        setShowButton(true);
      }, 240);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center gap-8 w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Flipbook Container */}
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl z-20">
        <iframe
          ref={iframeRef}
          src="/book-flip/index.html"
            className="w-full h-full border-none bg-transparent"
            style={{ background: "transparent" }}
            allowTransparency={true}
            frameBorder={0}
          title="Flipbook"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Continue Button (hidden until flipbook posts "flipbookEnded") */}
      {showButton && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="absolute left-[70%] -translate-x-1/2 bottom-100 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-cursive text-xl hover:shadow-lg hover:shadow-rose-500/50 transition-all z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue 💕
        </motion.button>
      )}
    </motion.div>
  );
};

export default Flipbook;
