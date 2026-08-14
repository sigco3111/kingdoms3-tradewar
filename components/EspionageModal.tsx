
import React, { useContext } from 'react';
import { GameContext } from '../App';
import Modal from './common/Modal';
import Button from './common/Button';
import { ResourceType, EspionageActionType } from '../types';
import { KOREAN_FACTION_NAMES, KOREAN_ESPIONAGE_ACTION_NAMES, ESPIONAGE_ACTION_CONFIGS, RESOURCE_EMOJIS, KOREAN_RESOURCE_NAMES } from '../constants';

const EspionageModal: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { player, territories, factions, selectedEspionageTargetTerritoryId } = gameState;

  if (!selectedEspionageTargetTerritoryId) return null;

  const territory = territories.find(t => t.id === selectedEspionageTargetTerritoryId);
  if (!territory) return null;
  
  const ownerFaction = factions.find(f => f.id === territory.ownerFactionId);
  const currentInfluence = player.influence[territory.id] || 0;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_ESPIONAGE_MODAL' });
  };

  const handleAction = (actionType: EspionageActionType) => {
    const config = ESPIONAGE_ACTION_CONFIGS[actionType];
    let canAfford = true;
    for (const resKey in config.cost) {
        const resource = resKey as ResourceType;
        if ((player.resources[resource] || 0) < (config.cost[resource] || 0)) {
            canAfford = false;
            break;
        }
    }
    if(!canAfford){
        alert("비용이 부족합니다.");
        return;
    }
    dispatch({ type: 'PLAYER_EXECUTE_ESPIONAGE_ACTION', payload: { territoryId: territory.id, actionType } });
  };

  const availableActions = Object.entries(ESPIONAGE_ACTION_CONFIGS)
    .filter(([_, config]) => currentInfluence >= config.minInfluenceLevel)
    .map(([actionType, config]) => ({
      type: actionType as EspionageActionType,
      config,
    }));

  return (
    <Modal isOpen={true} onClose={handleClose} title={`${territory.name} (${ownerFaction ? KOREAN_FACTION_NAMES[ownerFaction.id] : '주인 없음'}) - 첩보 활동`}>
      <div className="space-y-4">
        <p className="text-sm text-gray-300">현재 영향력: 레벨 {currentInfluence}</p>
        {availableActions.length === 0 && <p className="text-gray-400">수행 가능한 첩보 활동이 없습니다. 영향력을 더 높이세요.</p>}
        {availableActions.map(({ type, config }) => {
          let costString = Object.entries(config.cost)
            .map(([res, val]) => `${val}${RESOURCE_EMOJIS[res as ResourceType]} ${KOREAN_RESOURCE_NAMES[res as ResourceType]}`)
            .join(', ');
          
          let canAffordAction = true;
          for (const resKey in config.cost) {
              const resource = resKey as ResourceType;
              if ((player.resources[resource] || 0) < (config.cost[resource] || 0)) {
                  canAffordAction = false;
                  break;
              }
          }

          return (
            <div key={type} className="p-3 bg-gray-700 rounded-md">
              <h4 className="font-semibold text-yellow-300">{KOREAN_ESPIONAGE_ACTION_NAMES[type]}</h4>
              <p className="text-xs text-gray-400 mb-1">요구 영향력: {config.minInfluenceLevel}레벨</p>
              <p className="text-xs text-gray-300 mb-2">{config.description}</p>
              <Button
                onClick={() => handleAction(type)}
                disabled={!canAffordAction}
                className="w-full"
                size="sm"
              >
                실행 (비용: {costString})
              </Button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default EspionageModal;
