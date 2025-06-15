

import React, { useReducer, useEffect, createContext, Dispatch, useCallback, useState } from 'react';
import { GameState, GameAction, FactionId, ControlTab, ResourceType, PlayerState, MerchantStandingLevel, AIMerchant, Territory, MarketState, ArmyUnits } from './types';
import { INITIAL_GAME_STATE, KOREAN_FACTION_NAMES, INITIAL_PLAYER_STATE, INITIAL_AI_MERCHANTS, KOREAN_RESOURCE_NAMES, INITIAL_MARKET_STATE, INITIAL_ARMY_UNITS } from './constants';
import { gameReducer } from './services/gameService';
import Header from './components/Header';
import MapView from './components/MapView';
import ControlPanel from './components/ControlPanel';
import EventLog from './components/EventLog';
import useLocalStorage from './hooks/useLocalStorage';
import GameOverModal from './components/GameOverModal';
import EspionageModal from './components/EspionageModal';
import ConfirmationModal from './components/common/ConfirmationModal'; // Added import
import PriceTrendModal from './components/PriceTrendModal'; // Import PriceTrendModal


export const GameContext = createContext<{
  gameState: GameState;
  dispatch: Dispatch<GameAction>;
  openPriceTrendModal: (territoryId: string, resource: ResourceType) => void; // Added for PriceTrendModal
} | null>(null);


const App: React.FC = () => {
  const [storedGameState, setStoredGameState] = useLocalStorage<GameState | null>('threeKingdomsMerchantPrinceState_v2.10', null); 
  const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState(false); 
  
  const [isPriceTrendModalOpen, setIsPriceTrendModalOpen] = useState(false);
  const [selectedTerritoryForTrend, setSelectedTerritoryForTrend] = useState<Territory | undefined>(undefined);
  const [selectedResourceForTrend, setSelectedResourceForTrend] = useState<ResourceType | null>(null);
  
  const getInitialState = (): GameState => {
    if (storedGameState) {
      let playerStateToUse: PlayerState = INITIAL_PLAYER_STATE;
      if (storedGameState.player) {
         playerStateToUse = {
          ...INITIAL_PLAYER_STATE, 
          resources: {
            ...INITIAL_PLAYER_STATE.resources,
            ...(storedGameState.player.resources || {}),
          },
          favoredFactionId: storedGameState.player.favoredFactionId !== undefined ? storedGameState.player.favoredFactionId : INITIAL_PLAYER_STATE.favoredFactionId,
          totalWealthHistory: storedGameState.player.totalWealthHistory || INITIAL_PLAYER_STATE.totalWealthHistory,
          influence: storedGameState.player.influence || INITIAL_PLAYER_STATE.influence, 
          factionRelations: storedGameState.player.factionRelations || INITIAL_PLAYER_STATE.factionRelations, 
          merchantStanding: storedGameState.player.merchantStanding || INITIAL_PLAYER_STATE.merchantStanding, 
          slanderEffects: storedGameState.player.slanderEffects || [],
          temporaryTradeAdvantages: storedGameState.player.temporaryTradeAdvantages || [], 
        };
      }

      const loadedAIMerchants = storedGameState.aiMerchants || [];
      const currentAIMerchants = INITIAL_AI_MERCHANTS.map(defaultMerchant => {
        const loadedMerchant = loadedAIMerchants.find(lm => lm.id === defaultMerchant.id);
        if (loadedMerchant) {
          return {
            ...defaultMerchant, 
            ...loadedMerchant, 
            resources: { 
                ...defaultMerchant.resources,
                ...(loadedMerchant.resources || {}),
            },
            totalWealthHistory: loadedMerchant.totalWealthHistory && loadedMerchant.totalWealthHistory.length > 0 ? loadedMerchant.totalWealthHistory : defaultMerchant.totalWealthHistory,
            merchantStanding: loadedMerchant.merchantStanding || defaultMerchant.merchantStanding,
            lastActionLog: loadedMerchant.lastActionLog || defaultMerchant.lastActionLog,
            slanderEffects: loadedMerchant.slanderEffects || [],
          };
        }
        return defaultMerchant;
      });

      const updatedTerritories = INITIAL_GAME_STATE.territories.map(defaultTerritory => {
        const loadedTerritory = storedGameState.territories.find(lt => lt.id === defaultTerritory.id);
        if (loadedTerritory) {
            return {
                ...defaultTerritory,
                ...loadedTerritory,
                garrison: { 
                    ...(defaultTerritory.garrison || INITIAL_ARMY_UNITS), 
                    ...(loadedTerritory.garrison || {} as Partial<ArmyUnits>),      
                },
                localMarketPrices: { 
                    ...defaultTerritory.localMarketPrices, 
                    ...(loadedTerritory.localMarketPrices || {}), 
                },
                specialBuilding: loadedTerritory.specialBuilding || null,
                localMarketPriceHistory: loadedTerritory.localMarketPriceHistory || defaultTerritory.localMarketPriceHistory || {}, 
            };
        }
        return defaultTerritory;
      });

      const marketStateToUse: MarketState = {
        ...INITIAL_MARKET_STATE,
        temporaryPriceModifiers: storedGameState.market?.temporaryPriceModifiers || {},
        marketSignals: storedGameState.market?.marketSignals || [], 
        activeMisinformation: storedGameState.market?.activeMisinformation || [], 
      };
      
      const validControlTabs = Object.values(ControlTab);
      const activeTabToUse = validControlTabs.includes(storedGameState.activeTab) ? storedGameState.activeTab : INITIAL_GAME_STATE.activeTab;

      return {
        ...INITIAL_GAME_STATE, 
        ...storedGameState,    
        player: playerStateToUse, 
        territories: updatedTerritories,
        activeTab: activeTabToUse,
        selectedEspionageTargetTerritoryId: null, 
        activeEconomicEvents: storedGameState.activeEconomicEvents || [], 
        availableMissions: storedGameState.availableMissions || [], 
        acceptedMissions: storedGameState.acceptedMissions || [],   
        factions: INITIAL_GAME_STATE.factions.map(defaultFaction => {
            const loadedFaction = storedGameState.factions.find(lf => lf.id === defaultFaction.id);
            if (loadedFaction) {
                return {
                    ...defaultFaction,
                    ...loadedFaction,
                    resources: { 
                        ...defaultFaction.resources,
                        ...(loadedFaction.resources || {}),
                    }
                };
            }
            return defaultFaction;
        }),
        market: marketStateToUse,
        aiMerchants: currentAIMerchants,
        activeFactionPolicies: storedGameState.activeFactionPolicies || [], 
        activeWars: storedGameState.activeWars || [], 
        isDelegationActive: storedGameState.isDelegationActive || false,
        isFavoredFactionDelegationActive: storedGameState.isFavoredFactionDelegationActive || false, // Load new state
      };
    }
    return INITIAL_GAME_STATE;
  };

  const [gameState, dispatch] = useReducer(gameReducer, getInitialState());

  useEffect(() => {
    setStoredGameState(gameState);
  }, [gameState, setStoredGameState]);

  const handleNextTurn = useCallback(() => {
    if (gameState.gameOver) return;
    dispatch({ type: 'NEXT_TURN' });
  }, [gameState.gameOver, dispatch]);
  
  const handleResetGame = () => {
    setIsResetConfirmModalOpen(true);
  };

  const handleConfirmReset = () => {
    setStoredGameState(null); 
    dispatch({ type: 'RESET_GAME' });
  };

  const handleToggleDelegation = useCallback(() => {
    dispatch({ type: 'TOGGLE_DELEGATION' });
  }, [dispatch]);

  const handleToggleFavoredFactionDelegation = useCallback(() => {
    dispatch({ type: 'TOGGLE_FAVORED_FACTION_DELEGATION' });
  }, [dispatch]);

  const handleOpenPriceTrendModal = useCallback((territoryId: string, resource: ResourceType) => {
    const territory = gameState.territories.find(t => t.id === territoryId);
    if (territory) {
      setSelectedTerritoryForTrend(territory);
      setSelectedResourceForTrend(resource);
      setIsPriceTrendModalOpen(true);
    }
  }, [gameState.territories]);

  const handleClosePriceTrendModal = () => {
    setIsPriceTrendModalOpen(false);
    setSelectedTerritoryForTrend(undefined);
    setSelectedResourceForTrend(null);
  };

  useEffect(() => {
    let timeoutId: number;
    if (gameState.isDelegationActive && !gameState.gameOver) {
      timeoutId = window.setTimeout(() => {
        handleNextTurn();
      }, 1000); 
    }
    return () => clearTimeout(timeoutId);
  }, [gameState.turn, gameState.isDelegationActive, gameState.gameOver, handleNextTurn]);


  if (!gameState.player) {
    return <div className="p-4 text-red-500">오류: 플레이어 데이터를 로드할 수 없습니다. 게임을 초기화해보세요.
     <button 
            onClick={handleResetGame}
            className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            게임 초기화
      </button>
    </div>;
  }

  return (
    <GameContext.Provider value={{ gameState, dispatch, openPriceTrendModal: handleOpenPriceTrendModal }}>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <Header 
          onNextTurn={handleNextTurn}
          isGameOver={gameState.gameOver}
          isDelegationActive={gameState.isDelegationActive}
          onToggleDelegation={handleToggleDelegation}
          isFavoredFactionDelegationActive={gameState.isFavoredFactionDelegationActive}
          onToggleFavoredFactionDelegation={handleToggleFavoredFactionDelegation}
        />
        <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-2/3 flex flex-col gap-4">
            <MapView />
            <EventLog />
          </div>
          <div className="lg:w-1/3 flex flex-col gap-4">
            <ControlPanel />
          </div>
        </main>
        <footer className="p-4 text-center border-t border-gray-700">
          <button 
            onClick={handleResetGame} 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            게임 초기화
          </button>
          <p className="text-xs text-gray-500 mt-2">삼국지 : 무역전쟁 v1.3.1</p>
        </footer>
        {gameState.gameOver && gameState.victoriousFactionId && (
            <GameOverModal 
                victoriousFactionName={KOREAN_FACTION_NAMES[gameState.victoriousFactionId as FactionId] || "알 수 없는 세력"}
                playerWealth={gameState.player.totalWealthHistory[gameState.player.totalWealthHistory.length -1]?.wealth || 0}
                onReset={handleResetGame} 
            />
        )}
        {gameState.selectedEspionageTargetTerritoryId && <EspionageModal />}
        <ConfirmationModal
          isOpen={isResetConfirmModalOpen}
          onClose={() => setIsResetConfirmModalOpen(false)}
          onConfirm={handleConfirmReset}
          title="게임 초기화 확인"
          message="정말로 게임을 초기화하시겠습니까? 현재 진행 상황이 모두 사라집니다."
          confirmText="초기화"
          cancelText="취소"
        />
        {isPriceTrendModalOpen && selectedTerritoryForTrend && selectedResourceForTrend && (
          <PriceTrendModal
            isOpen={isPriceTrendModalOpen}
            onClose={handleClosePriceTrendModal}
            territory={selectedTerritoryForTrend}
            resource={selectedResourceForTrend}
            currentTurn={gameState.turn}
          />
        )}
      </div>
    </GameContext.Provider>
  );
};

export default App;