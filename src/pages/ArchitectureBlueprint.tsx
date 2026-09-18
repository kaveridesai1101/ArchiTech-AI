import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Download, UserCheck, X, Server, Database, Cloud, Shield, 
  Monitor, Bot, Brain, CreditCard,
  BookOpen, CheckSquare, TrendingUp, ExternalLink, Video, PieChart,
  Lock, Users, Search, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const iconMap: Record<string, any> = {
  Server, Database, Cloud, Shield, Monitor, Bot, Brain, 
  CreditCard, BookOpen, CheckSquare, TrendingUp, ExternalLink, Video, 
  PieChart, Lock, Users, Search, Cpu
};

const CustomNode = ({ data }: any) => {
  const Icon = iconMap[data.icon] || Server;
  
  let bgClass = 'bg-navy-800 border-slate-600';
  let textClass = 'text-slate-200';
  let iconClass = 'text-slate-400';
  let badgeClass = 'bg-slate-700 text-slate-300';
  
  if (data.type === 'frontend') {
    bgClass = 'bg-[#0F2942] border-[#2196FF]';
    iconClass = 'text-[#2196FF]';
    badgeClass = 'bg-[#2196FF]/20 text-[#2196FF]';
  } else if (data.type === 'backend') {
    bgClass = 'bg-[#0A2617] border-[#10B981]';
    iconClass = 'text-[#10B981]';
    badgeClass = 'bg-[#10B981]/20 text-[#10B981]';
  } else if (data.type === 'database' || data.type === 'storage') {
    bgClass = 'bg-[#2E1A0F] border-[#F59E0B]';
    iconClass = 'text-[#F59E0B]';
    badgeClass = 'bg-[#F59E0B]/20 text-[#F59E0B]';
  } else if (data.type === 'ai') {
    bgClass = 'bg-[#2A103D] border-[#A855F7]';
    iconClass = 'text-[#A855F7]';
    badgeClass = 'bg-[#A855F7]/20 text-[#A855F7]';
  }

  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg min-w-[160px] ${bgClass}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 rounded-full bg-slate-400 border-2 border-navy-900" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-black/20 ${iconClass}`}>
          <Icon size={18} />
        </div>
        <div>
          <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${badgeClass} inline-block px-1.5 py-0.5 rounded leading-none`}>
            {data.type}
          </div>
          <div className={`font-bold text-xs ${textClass} leading-tight`}>{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 rounded-full bg-slate-400 border-2 border-navy-900" />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

export default function ArchitectureBlueprint() {
  const navigate = useNavigate();
  const { isRefined, currentScenario, architectureNodesState, architectureEdgesState } = useAppContext();
  
  const [, , onNodesChange] = useNodesState(architectureNodesState);
  const [, , onEdgesChange] = useEdgesState(architectureEdgesState);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  // Re-init nodes/edges when scenario changes
  useEffect(() => {
    setSelectedNode(null);
  }, [currentScenario.id]);

  const onNodeClick = useCallback((_: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const nodeDetails = currentScenario.nodeDetails;
  const technologyStack = currentScenario.technologyStack;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-8 py-4 border-b border-slate-700/50 bg-navy-900 flex justify-between items-center z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white">Architecture Blueprint</h1>
            {isRefined && (
              <span className="text-xs font-bold text-success bg-success/20 px-2 py-1 rounded-md border border-success/30">REFINED AFTER HUMAN FEEDBACK</span>
            )}
          </div>
          <p className="text-slate-400 text-sm">{currentScenario.projectName}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 border border-slate-600 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download size={16} /> Export Blueprint
          </button>
          <button 
            onClick={() => navigate('/validation')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg glow-primary"
          >
            <UserCheck size={18} /> Human Review
          </button>
        </div>
      </div>

      <div className="flex-1 flex relative">
        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={architectureNodesState}
            edges={architectureEdgesState}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-[#061525]"
            defaultEdgeOptions={{ 
              type: 'smoothstep', 
              animated: true, 
              style: { stroke: '#475569', strokeWidth: 2 } 
            }}
          >
            <Background color="#1e293b" gap={16} />
            <Controls className="bg-navy-800 border-slate-700 fill-slate-300" />
          </ReactFlow>
        </div>

        {/* Right panel: node details or summary */}
        <div className="w-80 flex-shrink-0 bg-navy-800/80 backdrop-blur-md border-l border-slate-700/50 flex flex-col">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div 
                key={`detail-${selectedNode.id}`}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="p-6 h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-white pr-4">{selectedNode.data.label}</h2>
                  <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white mt-1 shrink-0"><X size={20} /></button>
                </div>
                
                {nodeDetails[selectedNode.id] ? (
                  <div className="space-y-5 flex-1 overflow-y-auto pr-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Purpose</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{nodeDetails[selectedNode.id].purpose}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Technology</h4>
                      <div className="bg-navy-900 border border-slate-700 px-3 py-2 rounded-md text-sm text-cyan font-mono">
                        {nodeDetails[selectedNode.id].technology}
                      </div>
                    </div>
                    {nodeDetails[selectedNode.id].integration && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Integration</h4>
                        <p className="text-sm text-slate-300">{nodeDetails[selectedNode.id].integration}</p>
                      </div>
                    )}
                    {nodeDetails[selectedNode.id].security && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Security</h4>
                        <p className="text-sm text-slate-300 flex items-start gap-2">
                          <Shield size={14} className="text-success shrink-0 mt-0.5" />
                          <span>{nodeDetails[selectedNode.id].security}</span>
                        </p>
                      </div>
                    )}
                    {nodeDetails[selectedNode.id].scaling && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Scaling</h4>
                        <p className="text-sm text-slate-300 flex items-start gap-2">
                          <TrendingUp size={14} className="text-primary shrink-0 mt-0.5" />
                          <span>{nodeDetails[selectedNode.id].scaling}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <Server size={32} className="text-slate-600 mb-3" />
                    <p className="text-slate-500 text-sm">Select another component to see its details.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key={`summary-${currentScenario.id}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="p-6 h-full flex flex-col"
              >
                <h2 className="text-lg font-bold text-white mb-2 border-b border-slate-700/50 pb-4">Architecture Summary</h2>
                <p className="text-xs text-slate-500 mb-4">Click any node to view component details.</p>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                  <div className="bg-navy-900 border border-slate-700 rounded-lg p-3">
                    <span className="text-xs text-slate-500 block mb-1">Architecture Type</span>
                    <span className="text-sm font-semibold text-white">Modular Service-Based Architecture</span>
                  </div>

                  {Object.entries(technologyStack).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-xs font-bold text-slate-500 block mb-1 uppercase">{key}</span>
                      <span className="text-sm font-medium text-slate-300">{val as string}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 text-success font-medium text-sm">
                    <CheckSquare size={18} /> Architecture Generated
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
