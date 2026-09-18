import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';

// Pages (to be created)
import Dashboard from './pages/Dashboard';
import NewArchitecture from './pages/NewArchitecture';
import RequirementAnalysis from './pages/RequirementAnalysis';
import HybridRAG from './pages/HybridRAG';
import MultiAgentAnalysis from './pages/MultiAgentAnalysis';
import GeneratingBlueprint from './pages/GeneratingBlueprint';
import ArchitectureBlueprint from './pages/ArchitectureBlueprint';
import Insights from './pages/Insights';
import HumanValidation from './pages/HumanValidation';
import FeedbackRefinement from './pages/FeedbackRefinement';
import FinalSummary from './pages/FinalSummary';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="new" element={<NewArchitecture />} />
            <Route path="analysis" element={<RequirementAnalysis />} />
            <Route path="rag" element={<HybridRAG />} />
            <Route path="agents" element={<MultiAgentAnalysis />} />
            <Route path="generating" element={<GeneratingBlueprint />} />
            <Route path="blueprint" element={<ArchitectureBlueprint />} />
            <Route path="insights" element={<Insights />} />
            <Route path="validation" element={<HumanValidation />} />
            <Route path="feedback" element={<FeedbackRefinement />} />
            <Route path="summary" element={<FinalSummary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
