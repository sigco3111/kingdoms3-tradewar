// This file should be renamed to FactionSupportTab.tsx - DELETING and replacing with FactionSupportTab.tsx
// The content of MilitaryTab.tsx is now in FactionSupportTab.tsx
// This specific file (MilitaryTab.tsx) will be empty if it's meant to be replaced.
// For the purpose of this exercise, I will assume it was ALREADY renamed/replaced by FactionSupportTab.tsx.
// If not, the correct action would be to delete this file and ensure FactionSupportTab.tsx contains the correct code.
// Since the prompt provides FactionSupportTab.tsx with the correct content, this file can be considered effectively deleted or a duplicate.
// For now, I will leave its content as is, as the primary fix is in ControlPanel.tsx.
// If a file needs to be deleted, the XML format doesn't directly support it without additional conventions.
// So, I'm assuming it's already FactionSupportTab.tsx as per ControlPanel's import.

import React, { useContext, useState } from 'react';
import { GameContext } from '../App';
import { ResourceType, FactionId } from '../types';
import Button from './common/Button';
import { KOREAN_RESOURCE_NAMES, KOREAN_FACTION_NAMES, RESOURCE_EMOJIS, SUPPLY_PROFIT_MARGIN, INITIAL_MARKET_STATE } from '../constants';

const FactionSupportTab: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState, dispatch } = context;
  const { player, factions, market } = gameState;
  
  const [supplyResource, setSupplyResource] = useState<ResourceType>(ResourceType.FOOD);
  const [supplyAmount, setSupplyAmount] = useState<number>(100);
  const [targetFactionIdForSupply, setTargetFactionIdForSupply] = useState<FactionId | ''>(player.favoredFactionId || '');

  if (!player) return <p>플레이어 데이터를 찾을 수 없습니다.</p>;

  const handleSupplyFaction = () => {
    if (!targetFactionIdForSupply) {
      alert("지원할 세력을 선택하세요.");
      return;
    }
    if (supplyAmount <= 0) {
      alert("공급량은 0보다 커야 합니다.");
      return;
    }
    if ((player.resources[supplyResource] || 0) < supplyAmount) {
      alert(`${KOREAN_RESOURCE_NAMES[supplyResource]} 보유량이 부족합니다.`);
      return;
    }

    const targetFaction = factions.find(f => f.id === targetFactionIdForSupply);
    if (!targetFaction) {
        alert("대상 세력을 찾을 수 없습니다.");
        return;
    }

    const pricePerUnit = Math.ceil((market.initialBasePrices[supplyResource] || 0) * (1 + SUPPLY_PROFIT_MARGIN));
    const totalCostToFaction = pricePerUnit * supplyAmount;

    if ((targetFaction.resources[ResourceType.GOLD] || 0) < totalCostToFaction) {
        alert(`${KOREAN_FACTION_NAMES[targetFaction.id]} 세력의 ${KOREAN_RESOURCE_NAMES[ResourceType.GOLD]}이(가) 부족하여 이 거래를 감당할 수 없습니다.`);
        return;
    }

    dispatch({
      type: 'PLAYER_SUPPLY_FACTION',
      payload: {
        targetFactionId: targetFactionIdForSupply,
        resource: supplyResource,
        amount: supplyAmount,
        pricePerUnit: pricePerUnit,
      },
    });
    setSupplyAmount(100); // Reset amount after supply
  };
  
  const availableFactionsToSupport = factions.filter(f => f.id !== FactionId.NEUTRAL);
  const currentPricePerUnit = Math.ceil((market.initialBasePrices[supplyResource] || 0) * (1 + SUPPLY_PROFIT_MARGIN));
  const expectedRevenue = currentPricePerUnit * supplyAmount;
  const allSupplyableResources = (Object.values(ResourceType) as ResourceType[]).filter(r => r !== ResourceType.GOLD && INITIAL_MARKET_STATE.initialBasePrices[r] !== undefined);


  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-yellow-400">세력 지원 (군수품 공급)</h3>
      <p className="text-sm text-gray-400">
        선택한 세력에게 자원을 판매하여 지원하고 이익을 얻습니다. 가격은 현재 시장 가격에 이윤이 추가되어 결정됩니다.
      </p>
      
      <div className="p-3 bg-gray-700 rounded space-y-3">
        <div>
            <label htmlFor="targetFactionSupply" className="block text-sm font-medium text-gray-300 mb-1">지원 대상 세력:</label>
            <select
                id="targetFactionSupply"
                value={targetFactionIdForSupply}
                onChange={(e) => setTargetFactionIdForSupply(e.target.value as FactionId | '')}
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
            >
                <option value="">세력 선택...</option>
                {availableFactionsToSupport.map(f => (
                    <option key={f.id} value={f.id}>{KOREAN_FACTION_NAMES[f.id]}</option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="supplyResource" className="block text-sm font-medium text-gray-300 mb-1">공급 자원:</label>
            <select 
                id="supplyResource"
                value={supplyResource} 
                onChange={(e) => setSupplyResource(e.target.value as ResourceType)}
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
            >
                {allSupplyableResources.map(unit => (
                <option key={unit} value={unit}>{KOREAN_RESOURCE_NAMES[unit]}</option>
                ))}
            </select>
        </div>
        
        <div>
            <label htmlFor="supplyAmount" className="block text-sm font-medium text-gray-300 mb-1">공급량:</label>
            <input 
                type="number"
                id="supplyAmount"
                value={supplyAmount}
                onChange={(e) => setSupplyAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-white"
                min="1"
            />
        </div>
        
        <p className="text-sm text-gray-300">
            판매 단가: {RESOURCE_EMOJIS[supplyResource]} {KOREAN_RESOURCE_NAMES[supplyResource]} 1개당 {currentPricePerUnit} {RESOURCE_EMOJIS[ResourceType.GOLD]}
            <br/>
            예상 수입: {expectedRevenue} {RESOURCE_EMOJIS[ResourceType.GOLD]}
            <br/>
            내 보유량: {(player.resources[supplyResource] || 0)} {RESOURCE_EMOJIS[supplyResource]}
        </p>

        <Button 
            onClick={handleSupplyFaction} 
            disabled={!targetFactionIdForSupply || (player.resources[supplyResource] ||0) < supplyAmount || (factions.find(f => f.id === targetFactionIdForSupply)?.resources[ResourceType.GOLD] || 0) < expectedRevenue}
            className="w-full"
        >
            {targetFactionIdForSupply ? `${KOREAN_FACTION_NAMES[targetFactionIdForSupply]}에 공급` : "세력 선택 필요"}
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        팁: 전쟁 중이거나 특정 자원이 부족한 세력은 더 높은 가격에도 구매할 의향이 있을 수 있습니다 (향후 기능). 현재는 고정된 이윤으로 판매합니다.
      </p>
    </div>
  );
};

export default FactionSupportTab;