import { motion } from 'framer-motion';
import { stats } from '../data';

export const Stats = () => {
  return (
    <section className="bg-zinc-950 py-24 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center group hover:bg-zinc-900 p-6 rounded-2xl transition-colors duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500 mb-2 group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-300">
                {stat.value}
              </div>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
