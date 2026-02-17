import { motion } from 'framer-motion';
import { ArrowRight, Activity, Terminal } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', tasks: 400 },
  { name: 'Tue', tasks: 300 },
  { name: 'Wed', tasks: 550 },
  { name: 'Thu', tasks: 450 },
  { name: 'Fri', tasks: 600 },
  { name: 'Sat', tasks: 750 },
  { name: 'Sun', tasks: 900 },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-sm text-cyan-400 font-medium tracking-wide uppercase">System Online</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            AI that runs your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">operations</span>.
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
            We design, build, and deploy AI agents and full-stack products for growing companies. Working systems in weeks, not slide decks in months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-black bg-white hover:bg-gray-100 transition-all shadow-lg hover:shadow-cyan-500/20 group">
              Start Pilot <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white border border-white/20 hover:bg-white/5 transition-all backdrop-blur-sm">
              View Case Studies
            </button>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-20 animate-pulse"></div>
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
              <div className="flex items-center space-x-2">
                <Terminal className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-mono text-gray-300">agent-1.syph.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div className="text-xs text-gray-500 mb-1">Tasks Completed</div>
                <div className="text-2xl font-bold text-white">1,248</div>
                <div className="text-xs text-green-400 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" /> +12% this week
                </div>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div className="text-xs text-gray-500 mb-1">Time Saved</div>
                <div className="text-2xl font-bold text-white">42h</div>
                <div className="text-xs text-green-400 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" /> +8h vs manual
                </div>
              </div>
            </div>

            <div className="h-48 w-full bg-zinc-950 rounded-xl border border-zinc-800 p-2 relative">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Area type="monotone" dataKey="tasks" stroke="#22d3ee" fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute bottom-2 right-2 text-[10px] text-gray-600 font-mono">LIVE FEED</div>
            </div>
            
            <div className="mt-4 space-y-2">
                <div className="flex items-center text-xs text-gray-400 font-mono">
                    <span className="text-green-400 mr-2">➜</span> Processed invoice #8921 (0.4s)
                </div>
                 <div className="flex items-center text-xs text-gray-400 font-mono">
                    <span className="text-green-400 mr-2">➜</span> Generating report for Q1...
                </div>
                 <div className="flex items-center text-xs text-gray-400 font-mono">
                    <span className="text-green-400 mr-2">➜</span> Synced with CRM database.
                </div>
            </div>

          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};
