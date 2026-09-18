import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Edit3, RefreshCw, MessageSquare, AlertCircle, X, Save, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export default function HumanValidation() {
  const navigate = useNavigate();
  const { currentScenario, setIsRefined } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const [editForm, setEditForm] = useState({
    Database: currentScenario.technologyStack.Database,
    Backend: currentScenario.technologyStack.Backend,
    AI: currentScenario.technologyStack.AI,
    Authentication: currentScenario.technologyStack.Authentication,
  });

  const handleApprove = () => {
    setIsRefined(false);
    navigate('/summary');
  };
  
  const handleRegenerate = () => navigate('/generating');

  const handleSaveEdit = () => {
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      navigate('/feedback');
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto h-full flex flex-col relative">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 bg-success/90 backdrop-blur text-white px-6 py-3 rounded-lg font-bold shadow-xl flex items-center gap-2 z-50"
          >
            <Check size={18} /> Architecture changes saved
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Human Validation</h1>
        <p className="text-slate-400">Review the generated architecture before finalizing it.</p>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1">
        <div className="col-span-8 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-warning"></div>
            <div className="w-16 h-16 bg-warning/20 text-warning rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">AI GENERATED ARCHITECTURE</h2>
            <p className="text-slate-400 mb-6">Project: <span className="text-white font-medium">{currentScenario.projectName}</span></p>
            
            <div className="flex items-center justify-center gap-2 bg-navy-900 border border-slate-700 px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-300">Awaiting Human Review</span>
            </div>

            <p className="text-sm text-slate-500 mb-8 max-w-md">Review required before final approval. Approve as is, edit individual components, or submit feedback for agent refinement.</p>

            <div className="flex justify-center gap-4 w-full">
              <button onClick={handleApprove} className="flex-1 flex flex-col items-center justify-center gap-2 bg-success/20 hover:bg-success/30 border border-success/50 text-success py-4 rounded-xl font-bold transition-colors">
                <Check size={24} /> APPROVE
              </button>
              <button onClick={() => setIsEditing(true)} className="flex-1 flex flex-col items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 border border-slate-600 text-slate-300 py-4 rounded-xl font-bold transition-colors">
                <Edit3 size={24} /> EDIT ARCHITECTURE
              </button>
              <button onClick={handleRegenerate} className="flex-1 flex flex-col items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 border border-slate-600 text-slate-300 py-4 rounded-xl font-bold transition-colors">
                <RefreshCw size={24} /> REGENERATE
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-between items-center bg-navy-800/50 border border-slate-700/50 rounded-xl p-4">
            <span className="text-slate-400 font-medium">Architecture Confidence</span>
            <span className="text-primary-light font-bold bg-primary/10 px-3 py-1 rounded">Demo Evaluation</span>
          </motion.div>
        </div>

        <div className="col-span-4">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="text-primary-light" size={20} />
              <h3 className="font-bold text-white">Give Feedback</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">Suggest changes and ArchiTech AI will refine the blueprint.</p>
            
            <textarea
              className="flex-1 bg-navy-900 border border-slate-700 rounded-xl p-4 text-slate-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all mb-4"
              placeholder="Tell ArchiTech AI what you would like to change..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            <button 
              onClick={() => setFeedback(currentScenario.humanFeedback.suggestion)}
              className="text-xs text-slate-500 hover:text-slate-300 text-left mb-4 transition-colors italic"
            >
              Try: "{currentScenario.humanFeedback.suggestion}"
            </button>

            <button 
              onClick={handleSubmitFeedback}
              disabled={!feedback.trim()}
              className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-light disabled:opacity-50 text-white py-3 rounded-lg font-bold transition-all glow-primary"
            >
              Submit Feedback <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Edit Drawer */}
      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsEditing(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-[400px] bg-navy-800 border-l border-slate-700 p-6 z-50 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Edit Architecture</h2>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
              </div>
              
              <div className="flex-1 space-y-6 overflow-y-auto">
                {Object.entries(editForm).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase">{key}</label>
                    <input 
                      type="text"
                      className="w-full bg-navy-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                      value={value as string}
                      onChange={(e) => setEditForm({...editForm, [key]: e.target.value})}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-700 flex gap-3">
                <button onClick={() => setIsEditing(false)} className="flex-1 py-3 rounded-lg font-bold text-slate-300 bg-navy-900 border border-slate-600 hover:bg-slate-800 transition-colors">Cancel</button>
                <button onClick={handleSaveEdit} className="flex-1 py-3 rounded-lg font-bold text-white bg-primary hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
