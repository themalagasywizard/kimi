import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`backdrop-blur-xl border border-white/5 rounded-2xl px-6 transition-all duration-300 ${
            scrolled ? 'bg-black/80 shadow-lg shadow-purple-500/5' : 'bg-transparent border-transparent'
          }`}
        >
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-purple-500/25 transition-all">S</div>
              <span className="text-white font-bold text-xl tracking-tight group-hover:text-purple-200 transition-colors">
                Syph<span className="text-purple-500">.</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {['Services', 'Labs', 'Insights'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-zinc-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/5"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <a 
                href="#contact"
                className="group relative inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Book a Pilot</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {['Services', 'Labs', 'Insights', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white block px-3 py-3 rounded-lg text-base font-medium hover:bg-white/5 transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
