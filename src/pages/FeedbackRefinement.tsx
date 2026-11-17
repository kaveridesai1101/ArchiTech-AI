import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, MessageSquare, Cpu, CheckCircle2, Database, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

// Per-scenario before/after diagrams highlighting core architectural transformations
const BeforeAfterDiagram = ({ scenarioId, step }: { scenarioId: string, step: number }) => {
  const before: Record<string, ReactElement> = {
    'online-learning': (
      <div className="flex flex-col items-center font-mono text-xs text-slate-400 space-y-1.5">
        <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-center w-full">
          <span className="font-bold text-slate-300">Monolithic Architecture</span>
          <div className="text-[10px] text-slate-500">Shared 'users' table (all roles mixed)</div>
        </div>
        <span className="text-slate-600">↓</span>
        <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-center w-full">
          <span className="text-slate-300">Coupled Backend + Single PostgreSQL DB</span>
          <div className="text-[10px] text-slate-500">No dedicated Faculty Test Generation engine</div>
        </div>
      </div>
    ),
    'ecommerce': (
      <div className="flex flex-col items-center font-mono text-xs text-slate-400 space-y-1.5">
        <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-center w-full">
          <span className="font-bold text-slate-300">Shared E-Commerce DB</span>
          <div className="text-[10px] text-slate-500">Customer, Merchant & Inventory data mixed</div>
        </div>
        <span className="text-slate-600">↓</span>
        <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-center w-full">
          <span className="text-slate-300">Coupled Order & Payment Service</span>
          <div className="text-[10px] text-slate-500">High risk of inventory overselling</div>
        </div>
      </div>
    ),
    'healthcare': (
      <div className="flex flex-col items-center font-mono text-xs text-slate-400 space-y-1.5">
        <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-center w-full">
          <span className="font-bold text-slate-300">Single Clinical DB</span>
          <div className="text-[10px] text-slate-500">Patient PHI and public doctor schedules combined</div>
        </div>
        <span className="text-slate-600">↓</span>
        <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-center w-full">
          <span className="text-slate-300">Generic Appointment Service</span>
          <div className="text-[10px] text-slate-500">No slot concurrency mutex locking</div>
        </div>
      </div>
    ),
  };

  const after: Record<string, ReactElement> = {
    'online-learning': (
      <div className="flex flex-col font-mono text-xs text-success space-y-3">
        <div className="bg-success/10 border border-success/30 p-2.5 rounded-lg">
          <div className="font-bold flex items-center gap-1.5 text-success">
            <Layers size={14} /> 4-Tier Role Isolation & Dedicated Services
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            • <b>Faculty Test Gen Engine</b>: AI test authoring & student examination dispatch
          </div>
          <div className="text-[11px] text-slate-300">
            • <b>Principal Audit Service</b>: Immutable institutional compliance logging
          </div>
        </div>

        <div className="bg-success/10 border border-success/30 p-2.5 rounded-lg">
          <div className="font-bold flex items-center gap-1.5 text-warning">
            <Database size={14} /> 4 Separate Database Tables / Schemas
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-slate-200">
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-primary-light font-bold">Student DB Table</span>
              <div>students, submissions, progress</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-warning font-bold">Faculty DB Table</span>
              <div>faculty_members, curricula</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-cyan font-bold">Test Bank DB Table</span>
              <div>generated_tests, questions, rubrics</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-purple-400 font-bold">Principal DB Table</span>
              <div>principals, academic_audit_logs</div>
            </div>
          </div>
        </div>
      </div>
    ),
    'ecommerce': (
      <div className="flex flex-col font-mono text-xs text-success space-y-3">
        <div className="bg-success/10 border border-success/30 p-2.5 rounded-lg">
          <div className="font-bold flex items-center gap-1.5 text-success">
            <Layers size={14} /> Decoupled Multi-Vendor Microservices
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            • <b>Merchant Catalog Engine</b>: Isolated seller SKU authoring
          </div>
          <div className="text-[11px] text-slate-300">
            • <b>SAGA Checkout Coordinator</b>: Distributed transactional consistency
          </div>
        </div>

        <div className="bg-success/10 border border-success/30 p-2.5 rounded-lg">
          <div className="font-bold flex items-center gap-1.5 text-warning">
            <Database size={14} /> 4 Separate Database Tables / Schemas
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-slate-200">
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-primary-light font-bold">Customer DB</span>
              <div>customers, cart_sessions</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-warning font-bold">Merchant DB</span>
              <div>merchants, catalog_skus</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-cyan font-bold">Warehouse Stock DB</span>
              <div>warehouse_bins, sku_stock</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-purple-400 font-bold">Orders Ledger DB</span>
              <div>orders, escrow_ledger</div>
            </div>
          </div>
        </div>
      </div>
    ),
    'healthcare': (
      <div className="flex flex-col font-mono text-xs text-success space-y-3">
        <div className="bg-success/10 border border-success/30 p-2.5 rounded-lg">
          <div className="font-bold flex items-center gap-1.5 text-success">
            <Layers size={14} /> HIPAA Zero-Trust Architecture
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            • <b>Doctor Schedule & EHR Service</b>: Slot publishing & e-prescriptions
          </div>
          <div className="text-[11px] text-slate-300">
            • <b>Redis Redlock Mutex</b>: Zero double-booking concurrency guarantee
          </div>
        </div>

        <div className="bg-success/10 border border-success/30 p-2.5 rounded-lg">
          <div className="font-bold flex items-center gap-1.5 text-warning">
            <Database size={14} /> 4 Separate Database Tables / Schemas
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-slate-200">
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-primary-light font-bold">Patient PHI DB</span>
              <div>patients, vitals, allergies (AES-256)</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-warning font-bold">Doctor DB</span>
              <div>doctors, credentials, specialties</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-cyan font-bold">Appointments DB</span>
              <div>appointments, time_slots</div>
            </div>
            <div className="bg-navy-900 border border-slate-700 p-1.5 rounded">
              <span className="text-purple-400 font-bold">HIPAA Audit DB</span>
              <div>immutable access_logs (WORM)</div>
            </div>
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
          <span className="absolute -top-3 left-4 bg-success text-xs px-2 py-0.5 rounded text-white font-sans font-bold">AFTER HUMAN FEEDBACK REFINEMENT</span>
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

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleViewRefined}
                disabled={step < 3}
                className="flex items-center gap-2 bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg glow-primary"
              >
                View Refined Architecture <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
