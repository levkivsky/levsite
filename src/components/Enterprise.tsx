import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Reveal } from './Reveal';

export function Enterprise() {
  return (
    <section id="enterprise" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-10 md:p-16">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-400/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-metallic-500/10 blur-[100px]" />

            <div className="relative">
              <Quote className="h-8 w-8 text-accent-400/60" />

              <motion.blockquote
                className="mt-8 font-display text-2xl font-medium leading-snug tracking-tight text-metallic-50 sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                “We do not chase the moment. We build for the horizon — with a
                discipline that turns ambition into an enduring institution.”
              </motion.blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-metallic-200 to-metallic-500 text-sm font-bold text-obsidian-400">
                  LV
                </div>
                <div>
                  <div className="text-sm font-semibold text-metallic-50">
                    Levkivsky
                  </div>
                  <div className="text-xs tracking-wide text-metallic-500">
                    Founding Principle
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Metric row */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: '100%', label: 'Ownership Aligned' },
            { value: '0', label: 'Compromises Made' },
            { value: '∞', label: 'Horizon in View' },
            { value: '24/7', label: 'Standards Upheld' },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="rounded-2xl glass p-6 text-center">
                <div className="font-display text-2xl font-bold text-metallic-50 md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1.5 text-xs tracking-wide text-metallic-500">
                  {m.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
