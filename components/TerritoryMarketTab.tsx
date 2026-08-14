

import React, { useContext, useState } from 'react';
import { GameContext } from '../App';
import { ResourceType, FactionId, FinancialTacticType, Territory, RelationshipLevel, AIMerchant, SpecializedBuildingType, Resources as ResourceCosts, PriceHistoryEntry } from '../types';
import { 
    RESOURCE_EMOJIS, FINANCIAL_TACTIC_PLAYER_COST, KOREAN_RESOURCE_NAMES, KOREAN_FINANCIAL_TACTIC_NAMES, 
    KOREAN_FACTION_NAMES, INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL, KOREAN_RELATIONSHIP_LEVEL_NAMES, 
    PRODUCTION_BONUS_PER_LEVEL, MAX_DEVELOPMENT_LEVEL, PLAYER_INVESTMENT_COST_PER_LEVEL_BASE, 
    KOREAN_UNIT_NAMES, INITIAL_MARKET_STATE, SLANDER_MERCHANT_COST_GOLD,
    SPECIALIZED_BUILDING_CONFIGS, KOREAN_SPECIALIZED_BUILDING_NAMES,
    SPECIAL_BUILDING_MARKET_HALL_PROD_BONUS, SPECIAL_BUILDING_TRADE_DEPOT_PRICE_BONUS
} from '../constants';
import Button from './common/Button';
import { getRelationshipLevel, getEffectiveTradePrice } from '../services/gameService';
// PriceTrendModal is now handled in App.tsx, no direct import here.

interface TerritoryDisplayProps {
  territory: Territory;
  onResourceClick: (territoryId: string, resource: ResourceType) => void; 
}

const TerritoryDisplay: React.FC<TerritoryDisplayProps> = ({ territory, onResourceClick }) => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { gameState, dispatch } = context;
    const { factions, player } = gameState;

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
            payload: { territoryId: territory.id, amount: investmentCost }
        });
        }
    };
    
    let productionMultiplier = 1 + (territory.developmentLevel * PRODUCTION_BONUS_PER_LEVEL);
    if (territory.specialBuilding?.type === SpecializedBuildingType.MARKET_HALL) {
        productionMultiplier += SPECIAL_BUILDING_MARKET_HALL_PROD_BONUS;
    }


    return (
        <div className="space-y-3 mb-4 p-3 bg-gray-750 rounded-md border border-gray-600">
            <h3 className="text-lg font-semibold text-yellow-400">{territory.name}</h3>
            <div>
                소유 세력: <span style={{ color: ownerFaction?.color || '#a0aec0' }}> {/* Use hex color */}
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
            {territory.specialBuilding && (
                <p className="text-sm text-amber-400">특화 건물: {KOREAN_SPECIALIZED_BUILDING_NAMES[territory.specialBuilding.type]} {territory.specialBuilding.fundedByPlayer ? "(플레이어 지원)" : "(세력 건설)"}</p>
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
                    if (!isActualResourceKey) return null;

                    let finalProdMultiplier = productionMultiplier;
                    // Direct production bonuses for specific buildings are now added directly to baseAmount in gameService, so multiplier is mainly for dev level and market hall
                    
                    if (baseValue > 0 || (resource === ResourceType.HERBS || resource === ResourceType.TEA) && territory.baseProduction[resource] !== undefined || resource === ResourceType.GOLD) {
                        return (
                            <li key={resource}>
                                {RESOURCE_EMOJIS[resource]} {KOREAN_RESOURCE_NAMES[resource]}: {baseValue} ({Math.floor(baseValue * finalProdMultiplier)})
                            </li>
                        );
                    }
                    return null;
                    })}
                </ul>
            </div>
            <p>개발 수준: {territory.developmentLevel} / {MAX_DEVELOPMENT_LEVEL} (생산 보너스: +{(territory.developmentLevel * PRODUCTION_BONUS_PER_LEVEL * 100).toFixed(0)}%)</p>
            {ownerFaction && ownerFaction.id !== FactionId.NEUTRAL && (
                <Button onClick={handlePlayerInvest} disabled={!canPlayerInvest} className="w-full" variant="secondary" title={ownerFactionRelationshipLevel === RelationshipLevel.HOSTILE ? `${KOREAN_FACTION_NAMES[ownerFaction.id]}와 적대적이어서 투자 불가` : ""}>
                {territory.developmentLevel < MAX_DEVELOPMENT_LEVEL ? `${KOREAN_FACTION_NAMES[ownerFaction.id]} 영토에 투자 (비용: ${investmentCost} ${RESOURCE_EMOJIS[ResourceType.GOLD]}) ${ownerFactionRelationshipLevel === RelationshipLevel.HOSTILE ? "(불가)" : ""}` : "최대 개발 수준 도달"}
                </Button>
            )}
             <div className="mt-4">
                <h4 className="font-medium text-gray-300 mb-1">영토 교역품 시세 정보 (클릭 시 추세 확인):</h4>
                {ownerFaction && ownerFaction.id !== FactionId.NEUTRAL ? (
                <div className="space-y-1 bg-gray-700 p-2 rounded-md">
                    {(Object.keys(territory.localMarketPrices) as ResourceType[]).filter(r => r !== ResourceType.GOLD && territory.localMarketPrices[r] !== undefined).map(res => {
                    const localBasePrice = territory.localMarketPrices[res];
                    if (localBasePrice === undefined) return null;
                    const buyPrice = getEffectiveTradePrice(gameState, ownerFaction.id, territory.id, localBasePrice, 'BUY');
                    const sellPrice = getEffectiveTradePrice(gameState, ownerFaction.id, territory.id, localBasePrice, 'SELL');
                    const factionStock = ownerFaction.resources[res] || 0;
                    return (
                        <div 
                            key={res} 
                            className="text-sm p-1.5 bg-gray-600 rounded cursor-pointer hover:bg-gray-500 transition-colors"
                            onClick={() => onResourceClick(territory.id, res)} // Pass territoryId here
                            title={`${KOREAN_RESOURCE_NAMES[res]} 가격 추세 보기`}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onResourceClick(territory.id, res);}}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{RESOURCE_EMOJIS[res]} {KOREAN_RESOURCE_NAMES[res]}</span>
                                <span className="text-xs text-gray-300">세력 재고: {factionStock}</span>
                            </div>
                            {ownerFactionRelationshipLevel === RelationshipLevel.HOSTILE ? (
                                <p className="text-xs text-red-400 mt-0.5">적대 관계 (교역 불가)</p>
                            ) : (
                                <p className="text-xs text-gray-200 mt-0.5"> 내 구매가: {buyPrice}{RESOURCE_EMOJIS[ResourceType.GOLD]} | 내 판매가: {sellPrice}{RESOURCE_EMOJIS[ResourceType.GOLD]} </p>
                            )}
                        </div>
                    );
                    })}
                     {(Object.keys(territory.localMarketPrices) as ResourceType[]).filter(r => r !== ResourceType.GOLD && territory.localMarketPrices[r] !== undefined).length === 0 && <p className="text-xs text-gray-400">현재 이 영토와 교역 가능한 품목 정보가 시장에 없습니다.</p>}
                </div>
                ) : (
                <p className="text-sm text-gray-500 p-2 bg-gray-700 rounded-md">중립 또는 소유주 없는 영토 (교역 불가)</p>
                )}
            </div>
        </div>
    );
};


const TerritoryMarketTab: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch, openPriceTrendModal } = context; // Added openPriceTrendModal from context
  const { market, factions, territories, player, selectedTerritoryId, aiMerchants, turn } = gameState;

  const [tactic, setTactic] = useState<FinancialTacticType>(FinancialTacticType.SPREAD_RUMORS);
  const [targetResourceForTactic, setTargetResourceForTactic] = useState<ResourceType>(ResourceType.FOOD);
  const [targetTerritoryForSabotage, setTargetTerritoryForSabotage] = useState<string>('');
  const [targetMerchantForSlander, setTargetMerchantForSlander] = useState<string>(aiMerchants.length > 0 ? aiMerchants[0].id : '');
  
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

  const getTacticCost = (selectedTactic: FinancialTacticType): number => {
    if (selectedTactic === FinancialTacticType.SLANDER_MERCHANT) {
        return SLANDER_MERCHANT_COST_GOLD;
    }
    return FINANCIAL_TACTIC_PLAYER_COST;
  }
  const currentTacticCost = getTacticCost(tactic);
  const canPerformFinancialTactic = (player.resources[ResourceType.GOLD] || 0) >= currentTacticCost;


  const handlePerformFinancialTactic = () => {
    if (!canPerformFinancialTactic) return;
    
    let payloadTargetTerritoryId: string | undefined = undefined;
    let payloadResourceType: ResourceType | undefined = undefined;
    let payloadTargetMerchantId: string | undefined = undefined;

    switch (tactic) {
        case FinancialTacticType.SPREAD_RUMORS:
        case FinancialTacticType.HOARD_RESOURCE:
            payloadResourceType = targetResourceForTactic;
            if (selectedTerritory && selectedTerritory.ownerFactionId && selectedTerritory.ownerFactionId !== FactionId.NEUTRAL) {
                payloadTargetTerritoryId = selectedTerritory.id;
            } else {
                alert("이 전술을 사용하려면 AI 세력이 소유한 영토를 선택해야 합니다 (현재 선택된 영토 없음).");
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
        case FinancialTacticType.SLANDER_MERCHANT:
            if (!targetMerchantForSlander && aiMerchants.length > 0) {
                const firstMerchantId = aiMerchants[0].id;
                setTargetMerchantForSlander(firstMerchantId);
                payloadTargetMerchantId = firstMerchantId;
            } else if (!targetMerchantForSlander) {
                 alert("비방할 대상 상인을 선택하세요 (현재 활동 중인 AI 상인이 없습니다).");
                return;
            } else {
                payloadTargetMerchantId = targetMerchantForSlander;
            }
            break;
    }

    dispatch({
      type: 'PLAYER_EXECUTE_FINANCIAL_TACTIC',
      payload: { 
        tactic, 
        cost: currentTacticCost, 
        targetTerritoryId: payloadTargetTerritoryId, 
        resourceType: payloadResourceType,
        targetMerchantId: payloadTargetMerchantId,
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


  const handleFundBuilding = (territoryId: string, buildingType: SpecializedBuildingType, cost: ResourceCosts) => {
    dispatch({ type: 'PLAYER_FUND_SPECIALIZED_BUILDING', payload: { territoryId, buildingType, cost } });
  };
  
  const buildingOptions = selectedTerritory ? (Object.values(SpecializedBuildingType) as SpecializedBuildingType[]).map(type => ({
      type,
      config: SPECIALIZED_BUILDING_CONFIGS[type],
  })).filter(option => {
      if(selectedTerritory.specialBuilding) return false; // Already has a building
      if (option.config.requiresBaseProduction && (selectedTerritory.baseProduction[option.config.requiresBaseProduction!] === undefined || selectedTerritory.baseProduction[option.config.requiresBaseProduction!] === 0) ) {
          return false; // Does not meet base production requirement for this building
      }
      return true;
  }) : [];


  return (
    <div className="space-y-6">
      {!selectedTerritoryId && (
          <div className="p-4 text-center text-gray-400"> 지도에서 영토를 선택하여 세부 정보, 교역 및 투자 기회를 확인하세요. </div>
      )}
      {selectedTerritory && (
        <TerritoryDisplay territory={selectedTerritory} onResourceClick={openPriceTrendModal} />
      )}

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
       {selectedTerritory && (!selectedTerritoryOwner || selectedTerritoryOwner.id === FactionId.NEUTRAL) && <p className="text-sm text-gray-400">중립 또는 소유주 없는 영토입니다 (교역 불가).</p>}

      {/* Specialized Building Construction */}
      {selectedTerritory && selectedTerritoryOwner && selectedTerritoryOwner.id !== FactionId.NEUTRAL && !selectedTerritory.specialBuilding && buildingOptions.length > 0 && (
        <div className="p-3 bg-gray-750 rounded space-y-3 border border-green-600">
            <h4 className="font-medium text-green-400 mb-1">특화 건물 건설 지원 ({selectedTerritory.name})</h4>
            {buildingOptions.map(option => {
                 let canAfford = true;
                 let costString = "";
                 Object.entries(option.config.cost).forEach(([res, val], index, arr) => {
                     if ((player.resources[res as ResourceType] || 0) < (val || 0)) canAfford = false;
                     costString += `${val}${RESOURCE_EMOJIS[res as ResourceType]}`;
                     if (index < arr.length - 1) costString += ", ";
                 });

                 return (
                    <div key={option.type} className="p-2 bg-gray-700 rounded">
                        <p className="text-sm font-semibold text-white">{KOREAN_SPECIALIZED_BUILDING_NAMES[option.type]}</p>
                        <p className="text-xs text-gray-300">{option.config.description}</p>
                        <p className="text-xs text-gray-400">효과: {option.config.effectDescription}</p>
                        <Button 
                            onClick={() => handleFundBuilding(selectedTerritory!.id, option.type, option.config.cost)}
                            size="sm"
                            variant="secondary"
                            className="mt-1 w-full"
                            disabled={!canAfford || (selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE)}
                            title={selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE ? `${KOREAN_FACTION_NAMES[selectedTerritoryOwner.id]}와 적대적이라 건설 지원 불가` : (!canAfford ? '자원 부족' : '')}
                        >
                            건설 지원 (비용: {costString}){selectedTerritoryOwnerRelationshipLevel === RelationshipLevel.HOSTILE ? ' (불가)' : ''}
                        </Button>
                    </div>
                );
            })}
        </div>
      )}
      {selectedTerritory && selectedTerritory.specialBuilding && (
          <p className="text-sm text-gray-400 p-3 bg-gray-750 rounded border border-gray-600">
             {selectedTerritory.name}에는 이미 {KOREAN_SPECIALIZED_BUILDING_NAMES[selectedTerritory.specialBuilding.type]} 건물이 존재합니다.
          </p>
      )}


      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-2 mt-4">금융 전술 (시장 개입)</h3>
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

           { tactic === FinancialTacticType.SLANDER_MERCHANT && (
             <select 
              value={targetMerchantForSlander} 
              onChange={(e) => setTargetMerchantForSlander(e.target.value)}
              className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
              disabled={aiMerchants.length === 0}
            >
              {aiMerchants.length === 0 ? <option value="">활동 중인 AI 상인 없음</option> : null}
              {aiMerchants.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          )}

          <Button 
            onClick={handlePerformFinancialTactic} 
            disabled={!canPerformFinancialTactic || (tactic === FinancialTacticType.SLANDER_MERCHANT && aiMerchants.length === 0)} 
            className="w-full"
            title={!canPerformFinancialTactic ? `${KOREAN_RESOURCE_NAMES[ResourceType.GOLD]} 부족 (${(player.resources[ResourceType.GOLD] || 0)} / ${currentTacticCost})` : ""}
          >
            전술 실행 (비용: {currentTacticCost} {RESOURCE_EMOJIS[ResourceType.GOLD]})
            {tactic === FinancialTacticType.SLANDER_MERCHANT && aiMerchants.length === 0 && " (대상 없음)"}
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-1">금융 전술은 시장 가격에 영향을 미치거나 대상 영토/세력/상인에 직접적인 효과를 줄 수 있으며, 관계에도 영향을 미칩니다.</p>
      </div>

    </div>
  );
};

export { TerritoryMarketTab }; // Ensure it's a named export if ControlPanel imports it as such
