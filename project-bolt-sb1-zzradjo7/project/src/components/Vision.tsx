import { motion } from 'framer-motion';
import { Gem, Cpu, Infinity as InfinityIcon } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const values = [
  {
    icon: Gem,
    title: 'Uncompromising Quality',
    description:
      'Every detail is deliberate. We hold ourselves to a standard few can sustain — because excellence is not a feature, it is the foundation.',
  },
  {
    icon: Cpu,
    title: 'Digital Innovation',
    description:
      'We harness emerging technology not for novelty, but for leverage — building systems that compound in capability over time.',
  },
  {
    icon: InfinityIcon,
    title: 'Future-Proof Execution',
    description:
      'Decisions made today must hold for decades. We engineer with foresight, so what we build remains relevant long after it ships.',
  },
];

export function Vision() {
  return (
    <section id="vision" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-label">
            <span className="h-px w-8 bg-metallic-500" />
            Our Philosophy
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-metallic-50 sm:text-4xl md:text-5xl">
            A vision measured in
            <span className="text-gradient-accent"> decades.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-metallic-400 sm:text-lg">
            Three principles guide every engagement. They are not aspirations —
            they are the operating system of the enterprise.
          </p>
        </Reveal>

        {/* Values grid */}
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <motion.div
                className="group relative h-full overflow-hidden rounded-3xl glass p-8 transition-colors duration-500 hover:border-white/15"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-accent-400/10 to-transparent" />
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <v.icon className="h-6 w-6 text-metallic-200 transition-colors duration-300 group-hover:text-accent-300" />
                    </motion.div>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-metallic-50">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-metallic-400">
                    {v.description}
                  </p>
                </div>

                {/* Number */}
                <div className="absolute right-6 top-6 font-display text-xs font-medium tracking-widest text-metallic-700">
                  0{values.indexOf(v) + 1}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
