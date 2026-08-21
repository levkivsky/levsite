import { motion } from 'framer-motion';

export function BackgroundMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base obsidian */}
      <div className="absolute inset-0 bg-obsidian-400" />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -top-1/4 left-1/4 h-[60vh] w-[60vh] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,106,0.08), transparent 70%)',
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 h-[70vh] w-[70vh] rounded-full blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(100,116,139,0.1), transparent 70%)',
        }}
        animate={{ x: [0, -50, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(226,232,240,0.05), transparent 70%)',
        }}
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle moving grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade animate-grid-pan opacity-60" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,12,14,0.6)_100%)]" />

      {/* Top sheen */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-metallic-300/20 to-transparent" />
    </div>
  );
}
