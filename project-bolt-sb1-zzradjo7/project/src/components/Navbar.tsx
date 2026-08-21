import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'Vision', href: '#vision' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Enterprise', href: '#enterprise' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <motion.nav
        className="mx-auto flex items-center justify-between px-6 transition-all duration-500 md:px-10"
        animate={{
          marginTop: scrolled ? 10 : 20,
          maxWidth: scrolled ? 980 : 1180,
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-500 ${
            scrolled ? 'glass-strong' : 'bg-transparent'
          }`}
        >
          <span className="text-base font-bold tracking-ultra text-metallic-50">
            LEVKIVSKY
          </span>
        </motion.div>

        {/* Desktop links */}
        <div
          className={`hidden items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 md:flex ${
            scrolled ? 'glass-strong' : 'glass'
          }`}
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="group relative rounded-full px-4 py-1.5 text-sm font-medium text-metallic-300 transition-colors hover:text-metallic-50"
            >
              {l.label}
              <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-metallic-300/60 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary hidden md:inline-flex"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-metallic-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-4 mt-2 overflow-hidden rounded-3xl glass-strong p-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-metallic-300 transition-colors hover:bg-white/5 hover:text-metallic-50"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="btn-primary mt-2 w-full"
              >
                Get in Touch
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
