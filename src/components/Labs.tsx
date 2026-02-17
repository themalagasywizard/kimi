import { motion } from 'framer-motion';
import { ArrowUpRight, Beaker, Code2, Bot } from 'lucide-react';

const projects = [
  {
    id: "01",
    title: "Agentic CRM",
    desc: "Autonomous relationship management that predicts churn.",
    icon: Bot,
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: "02",
    title: "CodeVerify",
    desc: "AI-driven security auditing for smart contracts.",
    icon: Code2,
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: "03",
    title: "SynthData",
    desc: "Generative synthetic data for training robust models.",
    icon: Beaker,
    color: "from-emerald-500 to-teal-500"
  }
];

export const Labs = () => {
  return (
    <section className="bg-black py-32 relative overflow-hidden" id="labs">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Text Content */}
          <div className="lg:w-1/3 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 mb-6"
            >
              <span className="h-px w-8 bg-purple-500"></span>
              <span className="text-sm font-mono text-purple-400 tracking-widest uppercase">Syph Labs</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Building the future <br />
              <span className="text-zinc-500">before you ask for it.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg mb-8 leading-relaxed"
            >
              Our R&D division constantly experiments with bleeding-edge agent architectures. We productize our breakthroughs.
            </motion.p>
            
            <motion.a 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              href="#" 
              className="text-white font-medium inline-flex items-center group hover:text-purple-400 transition-colors"
            >
              View Research <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          {/* Project Cards */}
          <div className="lg:w-2/3 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500 rounded-full -mr-10 -mt-10`}></div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple-500/20 transition-colors">
                      <Icon className="h-6 w-6 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">{project.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  <div className="flex items-center text-sm font-medium text-zinc-500 group-hover:text-white transition-colors cursor-pointer">
                    Learn more <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
