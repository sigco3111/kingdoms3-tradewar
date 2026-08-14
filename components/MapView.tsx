
import React, { useContext } from 'react';
import { GameContext } from '../App';
import { Territory, FactionId } from '../types';
import { MAP_DIMENSIONS } from '../constants';

const TerritoryCell: React.FC<{ territory: Territory }> = ({ territory }) => {
  const context = useContext(GameContext);
  if (!context) return null;
  const { gameState, dispatch } = context; 

  const faction = gameState.factions.find(f => f.id === territory.ownerFactionId);
  const factionHexColor = faction ? faction.color : '#4a5568'; // Default to a gray hex if no faction or neutral
  const isSelected = gameState.selectedTerritoryId === territory.id;

  const handleClick = () => {
    dispatch({ type: 'SELECT_TERRITORY', payload: territory.id });
  };

  return (
    <div
      onClick={handleClick}
      className={`p-2 border-2 ${isSelected ? 'border-yellow-400 scale-105 shadow-xl' : 'border-gray-600 hover:border-gray-400'} cursor-pointer transition-all duration-150 ease-in-out aspect-square flex flex-col justify-center items-center text-center rounded-md`}
      style={{ backgroundColor: factionHexColor }}
      title={territory.name}
    >
      <div className="text-xs sm:text-sm font-semibold text-white truncate w-full">{territory.name}</div>
      {faction && faction.id !== FactionId.NEUTRAL && (
         <div className="text-xs text-gray-300 truncate w-full">{faction.name}</div>
      )}
      <div className="text-xs text-gray-300 mt-1">
        ⚔️{territory.garrison.infantry + territory.garrison.cavalry + territory.garrison.archers}
      </div>
    </div>
  );
};

const MapView: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) return <div className="text-center p-4">지도 로딩 중...</div>;

  const { gameState } = context;
  const { territories } = gameState;

  // Create a grid representation
  const grid: (Territory | null)[][] = Array(MAP_DIMENSIONS.rows)
    .fill(null)
    .map(() => Array(MAP_DIMENSIONS.cols).fill(null));

  territories.forEach(t => {
    if (t.position.y < MAP_DIMENSIONS.rows && t.position.x < MAP_DIMENSIONS.cols) {
      grid[t.position.y][t.position.x] = t;
    }
  });
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold mb-3 text-yellow-300">세계 지도</h2>
      <div 
        className="grid gap-2 sm:gap-3" 
        style={{ gridTemplateColumns: `repeat(${MAP_DIMENSIONS.cols}, minmax(0, 1fr))` }}
      >
        {grid.flat().map((territory, index) =>
          territory ? (
            <TerritoryCell key={territory.id} territory={territory} />
          ) : (
            <div key={`empty-${index}`} className="p-2 border border-gray-700 aspect-square rounded-md bg-gray-700/50"></div>
          )
        )}
      </div>
    </div>
  );
};

export default MapView;
