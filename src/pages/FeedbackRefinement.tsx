import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, MessageSquare, Cpu, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

// Per-scenario before/after diagrams
const BeforeAfterDiagram = ({ scenarioId, step }: { scenarioId: string, step: number }) => {
  const before: Record<string, ReactElement> = {
    'online-learning': (
      <div className="flex flex-col items-center font-mono text-sm text-slate-400">
        <span>Backend</span>
        <span className="my-1 text-slate-600">↓</span>
        <span>Database</span>
      </div>
    ),
    'ecommerce': (
      <div className="flex flex-col items-center font-mono text-sm text-slate-400">
        <span>Application</span>
        <span className="my-1 text-slate-600">↓</span>
        <span>Product + Order + Payment</span>
      </div>
    ),
    'healthcare': (
      <div className="flex flex-col items-center font-mono text-sm text-slate-400">
        <span>API</span>
        <span className="my-1 text-slate-600">↓</span>
        <span>Appointments</span>
      </div>
    ),
  };

  const after: Record<string, ReactElement> = {
    'online-learning': (
      <div className="flex flex-col items-center font-mono text-sm text-success">
        <span>Backend</span>
        <div className="h-4 w-px bg-success my-1"></div>
        <div className="flex gap-8 text-xs">
          <div className="flex flex-col items-center">
            <span>Course Service</span>
            <span className="text-success/70">↓</span>
            <span className="font-bold">PostgreSQL</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Payment Service</span>
            <span className="text-success/70">↓</span>
            <span className="font-bold">Payment Gateway</span>
          </div>
        </div>
      </div>
    ),
    'ecommerce': (
      <div className="flex flex-col items-center font-mono text-sm text-success">
        <div className="flex gap-8 text-xs">
          <div className="flex flex-col items-center">
            <span>Product Service</span>
            <span className="text-success/70">↓</span>
            <span className="font-bold">Search Service</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Order Service</span>
            <span className="text-success/70">↓</span>
            <span>Payment Service</span>
            <span className="text-success/70">↓</span>
            <span className="font-bold">Payment Gateway</span>
          </div>
        </div>
      </div>
    ),
    'healthcare': (
      <div className="flex flex-col items-center font-mono text-sm text-success">
        <div className="flex gap-8 text-xs">
          <div className="flex flex-col items-center">
            <span>Appointment Service</span>
            <span className="text-success/70">↓</span>
            <span className="font-bold">Scheduling Service</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Notification Service</span>
            <span className="text-success/70">↓</span>
            <span className="font-bold">Notification Provider</span>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-navy-900 border border-slate-700 p-4 rounded-lg relative">
        <span className="absolute -top-3 left-4 bg-slate-700 text-xs px-2 py-0.5 rounded text-white font-sans font-bold">BEFORE</span>
        {before[scenarioId]}
      </div>
      {step >= 3 && (
        <div className="bg-[#0A2617] border border-success p-4 rounded-lg relative shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <span className="absolute -top-3 left-4 bg-success text-xs px-2 py-0.5 rounded text-white font-sans font-bold">AFTER FEEDBACK</span>
          {after[scenarioId]}
        </div>
      )}
    </div>
  );
};

export default function FeedbackRefinement() {
  const navigate = useNavigate();
  const { setIsRefined, currentScenario } = useAppContext();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const handleViewRefined = () => {
    setIsRefined(true);
    navigate('/blueprint');
  };

  return (
    <div className="p-10 max-w-5xl mx-auto h-full flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Architecture Refinement</h1>
        <p className="text-slate-400">Processing human feedback to update the <span className="text-white font-medium">{currentScenario.projectName}</span> architecture.</p>
      </div>

      <div className="grid grid-cols-2 gap-10">
        {/* Left Side: Pipeline */}
        <div className="glass-card p-8 flex flex-col items-center relative">
          <div className="flex flex-col items-center w-full max-w-sm">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex items-center gap-4 bg-navy-900 border border-slate-600 rounded-xl p-4">
              <div className="bg-slate-700 p-3 rounded-full text-white shrink-0"><User size={20} /></div>
              <div className="font-bold text-slate-300">HUMAN FEEDBACK</div>
            </motion.div>

            <div className="h-10 w-px bg-slate-600 relative my-2">
              <motion.div animate={{ y: [0, 40] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-0 w-1 h-3 bg-slate-400 rounded-full -left-[1px]" />
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }} className="w-full flex items-center gap-4 bg-navy-800 border-2 border-primary rounded-xl p-4 shadow-[0_0_15px_rgba(22,131,247,0.2)]">
              <div className="bg-primary/20 p-3 rounded-full text-primary-light shrink-0"><MessageSquare size={20} /></div>
              <div className="font-bold text-primary-light">FEEDBACK LOG</div>
            </motion.div>

            <div className="h-10 w-px bg-primary/50 relative my-2">
              {step >= 1 && <motion.div animate={{ y: [0, 40] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-0 w-1 h-3 bg-primary-light rounded-full -left-[1px]" />}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 2 ? 1 : 0 }} className="w-full flex items-center gap-4 bg-navy-800 border-2 border-cyan rounded-xl p-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <div className="bg-cyan/20 p-3 rounded-full text-cyan shrink-0"><Cpu size={20} /></div>
              <div className="font-bold text-cyan">AGENT DECISION REFINEMENT</div>
            </motion.div>

            <div className="h-10 w-px bg-cyan/50 relative my-2">
              {step >= 2 && <motion.div animate={{ y: [0, 40] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-0 w-1 h-3 bg-cyan rounded-full -left-[1px]" />}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 3 ? 1 : 0 }} className="w-full flex items-center gap-4 bg-success/20 border-2 border-success rounded-xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <div className="bg-success/30 p-3 rounded-full text-success shrink-0"><CheckCircle2 size={20} /></div>
              <div className="font-bold text-success text-lg">UPDATED ARCHITECTURE</div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 border-l-4 border-l-primary">
            <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase">Received Feedback</h3>
            <p className="text-white text-base font-medium italic">"{currentScenario.humanFeedback.suggestion}"</p>
          </motion.div>

          <div className="glass-card p-6 flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase">Structural Changes</h3>
            
            <div className="flex-1 flex flex-col">
              <BeforeAfterDiagram scenarioId={currentScenario.id} step={step} />
            </div>

            <AnimatePresence>
              {step >= 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                  <div className="flex items-center gap-2 text-success font-medium mb-1">
                    <CheckCircle2 size={18} /> Feedback incorporated
                  </div>
                  <div className="flex items-center gap-2 text-success font-medium mb-6">
                    <CheckCircle2 size={18} /> Architecture refined
                  </div>
                  
                  <button 
                    onClick={handleViewRefined}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white py-3 rounded-lg font-bold transition-all glow-primary"
                  >
                    View Refined Blueprint <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
