import { useState } from 'react';
import { CheckCircle2, RotateCcw, Award, Download, FileDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { exportArchitecturePdf } from '../utils/exportPdf';

export default function FinalSummary() {
  const { currentScenario, isRefined } = useAppContext();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        exportArchitecturePdf(currentScenario, isRefined);
      } catch (err) {
        console.error('Failed to export PDF:', err);
      } finally {
        setIsExporting(false);
      }
    }, 200);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto h-full flex flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-success/20 text-success rounded-full mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <Award size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-3">Architecture Generated Successfully</h1>
        <p className="text-primary-light font-semibold text-lg mb-2">{currentScenario.projectName}</p>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">Your software requirement has been transformed into an in-depth, production-ready architecture blueprint.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-10 w-full max-w-4xl mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8">
          <h2 className="text-lg font-bold text-slate-300 mb-6 uppercase tracking-wider border-b border-slate-700/50 pb-3">Workflow Summary</h2>
          <div className="space-y-4 text-slate-300">
            <div className="flex justify-between items-center"><span className="text-slate-400">Requirements</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Analyzed</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Knowledge Retrieval</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Hybrid RAG</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Agents Used</span><span className="font-bold text-white">3 Specialized Agents</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Security Analysis</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> RBAC Matrix</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Database Design</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Isolated Tables</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Architecture Blueprint</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Generated</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Human Validation</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Approved</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Feedback Refinement</span><span className="flex items-center gap-1 text-success font-medium"><CheckCircle2 size={16} /> Synced</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Visual Diagram & PDF</span><span className="font-medium text-cyan">Ready to Export</span></div>
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

      <div className="flex flex-wrap items-center justify-center gap-4">
        <motion.button 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-lg glow-primary cursor-pointer disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <FileDown size={18} className="animate-bounce" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download Blueprint (PDF)</span>
            </>
          )}
        </motion.button>

        <motion.button 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          onClick={() => { window.location.href = '/new'; }}
          className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 border border-slate-600 text-slate-400 hover:text-slate-200 px-6 py-3.5 rounded-xl font-medium transition-all shadow-md"
        >
          <RotateCcw size={18} /> Try Another Scenario
        </motion.button>
      </div>
    </div>
  );
}
