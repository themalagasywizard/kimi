import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="bg-black py-32 relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm text-green-200 font-medium tracking-wide uppercase">Taking New Projects</span>
          </div>

          <h2 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-none">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">automate</span>?
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop drowning in manual workflows. Let's build the agentic infrastructure your business deserves.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:ryan@syph.ai"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center">
                Book a Discovery Call <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a 
              href="#"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/10 rounded-full hover:bg-white/5 transition-all backdrop-blur-sm"
            >
              <MessageSquare className="mr-2 h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
              Ask a Question
            </a>
          </div>

          <p className="mt-8 text-sm text-zinc-600 font-mono">
            Average response time: &lt; 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};
