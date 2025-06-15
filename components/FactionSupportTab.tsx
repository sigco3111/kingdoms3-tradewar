
import React, { useContext, useState } from 'react';
import { GameContext } from '../App';
import { ResourceType, FactionId, RelationshipLevel, ActiveFactionPolicy, FactionPolicyType, ActiveWar } from '../types';
import Button from './common/Button';
import { 
    KOREAN_RESOURCE_NAMES, KOREAN_FACTION_NAMES, RESOURCE_EMOJIS, SUPPLY_PROFIT_MARGIN, 
    KOREAN_RELATIONSHIP_LEVEL_NAMES, INITIAL_MARKET_STATE, KOREAN_FACTION_POLICY_NAMES, FACTION_POLICY_CONFIGS
} from '../constants';
import { getRelationshipLevel } from '../services/gameService'; 

const FactionSupportTab: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { player, factions, market, activeFactionPolicies, activeWars } = gameState;
  
  const [supplyResource, setSupplyResource] = useState<ResourceType>(ResourceType.FOOD);
  const [supplyAmount, setSupplyAmount] = useState<number>(100);
  const [targetFactionIdForSupply, setTargetFactionIdForSupply] = useState<FactionId | ''>(player.favoredFactionId || '');

  const [policyFundingAmount, setPolicyFundingAmount] = useState<number>(100);
  const [warFundingAmount, setWarFundingAmount] = useState<number>(500);


  if (!player) return <p>플레이어 데이터를 찾을 수 없습니다.</p>;

  const targetFactionForSupplyDetails = targetFactionIdForSupply ? factions.find(f => f.id === targetFactionIdForSupply) : null;
  let targetFactionRelationshipLevel: RelationshipLevel | null = null;
  let targetFactionRelationshipScore: number | null = null;

  if (targetFactionForSupplyDetails && targetFactionForSupplyDetails.id !== FactionId.NEUTRAL) {
    targetFactionRelationshipScore = player.factionRelations[targetFactionForSupplyDetails.id] || 0;
    targetFactionRelationshipLevel = getRelationshipLevel(targetFactionRelationshipScore);
  }

  const handleSupplyFaction = () => {
    if (!targetFactionIdForSupply) { alert("지원할 세력을 선택하세요."); return; }
    if (supplyAmount <= 0) { alert("공급량은 0보다 커야 합니다."); return; }
    if ((player.resources[supplyResource] || 0) < supplyAmount) { alert(`${KOREAN_RESOURCE_NAMES[supplyResource]} 보유량이 부족합니다.`); return; }
    if (targetFactionRelationshipLevel === RelationshipLevel.HOSTILE) { alert(`${KOREAN_FACTION_NAMES[targetFactionIdForSupply]} 세력과 적대적이어서 물자를 공급할 수 없습니다.`); return; }

    const targetFaction = factions.find(f => f.id === targetFactionIdForSupply);
    if (!targetFaction) { alert("대상 세력을 찾을 수 없습니다."); return; }

    const pricePerUnit = Math.ceil((market.initialBasePrices[supplyResource] || 0) * (1 + SUPPLY_PROFIT_MARGIN));
    const totalCostToFaction = pricePerUnit * supplyAmount;

    if ((targetFaction.resources[ResourceType.GOLD] || 0) < totalCostToFaction) { alert(`${KOREAN_FACTION_NAMES[targetFaction.id]} 세력의 ${KOREAN_RESOURCE_NAMES[ResourceType.GOLD]}이(가) 부족하여 이 거래를 감당할 수 없습니다.`); return; }

    dispatch({
      type: 'PLAYER_SUPPLY_FACTION',
      payload: { targetFactionId: targetFactionIdForSupply, resource: supplyResource, amount: supplyAmount, pricePerUnit: pricePerUnit },
    });
    setSupplyAmount(100); 
  };
  
  const availableFactionsToSupport = factions.filter(f => f.id !== FactionId.NEUTRAL);
  const currentPricePerUnit = Math.ceil((market.initialBasePrices[supplyResource] || 0) * (1 + SUPPLY_PROFIT_MARGIN));
  const expectedRevenue = currentPricePerUnit * supplyAmount;
  const isSupplyDisabled = !targetFactionIdForSupply || (player.resources[supplyResource] || 0) < supplyAmount || (targetFactionForSupplyDetails?.resources[ResourceType.GOLD] || 0) < expectedRevenue || targetFactionRelationshipLevel === RelationshipLevel.HOSTILE;
  const allSupplyableResources = (Object.values(ResourceType) as ResourceType[]).filter(r => r !== ResourceType.GOLD && INITIAL_MARKET_STATE.initialBasePrices[r] !== undefined);

  const handleFundPolicy = (policyId: string) => {
    if (policyFundingAmount <=0) { alert("지원 금액은 0보다 커야합니다."); return; }
    if ((player.resources[ResourceType.GOLD] || 0) < policyFundingAmount) { alert("금이 부족합니다."); return; }
    dispatch({type: 'PLAYER_FUND_FACTION_POLICY', payload: {policyId, amount: policyFundingAmount}});
    setPolicyFundingAmount(100);
  };

  const handleFundWar = (warId: string, supportedFactionId: FactionId) => {
    if (warFundingAmount <=0) { alert("지원 금액은 0보다 커야합니다."); return; }
    if ((player.resources[ResourceType.GOLD] || 0) < warFundingAmount) { alert("금이 부족합니다."); return; }
    dispatch({type: 'PLAYER_CONTRIBUTE_WAR_FUNDS', payload: {warId, supportedFactionId, amount: warFundingAmount}});
    setWarFundingAmount(500);
  };

  return (
    <div className="space-y-6">
      {/* SECTIION: 군수품 공급 */}
      <div>
        <h3 className="text-lg font-semibold text-yellow-400">세력 지원 (군수품 공급)</h3>
        <p className="text-sm text-gray-400 mb-2"> 선택한 세력에게 자원을 판매하여 지원하고 이익을 얻습니다. </p>
        <div className="p-3 bg-gray-700 rounded space-y-3">
            <div>
                <label htmlFor="targetFactionSupply" className="block text-sm font-medium text-gray-300 mb-1">지원 대상 세력:</label>
                <select id="targetFactionSupply" value={targetFactionIdForSupply} onChange={(e) => setTargetFactionIdForSupply(e.target.value as FactionId | '')} className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white">
                    <option value="">세력 선택...</option>
                    {availableFactionsToSupport.map(f => (<option key={f.id} value={f.id}>{KOREAN_FACTION_NAMES[f.id]}</option>))}
                </select>
                {targetFactionForSupplyDetails && targetFactionRelationshipLevel && (
                    <p className={`text-xs mt-1 ${targetFactionRelationshipLevel === RelationshipLevel.HOSTILE ? 'text-red-400' : targetFactionRelationshipLevel === RelationshipLevel.UNFRIENDLY ? 'text-red-300' : targetFactionRelationshipLevel === RelationshipLevel.FRIENDLY ? 'text-green-300' :  targetFactionRelationshipLevel === RelationshipLevel.ALLIED ? 'text-green-400' : 'text-gray-400'}`}>
                        현재 관계: {KOREAN_RELATIONSHIP_LEVEL_NAMES[targetFactionRelationshipLevel]} ({targetFactionRelationshipScore})
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="supplyResource" className="block text-sm font-medium text-gray-300 mb-1">공급 자원:</label>
                <select id="supplyResource" value={supplyResource} onChange={(e) => setSupplyResource(e.target.value as ResourceType)} className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white">
                    {allSupplyableResources.map(unit => (<option key={unit} value={unit}>{KOREAN_RESOURCE_NAMES[unit]}</option>))}
                </select>
            </div>
            <div>
                <label htmlFor="supplyAmount" className="block text-sm font-medium text-gray-300 mb-1">공급량:</label>
                <input type="number" id="supplyAmount" value={supplyAmount} onChange={(e) => setSupplyAmount(Math.max(1, parseInt(e.target.value) || 1))} className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white" min="1"/>
            </div>
            <p className="text-sm text-gray-300"> 판매 단가: {RESOURCE_EMOJIS[supplyResource]} {KOREAN_RESOURCE_NAMES[supplyResource]} 1개당 {currentPricePerUnit} {RESOURCE_EMOJIS[ResourceType.GOLD]} <br/> 예상 수입: {expectedRevenue} {RESOURCE_EMOJIS[ResourceType.GOLD]} <br/> 내 보유량: {(player.resources[supplyResource] || 0)} {RESOURCE_EMOJIS[supplyResource]} </p>
            <Button onClick={handleSupplyFaction} disabled={isSupplyDisabled} className="w-full" title={targetFactionRelationshipLevel === RelationshipLevel.HOSTILE ? "적대적 세력에게 공급 불가" : ""}>
                {targetFactionIdForSupply ? `${KOREAN_FACTION_NAMES[targetFactionIdForSupply]}에 공급 ${targetFactionRelationshipLevel === RelationshipLevel.HOSTILE ? "(불가)" : ""}` : "세력 선택 필요"}
            </Button>
        </div>
      </div>

      {/* SECTION: 세력 정책 및 사업 지원 */}
      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mt-4">세력 정책 및 사업 지원</h3>
        {activeFactionPolicies.length === 0 && <p className="text-sm text-gray-400 mt-2">현재 활성화된 세력 정책/사업이 없습니다.</p>}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mt-2">
            {activeFactionPolicies.map(policy => {
                const config = FACTION_POLICY_CONFIGS[policy.type];
                const progress = Math.min(100, (policy.currentFunding / policy.fundingGoal) * 100);
                const policyFactionName = KOREAN_FACTION_NAMES[policy.factionId];
                return (
                    <div key={policy.id} className="p-3 bg-gray-700 rounded">
                        <h4 className="font-medium text-sky-300">{KOREAN_FACTION_POLICY_NAMES[policy.type]} ({policyFactionName})</h4>
                        <p className="text-xs text-gray-300">{config.description}</p>
                        <p className="text-xs text-gray-400">목표: {policy.fundingGoal}{RESOURCE_EMOJIS[ResourceType.GOLD]} | 남은 턴: {policy.turnsRemaining}</p>
                        <div className="w-full bg-gray-600 rounded-full h-2.5 my-1">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-400">모금 현황: {policy.currentFunding} / {policy.fundingGoal} {RESOURCE_EMOJIS[ResourceType.GOLD]}</p>
                        {progress < 100 && (
                             <div className="flex items-center space-x-2 mt-2">
                                <input type="number" value={policyFundingAmount} onChange={e => setPolicyFundingAmount(Math.max(1, parseInt(e.target.value) || 1))} className="bg-gray-600 border-gray-500 rounded p-1.5 text-white w-24 text-xs" min="1" />
                                <Button size="sm" onClick={() => handleFundPolicy(policy.id)} disabled={(player.resources[ResourceType.GOLD] || 0) < policyFundingAmount}>자금 지원</Button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>

       {/* SECTION: 전쟁 자금 지원 */}
      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mt-4">전쟁 자금 지원</h3>
        {activeWars.filter(war => war.isActive).length === 0 && <p className="text-sm text-gray-400 mt-2">현재 진행 중인 전쟁이 없습니다.</p>}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mt-2">
            {activeWars.filter(war => war.isActive).map(war => {
                 const aggressorName = KOREAN_FACTION_NAMES[war.aggressorFactionId];
                 const defenderName = KOREAN_FACTION_NAMES[war.defenderFactionId];
                 const playerCanSupportAggressor = war.aggressorFactionId !== player.favoredFactionId || player.favoredFactionId !== null; // Example condition
                 const playerCanSupportDefender = war.defenderFactionId !== player.favoredFactionId || player.favoredFactionId !== null; // Example condition

                return (
                    <div key={war.id} className="p-3 bg-gray-700 rounded">
                        <h4 className="font-medium text-red-400">{aggressorName} vs {defenderName}</h4>
                        <p className="text-xs text-gray-400">개전: {war.startedTurn}턴</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <input type="number" value={warFundingAmount} onChange={e => setWarFundingAmount(Math.max(100, parseInt(e.target.value) || 100))} className="bg-gray-600 border-gray-500 rounded p-1.5 text-white w-24 text-xs" min="100" />
                            {playerCanSupportAggressor && (
                                <Button size="sm" onClick={() => handleFundWar(war.id, war.aggressorFactionId)} disabled={(player.resources[ResourceType.GOLD] || 0) < warFundingAmount}>
                                    {aggressorName} 지원
                                </Button>
                            )}
                             {playerCanSupportDefender && (
                                <Button size="sm" onClick={() => handleFundWar(war.id, war.defenderFactionId)} disabled={(player.resources[ResourceType.GOLD] || 0) < warFundingAmount}>
                                    {defenderName} 지원
                                </Button>
                            )}
                        </div>
                        {war.playerContributions && Object.keys(war.playerContributions).length > 0 && (
                             <p className="text-xs text-lime-400 mt-1">
                                나의 총 지원금: {Object.entries(war.playerContributions).filter(([_,amount])=>(amount || 0)>0).map(([facId, amount]) => `${KOREAN_FACTION_NAMES[facId as FactionId]}: ${amount}${RESOURCE_EMOJIS[ResourceType.GOLD]}`).join(', ')}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
      </div>


      <p className="text-xs text-gray-500 mt-4">
        팁: 세력 지원, 정책 투자, 전쟁 자금 지원 등은 세력과의 관계에 큰 영향을 미치며, 성공 시 다양한 이권을 얻을 수 있습니다.
      </p>
    </div>
  );
};

export default FactionSupportTab;
