import { motion } from 'framer-motion';
import { useScrollProgress } from './Reveal';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-accent-400 via-metallic-200 to-accent-300"
      style={{ scaleX: progress }}
    />
  );
}
