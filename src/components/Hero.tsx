import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Network, Zap } from 'lucide-react';
import { ThreeHero } from './ThreeHero';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ThreeHero />
      </div>

      {/* Radial Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm text-purple-200 font-medium tracking-wide">
              Agentic Engineering v2.0
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-tight max-w-5xl"
          >
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Autonomous</span> Enterprise.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl leading-relaxed"
          >
            We design, build, and deploy specialized AI agents that execute complex workflows. Stop chatting with AI. Start employing it.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <button className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-black bg-white hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
              Deploy Agents <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-sm">
              View Architecture
            </button>
          </motion.div>

          {/* Tech Stack / Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 pt-8 border-t border-white/5 w-full max-w-4xl"
          >
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">Powered by Advanced Frameworks</p>
            <div className="flex justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Just simple text for now to avoid needing SVG assets */}
               <div className="flex items-center gap-2"><Cpu className="w-5 h-5"/><span>LLM Core</span></div>
               <div className="flex items-center gap-2"><Network className="w-5 h-5"/><span>Vector DB</span></div>
               <div className="flex items-center gap-2"><Zap className="w-5 h-5"/><span>LangChain</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
