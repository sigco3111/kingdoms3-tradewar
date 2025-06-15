
import React, { useContext, useMemo } from 'react';
import { GameContext } from '../App';
import { ResourceType, FactionId, MarketSignal, Faction, PlayerState, MarketState, ActiveFactionPolicy, FactionPolicyType, ActiveWar, MerchantStandingLevel } from '../types';
import { KOREAN_RESOURCE_NAMES, RESOURCE_EMOJIS, INITIAL_MARKET_STATE, KOREAN_FACTION_NAMES, SPECIALIZED_BUILDING_CONFIGS, KOREAN_SPECIALIZED_BUILDING_NAMES, FACTION_POLICY_CONFIGS, KOREAN_FACTION_POLICY_NAMES, MERCHANT_STANDING_THRESHOLDS, KOREAN_MERCHANT_STANDING_NAMES } from '../constants';

// Helper function to calculate wealth (can be moved to gameService if used elsewhere)
const calculateWealth = (resources: { [key in ResourceType]?: number }, market: MarketState): number => {
    let wealth = resources[ResourceType.GOLD] || 0;
    (Object.keys(resources) as ResourceType[]).forEach(res => {
        if (res !== ResourceType.GOLD && market.initialBasePrices[res] !== undefined) {
            wealth += (resources[res] || 0) * (market.initialBasePrices[res] as number);
        }
    });
    return Math.floor(wealth);
};


interface ResourceTrendData {
    resource: ResourceType;
    initialPrice: number;
    currentAveragePrice: number;
    fluctuation: number;
    recentSignals: MarketSignal[];
}

// Simple SVG Bar Chart for Resource Prices
const ResourcePriceBarChart: React.FC<{ data: ResourceTrendData[] }> = ({ data }) => {
    const chartHeight = 200;
    const barWidth = 30;
    const barGroupMargin = 20; // Margin between groups of bars for each resource
    const chartPadding = 30;
    const maxValue = Math.max(...data.flatMap(d => [d.initialPrice, d.currentAveragePrice]), 0) * 1.1 || 100; // Ensure maxValue is not 0

    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow mt-3">
            <h4 className="text-md font-medium text-gray-200 mb-2 text-center">자원 가격 변동 시각화</h4>
            <svg width="100%" height={chartHeight + chartPadding * 2} aria-labelledby="resourcePriceChartTitle" role="img">
                <title id="resourcePriceChartTitle">자원 초기 평균가 및 현재 평균가 비교 막대 그래프</title>
                {/* Y-axis (simple line) */}
                <line x1={chartPadding} y1={chartPadding} x2={chartPadding} y2={chartHeight + chartPadding} stroke="#a0aec0" strokeWidth="1"/>
                {/* X-axis (simple line) */}
                <line x1={chartPadding} y1={chartHeight + chartPadding} x2="98%" y2={chartHeight + chartPadding} stroke="#a0aec0" strokeWidth="1"/>
                
                {/* Y-axis labels (simplified) */}
                {[0, 0.25, 0.5, 0.75, 1].map(tick => (
                    <text key={`y-tick-${tick}`} x={chartPadding - 5} y={chartPadding + chartHeight * (1-tick) + 3} textAnchor="end" fontSize="10" fill="#a0aec0">
                        {(maxValue * tick).toFixed(0)}
                    </text>
                ))}

                {data.map((item, index) => {
                    const groupX = chartPadding + index * (barWidth * 2 + barGroupMargin) + barGroupMargin / 2;
                    const initialBarHeight = maxValue > 0 ? (item.initialPrice / maxValue) * chartHeight : 0;
                    const currentBarHeight = maxValue > 0 ? (item.currentAveragePrice / maxValue) * chartHeight : 0;


                    return (
                        <g key={item.resource} transform={`translate(${groupX}, 0)`} role="group" aria-label={`${KOREAN_RESOURCE_NAMES[item.resource]} 가격`}>
                            {/* Initial Price Bar */}
                            <rect
                                x={0}
                                y={chartPadding + chartHeight - initialBarHeight}
                                width={barWidth}
                                height={initialBarHeight}
                                fill="#4a5568" // Gray for initial
                                role="graphics-symbol"
                                aria-label={`초기 가격: ${item.initialPrice.toFixed(2)}`}
                            />
                            <title>{`${KOREAN_RESOURCE_NAMES[item.resource]} 초기 평균가: ${item.initialPrice.toFixed(2)}`}</title>
                            {/* Current Price Bar */}
                            <rect
                                x={barWidth + 5} // 5px spacing between bars in a group
                                y={chartPadding + chartHeight - currentBarHeight}
                                width={barWidth}
                                height={currentBarHeight}
                                fill="#38a169" // Green for current
                                role="graphics-symbol"
                                aria-label={`현재 가격: ${item.currentAveragePrice.toFixed(2)}`}
                            />
                             <title>{`${KOREAN_RESOURCE_NAMES[item.resource]} 현재 평균가: ${item.currentAveragePrice.toFixed(2)}`}</title>
                            {/* Resource Label */}
                            <text x={barWidth / 2 + 2.5} y={chartHeight + chartPadding + 15} textAnchor="middle" fontSize="11" fill="#e2e8f0">
                                {KOREAN_RESOURCE_NAMES[item.resource]}
                            </text>
                        </g>
                    );
                })}
                {/* Legend */}
                <g transform={`translate(${chartPadding + data.length * (barWidth * 2 + barGroupMargin) + 20}, ${chartPadding})`}>
                    <rect x="0" y="0" width="10" height="10" fill="#4a5568" />
                    <text x="15" y="9" fontSize="10" fill="#e2e8f0">초기가</text>
                    <rect x="0" y="20" width="10" height="10" fill="#38a169" />
                    <text x="15" y="29" fontSize="10" fill="#e2e8f0">현재가</text>
                </g>
            </svg>
        </div>
    );
};

interface ComparisonBarChartItem {
  id: string;
  name: string;
  color: string;
  value: number;
}

// Generic Horizontal Bar Chart
const ComparisonBarChart: React.FC<{ data: ComparisonBarChartItem[], title: string }> = ({ data, title }) => {
    if (data.length === 0) return <p className="text-sm text-gray-400">데이터 없음.</p>;
    
    const chartHeight = data.length * 30 + 20; // 30px per bar + padding
    const chartPadding = { top: 20, right: 30, bottom: 20, left: 80 }; // Increased left padding for labels
    const barHeight = 20;
    const maxValue = Math.max(...data.map(d => d.value), 0) * 1.1 || (title.includes("평판") ? 5.5 : 100); // Adjust max for standing if needed, or default
    const chartWidth = 350; // Fixed width for simplicity

    return (
        <div className="bg-gray-700 p-3 rounded-lg shadow">
            <h4 className="text-lg font-medium text-center text-gray-200 mb-2">{title}</h4>
            <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet" aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`} role="img">
                <title id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}>{`${title} 순위 막대 그래프`}</title>
                {data.map((item, index) => {
                    const value = item.value;
                    const barWidthValue = maxValue > 0 ? (value / maxValue) * (chartWidth - chartPadding.left - chartPadding.right) : 0;
                    const yPos = chartPadding.top + index * (barHeight + 10); // 10px spacing

                    return (
                        <g key={item.id} transform={`translate(${chartPadding.left}, ${yPos})`} role="group" aria-label={`${item.name}의 ${title.slice(0,-2)}: ${value}`}>
                            <text x={-5} y={barHeight / 2 + 4} textAnchor="end" fontSize="10" fill="#e2e8f0">
                                {item.name}
                            </text>
                            <rect
                                x={0}
                                y={0}
                                width={barWidthValue > 0 ? barWidthValue : 0}
                                height={barHeight}
                                fill={item.color || '#38a169'} // Use item color or default
                                role="graphics-symbol"
                            />
                            <title>{`${item.name} ${title.slice(0,-2)}: ${value.toLocaleString()}`}</title>
                            <text 
                                x={barWidthValue + 5 > chartWidth - chartPadding.left - chartPadding.right - 20 ? barWidthValue - 5 : barWidthValue + 5} 
                                y={barHeight / 2 + 4} 
                                textAnchor={barWidthValue + 5 > chartWidth - chartPadding.left - chartPadding.right - 20 ? "end" : "start"}
                                fontSize="10" 
                                fill="#e2e8f0">
                                {value.toLocaleString()}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};


const DashboardTab: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return <p className="text-gray-400">데이터를 불러오는 중입니다...</p>;

  const { gameState } = context;
  const { territories, factions, market, player, turn, activeFactionPolicies, activeWars, aiMerchants } = gameState;

  const keyResources: ResourceType[] = [ResourceType.FOOD, ResourceType.IRON, ResourceType.SILK, ResourceType.HERBS, ResourceType.TEA];

  const resourcePriceTrends = useMemo(() => {
    return keyResources.map(resource => {
      const initialPrice = INITIAL_MARKET_STATE.initialBasePrices[resource] || 0;
      let currentPricesSum = 0;
      let tradingTerritoriesCount = 0;

      territories.forEach(t => {
        if (t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL && t.localMarketPrices[resource] !== undefined) {
          currentPricesSum += t.localMarketPrices[resource]!;
          tradingTerritoriesCount++;
        }
      });
      
      const currentAveragePrice = tradingTerritoriesCount > 0 ? currentPricesSum / tradingTerritoriesCount : initialPrice;
      const fluctuation = initialPrice > 0 ? ((currentAveragePrice - initialPrice) / initialPrice) * 100 : 0;
      
      const recentSignals = market.marketSignals
        .filter(signal => signal.resource === resource && (turn - signal.turn) <= 3)
        .sort((a,b) => b.turn - a.turn)
        .slice(0, 1); 

      return {
        resource,
        initialPrice,
        currentAveragePrice,
        fluctuation,
        recentSignals,
      };
    });
  }, [keyResources, territories, market.marketSignals, turn, market.initialBasePrices]);

  const factionRankings = useMemo(() => {
    const aiFactions = factions.filter(f => f.id !== FactionId.NEUTRAL);
    const rankingsRaw = aiFactions.map(faction => {
      let militaryStrength = 0;
      let economicStrength = calculateWealth(faction.resources, market);
      let totalProductionValue = 0;

      territories.forEach(t => {
        if (t.ownerFactionId === faction.id) {
          militaryStrength += (t.garrison.infantry || 0) * 1;
          militaryStrength += (t.garrison.cavalry || 0) * 2.5; 
          militaryStrength += (t.garrison.archers || 0) * 1.5; 

          Object.values(ResourceType).forEach(res => {
            if (res !== ResourceType.GOLD && t.baseProduction[res] !== undefined && market.initialBasePrices[res] !== undefined) {
                totalProductionValue += (t.baseProduction[res]! * (market.initialBasePrices[res]!) * (1 + t.developmentLevel * 0.2));
            }
          });
        }
      });
      economicStrength += totalProductionValue;

      return {
        id: faction.id,
        name: KOREAN_FACTION_NAMES[faction.id],
        color: faction.color || '#cbd5e0', 
        militaryStrength: Math.floor(militaryStrength),
        economicStrength: Math.floor(economicStrength),
      };
    });
    return {
        military: rankingsRaw.map(r => ({ id: r.id, name: r.name, color: r.color, value: r.militaryStrength })).sort((a,b) => b.value - a.value),
        economic: rankingsRaw.map(r => ({ id: r.id, name: r.name, color: r.color, value: r.economicStrength })).sort((a,b) => b.value - a.value),
    };
  }, [factions, territories, market]);

  const playerInvestments = useMemo(() => {
    const buildings = territories
      .filter(t => t.specialBuilding?.fundedByPlayer)
      .map(t => ({
        territoryName: t.name,
        buildingName: KOREAN_SPECIALIZED_BUILDING_NAMES[t.specialBuilding!.type],
        effect: SPECIALIZED_BUILDING_CONFIGS[t.specialBuilding!.type].effectDescription,
      }));

    const policies = activeFactionPolicies
      .filter(p => p.playerContribution > 0)
      .map(p => ({
        policyName: KOREAN_FACTION_POLICY_NAMES[p.type],
        factionName: KOREAN_FACTION_NAMES[p.factionId],
        contribution: p.playerContribution,
        expectedBenefit: FACTION_POLICY_CONFIGS[p.type].playerBonusDescription || "관계도 향상",
      }));
    
    const wars = activeWars
        .filter(w => w.isActive && Object.values(w.playerContributions).some(contrib => (contrib || 0) > 0))
        .map(w => {
            const contributions = Object.entries(w.playerContributions)
                                    .filter(([_,amount]) => (amount || 0) > 0)
                                    .map(([factionId, amount]) => `${KOREAN_FACTION_NAMES[factionId as FactionId]}: ${amount}${RESOURCE_EMOJIS[ResourceType.GOLD]}`)
                                    .join(', ');
            return {
                warName: `${KOREAN_FACTION_NAMES[w.aggressorFactionId]} vs ${KOREAN_FACTION_NAMES[w.defenderFactionId]}`,
                mySupport: contributions,
                expectedBenefit: "승리 시 금, 자원, 교역 이점"
            }
        });

    return { buildings, policies, wars };
  }, [territories, activeFactionPolicies, activeWars, player.resources ]);

  const merchantStandingToValue = (standing: MerchantStandingLevel): number => {
    const order = [
        MerchantStandingLevel.OBSCURE, 
        MerchantStandingLevel.KNOWN, 
        MerchantStandingLevel.INFLUENTIAL, 
        MerchantStandingLevel.POWERBROKER, 
        MerchantStandingLevel.SHADOW_TYCOON
    ];
    return order.indexOf(standing) + 1;
  };
  
  const competitorComparisonData = useMemo(() => {
    const playerWealth = player.totalWealthHistory[player.totalWealthHistory.length - 1]?.wealth || 0;
    const playerStandingValue = merchantStandingToValue(player.merchantStanding);

    const wealthData: ComparisonBarChartItem[] = [
      { id: 'PLAYER', name: '플레이어', color: '#facc15', value: playerWealth },
      ...aiMerchants.map(merchant => ({
        id: merchant.id,
        name: merchant.name,
        color: '#38bdf8', // Sky-500 for AI merchants
        value: merchant.totalWealthHistory[merchant.totalWealthHistory.length - 1]?.wealth || 0,
      }))
    ].sort((a,b) => b.value - a.value);

    const standingData: ComparisonBarChartItem[] = [
      { id: 'PLAYER', name: '플레이어', color: '#facc15', value: playerStandingValue },
      ...aiMerchants.map(merchant => ({
        id: merchant.id,
        name: merchant.name,
        color: '#38bdf8',
        value: merchantStandingToValue(merchant.merchantStanding),
      }))
    ].sort((a,b) => b.value - a.value);
    
    // For standing chart, replace numeric value with Korean name for display after sorting
    const standingDataWithKoreanNames = standingData.map(item => ({
        ...item,
        name: `${item.name} (${KOREAN_MERCHANT_STANDING_NAMES[ (Object.values(MerchantStandingLevel)[item.value-1]) as MerchantStandingLevel ] || 'N/A'})`
    }));


    return { wealth: wealthData, standing: standingDataWithKoreanNames };
  }, [player, aiMerchants, market]);


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-yellow-400">종합 정보 대시보드</h2>

      {/* 1. Key Resource Price Trends */}
      <section>
        <h3 className="text-xl font-semibold text-sky-300 mb-2">주요 자원 시세 동향</h3>
        <div className="overflow-x-auto bg-gray-800 p-3 rounded-lg shadow">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-600">
              <tr>
                <th scope="col" className="px-4 py-2">자원</th>
                <th scope="col" className="px-4 py-2">초기 평균가</th>
                <th scope="col" className="px-4 py-2">현재 평균가</th>
                <th scope="col" className="px-4 py-2">변동률</th>
                <th scope="col" className="px-4 py-2">최근 주요 변동</th>
              </tr>
            </thead>
            <tbody>
              {resourcePriceTrends.map(item => (
                <tr key={item.resource} className="border-b border-gray-600 hover:bg-gray-700/50">
                  <td className="px-4 py-2 font-medium">{RESOURCE_EMOJIS[item.resource]} {KOREAN_RESOURCE_NAMES[item.resource]}</td>
                  <td className="px-4 py-2">{item.initialPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">{item.currentAveragePrice.toFixed(2)}</td>
                  <td className={`px-4 py-2 ${item.fluctuation > 5 ? 'text-red-400' : item.fluctuation < -5 ? 'text-green-400' : ''}`}>
                    {item.fluctuation.toFixed(1)}% {item.fluctuation > 5 ? '▲' : item.fluctuation < -5 ? '▼' : '-'}
                  </td>
                  <td className="px-4 py-2 text-xs">
                    {item.recentSignals.length > 0 ? 
                        item.recentSignals.map(s => 
                            `턴 ${s.turn}: ${territories.find(t=>t.id === s.territoryId)?.name || 'N/A'}에서 ${s.priceSpikePercent > 0 ? '+' : ''}${(s.priceSpikePercent * 100).toFixed(0)}% 급등`
                        ).join (', ')
                        : '없음'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ResourcePriceBarChart data={resourcePriceTrends} />
        </div>
      </section>

      {/* 2. Faction Status Board */}
      <section>
        <h3 className="text-xl font-semibold text-sky-300 mb-2">세력 현황판</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ComparisonBarChart data={factionRankings.military} title="군사력 순위" />
          <ComparisonBarChart data={factionRankings.economic} title="경제력 순위" />
        </div>
      </section>

       {/* 3. Competitor Comparison */}
      <section>
        <h3 className="text-xl font-semibold text-sky-300 mb-2">경쟁 상인 비교</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ComparisonBarChart data={competitorComparisonData.wealth} title="총 자산 비교" />
          <ComparisonBarChart data={competitorComparisonData.standing} title="상인 평판 비교" />
        </div>
      </section>

      {/* 4. Player Investment Portfolio */}
      <section>
        <h3 className="text-xl font-semibold text-sky-300 mb-2">나의 투자 포트폴리오</h3>
        <div className="space-y-4">
          {playerInvestments.buildings.length > 0 && (
            <div className="bg-gray-800 p-3 rounded-lg shadow">
              <h4 className="text-lg font-medium text-amber-300 mb-2">특화 건물 투자 현황</h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                {playerInvestments.buildings.map((b, i) => (
                  <li key={`building-${i}`}><strong>{b.territoryName}</strong> - {b.buildingName}: <em>{b.effect}</em></li>
                ))}
              </ul>
            </div>
          )}
          {playerInvestments.policies.length > 0 && (
            <div className="bg-gray-800 p-3 rounded-lg shadow">
              <h4 className="text-lg font-medium text-cyan-300 mb-2">세력 정책 지원 현황</h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                {playerInvestments.policies.map((p, i) => (
                  <li key={`policy-${i}`}><strong>{p.policyName} ({p.factionName})</strong> - 지원금: {p.contribution}{RESOURCE_EMOJIS[ResourceType.GOLD]}. 혜택: <em>{p.expectedBenefit}</em></li>
                ))}
              </ul>
            </div>
          )}
           {playerInvestments.wars.length > 0 && (
            <div className="bg-gray-800 p-3 rounded-lg shadow">
              <h4 className="text-lg font-medium text-red-300 mb-2">전쟁 자금 지원 현황</h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                {playerInvestments.wars.map((w, i) => (
                  <li key={`war-${i}`}><strong>{w.warName}</strong> - 나의 지원: {w.mySupport}. 혜택: <em>{w.expectedBenefit}</em></li>
                ))}
              </ul>
            </div>
          )}
          {playerInvestments.buildings.length === 0 && playerInvestments.policies.length === 0 && playerInvestments.wars.length === 0 && (
            <p className="text-gray-400 bg-gray-800 p-3 rounded-lg shadow">아직 주요 투자 활동이 없습니다.</p>
          )}
        </div>
      </section>
      <p className="text-xs text-gray-500 mt-2 text-center">이 정보는 현재 턴을 기준으로 제공됩니다. 그래프는 단순화된 형태로 제공됩니다.</p>
    </div>
  );
};

export default DashboardTab;
