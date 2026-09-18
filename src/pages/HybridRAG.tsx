import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Database, Search, Cpu, CheckCircle2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export default function HybridRAG() {
  const navigate = useNavigate();
  const { currentScenario } = useAppContext();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    "Requirement representation generated",
    "Keyword search completed",
    "Semantic search completed",
    "Results ranked",
    "Relevant knowledge selected"
  ];

  return (
    <div className="p-10 max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              Hybrid Knowledge Retrieval
            </h1>
            <p className="text-slate-400">Retrieve relevant architecture knowledge using keyword and semantic search.</p>
          </div>
          {step === 5 && (
            <button 
              onClick={() => navigate('/agents')}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-lg font-bold transition-all glow-primary"
            >
              Run Multi-Agent Analysis <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8">
        {/* Pipeline Animation */}
        <div className="col-span-5 glass-card p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="text-sm font-bold text-slate-400 mb-8 absolute top-6 left-6">RETRIEVAL PIPELINE</h3>
          
          <div className="flex flex-col items-center w-full max-w-sm">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-navy-900 border-2 border-slate-600 rounded-xl py-3 px-6 text-center w-full font-semibold text-white shadow-lg"
            >
              USER REQUIREMENTS
            </motion.div>
            
            <div className="h-8 w-px bg-primary/50 relative">
              <motion.div 
                animate={{ y: [0, 32] }} transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-0 w-1 h-3 bg-primary-light rounded-full -left-[1px]"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className="bg-primary/20 border-2 border-primary rounded-xl py-3 px-6 text-center w-full font-bold text-primary-light glow-primary z-10"
            >
              HYBRID SEARCH
            </motion.div>

            <div className="flex w-full justify-between px-8 -mt-2 z-0 relative">
              <svg width="100%" height="40" className="absolute left-0 top-2">
                <motion.path 
                  d="M 120 0 Q 60 20 60 40" fill="transparent" stroke="#1683F7" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: step > 1 ? 1 : 0 }}
                />
                <motion.path 
                  d="M 260 0 Q 320 20 320 40" fill="transparent" stroke="#1683F7" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: step > 1 ? 1 : 0 }}
                />
              </svg>
            </div>

            <div className="flex w-full justify-between mt-6">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: step > 1 ? 1 : 0 }}
                className="bg-navy-800 border border-slate-600 rounded-lg py-2 px-3 text-center w-[45%] text-xs font-semibold text-slate-300"
              >
                <Search size={14} className="mx-auto mb-1 text-slate-400" />
                KEYWORD SEARCH
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: step > 1 ? 1 : 0 }}
                className="bg-navy-800 border border-slate-600 rounded-lg py-2 px-3 text-center w-[45%] text-xs font-semibold text-slate-300"
              >
                <Cpu size={14} className="mx-auto mb-1 text-slate-400" />
                SEMANTIC SEARCH
              </motion.div>
            </div>

            <div className="flex w-full justify-between px-8 mt-2 relative h-10">
              <svg width="100%" height="40" className="absolute left-0 top-0">
                <motion.path 
                  d="M 60 0 Q 60 20 190 40" fill="transparent" stroke="#10B981" strokeWidth="2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: step > 2 ? 1 : 0 }}
                />
                <motion.path 
                  d="M 320 0 Q 320 20 190 40" fill="transparent" stroke="#10B981" strokeWidth="2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: step > 2 ? 1 : 0 }}
                />
              </svg>
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: step > 2 ? 1 : 0 }}
              className="bg-navy-900 border-2 border-slate-600 rounded-xl py-3 px-6 text-center w-full font-semibold text-slate-300 flex items-center justify-center gap-2"
            >
              <Database size={18} className="text-warning" /> CHROMADB
            </motion.div>

            <div className="h-8 w-px bg-success/50 relative">
              {step > 3 && (
                <motion.div 
                  animate={{ y: [0, 32] }} transition={{ repeat: Infinity, duration: 1 }}
                  className="absolute top-0 w-1 h-3 bg-success rounded-full -left-[1px]"
                />
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: step > 3 ? 1 : 0, scale: step > 3 ? 1 : 0.9 }}
              className="bg-success/20 border-2 border-success rounded-xl py-3 px-6 text-center w-full font-bold text-success shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              RELEVANT KNOWLEDGE
            </motion.div>
          </div>
        </div>

        {/* Results & Status */}
        <div className="col-span-7 flex flex-col gap-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-slate-400 mb-4">RETRIEVAL STATUS</h3>
            <div className="space-y-3">
              {steps.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {step > idx ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 size={20} className="text-success" />
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center">
                      {step === idx && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    </div>
                  )}
                  <span className={step >= idx ? 'text-white' : 'text-slate-500'}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {step >= 5 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 flex-1 flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-400">RETRIEVED CONTEXT</h3>
                  <span className="text-xs bg-success/20 text-success px-2 py-1 rounded font-bold">6 ITEMS FOUND</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-2">
                  {currentScenario.ragResults.map((result: any, idx: number) => (
                    <motion.div 
                      key={result.id}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
                      className="bg-navy-900 border border-slate-700 rounded-xl p-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-navy-800 p-2 rounded-lg shrink-0">
                          <FileText size={16} className="text-primary-light" />
                        </div>
                        <h4 className="text-sm font-semibold text-slate-200 leading-snug">{result.title}</h4>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Relevance</span>
                          <span className="text-cyan font-mono font-bold">{result.relevance}%</span>
                        </div>
                        <div className="w-full bg-navy-800 rounded-full h-1.5">
                          <div className="bg-cyan h-1.5 rounded-full" style={{ width: `${result.relevance}%` }}></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
