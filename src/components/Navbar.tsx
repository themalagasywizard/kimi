import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold text-xl tracking-tighter">
              SYPH<span className="text-cyan-400">.</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
              <a href="#labs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Labs</a>
              <a href="#insights" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Insights</a>
              <a href="#contact" className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">Book a Pilot</a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
              <a href="#labs" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Labs</a>
              <a href="#insights" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Insights</a>
              <a href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
