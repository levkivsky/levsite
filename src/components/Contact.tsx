import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Loader2,
  Linkedin,
  Twitter,
  Github,
  Mail,
} from 'lucide-react';
import { Reveal } from './Reveal';

type Status = 'idle' | 'loading' | 'success';

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

function FloatingInput({
  id,
  label,
  type = 'text',
  textarea = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedClass =
    'peer w-full rounded-2xl bg-white/[0.02] border border-white/[0.08] px-4 pt-6 pb-2 text-sm text-metallic-50 outline-none transition-all duration-300 focus:border-metallic-300/40 focus:bg-white/[0.04]';

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${sharedClass} resize-none`}
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClass}
          placeholder=" "
        />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          active
            ? 'top-2 text-[0.7rem] font-medium tracking-wide text-metallic-400'
            : 'top-4 text-sm text-metallic-500'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    // Simulated submission
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1600);
  };

  return (
    <section id="contact" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading + socials */}
          <Reveal>
            <span className="section-label">
              <span className="h-px w-8 bg-metallic-500" />
              Get in Touch
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-metallic-50 sm:text-4xl md:text-5xl">
              Let's build the
              <span className="text-gradient-accent"> next decade.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-metallic-400 sm:text-lg">
              Whether you seek a strategic partner or a long-term collaboration,
              we welcome the conversation. Share a few details and we will
              respond with intention.
            </p>

            {/* Socials */}
            <div className="mt-10">
              <div className="text-xs font-medium uppercase tracking-widest text-metallic-500">
                Connect
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="group flex h-12 w-12 items-center justify-center rounded-2xl glass text-metallic-300 transition-all duration-300 hover:border-metallic-300/30 hover:text-metallic-50"
                  >
                    <s.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct email */}
            <a
              href="mailto:hello@levkivsky.com"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-metallic-300 transition-colors hover:text-metallic-50"
            >
              hello@levkivsky.com
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="relative rounded-3xl glass-strong p-6 md:p-8"
            >
              <div className="space-y-4">
                <FloatingInput
                  id="name"
                  label="Full Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <FloatingInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
                <FloatingInput
                  id="message"
                  label="Your Message"
                  textarea
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary mt-6 w-full disabled:opacity-70"
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Send Message
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Message Sent
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Success overlay */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-obsidian-300/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-400/20 border border-accent-400/40"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <Check className="h-8 w-8 text-accent-300" />
                    </motion.div>
                    <p className="mt-4 text-sm font-medium text-metallic-100">
                      Thank you — we'll be in touch shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
