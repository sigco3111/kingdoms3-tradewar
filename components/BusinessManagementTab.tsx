
import React, { useContext } from 'react';
import { GameContext } from '../App';
import { FactionId, ResourceType, RelationshipLevel } from '../types';
import { KOREAN_FACTION_NAMES, MAX_INFLUENCE_LEVEL, INFLUENCE_ESTABLISH_COST_GOLD, INFLUENCE_UPGRADE_COST_GOLD_PER_LEVEL, RESOURCE_EMOJIS, KOREAN_RELATIONSHIP_LEVEL_NAMES, KOREAN_MERCHANT_STANDING_NAMES } from '../constants';
import Button from './common/Button';
import { getRelationshipLevel } from '../services/gameService'; // Import helper

const BusinessManagementTab: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { player, factions, territories } = gameState;

  if (!player) return <p>플레이어 데이터를 찾을 수 없습니다.</p>;

  const handleFavoredFactionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const factionId = e.target.value as FactionId | 'NONE';
    dispatch({ type: 'PLAYER_SET_FAVORED_FACTION', payload: factionId === 'NONE' ? null : factionId });
  };
  
  const aiFactions = factions.filter(f => f.id !== FactionId.NEUTRAL);
  const aiOwnedTerritories = territories.filter(t => t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL);

  const handleEstablishInfluence = (territoryId: string) => {
    const territory = territories.find(t => t.id === territoryId);
    if (!territory || !territory.ownerFactionId) return;

    const ownerFactionId = territory.ownerFactionId;
    const relationshipScore = player.factionRelations[ownerFactionId] || 0;
    if (getRelationshipLevel(relationshipScore) === RelationshipLevel.HOSTILE) {
      alert(`${KOREAN_FACTION_NAMES[ownerFactionId]} 세력과 적대적이어서 영향력을 구축할 수 없습니다.`);
      return;
    }

    if (player.resources[ResourceType.GOLD] >= INFLUENCE_ESTABLISH_COST_GOLD) {
      dispatch({ type: 'PLAYER_ESTABLISH_INFLUENCE', payload: { territoryId } });
    } else {
      alert(`${RESOURCE_EMOJIS.Gold} 금이 부족합니다.`);
    }
  };

  const handleUpgradeInfluence = (territoryId: string, currentLevel: number) => {
    const territory = territories.find(t => t.id === territoryId);
     if (!territory || !territory.ownerFactionId) return;

    const ownerFactionId = territory.ownerFactionId;
    const relationshipScore = player.factionRelations[ownerFactionId] || 0;
    if (getRelationshipLevel(relationshipScore) === RelationshipLevel.HOSTILE) {
      alert(`${KOREAN_FACTION_NAMES[ownerFactionId]} 세력과 적대적이어서 영향력을 확대할 수 없습니다.`);
      return;
    }

    const cost = INFLUENCE_UPGRADE_COST_GOLD_PER_LEVEL[currentLevel + 1];
    if (cost && player.resources[ResourceType.GOLD] >= cost) {
      dispatch({ type: 'PLAYER_UPGRADE_INFLUENCE', payload: { territoryId } });
    } else {
      alert(`${RESOURCE_EMOJIS.Gold} 금이 부족하거나 최대 레벨입니다.`);
    }
  };
  
  const handleOpenEspionageModal = (territoryId: string) => {
    dispatch({ type: 'OPEN_ESPIONAGE_MODAL', payload: territoryId });
  };

  const getRelationshipBarColor = (level: RelationshipLevel): string => {
    switch (level) {
      case RelationshipLevel.HOSTILE: return 'bg-red-700';
      case RelationshipLevel.UNFRIENDLY: return 'bg-red-500';
      case RelationshipLevel.NEUTRAL: return 'bg-gray-500';
      case RelationshipLevel.FRIENDLY: return 'bg-green-500';
      case RelationshipLevel.ALLIED: return 'bg-green-700';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-yellow-400">사업 관리 및 대외 관계</h3>
        <p className="text-sm text-gray-300">
          상인으로서 당신의 장기적인 사업 방향, 영향력 및 세력과의 관계를 관리합니다.
        </p>
         <p className="text-sm text-sky-400 mt-1">나의 평판: <span className="font-bold">{KOREAN_MERCHANT_STANDING_NAMES[player.merchantStanding]}</span></p>
      </div>
      
      <div className="p-3 bg-gray-700 rounded">
        <label htmlFor="favoredFactionBusiness" className="block font-medium mb-1 text-gray-200">
          주요 지원 세력:
        </label>
        <select
          id="favoredFactionBusiness"
          value={player.favoredFactionId || 'NONE'}
          onChange={handleFavoredFactionChange}
          className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
        >
          <option value="NONE">특정 세력 없음</option>
          {aiFactions.map(f => (
            <option key={f.id} value={f.id}>
              {KOREAN_FACTION_NAMES[f.id]}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-2">
          선택한 세력과의 활동 시 관계 변화에 일부 보너스가 적용될 수 있습니다.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">세력 관계 현황</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {aiFactions.map(faction => {
            const relationScore = player.factionRelations[faction.id] || 0;
            const relationLevel = getRelationshipLevel(relationScore);
            return (
              <div key={faction.id} className="p-2 bg-gray-700 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-100">{KOREAN_FACTION_NAMES[faction.id]}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getRelationshipBarColor(relationLevel)} text-white`}>
                    {KOREAN_RELATIONSHIP_LEVEL_NAMES[relationLevel]} ({relationScore})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">지역 영향력 관리 (첩보 활동)</h3>
        {aiOwnedTerritories.length === 0 && <p className="text-sm text-gray-400">AI 세력이 소유한 영토가 없습니다.</p>}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {aiOwnedTerritories.map(territory => {
            const currentInfluence = player.influence[territory.id] || 0;
            const ownerFaction = factions.find(f => f.id === territory.ownerFactionId);
             if (!ownerFaction) return null; // Should not happen with aiOwnedTerritories filter

            const relationshipScore = player.factionRelations[ownerFaction.id] || 0;
            const relationshipLevel = getRelationshipLevel(relationshipScore);
            
            const canEstablish = currentInfluence === 0 && relationshipLevel !== RelationshipLevel.HOSTILE;
            const canUpgrade = currentInfluence > 0 && currentInfluence < MAX_INFLUENCE_LEVEL && relationshipLevel !== RelationshipLevel.HOSTILE;
            const upgradeCost = canUpgrade ? INFLUENCE_UPGRADE_COST_GOLD_PER_LEVEL[currentInfluence + 1] : 0;

            let hostileWarning = '';
            if (relationshipLevel === RelationshipLevel.HOSTILE && (currentInfluence === 0 || (currentInfluence > 0 && currentInfluence < MAX_INFLUENCE_LEVEL))) {
                hostileWarning = ` (${KOREAN_FACTION_NAMES[ownerFaction.id]}과 적대적)`;
            }

            return (
              <div key={territory.id} className="p-3 bg-gray-700 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="font-medium text-gray-100">{territory.name} ({KOREAN_FACTION_NAMES[ownerFaction.id]})</span>
                    <span className={`text-xs ml-2 ${getRelationshipBarColor(relationshipLevel)} text-white px-1.5 py-0.5 rounded`}>{KOREAN_RELATIONSHIP_LEVEL_NAMES[relationshipLevel]}</span>
                  </div>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${currentInfluence > 0 ? 'bg-cyan-600 text-cyan-100' : 'bg-gray-500 text-gray-200'}`}>
                    영향력: {currentInfluence}레벨
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  {currentInfluence === 0 && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => handleEstablishInfluence(territory.id)}
                      disabled={!canEstablish || player.resources[ResourceType.GOLD] < INFLUENCE_ESTABLISH_COST_GOLD}
                      className="flex-1"
                      title={hostileWarning}
                    >
                      기반 구축 ({INFLUENCE_ESTABLISH_COST_GOLD}{RESOURCE_EMOJIS.Gold}){hostileWarning && " (불가)"}
                    </Button>
                  )}
                  {currentInfluence > 0 && currentInfluence < MAX_INFLUENCE_LEVEL && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => handleUpgradeInfluence(territory.id, currentInfluence)}
                      disabled={!canUpgrade || !upgradeCost || player.resources[ResourceType.GOLD] < upgradeCost}
                      className="flex-1"
                       title={hostileWarning}
                    >
                      영향력 확대 ({upgradeCost}{RESOURCE_EMOJIS.Gold}){hostileWarning && " (불가)"}
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenEspionageModal(territory.id)}
                    disabled={currentInfluence === 0}
                    className="flex-1"
                  >
                    첩보 활동
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        영향력을 통해 교역 조건을 개선하고, 다양한 첩보 활동으로 정보를 얻거나 상대를 방해할 수 있습니다. 세력과의 관계가 이러한 활동에 영향을 미칩니다.
      </div>
    </div>
  );
};

export default BusinessManagementTab;
