import { Twitter, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">SYPH.</h2>
            <p className="text-zinc-500 mb-8 max-w-sm">
              The operating system for AI operations. We build agentic systems that scale with your business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-500 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-white transition-colors">Labs</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Syph Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
