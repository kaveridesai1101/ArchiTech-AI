import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { scenarios } from '../data/demoScenarios';
import type { ScenarioId } from '../data/demoScenarios';

export default function NewArchitecture() {
  const navigate = useNavigate();
  const { 
    setCurrentScenarioId, 
    setHasGenerated,
    pendingInputText,
    setPendingInputText 
  } = useAppContext();
  
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [unsupportedError, setUnsupportedError] = useState(false);

  useEffect(() => {
    if (pendingInputText) {
      setInput(pendingInputText);
      setPendingInputText('');
    }
  }, [pendingInputText, setPendingInputText]);

  const normalizeText = (text: string) => text.trim().toLowerCase().replace(/\s+/g, ' ');

  const handleGenerate = () => {
    const normalizedInput = normalizeText(input);
    let matchedId: ScenarioId | null = null;

    // 1. Direct requirement exact match
    for (const key of Object.keys(scenarios) as ScenarioId[]) {
      if (normalizedInput === normalizeText(scenarios[key].requirement)) {
        matchedId = key;
        break;
      }
    }

    // 2. Keyword-based intelligent semantic mapping for custom inputs
    if (!matchedId) {
      if (
        normalizedInput.includes('student') || 
        normalizedInput.includes('faculty') || 
        normalizedInput.includes('teacher') || 
        normalizedInput.includes('principal') || 
        normalizedInput.includes('learning') || 
        normalizedInput.includes('course') || 
        normalizedInput.includes('quiz') || 
        normalizedInput.includes('exam')
      ) {
        matchedId = 'online-learning';
      } else if (
        normalizedInput.includes('ecommerce') || 
        normalizedInput.includes('customer') || 
        normalizedInput.includes('merchant') || 
        normalizedInput.includes('seller') || 
        normalizedInput.includes('cart') || 
        normalizedInput.includes('checkout') || 
        normalizedInput.includes('shop')
      ) {
        matchedId = 'ecommerce';
      } else if (
        normalizedInput.includes('healthcare') || 
        normalizedInput.includes('patient') || 
        normalizedInput.includes('doctor') || 
        normalizedInput.includes('physician') || 
        normalizedInput.includes('appointment') || 
        normalizedInput.includes('clinic') || 
        normalizedInput.includes('hospital')
      ) {
        matchedId = 'healthcare';
      }
    }

    if (matchedId) {
      setCurrentScenarioId(matchedId);
      setHasGenerated(true);
      setUnsupportedError(false);
      setIsGenerating(true);
      setTimeout(() => {
        navigate('/analysis');
      }, 2000);
    } else {
      setUnsupportedError(true);
    }
  };

  const useDemoReq = (id: ScenarioId) => {
    setInput(scenarios[id].requirement);
    setCurrentScenarioId(id);
    setUnsupportedError(false);
  };

  const matchedScenario = Object.values(scenarios).find(
    s => normalizeText(s.requirement) === normalizeText(input)
  );

  const tagsToShow = matchedScenario ? matchedScenario.tags : ['Multi-Role RBAC', 'Isolated DB Tables', 'AI-Powered', 'Cloud Scalable'];

  return (
    <div className="p-10 max-w-4xl mx-auto h-full flex flex-col relative">
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-navy-900/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
          >
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6 glow-primary"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Architecture Requirements...</h2>
            <p className="text-slate-400">ArchiTech AI is decomposing user roles, isolated database tables, and service boundaries.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Architecture</h1>
        <p className="text-slate-400">Describe your software idea with user roles, databases, and permissions. ArchiTech AI will transform it into an in-depth architecture blueprint.</p>
      </div>

      <div className="glass-card p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-semibold text-slate-300">Describe your software idea & architectural specifications</label>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => useDemoReq('online-learning')}
              className="text-xs flex items-center gap-1 text-primary-light hover:text-white transition-colors bg-navy-900 px-3 py-1 rounded border border-slate-700"
            >
              <Sparkles size={13} /> Load Sample Requirement
            </button>
          </div>
        </div>
        
        <textarea
          className="flex-1 w-full bg-navy-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all leading-relaxed"
          placeholder="Example: Build a scalable academic platform with four user roles: Students, Faculty/Teachers, Principals, and Admins. Faculty can generate tests for students, with separate database tables for students, faculty, test banks, and audits..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setUnsupportedError(false);
          }}
        ></textarea>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex gap-2">
            {tagsToShow.map((tag, i) => (
              <span key={i} className="bg-navy-800 px-3 py-1 rounded-full text-slate-400 border border-slate-700">{tag}</span>
            ))}
          </div>
          <span className="text-slate-500">{input.length} characters</span>
        </div>

        {unsupportedError && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-navy-800 border border-slate-700 rounded-xl flex items-start gap-3"
          >
            <Info className="text-primary-light shrink-0 mt-0.5" size={18} />
            <div className="w-full">
              <h4 className="text-slate-200 font-semibold text-sm">Custom Generation Specification</h4>
              <p className="text-slate-400 text-sm mt-1 mb-3">Please specify a requirement aligned with our core demonstration domains (e.g. Academic Learning with Students/Faculty/Principals, E-Commerce Multi-Vendor, or Healthcare Appointments).</p>
              <div className="flex gap-2">
                {Object.values(scenarios).map(s => (
                  <button 
                    key={s.id}
                    onClick={() => useDemoReq(s.id)}
                    className="text-xs font-medium text-slate-300 bg-navy-900 border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded transition-colors"
                  >
                    Use {s.projectName}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleGenerate}
            disabled={!input.trim()}
            className="flex items-center gap-2 bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg glow-primary"
          >
            Generate Architecture →
          </button>
        </div>
      </div>
    </div>
  );
}
