// This file should be renamed to MarketTradeTab.tsx - DELETING and replacing with MarketTradeTab.tsx
// The content of FinanceTab.tsx is now in MarketTradeTab.tsx
// This specific file (FinanceTab.tsx) will be empty if it's meant to be replaced.
// For the purpose of this exercise, I will assume it was ALREADY renamed/replaced by MarketTradeTab.tsx.
// If not, the correct action would be to delete this file and ensure MarketTradeTab.tsx contains the correct code.
// Since the prompt provides MarketTradeTab.tsx with the correct content, this file can be considered effectively deleted or a duplicate.
// For now, I will leave its content as is, as the primary fix is in ControlPanel.tsx.

import React, { useContext, useState } from 'react';
import { GameContext } from '../App';
import { ResourceType, FactionId, FinancialTacticType, Territory, RelationshipLevel } from '../types';
import { RESOURCE_EMOJIS, FINANCIAL_TACTIC_PLAYER_COST, KOREAN_RESOURCE_NAMES, KOREAN_FINANCIAL_TACTIC_NAMES, KOREAN_FACTION_NAMES, INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL, KOREAN_RELATIONSHIP_LEVEL_NAMES, INITIAL_MARKET_STATE } from '../constants';
import Button from './common/Button';
import { getRelationshipLevel, getEffectiveTradePrice } from '../services/gameService'; // Import helpers

const MarketTradeTab: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { market, factions, territories, player, selectedTerritoryId } = gameState;

  const [tactic, setTactic] = useState<FinancialTacticType>(FinancialTacticType.SPREAD_RUMORS);
  const [targetResourceForTactic, setTargetResourceForTactic] = useState<ResourceType>(ResourceType.FOOD);
  const [targetTerritoryForSabotage, setTargetTerritoryForSabotage] = useState<string>('');
  
  const [tradeResource, setTradeResourceState] = useState<ResourceType>(ResourceType.FOOD);
  const [tradeAmount, setTradeAmountState] = useState<number>(10);
  
  const selectedTerritory = territories.find(t => t.id === selectedTerritoryId);
  const selectedTerritoryOwner = selectedTerritory ? factions.find(f => f.id === selectedTerritory.ownerFactionId) : null;
  const playerInfluenceInSelectedTerritory = selectedTerritory ? (player.influence[selectedTerritory.id] || 0) : 0;

  let selectedTerritoryOwnerRelationshipLevel: RelationshipLevel | null = null;
  let selectedTerritoryOwnerRelationshipScore: number | null = null;

  if (selectedTerritoryOwner && selectedTerritoryOwner.id !== FactionId.NEUTRAL) {
      selectedTerritoryOwnerRelationshipScore = player.factionRelations[selectedTerritoryOwner.id] || 0;
      selectedTerritoryOwnerRelationshipLevel = getRelationshipLevel(selectedTerritoryOwnerRelationshipScore);
  }


  if (!player) return <p>플레이어 데이터를 찾을 수 없습니다.</p>;

  const canPerformFinancialTactic = (player.resources[ResourceType.GOLD] || 0) >= FINANCIAL_TACTIC_PLAYER_COST;

  const handlePerformFinancialTactic = () => {
    if (!canPerformFinancialTactic) return;
    
    let payloadTargetTerritoryId: string | undefined = undefined; 
    let payloadResourceType: ResourceType | undefined = undefined;

    switch (tactic) {
        case FinancialTacticType.SPREAD_RUMORS:
        case FinancialTacticType.HOARD_RESOURCE:
            payloadResourceType = targetResourceForTactic;
             if (selectedTerritory && selectedTerritory.ownerFactionId && selectedTerritory.ownerFactionId !== FactionId.NEUTRAL) {
                payloadTargetTerritoryId = selectedTerritory.id;
            } else {
                alert("이 전술을 사용하려면 AI 세력이 소유한 영토를 선택해야 합니다.");
                return;
            }
            break;
        case FinancialTacticType.SABOTAGE_MARKET:
            if (!targetTerritoryForSabotage) {
                alert("교란할 대상 AI 세력의 영토를 선택하세요.");
                return;
            }
            const saboTerr = territories.find(t=>t.id === targetTerritoryForSabotage);
            if (!saboTerr || saboTerr.ownerFactionId === FactionId.NEUTRAL) {
                 alert("AI 세력이 소유한 영토만 대상으로 할 수 있습니다.");
                 return;
            }
            payloadTargetTerritoryId = targetTerritoryForSabotage;
            break;
        case FinancialTacticType.STIMULATE_ECONOMY:
             if (!selectedTerritoryId) {
                alert("경제를 활성화할 영토를 선택하세요 (AI 세력 소유 영토).");
                return;
            }
            const stimTerr = territories.find(t=>t.id === selectedTerritoryId);
            if (!stimTerr || stimTerr.ownerFactionId === FactionId.NEUTRAL){
                alert("AI 세력이 소유한 영토에서만 경제를 활성화할 수 있습니다.");
                return;
            }
            payloadTargetTerritoryId = selectedTerritoryId;
            break;
    }

    dispatch({
      type: 'PLAYER_EXECUTE_FINANCIAL_TACTIC',
      payload: {
        tactic,
        cost: FINANCIAL_TACTIC_PLAYER_COST,
        targetTerritoryId: payloadTargetTerritoryId,
        resourceType: payloadResourceType,
      }
    });
  };
  
  const aiTerritories = territories.filter(t => t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL);
  const resourceOptionsForTactic = (Object.values(ResourceType) as ResourceType[]).filter(r => r !== ResourceType.GOLD && INITIAL_MARKET_STATE.initialBasePrices[r] !== undefined);


  const handleTradeWithSelectedTerritory = (tradeType: 'BUY' | 'SELL') => {
    if (!selectedTerritory || !selectedTerritoryOwner || selectedTerritoryOwner.id === FactionId.NEUTRAL) {
        alert("교역하려면 AI 세력이 소유한 영토를 선택해야 합니다.");
        return;
    }
    if (tradeAmount <= 0) {
        alert("교역 수량은 0보다 커야 합니다.");
        return;
    }
     if (selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE && tradeType === 'SELL') {
        alert(`${KOREAN_FACTION_NAMES[selectedTerritoryOwner.id]} 세력과 적대적이므로 판매할 수 없습니다.`);
        return;
    }
    if (selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE && tradeType === 'BUY') {
         alert(`${KOREAN_FACTION_NAMES[selectedTerritoryOwner.id]} 세력과 적대적이므로 구매할 수 없습니다.`);
        return;
    }
    if(selectedTerritory.localMarketPrices[tradeResource] === undefined){
        alert(`${selectedTerritory.name}에서는 현재 ${KOREAN_RESOURCE_NAMES[tradeResource]} 품목의 시세 정보가 없습니다.`);
        return;
    }

    dispatch({
        type: 'PLAYER_TRADE_RESOURCES',
        payload: {
            targetFactionId: selectedTerritoryOwner.id,
            territoryId: selectedTerritory.id,
            resource: tradeResource,
            amount: tradeAmount,
            tradeType: tradeType,
        }
    });
  };
  
  const currentLocalPriceForTrade = selectedTerritory?.localMarketPrices[tradeResource];
  const currentBuyPrice = selectedTerritory && selectedTerritoryOwner && currentLocalPriceForTrade !== undefined
    ? getEffectiveTradePrice(gameState, selectedTerritoryOwner.id, selectedTerritory.id, currentLocalPriceForTrade, 'BUY')
    : (INITIAL_MARKET_STATE.initialBasePrices[tradeResource] || 0);
  const currentSellPrice = selectedTerritory && selectedTerritoryOwner && currentLocalPriceForTrade !== undefined
    ? getEffectiveTradePrice(gameState, selectedTerritoryOwner.id, selectedTerritory.id, currentLocalPriceForTrade, 'SELL')
    : (INITIAL_MARKET_STATE.initialBasePrices[tradeResource] || 0);

  const displayPriceTitle = selectedTerritory ? `${selectedTerritory.name} 지역 시장 가격` : "초기 기준 시장 가격";
  const allResourcesWithAnyPrice = (Object.values(ResourceType) as ResourceType[]).filter(r => r !== ResourceType.GOLD && ( (selectedTerritory?.localMarketPrices[r] !== undefined) || market.initialBasePrices[r] !==undefined) );
  const tradableResourcesInSelectedTerritory = selectedTerritory ? 
    (Object.values(ResourceType) as ResourceType[]).filter(r => r !== ResourceType.GOLD && selectedTerritory.localMarketPrices[r] !== undefined)
    : (Object.values(ResourceType) as ResourceType[]).filter(r => r !== ResourceType.GOLD && INITIAL_MARKET_STATE.initialBasePrices[r] !== undefined);


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">{displayPriceTitle}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {allResourcesWithAnyPrice.map((resource) => {
            const priceToShow = selectedTerritory?.localMarketPrices[resource] ?? market.initialBasePrices[resource];
            if (priceToShow === undefined) return null; // Should not happen due to filter
            return (
                <div key={resource} className="p-2 bg-gray-700 rounded text-center">
                <span className="text-2xl">{RESOURCE_EMOJIS[resource]}</span>
                <p className="text-sm">{KOREAN_RESOURCE_NAMES[resource]}: {Number(priceToShow).toFixed(2)} {RESOURCE_EMOJIS[ResourceType.GOLD]}</p>
                </div>
            );
           })}
        </div>
        <p className="text-xs text-gray-400 mt-1">실제 교역 가격은 이 기준가에 할증/할인 및 플레이어 영향력, 상대 세력과의 관계에 따른 보너스가 적용될 수 있습니다.</p>
        {!selectedTerritory && <p className="text-xs text-yellow-300 mt-1">특정 영토의 지역 시장 가격을 보려면 지도에서 해당 영토를 선택하세요.</p>}
      </div>

      {/* Direct Trading with Selected Territory */}
      {selectedTerritory && selectedTerritoryOwner && selectedTerritoryOwner.id !== FactionId.NEUTRAL && (
        <div className="p-3 bg-gray-750 rounded space-y-3 border border-yellow-600">
            <h4 className="font-medium text-yellow-500 mb-1">선택 영토와 교역: {selectedTerritory.name} ({KOREAN_FACTION_NAMES[selectedTerritoryOwner.id]})</h4>
             {playerInfluenceInSelectedTerritory > 0 && (
                <p className="text-xs text-cyan-400">나의 영향력: 레벨 {playerInfluenceInSelectedTerritory} (교역 보너스: {playerInfluenceInSelectedTerritory * INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL * 100}%)</p>
            )}
            {selectedTerritoryOwnerRelationshipLevel && (
                 <p className={`text-xs ${
                    selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE ? 'text-red-400' :
                    selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.UNFRIENDLY ? 'text-red-300' :
                    selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.FRIENDLY ? 'text-green-300' :
                    selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.ALLIED ? 'text-green-400' : 'text-gray-400'
                 }`}>
                    {KOREAN_FACTION_NAMES[selectedTerritoryOwner.id]}와(과)의 관계: {KOREAN_RELATIONSHIP_LEVEL_NAMES[selectedTerritoryOwnerRelationshipLevel]} ({selectedTerritoryOwnerRelationshipScore})
                 </p>
            )}
            <div className="flex items-center space-x-2">
                <select 
                    value={tradeResource} 
                    onChange={e => setTradeResourceState(e.target.value as ResourceType)}
                    className="bg-gray-600 border border-gray-500 rounded p-1.5 text-white text-sm flex-grow"
                >
                    {tradableResourcesInSelectedTerritory.map(r => (
                        <option key={r} value={r}>{KOREAN_RESOURCE_NAMES[r]}</option>
                    ))}
                </select>
                <input 
                    type="number"
                    value={tradeAmount}
                    onChange={e => setTradeAmountState(Math.max(1, parseInt(e.target.value) || 1))}
                    className="bg-gray-600 border border-gray-500 rounded p-1.5 text-white w-20 text-sm"
                    min="1"
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button 
                    onClick={() => handleTradeWithSelectedTerritory('BUY')} 
                    size="sm"
                    disabled={currentLocalPriceForTrade === undefined || (player.resources[ResourceType.GOLD] || 0) < currentBuyPrice * tradeAmount || (selectedTerritoryOwner.resources[tradeResource] || 0) < tradeAmount || selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE}
                    title={selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE ? "적대적이라 구매 불가" : currentLocalPriceForTrade === undefined ? "시세 정보 없음" : ""}

                >
                    구매 (개당 {currentBuyPrice}{RESOURCE_EMOJIS.Gold}){selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE ? " (불가)" : ""}
                </Button>
                <Button 
                    onClick={() => handleTradeWithSelectedTerritory('SELL')} 
                    size="sm"
                    variant="primary" 
                    disabled={currentLocalPriceForTrade === undefined || (player.resources[tradeResource] || 0) < tradeAmount || (selectedTerritoryOwner.resources[ResourceType.GOLD] || 0) < currentSellPrice * tradeAmount || selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE}
                    title={selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE ? "적대적이라 판매 불가" :  currentLocalPriceForTrade === undefined ? "시세 정보 없음" : ""}
                >
                    판매 (개당 {currentSellPrice}{RESOURCE_EMOJIS.Gold}){selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE ? " (불가)" : ""}
                </Button>
            </div>
             <p className="text-xs text-gray-400">
                영토 ({KOREAN_FACTION_NAMES[selectedTerritoryOwner.id]}) 보유량: {(selectedTerritoryOwner.resources[tradeResource] || 0)} {KOREAN_RESOURCE_NAMES[tradeResource]}.
                <br/>
                내 보유량: {(player.resources[tradeResource] || 0)} {KOREAN_RESOURCE_NAMES[tradeResource]}.
            </p>
        </div>
      )}
       {(!selectedTerritory || !selectedTerritoryOwner || selectedTerritoryOwner.id === FactionId.NEUTRAL) && <p className="text-sm text-gray-400">교역하려면 지도에서 AI 세력의 영토를 선택하세요.</p>}


      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">금융 전술 (시장 개입)</h3>
        <div className="p-3 bg-gray-700 rounded space-y-3">
          <select 
            value={tactic} 
            onChange={(e) => setTactic(e.target.value as FinancialTacticType)}
            className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
          >
            {Object.values(FinancialTacticType).map(type => (
              <option key={type} value={type}>{KOREAN_FINANCIAL_TACTIC_NAMES[type]}</option>
            ))}
          </select>

          { (tactic === FinancialTacticType.SPREAD_RUMORS || tactic === FinancialTacticType.HOARD_RESOURCE) && (
             <>
              <select 
                value={targetResourceForTactic} 
                onChange={(e) => setTargetResourceForTactic(e.target.value as ResourceType)}
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
              >
                {resourceOptionsForTactic.map(res => (
                  <option key={res} value={res}>{KOREAN_RESOURCE_NAMES[res]}</option>
                ))}
              </select>
               <p className="text-xs text-gray-400">
                {selectedTerritory && selectedTerritoryOwner && selectedTerritoryOwner.id !== FactionId.NEUTRAL 
                    ? `효과 대상: ${selectedTerritory.name}의 ${KOREAN_RESOURCE_NAMES[targetResourceForTactic]} 시장 가격.`
                    : "AI 세력 소유 영토 선택 필요."}
              </p>
            </>
          )}

          { tactic === FinancialTacticType.SABOTAGE_MARKET && (
             <select 
              value={targetTerritoryForSabotage} 
              onChange={(e) => setTargetTerritoryForSabotage(e.target.value)}
              className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
            >
              <option value="">교란할 AI 영토 선택</option>
              {aiTerritories.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({factions.find(f=>f.id === t.ownerFactionId)?.name})</option>
              ))}
            </select>
          )}
          
          { tactic === FinancialTacticType.STIMULATE_ECONOMY && (
            <p className="text-sm text-gray-300">
              {selectedTerritoryId && territories.find(t=>t.id === selectedTerritoryId)?.ownerFactionId !== FactionId.NEUTRAL
                ? `대상 영토: ${territories.find(t=>t.id === selectedTerritoryId)?.name}. AI 세력 영토에 효과적입니다.` 
                : "지도에서 AI 세력의 영토를 선택하세요."}
            </p>
          )}

          <Button onClick={handlePerformFinancialTactic} disabled={!canPerformFinancialTactic} className="w-full">
            전술 실행 (비용: {FINANCIAL_TACTIC_PLAYER_COST} {RESOURCE_EMOJIS[ResourceType.GOLD]})
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-1">금융 전술은 시장 가격에 영향을 미치거나 대상 영토/세력에 직접적인 효과를 줄 수 있으며, 해당 세력과의 관계에도 영향을 미칩니다.</p>
      </div>

    </div>
  );
};

export default MarketTradeTab;