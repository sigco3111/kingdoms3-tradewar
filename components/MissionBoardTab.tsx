
import React, { useContext, useState } from 'react';
import { GameContext } from '../App';
import { Mission, MissionStatus, MissionType, ResourceType } from '../types';
import { KOREAN_FACTION_NAMES, KOREAN_MISSION_TYPE_NAMES, KOREAN_MISSION_STATUS_NAMES, RESOURCE_EMOJIS, KOREAN_RESOURCE_NAMES } from '../constants';
import Button from './common/Button';

const MissionCard: React.FC<{ mission: Mission, onAccept?: (id: string) => void, onAbandon?: (id: string) => void, onContribute?: (id: string, resourceType: ResourceType, amount: number) => void }> = 
    ({ mission, onAccept, onAbandon, onContribute }) => {
    
    const context = useContext(GameContext);
    if (!context) return null;
    const { gameState } = context;
    const { player } = gameState;

    const [contributionAmount, setContributionAmount] = useState(100);

    const offeringFactionName = KOREAN_FACTION_NAMES[mission.offeringFactionId];
    const missionTypeName = KOREAN_MISSION_TYPE_NAMES[mission.type];

    const getProgressBar = () => {
        if (mission.type === MissionType.DELIVER_RESOURCES || mission.type === MissionType.INVEST_TERRITORY) {
            const progress = ((mission.currentAmount || 0) / (mission.requiredAmount || 1)) * 100;
            return (
                <div className="w-full bg-gray-600 rounded-full h-2.5 dark:bg-gray-700 my-1">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, progress)}%` }}></div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-3 bg-gray-700 rounded-lg shadow space-y-2">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-md font-semibold text-yellow-300">{missionTypeName} ({offeringFactionName})</h4>
                    <p className="text-xs text-gray-400">요청 세력: {offeringFactionName}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${
                    mission.status === MissionStatus.AVAILABLE ? 'bg-blue-500' :
                    mission.status === MissionStatus.ACCEPTED ? 'bg-green-500' :
                    mission.status === MissionStatus.COMPLETED ? 'bg-teal-500' : 'bg-red-500'
                }`}>
                    {KOREAN_MISSION_STATUS_NAMES[mission.status]}
                </span>
            </div>
            <p className="text-sm text-gray-200">{mission.description}</p>
            {mission.status === MissionStatus.ACCEPTED && mission.remainingTurns !== undefined && (
                 <p className="text-xs text-orange-300">남은 턴: {mission.remainingTurns}</p>
            )}
             {mission.status === MissionStatus.AVAILABLE && (
                 <p className="text-xs text-gray-300">제한 턴: {mission.timeLimitTurns}</p>
            )}

            {(mission.type === MissionType.DELIVER_RESOURCES || mission.type === MissionType.INVEST_TERRITORY) && mission.requiredAmount && (
                <p className="text-xs text-gray-300">
                    목표: {mission.type === MissionType.INVEST_TERRITORY ? `${mission.requiredAmount} ${RESOURCE_EMOJIS.Gold}` : `${KOREAN_RESOURCE_NAMES[mission.targetResourceType!]} ${mission.requiredAmount}개`}
                    {mission.status === MissionStatus.ACCEPTED && ` (현재: ${mission.currentAmount || 0})`}
                </p>
            )}
            {getProgressBar()}

            <p className="text-xs text-gray-300">
                보상: {mission.rewardGold ? `${mission.rewardGold} ${RESOURCE_EMOJIS.Gold}` : ''}
                {mission.rewardGold && mission.rewardRelationshipPoints ? ', ' : ''}
                {mission.rewardRelationshipPoints ? `관계도 +${mission.rewardRelationshipPoints}` : ''}
            </p>

            {mission.status === MissionStatus.AVAILABLE && onAccept && (
                <Button onClick={() => onAccept(mission.id)} size="sm" className="w-full">수락</Button>
            )}
            {mission.status === MissionStatus.ACCEPTED && onAbandon && (
                <div className="flex flex-col sm:flex-row gap-2">
                    {mission.type === MissionType.DELIVER_RESOURCES && mission.targetResourceType && onContribute && 
                     (mission.currentAmount || 0) < (mission.requiredAmount || Infinity) && (
                        <div className="flex gap-2 flex-grow">
                            <input 
                                type="number" 
                                value={contributionAmount} 
                                onChange={(e) => setContributionAmount(Math.max(1, parseInt(e.target.value) || 1))}
                                className="bg-gray-600 border border-gray-500 rounded p-1.5 text-white w-20 text-xs"
                                min="1"
                                max={player.resources[mission.targetResourceType] || 0}
                            />
                            <Button 
                                onClick={() => onContribute(mission.id, mission.targetResourceType!, contributionAmount)} 
                                size="sm" 
                                variant="secondary"
                                disabled={(player.resources[mission.targetResourceType!] || 0) < contributionAmount || contributionAmount <=0 }
                                className="flex-grow"
                            >
                                {KOREAN_RESOURCE_NAMES[mission.targetResourceType]} 기여
                            </Button>
                        </div>
                    )}
                    <Button onClick={() => onAbandon(mission.id)} size="sm" variant="danger" className="sm:w-auto">포기</Button>
                </div>
            )}
        </div>
    );
};

const MissionBoardTab: React.FC = () => {
    const context = useContext(GameContext);
    if (!context) return null;

    const { gameState, dispatch } = context;
    const { availableMissions, acceptedMissions } = gameState;

    const handleAcceptMission = (missionId: string) => {
        dispatch({ type: 'ACCEPT_MISSION', payload: { missionId } });
    };

    const handleAbandonMission = (missionId: string) => {
        if (window.confirm("정말로 이 임무를 포기하시겠습니까? 관계도 하락 등 불이익이 있을 수 있습니다.")) {
            dispatch({ type: 'ABANDON_MISSION', payload: { missionId } });
        }
    };
    
    const handleContributeToMission = (missionId: string, resourceType: ResourceType, amount: number) => {
        dispatch({ type: 'PLAYER_CONTRIBUTE_TO_MISSION', payload: { missionId, resourceType, amount }});
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">수락 가능한 임무 ({availableMissions.length})</h3>
                {availableMissions.length === 0 ? (
                    <p className="text-gray-400">현재 수락 가능한 임무가 없습니다.</p>
                ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {availableMissions.map(mission => (
                            <MissionCard key={mission.id} mission={mission} onAccept={handleAcceptMission} />
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">진행 중인 임무 ({acceptedMissions.length})</h3>
                {acceptedMissions.length === 0 ? (
                    <p className="text-gray-400">현재 진행 중인 임무가 없습니다.</p>
                ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {acceptedMissions.map(mission => (
                            <MissionCard key={mission.id} mission={mission} onAbandon={handleAbandonMission} onContribute={handleContributeToMission} />
                        ))}
                    </div>
                )}
            </div>
             <p className="text-xs text-gray-500">
                임무를 통해 보상을 얻고 세력과의 관계를 발전시킬 수 있습니다. 일부 임무는 특정 조건(예: 영향력)을 요구할 수 있습니다.
            </p>
        </div>
    );
};

export default MissionBoardTab;
