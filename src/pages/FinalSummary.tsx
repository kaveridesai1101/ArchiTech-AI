import { CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export default function FinalSummary() {
  const { currentScenario } = useAppContext();

  return (
    <div className="p-10 max-w-6xl mx-auto h-full flex flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-success/20 text-success rounded-full mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <Award size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-3">Architecture Generated Successfully</h1>
        <p className="text-primary-light font-semibold text-lg mb-2">{currentScenario.projectName}</p>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">Your software requirement has been transformed into a structured architecture blueprint.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-10 w-full max-w-4xl mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8">
          <h2 className="text-lg font-bold text-slate-300 mb-6 uppercase tracking-wider border-b border-slate-700/50 pb-3">Workflow Summary</h2>
          <div className="space-y-4 text-slate-300">
            <div className="flex justify-between items-center"><span className="text-slate-400">Requirements</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Analyzed</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Knowledge Retrieval</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Hybrid RAG</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Agents Used</span><span className="font-bold text-white">3</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Security Analysis</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Completed</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Cost Analysis</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Completed</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Architecture</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Generated</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Human Validation</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Available</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Feedback Loop</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Enabled</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Code Scaffolding</span><span className="font-medium text-primary-light">Available</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card p-8 flex flex-col items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 border-primary/30 text-center">
          <h2 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">ARCHITECTURE PLANNING</h2>
          
          <div className="flex flex-col items-center justify-center gap-6 mb-8 w-full">
            <div className="text-6xl font-extrabold text-slate-600 line-through decoration-red-500/50 decoration-4">WEEKS</div>
            <div className="h-10 w-0.5 bg-gradient-to-b from-slate-600 to-success"></div>
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-success to-cyan drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">MINUTES</div>
          </div>
          
          <p className="text-slate-300 font-medium italic text-lg">"AI-assisted architecture planning"</p>
        </motion.div>
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        onClick={() => { window.location.href = '/new'; }}
        className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 border border-slate-600 text-slate-300 px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
      >
        <RotateCcw size={18} /> Try Another Scenario
      </motion.button>
    </div>
  );
}
