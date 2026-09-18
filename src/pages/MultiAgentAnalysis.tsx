import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, ShieldAlert, Coins, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const iconMap: Record<string, any> = { Building2, ShieldAlert, Coins };

export default function MultiAgentAnalysis() {
  const navigate = useNavigate();
  const { currentScenario } = useAppContext();
  const [completedAgents, setCompletedAgents] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCompletedAgents(1), 1000);
    const timer2 = setTimeout(() => setCompletedAgents(2), 2200);
    const timer3 = setTimeout(() => setCompletedAgents(3), 3500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto h-full flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Multi-Agent Architecture Analysis</h1>
        <p className="text-slate-400">Three specialized agents analyze the requirement from different technical perspectives.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {currentScenario.agents.map((agent: any, idx: number) => {
          const Icon = iconMap[agent.icon];
          const isComplete = completedAgents > idx;
          
          return (
            <div key={agent.id} className="glass-card flex flex-col overflow-hidden relative">
              <div className="h-1 w-full bg-slate-700">
                {isComplete && <div className="h-1 w-full bg-success"></div>}
                {!isComplete && <motion.div className="h-1 bg-primary w-1/3" animate={{ x: ['0%', '300%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} />}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${isComplete ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary-light glow-primary'}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-white">{agent.title}</h3>
                  </div>
                  {isComplete ? (
                    <span className="text-xs font-bold text-success flex items-center gap-1 bg-success/10 px-2 py-1 rounded"><CheckCircle2 size={14} /> COMPLETE</span>
                  ) : (
                    <span className="text-xs font-bold text-primary-light flex items-center gap-1 bg-primary/10 px-2 py-1 rounded animate-pulse">ANALYZING...</span>
                  )}
                </div>

                <div className="mb-4 flex-1">
                  <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">Analyzing</h4>
                  <ul className="space-y-1">
                    {agent.analyzing.map((item: string, i: number) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: isComplete ? 1 : i < 3 ? 1 : 0.3, x: 0 }}
                        className={`text-sm flex items-center gap-2 ${isComplete ? 'text-slate-300' : 'text-slate-500'}`}
                      >
                        <CheckCircle2 size={14} className={isComplete ? "text-success/70" : "text-slate-600"} /> {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <AnimatePresence>
                  {isComplete && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <div className="bg-navy-900 border border-slate-700 rounded-lg p-3 mb-3">
                        <h4 className="text-xs font-semibold text-slate-500 mb-1 uppercase">Recommendation</h4>
                        <p className="text-sm text-white font-medium leading-relaxed">{agent.recommendation}</p>
                      </div>
                      {agent.technologyFocus && (
                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 mb-1 uppercase">Technology Focus</h4>
                          <p className="text-sm text-cyan font-mono">{agent.technologyFocus}</p>
                        </div>
                      )}
                      {agent.costLevel && (
                        <div>
                          <h4 className="text-xs font-semibold text-slate-500 mb-1 uppercase">Cost</h4>
                          <p className="text-sm text-warning font-mono font-bold">{agent.costLevel}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {completedAgents === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="glass-card p-8 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold text-white mb-8">Agent Collaboration</h2>
            
            <div className="flex items-center justify-center w-full max-w-4xl relative mb-12">
              <div className="flex flex-col items-center w-1/3 z-10">
                <div className="bg-navy-800 border-2 border-slate-600 text-slate-300 font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                  <Building2 size={18} /> ARCHITECT AGENT
                </div>
              </div>

              <div className="absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-slate-700 -z-0 -translate-y-1/2"></div>
              
              {/* Animated Lines to center */}
              <svg className="absolute inset-0 w-full h-full -z-0" style={{ pointerEvents: 'none' }}>
                <motion.path d="M 150 20 L 400 20" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                <motion.path d="M 750 20 L 500 20" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                <motion.path d="M 450 -50 L 450 0" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              </svg>

              <div className="flex flex-col items-center w-1/3 z-10 relative">
                <div className="absolute -top-16 bg-navy-800 border-2 border-slate-600 text-slate-300 font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                  <ShieldAlert size={18} /> SECURITY AGENT
                </div>
                <div className="bg-primary/20 border-2 border-primary text-white font-bold px-6 py-4 rounded-xl flex flex-col items-center text-center shadow-[0_0_20px_rgba(22,131,247,0.3)]">
                  COLLABORATIVE<br/>DECISION
                  <span className="text-xs text-primary-light font-normal mt-1">3/3 agents completed</span>
                </div>
              </div>

              <div className="flex flex-col items-center w-1/3 z-10">
                <div className="bg-navy-800 border-2 border-slate-600 text-slate-300 font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                  <Coins size={18} /> COST AGENT
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-success" /> Architecture perspective received
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-success" /> Security perspective received
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-success" /> Cost perspective received
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-primary-light" /> Consensus generated
              </div>
            </div>

            <button 
              onClick={() => navigate('/generating')}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg glow-primary text-lg"
            >
              Generate Architecture Blueprint <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
