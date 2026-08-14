
import React, { useContext } from 'react';
import { GameContext } from '../App';
import { FactionId, ResourceType } from '../types';
import { RESOURCE_EMOJIS, KOREAN_RESOURCE_NAMES, KOREAN_FACTION_NAMES } from '../constants';
import NextTurnButton from './NextTurnButton';

interface HeaderProps {
  onNextTurn: () => void;
  isGameOver: boolean;
  isDelegationActive: boolean;
  onToggleDelegation: () => void;
  isFavoredFactionDelegationActive: boolean;
  onToggleFavoredFactionDelegation: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    onNextTurn, 
    isGameOver, 
    isDelegationActive, 
    onToggleDelegation,
    isFavoredFactionDelegationActive,
    onToggleFavoredFactionDelegation 
}) => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { player, factions } = gameState;

  if (!player) return null;

  const handleFavoredFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const factionId = e.target.value as FactionId | 'NONE';
    dispatch({ type: 'PLAYER_SET_FAVORED_FACTION', payload: factionId === 'NONE' ? null : factionId });
  };
  
  const aiFactions = factions.filter(f => f.id !== FactionId.NEUTRAL);

  return (
    <header className="bg-gray-800 p-4 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-y-3 gap-x-4">
        <h1 className="text-xl lg:text-3xl font-bold text-yellow-400">삼국지 : 무역전쟁</h1>
        
        <div className="flex items-center gap-x-4">
          <div className="text-lg">턴: <span className="font-semibold text-green-400">{gameState.turn}</span></div>
          <NextTurnButton onNextTurn={onNextTurn} disabled={isGameOver || isDelegationActive} />
        </div>

        <div className="flex items-center gap-x-3">
          <label htmlFor="delegationToggle" className="text-sm font-medium text-gray-300 cursor-pointer">자동 위임:</label>
          <button
            id="delegationToggle"
            onClick={onToggleDelegation}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              isDelegationActive ? 'bg-green-500' : 'bg-gray-600'
            }`}
            role="switch"
            aria-checked={isDelegationActive}
            title={isDelegationActive ? "자동 위임 활성 (턴 자동 진행)" : "자동 위임 비활성"}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                isDelegationActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
           {isDelegationActive && <span className="text-xs text-green-400 animate-pulse">자동 진행 중...</span>}
        </div>

        <div className="flex items-center gap-x-3">
          <label htmlFor="favoredFactionDelegationToggle" className="text-sm font-medium text-gray-300 cursor-pointer">주요 세력 자동 선정:</label>
          <button
            id="favoredFactionDelegationToggle"
            onClick={onToggleFavoredFactionDelegation}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              isFavoredFactionDelegationActive ? 'bg-green-500' : 'bg-gray-600'
            }`}
            role="switch"
            aria-checked={isFavoredFactionDelegationActive}
            title={isFavoredFactionDelegationActive ? "주요 지원 세력 자동 선정 활성" : "주요 지원 세력 자동 선정 비활성"}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                isFavoredFactionDelegationActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
           {isFavoredFactionDelegationActive && <span className="text-xs text-green-400 animate-pulse">자동 선정 중...</span>}
        </div>
        
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="favoredFaction" className="text-sm font-medium text-gray-300 whitespace-nowrap">주요 지원 세력:</label>
            <select 
                id="favoredFaction"
                value={player.favoredFactionId || 'NONE'}
                onChange={handleFavoredFactionChange}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md p-1.5 focus:ring-yellow-500 focus:border-yellow-500"
                disabled={isFavoredFactionDelegationActive && isDelegationActive} // Disable if both auto-delegations are on
                title={isFavoredFactionDelegationActive && isDelegationActive ? "주요 세력 자동 선정 활성화 중에는 수동 변경 불가" : ""}
            >
                <option value="NONE">없음</option>
                {aiFactions.map(f => (
                    <option key={f.id} value={f.id} style={{ color: f.color }}>
                        {KOREAN_FACTION_NAMES[f.id]}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 sm:mt-0" title="나의 자산">
          <span className="font-semibold text-sky-400">상인 자산:</span>
          {Object.values(ResourceType).map(resource => (
             player.resources[resource] !== undefined && KOREAN_RESOURCE_NAMES[resource] && RESOURCE_EMOJIS[resource] && (
              <div key={resource} className="flex items-center" title={KOREAN_RESOURCE_NAMES[resource]}>
                <span className="text-xl">{RESOURCE_EMOJIS[resource]}</span>
                <span className="ml-1 text-sm">{player.resources[resource] || 0}</span>
              </div>
             )
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
