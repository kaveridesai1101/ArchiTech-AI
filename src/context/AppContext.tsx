import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { scenarios } from '../data/demoScenarios';
import type { ScenarioId, Scenario } from '../data/demoScenarios';

interface AppContextType {
  isRefined: boolean;
  setIsRefined: (value: boolean) => void;
  currentScenarioId: ScenarioId;
  setCurrentScenarioId: (value: ScenarioId) => void;
  currentScenario: Scenario;
  hasGenerated: boolean;
  setHasGenerated: (value: boolean) => void;
  pendingInputText: string;
  setPendingInputText: (value: string) => void;
  editedArchitecture: any;
  setEditedArchitecture: (value: any) => void;
  architectureNodesState: any[];
  setArchitectureNodesState: (value: any[]) => void;
  architectureEdgesState: any[];
  setArchitectureEdgesState: (value: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentScenarioId, setCurrentScenarioId] = useState<ScenarioId>('online-learning');
  const [isRefined, setIsRefined] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [pendingInputText, setPendingInputText] = useState('');
  const [editedArchitecture, setEditedArchitecture] = useState(null);
  
  const currentScenario = scenarios[currentScenarioId];

  // Local state for nodes/edges so we can modify them if refined
  const [architectureNodesState, setArchitectureNodesState] = useState([...currentScenario.architectureNodes]);
  const [architectureEdgesState, setArchitectureEdgesState] = useState([...currentScenario.architectureEdges]);

  // Update nodes/edges when scenario changes or refinement state changes
  useEffect(() => {
    if (isRefined) {
      setArchitectureNodesState([...currentScenario.refinedArchitectureNodes]);
      setArchitectureEdgesState([...currentScenario.refinedArchitectureEdges]);
    } else {
      setArchitectureNodesState([...currentScenario.architectureNodes]);
      setArchitectureEdgesState([...currentScenario.architectureEdges]);
    }
  }, [currentScenarioId, isRefined, currentScenario]);

  const handleSetScenarioId = (id: ScenarioId) => {
    setCurrentScenarioId(id);
    setIsRefined(false);
  };

  return (
    <AppContext.Provider value={{
      isRefined, setIsRefined,
      currentScenarioId, setCurrentScenarioId: handleSetScenarioId,
      currentScenario,
      hasGenerated, setHasGenerated,
      pendingInputText, setPendingInputText,
      editedArchitecture, setEditedArchitecture,
      architectureNodesState, setArchitectureNodesState,
      architectureEdgesState, setArchitectureEdgesState
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
