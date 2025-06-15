
import React, { useContext } from 'react';
import { GameContext } from '../App';
import { ResourceType, FactionId, Territory, RelationshipLevel } from '../types';
import { RESOURCE_EMOJIS, PRODUCTION_BONUS_PER_LEVEL, MAX_DEVELOPMENT_LEVEL, PLAYER_INVESTMENT_COST_PER_LEVEL_BASE, KOREAN_RESOURCE_NAMES, KOREAN_UNIT_NAMES, KOREAN_FACTION_NAMES, INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL, KOREAN_RELATIONSHIP_LEVEL_NAMES } from '../constants';
import Button from './common/Button';
import { getRelationshipLevel, getEffectiveTradePrice } from '../services/gameService';

const TerritoryCard: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { selectedTerritoryId, territories, factions, player } = gameState; 

  if (!selectedTerritoryId) {
    return (
      <div className="p-4 text-center text-gray-400">
        지도에서 영토를 선택하여 세부 정보 및 교역/투자 기회를 확인하세요.
      </div>
    );
  }

  const territory = territories.find(t => t.id === selectedTerritoryId);
  if (!territory) return <div className="p-4 text-red-500">오류: 선택한 영토를 찾을 수 없습니다.</div>;

  const ownerFaction = factions.find(f => f.id === territory.ownerFactionId);
  const playerInfluenceInTerritory = player.influence[territory.id] || 0;

  let ownerFactionRelationshipLevel: RelationshipLevel | null = null;
  let ownerFactionRelationshipScore: number | null = null;
  if (ownerFaction && ownerFaction.id !== FactionId.NEUTRAL) {
    ownerFactionRelationshipScore = player.factionRelations[ownerFaction.id] || 0;
    ownerFactionRelationshipLevel = getRelationshipLevel(ownerFactionRelationshipScore);
  }


  const investmentCost = PLAYER_INVESTMENT_COST_PER_LEVEL_BASE * (territory.developmentLevel + 1);
  const canPlayerInvest = ownerFaction && ownerFaction.id !== FactionId.NEUTRAL &&
                          territory.developmentLevel < MAX_DEVELOPMENT_LEVEL &&
                          (player.resources[ResourceType.GOLD] || 0) >= investmentCost &&
                          (ownerFactionRelationshipLevel !== RelationshipLevel.HOSTILE);

  const handlePlayerInvest = () => {
    if (canPlayerInvest) {
      dispatch({
        type: 'PLAYER_INVEST_IN_TERRITORY',
        payload: {
          territoryId: territory.id,
          amount: investmentCost,
        }
      });
    }
  };

  const productionMultiplier = 1 + (territory.developmentLevel * PRODUCTION_BONUS_PER_LEVEL);
  
  const tradableResourcesInTerritory = (Object.keys(territory.localMarketPrices) as ResourceType[])
    .filter(resourceValue => resourceValue !== ResourceType.GOLD && territory.localMarketPrices[resourceValue] !== undefined);


  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-yellow-400">{territory.name}</h3>
      <div>
        소유 세력: <span style={{ color: ownerFaction?.color || '#a0aec0' }}> {/* Use hex color or default gray */}
          {ownerFaction ? KOREAN_FACTION_NAMES[ownerFaction.id] : '주인 없음'}
        </span>
        {ownerFaction && ownerFaction.id !== FactionId.NEUTRAL && ownerFactionRelationshipLevel && (
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                ownerFactionRelationshipLevel === RelationshipLevel.HOSTILE ? 'bg-red-700' :
                ownerFactionRelationshipLevel === RelationshipLevel.UNFRIENDLY ? 'bg-red-500' :
                ownerFactionRelationshipLevel === RelationshipLevel.NEUTRAL ? 'bg-gray-500' :
                ownerFactionRelationshipLevel === RelationshipLevel.FRIENDLY ? 'bg-green-500' : 'bg-green-700'
            } text-white`}>
                관계: {KOREAN_RELATIONSHIP_LEVEL_NAMES[ownerFactionRelationshipLevel]} ({ownerFactionRelationshipScore})
            </span>
        )}
      </div>
       {playerInfluenceInTerritory > 0 && (
        <p className="text-sm text-cyan-400">나의 영향력: 레벨 {playerInfluenceInTerritory} (교역 보너스: {playerInfluenceInTerritory * INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL * 100}%)</p>
      )}

      <div>
        <h4 className="font-medium text-gray-300">주둔군:</h4>
        <ul className="list-disc list-inside text-sm pl-2">
          <li>{KOREAN_UNIT_NAMES.infantry}: {territory.garrison.infantry}</li>
          <li>{KOREAN_UNIT_NAMES.cavalry}: {territory.garrison.cavalry}</li>
          <li>{KOREAN_UNIT_NAMES.archers}: {territory.garrison.archers}</li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-gray-300">영토 기본 생산량 (실제 생산량):</h4>
        <ul className="list-disc list-inside text-sm pl-2">
          {(Object.keys(territory.baseProduction) as ResourceType[]).map((resource) => {
             const baseValue = territory.baseProduction[resource] || 0;
             const isActualResourceKey = Object.values(ResourceType).includes(resource);

             if (!isActualResourceKey) { 
                return null;
             }
             
             if (baseValue > 0) {
                return (
                    <li key={resource}>
                        {RESOURCE_EMOJIS[resource]} {KOREAN_RESOURCE_NAMES[resource]}: {baseValue} ({Math.floor(baseValue * productionMultiplier)})
                    </li>
                );
             } else { 
                 const isSpecialtyGood = resource === ResourceType.HERBS || resource === ResourceType.TEA;
                 if (resource === ResourceType.GOLD || (isSpecialtyGood && territory.baseProduction[resource] !== undefined)) {
                     return (
                        <li key={resource}>
                            {RESOURCE_EMOJIS[resource]} {KOREAN_RESOURCE_NAMES[resource]}: 0 ({Math.floor(0 * productionMultiplier)})
                        </li>
                     );
                 } else { 
                     return null;
                 }
             }
            })}
        </ul>
      </div>

      <p>개발 수준: {territory.developmentLevel} / {MAX_DEVELOPMENT_LEVEL} (생산 보너스: +{(territory.developmentLevel * PRODUCTION_BONUS_PER_LEVEL * 100).toFixed(0)}%)</p>

      {ownerFaction && ownerFaction.id !== FactionId.NEUTRAL && (
        <Button
          onClick={handlePlayerInvest}
          disabled={!canPlayerInvest}
          className="w-full"
          variant="secondary"
          title={ownerFactionRelationshipLevel === RelationshipLevel.HOSTILE ? `${KOREAN_FACTION_NAMES[ownerFaction.id]}와 적대적이어서 투자 불가` : ""}
        >
          {territory.developmentLevel < MAX_DEVELOPMENT_LEVEL
            ? `${KOREAN_FACTION_NAMES[ownerFaction.id]} 영토에 투자 (비용: ${investmentCost} ${RESOURCE_EMOJIS[ResourceType.GOLD]}) ${ownerFactionRelationshipLevel === RelationshipLevel.HOSTILE ? "(불가)" : ""}`
            : "최대 개발 수준 도달"}
        </Button>
      )}

      {/* Tradable Goods Information Display - Remains to show prices */}
      <div className="mt-4">
        <h4 className="font-medium text-gray-300 mb-1">영토 교역품 시세 정보:</h4>
        {ownerFaction && ownerFaction.id !== FactionId.NEUTRAL ? (
          <div className="space-y-1 bg-gray-700 p-2 rounded-md">
            {tradableResourcesInTerritory.map(res => {
              const localBasePrice = territory.localMarketPrices[res];
              if (localBasePrice === undefined) return null; 

              const buyPrice = getEffectiveTradePrice(gameState, ownerFaction.id, territory.id, localBasePrice, 'BUY');
              const sellPrice = getEffectiveTradePrice(gameState, ownerFaction.id, territory.id, localBasePrice, 'SELL');
              const factionStock = ownerFaction.resources[res] || 0;

              return (
                <div key={res} className="text-sm p-1.5 bg-gray-600 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{RESOURCE_EMOJIS[res]} {KOREAN_RESOURCE_NAMES[res]}</span>
                    <span className="text-xs text-gray-300">세력 재고: {factionStock}</span>
                  </div>
                  {ownerFactionRelationshipLevel === RelationshipLevel.HOSTILE ? (
                    <p className="text-xs text-red-400 mt-0.5">적대 관계 (교역 불가)</p>
                  ) : (
                    <p className="text-xs text-gray-200 mt-0.5">
                      내 구매가: {buyPrice}{RESOURCE_EMOJIS[ResourceType.GOLD]} | 내 판매가: {sellPrice}{RESOURCE_EMOJIS[ResourceType.GOLD]}
                    </p>
                  )}
                </div>
              );
            })}
             {tradableResourcesInTerritory.length === 0 && <p className="text-xs text-gray-400">현재 이 영토와 교역 가능한 품목 정보가 시장에 없습니다.</p>}
          </div>
        ) : (
          <p className="text-sm text-gray-500 p-2 bg-gray-700 rounded-md">중립 또는 소유주 없는 영토 (교역 불가)</p>
        )}
      </div>
    </div>
  );
};

export default TerritoryCard;
