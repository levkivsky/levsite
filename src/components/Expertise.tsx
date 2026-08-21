import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  ShieldCheck,
  LineChart,
  Globe2,
  Workflow,
  Lock,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';

const pillars = [
  {
    icon: Layers,
    title: 'Strategic Architecture',
    description:
      'We design systems from first principles — frameworks that scale gracefully and adapt without fracture as the enterprise evolves.',
    glow: 'rgba(201, 169, 106, 0.2)',
  },
  {
    icon: ShieldCheck,
    title: 'Governed Excellence',
    description:
      'Rigorous standards embedded into every layer. Quality is not inspected in — it is engineered in, verified continuously, and never compromised.',
    glow: 'rgba(226, 232, 240, 0.18)',
  },
  {
    icon: LineChart,
    title: 'Compounding Returns',
    description:
      'We pursue investments that appreciate, not depreciate. Each engagement is structured to generate value that outlasts the contract.',
    glow: 'rgba(148, 163, 184, 0.2)',
  },
  {
    icon: Globe2,
    title: 'Global Perspective',
    description:
      'A worldview informed by cross-market experience. We navigate complexity across jurisdictions, cultures, and economic cycles with fluency.',
    glow: 'rgba(201, 169, 106, 0.2)',
  },
  {
    icon: Workflow,
    title: 'Seamless Integration',
    description:
      'New and legacy coexist. We integrate without disruption, ensuring continuity of operations while modernizing the foundation beneath.',
    glow: 'rgba(226, 232, 240, 0.18)',
  },
  {
    icon: Lock,
    title: 'Trusted Custodianship',
    description:
      'Confidentiality is not a policy — it is a culture. We safeguard interests, data, and reputation with the discipline of a fiduciary.',
    glow: 'rgba(148, 163, 184, 0.2)',
  },
];

export function Expertise() {
  const [active, setActive] = useState(0);

  return (
    <section id="expertise" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-label">
            <span className="h-px w-8 bg-metallic-500" />
            Core Pillars
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-metallic-50 sm:text-4xl md:text-5xl">
            Six disciplines.
            <span className="text-gradient"> One standard.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-metallic-400 sm:text-lg">
            Each pillar is a discipline we have mastered — together they form an
            integrated practice few enterprises can replicate.
          </p>
        </Reveal>

        {/* Cards grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} y={20}>
              <TiltCard
                className="h-full rounded-3xl"
                glowColor={p.glow}
                intensity={6}
              >
                <button
                  onClick={() => setActive(i)}
                  className="block h-full w-full rounded-3xl glass p-7 text-left transition-colors duration-500 hover:border-white/15"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <p.icon className="h-5 w-5 text-metallic-200" />
                  </div>
                  <h3
                    className="font-display text-lg font-semibold text-metallic-50"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-metallic-400"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {p.description}
                  </p>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Active detail bar */}
        <Reveal className="mt-10" delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl glass p-1">
            <div className="relative flex items-center gap-4 rounded-xl px-6 py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(() => {
                      const Icon = pillars[active].icon;
                      return <Icon className="h-5 w-5 text-accent-300" />;
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-0"
                >
                  <div className="text-sm font-semibold text-metallic-100">
                    {pillars[active].title}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-metallic-500">
                    {pillars[active].description}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="ml-auto hidden text-xs font-medium tracking-widest text-metallic-600 sm:block">
                {String(active + 1).padStart(2, '0')} / 06
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
