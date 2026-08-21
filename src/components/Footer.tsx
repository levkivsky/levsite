import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-base font-bold tracking-ultra text-metallic-50">
              LEVKIVSKY
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-metallic-500">
              Precision engineered for enduring value. An enterprise of
              distinction.
            </p>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-metallic-500">
            <a href="#" className="transition-colors hover:text-metallic-200">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-metallic-200">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-metallic-200">
              Cookie Policy
            </a>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={toTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group flex h-11 w-11 items-center justify-center rounded-full glass text-metallic-300 transition-colors hover:text-metallic-50"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-metallic-600">
          © {new Date().getFullYear()} Levkivsky. All rights reserved. Crafted
          with precision.
        </div>
      </div>
    </footer>
  );
}
