import { motion } from 'framer-motion';
import { insights } from '../data';

export const Insights = () => {
  return (
    <section className="bg-black py-32" id="insights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">From Our Team</h2>
            <p className="text-zinc-400 max-w-lg leading-relaxed">
              Perspectives on AI implementation, agentic systems, and building products that ship.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <a href="#" className="inline-block px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
              View All Insights
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
              <div className="aspect-w-16 aspect-h-9 bg-zinc-900 rounded-2xl overflow-hidden mb-6 border border-zinc-800 group-hover:border-cyan-500/30 transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">INSIGHT</div>
              </div>
              <div className="space-y-3">
                <span className="text-zinc-500 text-sm font-mono">{insight.date}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
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
