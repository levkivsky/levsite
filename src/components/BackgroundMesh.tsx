import { motion } from 'framer-motion';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';

export function BackgroundMesh() {
  const { enableHeavyEffects } = useDeviceCapabilities();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base obsidian */}
      <div className="absolute inset-0 bg-obsidian-400" />

      {/*
        Animated gradient blobs.
        Desktop: unchanged — 60-70vh spread, 120-140px blur, continuous
        Framer Motion drift loops (identical to the original design).
        Mobile: ~2x smaller footprint, ~3x smaller blur radius, and the
        `animate` prop is entirely omitted (not just paused) so no RAF
        loop, no per-frame transform recalculation, and no persistent
        Framer Motion animation object is created in the first place.
      */}
      <motion.div
        className="absolute -top-1/4 left-1/4 h-[30vh] w-[30vh] rounded-full blur-[40px] md:h-[60vh] md:w-[60vh] md:blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,106,0.08), transparent 70%)',
        }}
        animate={
          enableHeavyEffects
            ? { x: [0, 40, -20, 0], y: [0, 30, -10, 0], scale: [1, 1.1, 0.95, 1] }
            : undefined
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 h-[35vh] w-[35vh] rounded-full blur-[50px] md:h-[70vh] md:w-[70vh] md:blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(100,116,139,0.1), transparent 70%)',
        }}
        animate={
          enableHeavyEffects
            ? { x: [0, -50, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.15, 1] }
            : undefined
        }
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[25vh] w-[25vh] rounded-full blur-[40px] md:h-[50vh] md:w-[50vh] md:blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(226,232,240,0.05), transparent 70%)',
        }}
        animate={
          enableHeavyEffects
            ? { x: [0, 30, -30, 0], y: [0, -20, 20, 0], scale: [1, 1.05, 0.95, 1] }
            : undefined
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/*
        Subtle moving grid. This combines a tiled background-image with a
        radial mask AND a 40s background-position animation — on mobile
        that's continuous repaint work across the full viewport for a
        barely-visible texture. `hidden md:block` removes it from the
        mobile render/paint pipeline completely rather than just hiding it
        visually (display:none, unlike opacity/visibility, is not painted
        or composited at all).
      */}
      <div className="absolute inset-0 hidden bg-grid bg-grid-fade opacity-60 md:block md:animate-grid-pan" />

      {/* Vignette — single static radial-gradient, cheap on any device */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,12,14,0.6)_100%)]" />

      {/* Top sheen — 1px static gradient line, negligible cost */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-metallic-300/20 to-transparent" />
    </div>
  );
}
