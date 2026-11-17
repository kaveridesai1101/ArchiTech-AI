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
  Lock, Users, Search, Cpu, Key, Terminal, FileDown, Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { exportArchitecturePdf } from '../utils/exportPdf';
import { downloadArchitectureDiagramImage } from '../utils/diagramImage';

const iconMap: Record<string, any> = {
  Server, Database, Cloud, Shield, Monitor, Bot, Brain, 
  CreditCard, BookOpen, CheckSquare, TrendingUp, ExternalLink, Video, 
  PieChart, Lock, Users, Search, Cpu, Key, Terminal, Image
};

const CustomNode = ({ data }: any) => {
  const Icon = iconMap[data.icon] || Server;
  
  let bgClass = 'bg-navy-800 border-slate-600';
  let textClass = 'text-slate-200';
  let iconClass = 'text-slate-400';
  let badgeClass = 'bg-slate-700 text-slate-300';
  
  if (data.type === 'frontend') {
    bgClass = 'bg-[#0F2942] border-[#2196FF] shadow-[0_0_15px_rgba(33,150,255,0.25)]';
    iconClass = 'text-[#2196FF]';
    badgeClass = 'bg-[#2196FF]/20 text-[#2196FF] border border-[#2196FF]/30';
  } else if (data.type === 'backend') {
    bgClass = 'bg-[#0A2617] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    iconClass = 'text-[#10B981]';
    badgeClass = 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30';
  } else if (data.type === 'database') {
    bgClass = 'bg-[#2E1A0F] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.25)]';
    iconClass = 'text-[#F59E0B]';
    badgeClass = 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30';
  } else if (data.type === 'storage') {
    bgClass = 'bg-[#1B2533] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]';
    iconClass = 'text-[#00E5FF]';
    badgeClass = 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30';
  } else if (data.type === 'ai') {
    bgClass = 'bg-[#2A103D] border-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.25)]';
    iconClass = 'text-[#A855F7]';
    badgeClass = 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30';
  } else if (data.type === 'external') {
    bgClass = 'bg-[#161F2E] border-slate-500 shadow-[0_0_10px_rgba(100,116,139,0.2)]';
    iconClass = 'text-slate-300';
    badgeClass = 'bg-slate-700/50 text-slate-300 border border-slate-600';
  }

  return (
    <div className={`px-4 py-3 rounded-xl border-2 shadow-lg min-w-[170px] max-w-[240px] ${bgClass}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 rounded-full bg-slate-400 border-2 border-navy-900" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-black/30 ${iconClass} shrink-0`}>
          <Icon size={18} />
        </div>
        <div className="overflow-hidden">
          <div className={`text-[9px] font-bold uppercase tracking-wider mb-0.5 ${badgeClass} inline-block px-1.5 py-0.5 rounded leading-none`}>
            {data.type}
          </div>
          <div className={`font-bold text-xs ${textClass} leading-tight truncate`}>{data.label}</div>
          {data.sublabel && (
            <div className="text-[10px] text-slate-400 mt-1 font-mono tracking-tight leading-tight truncate" title={data.sublabel}>
              {data.sublabel}
            </div>
          )}
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
  const [isExporting, setIsExporting] = useState(false);

  // Re-init nodes/edges when scenario changes
  useEffect(() => {
    setSelectedNode(null);
  }, [currentScenario.id]);

  const onNodeClick = useCallback((_: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        exportArchitecturePdf(currentScenario, isRefined);
      } catch (err) {
        console.error('Failed to export PDF:', err);
      } finally {
        setIsExporting(false);
      }
    }, 200);
  };

  const handleDownloadImage = () => {
    downloadArchitectureDiagramImage(
      architectureNodesState,
      architectureEdgesState,
      currentScenario.id,
      currentScenario.projectName
    );
  };

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
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadImage}
            className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 border border-slate-600 text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-md active:scale-95"
            title="Download high-resolution PNG image of the architecture topology"
          >
            <Image size={16} className="text-cyan" />
            <span>Export Image (PNG)</span>
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 border border-slate-600 text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
            title="Download comprehensive PDF architecture blueprint with embedded visual topology"
          >
            {isExporting ? (
              <>
                <FileDown size={16} className="animate-bounce text-primary-light" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download size={16} className="text-primary-light" />
                <span>Export Blueprint (PDF)</span>
              </>
            )}
          </button>
          <button 
            onClick={() => navigate('/validation')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg glow-primary"
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
        <div className="w-[420px] max-w-[40vw] flex-shrink-0 bg-navy-800/90 backdrop-blur-md border-l border-slate-700/60 flex flex-col">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div 
                key={`detail-${selectedNode.id}`}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="p-6 h-full flex flex-col overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-4 border-b border-slate-700/50 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-light bg-primary/20 px-2 py-0.5 rounded border border-primary/30 inline-block mb-1.5">
                      {selectedNode.data.type}
                    </span>
                    <h2 className="text-xl font-bold text-white">{selectedNode.data.label}</h2>
                    {selectedNode.data.sublabel && (
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedNode.data.sublabel}</p>
                    )}
                  </div>
                  <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white mt-1 shrink-0 p-1 rounded hover:bg-slate-700/50">
                    <X size={20} />
                  </button>
                </div>
                
                {nodeDetails[selectedNode.id] ? (
                  <div className="space-y-5 flex-1 pr-1">
                    {/* Purpose */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Purpose & Role</h4>
                      <p className="text-sm text-slate-300 leading-relaxed bg-navy-900/60 p-3 rounded-lg border border-slate-700/50">
                        {nodeDetails[selectedNode.id].purpose}
                      </p>
                    </div>

                    {/* Database Tables & Schema (if present) */}
                    {nodeDetails[selectedNode.id].tables && (
                      <div>
                        <h4 className="text-xs font-bold text-warning mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <Database size={14} /> Database Tables & Schema Definition
                        </h4>
                        <div className="space-y-2">
                          {nodeDetails[selectedNode.id].tables!.map((tableDesc: string, idx: number) => (
                            <div key={idx} className="bg-navy-900 border border-warning/30 p-2.5 rounded-lg text-xs font-mono text-slate-200 leading-relaxed shadow-sm">
                              {tableDesc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* RBAC & Access Control (if present) */}
                    {nodeDetails[selectedNode.id].accessControl && (
                      <div>
                        <h4 className="text-xs font-bold text-primary-light mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                          <Lock size={14} /> RBAC & Access Control Rules
                        </h4>
                        <div className="bg-navy-900/80 border border-primary/30 p-2.5 rounded-lg text-xs font-mono text-cyan leading-relaxed">
                          {nodeDetails[selectedNode.id].accessControl}
                        </div>
                      </div>
                    )}

                    {/* API Endpoints (if present) */}
                    {nodeDetails[selectedNode.id].endpoints && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal size={14} /> Key API Endpoints
                        </h4>
                        <div className="space-y-1.5">
                          {nodeDetails[selectedNode.id].endpoints!.map((ep: string, idx: number) => (
                            <div key={idx} className="bg-navy-900 border border-slate-700/70 p-2 rounded text-[11px] font-mono text-slate-300">
                              {ep}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technology */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Technology Stack</h4>
                      <div className="bg-navy-900 border border-slate-700 px-3 py-2 rounded-md text-sm text-cyan font-mono">
                        {nodeDetails[selectedNode.id].technology}
                      </div>
                    </div>

                    {/* Integration */}
                    {nodeDetails[selectedNode.id].integration && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Integration & Data Flow</h4>
                        <p className="text-sm text-slate-300 bg-navy-900/40 p-2.5 rounded border border-slate-700/40 leading-relaxed">
                          {nodeDetails[selectedNode.id].integration}
                        </p>
                      </div>
                    )}

                    {/* Security */}
                    {nodeDetails[selectedNode.id].security && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Security & Privacy</h4>
                        <p className="text-sm text-slate-300 flex items-start gap-2 bg-success/5 border border-success/20 p-2.5 rounded">
                          <Shield size={16} className="text-success shrink-0 mt-0.5" />
                          <span>{nodeDetails[selectedNode.id].security}</span>
                        </p>
                      </div>
                    )}

                    {/* Scaling */}
                    {nodeDetails[selectedNode.id].scaling && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Scaling & Performance</h4>
                        <p className="text-sm text-slate-300 flex items-start gap-2 bg-primary/5 border border-primary/20 p-2.5 rounded">
                          <TrendingUp size={16} className="text-primary-light shrink-0 mt-0.5" />
                          <span>{nodeDetails[selectedNode.id].scaling}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <Server size={32} className="text-slate-600 mb-3" />
                    <p className="text-slate-500 text-sm">Select any component on the canvas to inspect its database tables, RBAC rules, and API endpoints.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key={`summary-${currentScenario.id}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="p-6 h-full flex flex-col overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-2 border-b border-slate-700/50 pb-3">
                  <h2 className="text-lg font-bold text-white">Architecture Summary</h2>
                  <div className="flex gap-1.5">
                    <button
                      onClick={handleDownloadImage}
                      className="flex items-center gap-1 text-xs text-cyan hover:text-white bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 px-2 py-1 rounded transition-colors"
                      title="Download PNG image"
                    >
                      <Image size={12} /> PNG
                    </button>
                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center gap-1 text-xs text-primary-light hover:text-white bg-primary/10 hover:bg-primary/20 border border-primary/30 px-2 py-1 rounded transition-colors"
                      title="Download PDF"
                    >
                      <Download size={12} /> PDF
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-4">Click any node on the blueprint to inspect its core database tables, RBAC rules, and endpoints.</p>
                
                <div className="space-y-4 flex-1 pr-1">
                  <div className="bg-navy-900 border border-slate-700 rounded-lg p-3">
                    <span className="text-xs text-slate-500 block mb-1">Architecture Pattern</span>
                    <span className="text-sm font-semibold text-white">Multi-Tier Microservices with Isolated DB Tables</span>
                  </div>

                  {Object.entries(technologyStack).map(([key, val]) => (
                    <div key={key} className="bg-navy-900/50 border border-slate-700/50 p-2.5 rounded-lg">
                      <span className="text-[11px] font-bold text-slate-400 block mb-0.5 uppercase tracking-wider">{key}</span>
                      <span className="text-sm font-medium text-slate-200">{val as string}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-success font-medium text-sm">
                    <CheckSquare size={18} /> Verified In-Depth Architecture
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
