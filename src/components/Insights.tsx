import { motion } from 'framer-motion';
import { insights } from '../data';
import { ArrowRight } from 'lucide-react';

export const Insights = () => {
  return (
    <section className="bg-black py-32 relative" id="insights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-900 pb-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Intelligence Stream</h2>
            <p className="text-zinc-400 max-w-lg leading-relaxed text-lg">
              Perspectives on agentic systems, LLM infrastructure, and the future of work.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <a href="#" className="group inline-flex items-center text-sm font-medium text-white hover:text-purple-400 transition-colors">
              Read all articles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.a
              key={index}
              href={insight.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block"
            >
              <div className="aspect-video bg-zinc-900/50 rounded-2xl overflow-hidden mb-6 border border-white/5 group-hover:border-purple-500/30 transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
                      <ArrowRight className="text-white w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
              </div>
              <div className="space-y-3 px-2">
                <span className="text-zinc-500 text-xs font-mono tracking-widest uppercase">{insight.date}</span>
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors leading-tight">
                  {insight.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
