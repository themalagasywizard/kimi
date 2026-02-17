import { motion } from 'framer-motion';
import { stats } from '../data';

export const Stats = () => {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500 mb-2 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                  {stat.value}
                </div>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mt-2 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
