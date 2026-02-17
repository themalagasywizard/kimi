import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="bg-black py-32 text-center" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 to-blue-900/10 [mask-image:radial-gradient(circle_at_center,white,transparent)]"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
            Show us one workflow.
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto relative z-10">
            Book a 25-minute call with our team. Bring your messiest manual process and we'll show you exactly how AI can handle it.
          </p>
          
          <button className="inline-flex items-center px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-cyan-500/20 group relative z-10">
            Book a Pilot <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
