
import React, { useContext, useEffect, useRef } from 'react';
import { GameContext } from '../App';
import { GameEvent, GameEventType } from '../types'; // Updated to use GameEventType

const EventLog: React.FC = () => {
  const context = useContext(GameContext);
  const logEndRef = useRef<HTMLDivElement>(null);

  if (!context) return null;
  const { gameState } = context;

  // useEffect(() => {
  //   logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [gameState.events]); // Removed this useEffect to prevent auto-scrolling

  const getEventColor = (type: GameEventType): string => {
    switch (type) {
      case GameEventType.BATTLE: return 'text-red-400';
      case GameEventType.FINANCE: return 'text-green-400'; 
      case GameEventType.TRADE: return 'text-sky-400'; 
      case GameEventType.POLITICS: return 'text-purple-400';
      case GameEventType.ESPIONAGE: return 'text-indigo-400';
      case GameEventType.RELATIONSHIP: return 'text-pink-400';
      case GameEventType.ECONOMIC: return 'text-orange-400'; 
      case GameEventType.MISSION: return 'text-lime-400';
      case GameEventType.AI_MERCHANT_ACTION: return 'text-teal-400';
      case GameEventType.SLANDER: return 'text-rose-400';
      case GameEventType.CONSTRUCTION: return 'text-amber-400'; // Building construction
      case GameEventType.POLICY: return 'text-cyan-400'; // Faction policies
      case GameEventType.WAR_EVENT: return 'text-red-500'; // War declarations, major war events
      case GameEventType.SYSTEM: return 'text-yellow-400';
      case GameEventType.INFO: 
      default: return 'text-blue-300';
    }
  };
  
  const MAX_EVENTS_DISPLAYED = 35;


  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl h-48 lg:h-64 flex flex-col">
      <div className="flex items-baseline mb-2">
        <h2 className="text-xl font-semibold text-yellow-300">상황 보고</h2>
        <span className="ml-2 text-xs text-gray-400">(최대 {MAX_EVENTS_DISPLAYED}개 까지 출력됩니다.)</span>
      </div>
      <div className="flex-grow overflow-y-auto space-y-1 pr-2">
        {gameState.events.slice(-MAX_EVENTS_DISPLAYED).map(event => (
          <div key={event.id} className={`text-sm ${getEventColor(event.type)}`}>
            <span className="font-semibold">[턴 {event.turn}]</span> {event.message}
          </div>
        ))}
        <div ref={logEndRef} /> {/* This ref can still be used if manual scroll is ever needed */}
      </div>
    </div>
  );
};

export default EventLog;