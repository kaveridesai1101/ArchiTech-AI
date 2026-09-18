import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GeneratingBlueprint() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Requirements analyzed", at: 0 },
    { label: "Knowledge retrieved", at: 20 },
    { label: "Architect Agent completed", at: 40 },
    { label: "Security Agent completed", at: 60 },
    { label: "Cost Agent completed", at: 80 },
    { label: "Agent decisions combined", at: 90 },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-900">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 flex flex-col items-center w-full max-w-2xl relative overflow-hidden"
      >
        {progress < 100 ? (
          <>
            <div className="relative mb-8">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * progress) / 100} className="text-primary drop-shadow-[0_0_10px_rgba(22,131,247,0.8)] transition-all duration-300 ease-out" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{progress}%</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-8 animate-pulse">Generating Architecture Blueprint...</h2>
          </>
        ) : (
          <>
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-24 h-24 bg-success/20 text-success rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-success to-primary">ARCHITECTURE BLUEPRINT READY</h2>
          </>
        )}

        <div className="w-full space-y-3 mb-10">
          {steps.map((step, idx) => {
            const isDone = progress >= step.at;
            return (
              <div key={idx} className="flex items-center gap-3">
                {isDone ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 size={20} className="text-success" />
                  </motion.div>
                ) : (
                  <Loader2 size={20} className="text-slate-600 animate-spin" />
                )}
                <span className={isDone ? 'text-slate-200' : 'text-slate-500'}>{step.label}</span>
              </div>
            );
          })}
        </div>

        <motion.button 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: progress === 100 ? 1 : 0, y: progress === 100 ? 0 : 20 }}
          disabled={progress < 100}
          onClick={() => navigate('/blueprint')}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg glow-primary text-lg disabled:opacity-0"
        >
          View Architecture <ArrowRight size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
}
