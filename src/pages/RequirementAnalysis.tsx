import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Shield, Bot, CreditCard, TrendingUp, Database, Search, Server, BookOpen, CheckSquare, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const iconMap: Record<string, any> = {
  Users, Shield, Bot, CreditCard, TrendingUp, Database, Search, Server, BookOpen, CheckSquare, Brain
};

export default function RequirementAnalysis() {
  const navigate = useNavigate();
  const { currentScenario } = useAppContext();
  const { requirement, requirementsAnalysis } = currentScenario;

  return (
    <div className="p-10 max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Requirement Analysis</h1>
          <p className="text-slate-400">The system has converted the natural-language requirement into structured software requirements.</p>
        </div>
        <div className="flex items-center gap-2 bg-success/20 text-success px-4 py-2 rounded-full border border-success/30 font-medium text-sm">
          <CheckCircle2 size={18} />
          Requirements successfully analyzed
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-slate-300 mb-4 border-b border-slate-700/50 pb-2">Original Requirement</h3>
          <div className="bg-navy-900 rounded-xl p-6 text-slate-300 leading-relaxed border border-slate-700 flex-1">
            {requirement}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-slate-300 mb-4 border-b border-slate-700/50 pb-2">Detected Requirements</h3>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="bg-navy-900 p-3 rounded-lg border border-slate-700">
                <span className="text-slate-500 block mb-1">Application</span>
                <span className="font-semibold text-white">{requirementsAnalysis.application}</span>
              </div>
              <div className="bg-navy-900 p-3 rounded-lg border border-slate-700">
                <span className="text-slate-500 block mb-1">Users</span>
                <span className="font-semibold text-white">{requirementsAnalysis.users}</span>
              </div>
              <div className="bg-navy-900 p-3 rounded-lg border border-slate-700">
                <span className="text-slate-500 block mb-1">Authentication</span>
                <span className="font-semibold text-white">{requirementsAnalysis.authentication}</span>
              </div>
              <div className="bg-navy-900 p-3 rounded-lg border border-slate-700">
                <span className="text-slate-500 block mb-1">Core Features</span>
                <span className="font-semibold text-white line-clamp-1" title={requirementsAnalysis.coreFeatures}>{requirementsAnalysis.coreFeatures}</span>
              </div>
              {Object.entries(requirementsAnalysis.customFields).map(([key, value], idx) => (
                <div key={idx} className="bg-navy-900 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-500 block mb-1">{key}</span>
                  <span className="font-semibold text-white line-clamp-1" title={value as string}>{value as string}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {requirementsAnalysis.requirements.map((req: any, idx: number) => {
                const Icon = iconMap[req.icon] || Server;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }}
                    key={req.id} 
                    className="flex items-center gap-4 bg-navy-800 border border-slate-600 rounded-lg p-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="bg-primary/20 p-2 rounded-md text-primary-light">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 mb-0.5">{req.category}</h4>
                      <p className="text-sm font-medium text-white">{req.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
            <span className="text-success text-sm font-medium flex items-center gap-1">
              <CheckCircle2 size={16} /> {requirementsAnalysis.requirements.length + 4 + Object.keys(requirementsAnalysis.customFields).length} key requirements identified
            </span>
            <button 
              onClick={() => navigate('/rag')}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-lg font-bold transition-all glow-primary"
            >
              Continue to Hybrid RAG <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
