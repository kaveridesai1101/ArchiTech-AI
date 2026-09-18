import { useNavigate } from 'react-router-dom';
import { Plus, Layers, Clock, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 flex flex-col gap-2"
  >
    <div className="flex items-center justify-between text-slate-400">
      <span className="text-sm font-medium">{title}</span>
      <Icon size={18} className={color} />
    </div>
    <span className="text-3xl font-bold text-white">{value}</span>
  </motion.div>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
          ArchiTech <span className="text-primary-light">AI</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          From Natural Language to Intelligent Software Architecture
        </p>
        <p className="text-slate-500 mt-4 max-w-3xl mx-auto">
          Transform a software idea into a structured architecture blueprint using Hybrid RAG, specialized AI agents and human feedback.
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => navigate('/new')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(22,131,247,0.4)] text-lg"
          >
            <Plus size={22} />
            Create Architecture
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
        <MetricCard title="Architectures Generated" value="24" icon={Layers} color="text-primary" />
        <MetricCard title="Average Planning Time" value="4.2 min" icon={Clock} color="text-cyan" />
        <MetricCard title="AI Agents" value="3" icon={Cpu} color="text-success" />
        <MetricCard title="Knowledge Sources" value="156" icon={Database} color="text-warning" />
      </div>
    </div>
  );
}
