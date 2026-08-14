
import React, { useContext } from 'react';
import { GameContext } from '../App';
import { ControlTab } from '../types';
// Updated imports to reflect current filenames from the prompt
import FactionSupportTab from './FactionSupportTab'; // Corrected filename assuming FactionSupportTab.tsx exports FactionSupportTab
// import MarketTradeTab from './FinanceTab'; // Removed
import BusinessManagementTab from './BusinessManagementTab'; // Corrected filename assuming BusinessManagementTab.tsx exports BusinessManagementTab
// import TerritoryCard from './TerritoryCard'; // TerritoryCard is now part of TerritoryMarketTab
import MissionBoardTab from './MissionBoardTab'; 
import CompetitorStatusTab from './CompetitorStatusTab'; 
import { TerritoryMarketTab } from './TerritoryMarketTab'; // New combined tab component (Changed to named import)
import DashboardTab from './DashboardTab'; // Import the new DashboardTab component

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}> = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex-1 p-2 text-xs sm:text-sm text-center font-medium rounded-t-lg transition-colors duration-150
                ${isActive ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
    aria-pressed={isActive}
    aria-label={`${label} 탭`}
  >
    {icon && <span className="mr-1 sm:mr-2" aria-hidden="true">{icon}</span>}
    {label}
  </button>
);

const ControlPanel: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { activeTab } = gameState;

  const setActiveTab = (tab: ControlTab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };
  
  const tabs: { id: ControlTab; label: string; icon?: React.ReactNode }[] = [
    { id: ControlTab.DASHBOARD, label: '종합 정보', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
    { id: ControlTab.TERRITORY_MARKET, label: '영토/시장', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor"><path d="M10 20a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V9z" clipRule="evenodd" /></svg> }, 
    { id: ControlTab.FACTION_SUPPORT, label: '세력 지원', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg> }, 
    { id: ControlTab.BUSINESS_MANAGEMENT, label: '사업 관리', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.566.379-1.566 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.566 2.6 1.566 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.947-2.287c1.566-.379-1.566-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>},
    { id: ControlTab.MISSIONS, label: '임무', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1zm-1 4a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd" /></svg> },
    { id: ControlTab.COMPETITOR_STATUS, label: '경쟁자 현황', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> }
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl flex flex-col h-full">
      <div className="flex border-b border-gray-700" role="tablist" aria-label="메인 컨트롤 패널">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
      <div className="p-4 flex-grow overflow-y-auto" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeTab === ControlTab.DASHBOARD && <DashboardTab />}
        {activeTab === ControlTab.TERRITORY_MARKET && <TerritoryMarketTab />}
        {activeTab === ControlTab.FACTION_SUPPORT && <FactionSupportTab />}
        {activeTab === ControlTab.BUSINESS_MANAGEMENT && <BusinessManagementTab />}
        {activeTab === ControlTab.MISSIONS && <MissionBoardTab />}
        {activeTab === ControlTab.COMPETITOR_STATUS && <CompetitorStatusTab />}
      </div>
    </div>
  );
};

export default ControlPanel;