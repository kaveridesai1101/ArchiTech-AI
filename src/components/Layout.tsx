import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusSquare, 
  ListChecks, 
  Search, 
  Network, 
  Layers, 
  Lightbulb, 
  UserCheck, 
  MessageSquare,
  Bell,
  Settings,
  User
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary/20 text-primary-light border border-primary/30 shadow-[0_0_10px_rgba(33,150,255,0.2)]' 
            : 'text-slate-400 hover:bg-navy-800 hover:text-slate-200'
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  );
};

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-navy-900 overflow-hidden text-slate-200">
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-navy-800/50 border-r border-slate-700/50 flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="text-primary-light" size={28} />
              ArchiTech <span className="text-primary-light text-sm bg-primary/20 px-2 py-0.5 rounded-full ml-1">AI</span>
            </h1>
          </div>
          
          <nav className="px-4 space-y-1.5 mt-4">
            <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem to="/new" icon={PlusSquare} label="New Architecture" />
            <SidebarItem to="/analysis" icon={ListChecks} label="Requirement Analysis" />
            <SidebarItem to="/rag" icon={Search} label="Hybrid RAG" />
            <SidebarItem to="/agents" icon={Network} label="Multi-Agent Analysis" />
            <SidebarItem to="/blueprint" icon={Layers} label="Architecture Blueprint" />
            <SidebarItem to="/insights" icon={Lightbulb} label="Insights" />
            <SidebarItem to="/validation" icon={UserCheck} label="Human Validation" />
            <SidebarItem to="/feedback" icon={MessageSquare} label="Feedback Refinement" />
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs font-semibold">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            AI SYSTEM ONLINE
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 bg-navy-800/30 border-b border-slate-700/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-300">ArchiTech AI</h2>
          </div>
          
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-white transition-colors"><Bell size={20} /></button>
            <button className="hover:text-white transition-colors"><Settings size={20} /></button>
            <button className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors text-white">
              <User size={18} />
            </button>
          </div>
        </header>
        
        {/* Workflow Progress (only on specific pages) */}
        {location.pathname !== '/' && location.pathname !== '/summary' && (
          <div className="px-8 py-3 bg-navy-800/20 border-b border-slate-700/30 text-xs font-semibold text-slate-500 flex gap-2 items-center overflow-x-auto whitespace-nowrap z-10">
            <span className={location.pathname === '/new' ? 'text-primary-light' : 'text-slate-300'}>INPUT</span>
            <span className="text-slate-600">→</span>
            <span className={location.pathname === '/analysis' ? 'text-primary-light' : 'text-slate-300'}>ANALYSIS</span>
            <span className="text-slate-600">→</span>
            <span className={location.pathname === '/rag' ? 'text-primary-light' : 'text-slate-300'}>RAG</span>
            <span className="text-slate-600">→</span>
            <span className={location.pathname === '/agents' ? 'text-primary-light' : 'text-slate-300'}>AGENTS</span>
            <span className="text-slate-600">→</span>
            <span className={location.pathname === '/generating' || location.pathname === '/blueprint' ? 'text-primary-light' : 'text-slate-300'}>BLUEPRINT</span>
            <span className="text-slate-600">→</span>
            <span className={location.pathname === '/validation' ? 'text-primary-light' : 'text-slate-300'}>VALIDATION</span>
            <span className="text-slate-600">→</span>
            <span className={location.pathname === '/feedback' ? 'text-primary-light' : 'text-slate-300'}>REFINEMENT</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
