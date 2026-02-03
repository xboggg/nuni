import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  opacity: number;
  type: "leaf1" | "leaf2" | "leaf3";
}

const LeafSVG = memo(({ type, size }: { type: string; size: number }) => {
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "text-lime-400 drop-shadow-[0_0_8px_rgba(141,198,63,0.8)]",
    style: { filter: "drop-shadow(0 0 8px rgba(141,198,63,0.8))" }
  };

  if (type === "leaf1") {
    return (
      <svg {...svgProps}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" />
      </svg>
    );
  }
  if (type === "leaf2") {
    return (
      <svg {...svgProps}>
        <path d="M6.05 8.05C5.28 8.82 5.28 10.05 6.05 10.82L10.88 15.65C10.88 18.27 8.76 20.39 6.14 20.39C5.57 20.39 5.04 20.29 4.54 20.12L4 21.64C4.77 21.89 5.59 22.03 6.45 22.03C9.87 22.03 12.64 19.26 12.64 15.84V15.65L17.47 10.82C18.24 10.05 18.24 8.82 17.47 8.05L14.11 4.69C13.34 3.92 12.11 3.92 11.34 4.69L8.24 7.79L6.05 8.05Z" />
      </svg>
    );
  }
  return (
    <svg {...svgProps}>
      <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20M15 12C15 10.34 13.66 9 12 9C11.17 9 10.42 9.35 9.88 9.88L11.29 11.29C11.47 11.11 11.72 11 12 11C12.55 11 13 11.45 13 12C13 12.28 12.89 12.53 12.71 12.71L14.12 14.12C14.65 13.58 15 12.83 15 12Z" />
    </svg>
  );
});

LeafSVG.displayName = "LeafSVG";

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Create initial leaves - increased count and made more visible
    const initialLeaves: Leaf[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 24 + Math.random() * 24, // Larger size (24-48px)
      rotation: Math.random() * 360,
      opacity: 0.6 + Math.random() * 0.4, // Higher opacity (0.6-1.0)
      type: ["leaf1", "leaf2"][Math.floor(Math.random() * 2)] as Leaf["type"],
    }));
    setLeaves(initialLeaves);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{
            x: `${leaf.x}vw`,
            y: "-10%",
            rotate: leaf.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            rotate: leaf.rotation + 360,
            opacity: [0, leaf.opacity, leaf.opacity, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{
            left: 0,
          }}
        >
          <motion.div
            animate={{
              x: [0, 30, -20, 40, 0],
            }}
            transition={{
              duration: leaf.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <LeafSVG type={leaf.type} size={leaf.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLeaves;
