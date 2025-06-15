
import React, { useContext } from 'react';
import { GameContext } from '../App';
import { AIMerchant, ResourceType } from '../types';
import { KOREAN_FACTION_NAMES, KOREAN_MERCHANT_STANDING_NAMES, KOREAN_AI_MERCHANT_PERSONALITY_NAMES, RESOURCE_EMOJIS } from '../constants';

const CompetitorStatusTab: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return null;

  const { gameState } = context;
  const { aiMerchants } = gameState;

  if (!aiMerchants || aiMerchants.length === 0) {
    return <p className="text-gray-400">현재 활동 중인 경쟁 상인이 없습니다.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-yellow-400">경쟁자 현황</h3>
      <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2"> {/* Adjust max-h as needed */}
        {aiMerchants.map((merchant: AIMerchant) => (
          <div key={merchant.id} className="p-3 bg-gray-700 rounded-lg shadow">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-md font-semibold text-sky-300">{merchant.name}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-200">
                {KOREAN_AI_MERCHANT_PERSONALITY_NAMES[merchant.personality]}
              </span>
            </div>
            <p className="text-sm text-gray-300">
              {RESOURCE_EMOJIS.Gold} 총 자산: {(merchant.totalWealthHistory.length > 0 ? merchant.totalWealthHistory[merchant.totalWealthHistory.length - 1].wealth : merchant.resources.Gold).toLocaleString()}
            </p>
            <p className="text-sm text-gray-300">상인 평판: {KOREAN_MERCHANT_STANDING_NAMES[merchant.merchantStanding]}</p>
            {merchant.favoredFactionId && (
              <p className="text-sm text-gray-300">주요 관계 세력: {KOREAN_FACTION_NAMES[merchant.favoredFactionId]}</p>
            )}
            <p className="text-xs text-gray-400 mt-1 italic">최근 활동: {merchant.lastActionLog || "정보 없음"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorStatusTab;
