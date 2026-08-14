
import React from 'react';
import { Territory, ResourceType, PriceHistoryEntry } from '../types';
import { KOREAN_RESOURCE_NAMES, RESOURCE_EMOJIS } from '../constants';
import Modal from './common/Modal';
import Button from './common/Button'; // Added import for Button

interface PriceTrendModalProps {
  isOpen: boolean;
  onClose: () => void;
  territory: Territory | undefined;
  resource: ResourceType | null;
  currentTurn: number;
}

const PriceTrendChart: React.FC<{
    priceHistory: PriceHistoryEntry[];
    resourceName: string;
    currentTurn: number;
    territoryName: string; // Added territoryName prop
}> = ({ priceHistory, resourceName, currentTurn, territoryName }) => {
    const chartHeight = 200;
    const chartWidth = 400; // Fixed width for simplicity
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const drawableWidth = chartWidth - padding.left - padding.right;
    const drawableHeight = chartHeight - padding.top - padding.bottom;

    const relevantHistory = priceHistory
        .filter(entry => entry.turn >= currentTurn - 11 && entry.turn <= currentTurn)
        .sort((a,b) => a.turn - b.turn);
    
    if (relevantHistory.length < 2) {
        return <p className="text-center text-gray-400">최근 12턴간의 가격 데이터가 2개 미만이라 차트를 표시할 수 없습니다.</p>;
    }

    const minTurn = Math.max(1, currentTurn - 11);
    const maxTurn = currentTurn;
    
    const prices = relevantHistory.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Ensure yAxisMax is not equal to yAxisMin to avoid division by zero
    const yAxisMin = priceRange === 0 ? minPrice - 5 : minPrice - priceRange * 0.1;
    const yAxisMax = priceRange === 0 ? maxPrice + 5 : maxPrice + priceRange * 0.1;
    const effectiveYRange = yAxisMax - yAxisMin === 0 ? 1 : yAxisMax - yAxisMin; // Avoid division by zero if all prices are same


    const getX = (turn: number) => padding.left + ((turn - minTurn) / (maxTurn - minTurn)) * drawableWidth;
    const getY = (price: number) => padding.top + drawableHeight - ((price - yAxisMin) / effectiveYRange) * drawableHeight;

    const pathData = relevantHistory
        .map(d => `${getX(d.turn)},${getY(d.price)}`)
        .join(' L ');

    const numYTicks = 5;
    const yTicks = Array.from({ length: numYTicks }, (_, i) => yAxisMin + (i / (numYTicks - 1)) * (effectiveYRange));
    
    const numXTicks = Math.min(relevantHistory.length, 12);
    const xTickTurns = relevantHistory.map(entry => entry.turn);


    return (
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet" aria-labelledby="priceTrendChartTitle" role="img">
             <title id="priceTrendChartTitle">{`${territoryName} ${resourceName} 가격 추세 (최근 12턴)`}</title>
            {/* Y-axis */}
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + drawableHeight} stroke="#a0aec0" strokeWidth="1" />
            {yTicks.map(tick => (
                <g key={`y-tick-${tick}`}>
                    <text x={padding.left - 5} y={getY(tick) + 3} textAnchor="end" fontSize="10" fill="#a0aec0">
                        {tick.toFixed(1)}
                    </text>
                    <line x1={padding.left -3} y1={getY(tick)} x2={padding.left} y2={getY(tick)} stroke="#a0aec0" strokeWidth="0.5" />
                </g>
            ))}

            {/* X-axis */}
            <line x1={padding.left} y1={padding.top + drawableHeight} x2={padding.left + drawableWidth} y2={padding.top + drawableHeight} stroke="#a0aec0" strokeWidth="1" />
             {xTickTurns.map((turn, index) => (
                 relevantHistory.find(entry => entry.turn === turn) && ( // Ensure the turn is in the filtered history
                    <g key={`x-tick-${turn}`}>
                        <text x={getX(turn)} y={padding.top + drawableHeight + 15} textAnchor="middle" fontSize="10" fill="#a0aec0">
                            {turn}
                        </text>
                         <line x1={getX(turn)} y1={padding.top + drawableHeight} x2={getX(turn)} y2={padding.top + drawableHeight + 3} stroke="#a0aec0" strokeWidth="0.5" />
                    </g>
                 )
            ))}
            <text x={padding.left + drawableWidth / 2} y={padding.top + drawableHeight + 30} textAnchor="middle" fontSize="11" fill="#e2e8f0">턴</text>
            <text x={padding.left - 35} y={padding.top + drawableHeight/2} textAnchor="middle" fontSize="11" fill="#e2e8f0" transform={`rotate(-90, ${padding.left - 35}, ${padding.top + drawableHeight/2})`}>가격</text>


            {/* Line Path */}
            <path d={`M ${pathData}`} fill="none" stroke="#38bdf8" strokeWidth="2" />

            {/* Data Points */}
            {relevantHistory.map(d => (
                <circle key={`dot-${d.turn}`} cx={getX(d.turn)} cy={getY(d.price)} r="3" fill="#38bdf8">
                    <title>{`턴 ${d.turn}: ${d.price.toFixed(2)}`}</title>
                </circle>
            ))}
        </svg>
    );
};


const PriceTrendModal: React.FC<PriceTrendModalProps> = ({ isOpen, onClose, territory, resource, currentTurn }) => {
  if (!isOpen || !territory || !resource) return null;

  const resourceName = KOREAN_RESOURCE_NAMES[resource] || '알 수 없는 자원';
  const resourceEmoji = RESOURCE_EMOJIS[resource] || '';
  const priceHistory = territory.localMarketPriceHistory?.[resource] || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${territory.name} - ${resourceEmoji}${resourceName} 가격 추세`}>
      <div className="space-y-4">
        <p className="text-sm text-gray-300">최근 12턴간의 가격 변동 추이입니다 (현재 턴: {currentTurn}).</p>
        <div className="bg-gray-700 p-2 rounded-lg">
            <PriceTrendChart 
                priceHistory={priceHistory} 
                resourceName={resourceName} 
                currentTurn={currentTurn}
                territoryName={territory.name} // Pass territory name
            />
        </div>
        <div className="text-center">
            <Button onClick={onClose} variant="secondary">닫기</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PriceTrendModal;
