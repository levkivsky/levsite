import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
};

export function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(226, 232, 240, 0.18)',
  intensity = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rx = (py - 0.5) * -intensity;
    const ry = (px - 0.5) * intensity;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`);
    setGlowPos({ x: px * 100, y: py * 100 });
  };

  const reset = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
        }}
      />
      {/* Inner glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.04), transparent 50%)`,
        }}
      />
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            boxShadow: `0 0 0 1px rgba(226,232,240,0.12), 0 20px 60px -20px ${glowColor}`,
          }}
        />
      )}
    </motion.div>
  );
}
