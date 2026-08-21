import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32"
    >
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium tracking-widest text-metallic-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-400" />
          <span className="uppercase">An Enterprise of Distinction</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-metallic-50 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
        >
          Precision engineered for
          <br />
          <span className="shimmer-text animate-shimmer-text">
            enduring value.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-metallic-400 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
        >
          Levkivsky is built on an uncompromising standard of quality and a
          long-term vision — where digital innovation meets future-proof
          execution, and every decision is measured in decades, not quarters.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
        >
          <button
            onClick={() => scrollTo('#vision')}
            className="btn-primary group w-full sm:w-auto"
          >
            Explore Vision
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo('#expertise')}
            className="btn-secondary w-full sm:w-auto"
          >
            Learn More
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/5 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1 }}
        >
          {[
            { value: '25+', label: 'Years of Vision' },
            { value: '99.9%', label: 'Execution Standard' },
            { value: '40+', label: 'Global Engagements' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-semibold text-metallic-50 sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs tracking-wide text-metallic-500 sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-2 w-1 rounded-full bg-metallic-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
