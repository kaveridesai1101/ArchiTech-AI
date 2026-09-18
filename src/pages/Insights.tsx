import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, TrendingUp, Coins, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export default function Insights() {
  const navigate = useNavigate();
  const { currentScenario } = useAppContext();
  const { securityInsights, scalabilityInsights, costInsights, technologyStack } = currentScenario;

  return (
    <div className="p-10 max-w-7xl mx-auto h-full flex flex-col overflow-y-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Architecture Insights</h1>
          <p className="text-slate-400">Technical recommendations derived from the multi-agent analysis for <span className="text-white font-medium">{currentScenario.projectName}</span>.</p>
        </div>
        <button 
          onClick={() => navigate('/validation')}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-lg font-bold transition-all glow-primary"
        >
          Human Validation <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Security Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card flex flex-col">
          <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
            <div className="bg-primary/20 text-primary-light p-2 rounded-lg">
              <ShieldCheck size={20} />
            </div>
            <h2 className="font-bold text-white tracking-wide">SECURITY RECOMMENDATIONS</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-3 flex-1">
              {securityInsights.map((insight: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" /> {insight}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold uppercase">Security Status</span>
              <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">REVIEWED</span>
            </div>
          </div>
        </motion.div>

        {/* Scalability Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card flex flex-col">
          <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
            <div className="bg-success/20 text-success p-2 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h2 className="font-bold text-white tracking-wide">SCALABILITY RECOMMENDATIONS</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-3 flex-1">
              {scalabilityInsights.map((insight: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-success mt-0.5 shrink-0" /> {insight}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold uppercase">Scalability Status</span>
              <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">READY</span>
            </div>
          </div>
        </motion.div>

        {/* Cost Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card flex flex-col">
          <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
            <div className="bg-warning/20 text-warning p-2 rounded-lg">
              <Coins size={20} />
            </div>
            <h2 className="font-bold text-white tracking-wide">COST ANALYSIS</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="space-y-3 flex-1">
              <div className="flex justify-between items-center bg-navy-900 px-3 py-2 rounded border border-slate-700">
                <span className="text-sm text-slate-400">Infrastructure</span>
                <span className="text-xs font-bold text-warning">{costInsights.infrastructure}</span>
              </div>
              <div className="flex justify-between items-center bg-navy-900 px-3 py-2 rounded border border-slate-700">
                <span className="text-sm text-slate-400">Database</span>
                <span className="text-xs font-bold text-warning">{costInsights.database}</span>
              </div>
              <div className="flex justify-between items-center bg-navy-900 px-3 py-2 rounded border border-slate-700">
                <span className="text-sm text-slate-400">AI Usage</span>
                <span className="text-xs font-bold text-warning">{costInsights.aiUsage}</span>
              </div>
              <div className="flex justify-between items-center bg-navy-900 px-3 py-2 rounded border border-slate-700">
                <span className="text-sm text-slate-400">Storage</span>
                <span className={`text-xs font-bold ${costInsights.storage === 'HIGH' ? 'text-red-400' : 'text-warning'}`}>{costInsights.storage}</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold uppercase">Overall</span>
              <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded">{costInsights.overall}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase">Technology Stack Recommendations</h3>
        <div className="grid grid-cols-6 gap-4">
          {Object.entries(technologyStack).map(([key, val]) => (
            <div key={key} className="bg-navy-900 border border-slate-700 p-4 rounded-xl flex flex-col">
              <span className="text-xs text-slate-500 mb-2 uppercase">{key}</span>
              <span className="text-sm font-bold text-cyan font-mono mt-auto">{val as string}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
