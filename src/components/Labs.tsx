import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Labs = () => {
  return (
    <section className="bg-gradient-to-br from-zinc-900 to-black py-32 text-white relative overflow-hidden" id="labs">
      <div className="absolute inset-0 bg-grid-zinc-900/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-6">
              SYPH LABS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              We build what we sell.
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              We don't just build for clients. We incubate our own products to push the boundaries of agentic AI.
            </p>
            <a href="#" className="text-white font-medium inline-flex items-center group">
              Explore our experiments <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <div className="lg:w-2/3 grid gap-6 md:grid-cols-2">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className="group relative bg-zinc-800/50 rounded-2xl p-8 hover:bg-zinc-800 transition-colors border border-zinc-700/50 hover:border-cyan-500/30 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-zinc-500" />
                </div>
                <div className="h-12 w-12 bg-white/5 rounded-xl mb-6 flex items-center justify-center text-xl font-bold font-mono">
                  0{item}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">Project Alpha</h3>
                <p className="text-zinc-400 text-sm">
                  Autonomous data ingestion pipeline for enterprise workflows.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
