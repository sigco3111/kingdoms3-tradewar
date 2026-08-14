

import { GameState, GameAction, Faction, Territory, ResourceType, FactionId, FinancialTacticType, ArmyUnits, GameEvent, ControlTab, MarketState, PlayerState, AutomationStrategy, EspionageActionType, RelationshipLevel, MerchantStandingLevel, EconomicEventType, EconomicEvent, Mission, MissionStatus, MissionType, GameEventType, AIMerchant, AIMerchantPersonality, Resources, SlanderEffect, MarketSignal, SpecializedBuildingType, FactionPolicyType, ActiveFactionPolicy, ActiveWar, TerritorySpecialBuilding, TemporaryTradeAdvantage, PriceHistoryEntry } from '../types';
import { 
    INITIAL_GAME_STATE,
    INITIAL_PLAYER_STATE, 
    INITIAL_FACTIONS, 
    INITIAL_TERRITORIES, 
    INITIAL_MARKET_STATE, 
    FINANCIAL_TACTIC_PLAYER_COST, 
    PLAYER_INVESTMENT_COST_PER_LEVEL_BASE,
    AI_INVESTMENT_COST_PER_LEVEL, 
    AI_RECRUITMENT_COST, 
    MAX_DEVELOPMENT_LEVEL, 
    PRODUCTION_BONUS_PER_LEVEL, 
    AI_RECRUITMENT_BATCH_SIZE,
    KOREAN_RESOURCE_NAMES,
    KOREAN_UNIT_NAMES,
    KOREAN_FINANCIAL_TACTIC_NAMES,
    KOREAN_FACTION_NAMES,
    KOREAN_AUTOMATION_STRATEGY_NAMES,
    TRADE_MARKUP,
    SUPPLY_PROFIT_MARGIN,
    MAX_INFLUENCE_LEVEL,
    INFLUENCE_ESTABLISH_COST_GOLD,
    INFLUENCE_UPGRADE_COST_GOLD_PER_LEVEL,
    INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL,
    ESPIONAGE_ACTION_CONFIGS,
    KOREAN_ESPIONAGE_ACTION_NAMES,
    ESPIONAGE_DETECTION_CHANCE_BASE,
    INCITE_UNREST_RESOURCE_LOSS_FOOD,
    INCITE_UNREST_RESOURCE_LOSS_IRON,
    RELATIONSHIP_THRESHOLDS,
    MAX_RELATIONSHIP_SCORE,
    MIN_RELATIONSHIP_SCORE,
    REL_CHANGE,
    KOREAN_RELATIONSHIP_LEVEL_NAMES,
    RELATIONSHIP_MODIFIERS,
    MERCHANT_STANDING_THRESHOLDS,
    KOREAN_MERCHANT_STANDING_NAMES,
    ECONOMIC_EVENT_DEFINITIONS,
    KOREAN_ECONOMIC_EVENT_NAMES,
    MISSION_DEFINITIONS,
    KOREAN_MISSION_TYPE_NAMES,
    INITIAL_AI_MERCHANTS, 
    AI_MERCHANT_TRADE_MARKUP,
    AI_MERCHANT_INVESTMENT_THRESHOLD_GOLD,
    AI_MERCHANT_MIN_GOLD_RESERVE,
    AI_MERCHANT_TRADE_AMOUNT_MIN,
    AI_MERCHANT_TRADE_AMOUNT_MAX,
    AI_MERCHANT_INVESTMENT_AMOUNT_BASE,
    MARKET_PRICE_FLUCTUATION_PERCENT, // Added this constant
    MARKET_DEPTH_FOR_PRICE_CHANGE, 
    MIN_RESOURCE_PRICE,            
    MAX_RESOURCE_PRICE_MULTIPLIER_FROM_INITIAL, 
    RESOURCE_EMOJIS,
    SLANDER_MERCHANT_COST_GOLD,
    SLANDER_EFFECT_DURATION_TURNS,
    SLANDER_PRICE_PENALTY_PERCENT,
    AI_REACTION_HOARD_THRESHOLD_PERCENT,
    MAX_MARKET_SIGNALS,
    AI_SLANDER_PLAYER_CHANCE,
    SPECIALIZED_BUILDING_CONFIGS, KOREAN_SPECIALIZED_BUILDING_NAMES,
    SPECIAL_BUILDING_MARKET_HALL_PROD_BONUS, SPECIAL_BUILDING_TRADE_DEPOT_PRICE_BONUS,
    SPECIAL_BUILDING_FARM_FOOD_BONUS, SPECIAL_BUILDING_MINE_IRON_BONUS, SPECIAL_BUILDING_SILK_WORKSHOP_SILK_BONUS,
    FACTION_POLICY_CONFIGS, KOREAN_FACTION_POLICY_NAMES, POLICY_PLAYER_CONTRIBUTION_THRESHOLD_PERCENT,
    WAR_FUNDING_SPOILS_GOLD_FACTOR, WAR_FUNDING_SPOILS_RESOURCES_VALUE_FACTOR, WAR_FUNDING_TRADE_ADVANTAGE_TURNS,
    FACTION_POLICY_INITIATION_CHANCE, FACTION_WAR_DECLARATION_CHANCE, SPECIAL_BUILDING_MARKET_HALL_INFLUENCE_COST_REDUCTION,
    MAX_PRICE_HISTORY_PER_RESOURCE,
    AUTO_INVESTMENT_MIN_GOLD_HELD, AUTO_INVESTMENT_RELATIONSHIP_THRESHOLD,
    AUTO_SELL_SILK_SURPLUS_THRESHOLD, AUTO_SELL_SILK_AMOUNT_TO_SELL, AUTO_SELL_SILK_MIN_PROFIT_MARGIN,
    AUTO_SELL_FOOD_SURPLUS_THRESHOLD, AUTO_SELL_FOOD_AMOUNT_TO_SELL, AUTO_SELL_DEFAULT_MIN_PROFIT_MARGIN,
    AUTO_SELL_IRON_SURPLUS_THRESHOLD, AUTO_SELL_IRON_AMOUNT_TO_SELL,
    AUTO_SELL_HERBS_SURPLUS_THRESHOLD, AUTO_SELL_HERBS_AMOUNT_TO_SELL,
    AUTO_SELL_TEA_SURPLUS_THRESHOLD, AUTO_SELL_TEA_AMOUNT_TO_SELL,
    AUTO_BUY_FOOD_DEFICIT_THRESHOLD, AUTO_BUY_FOOD_AMOUNT_TO_BUY, AUTO_BUY_DEFAULT_MAX_COST_INCREASE_MARGIN,
    AUTO_BUY_IRON_DEFICIT_THRESHOLD, AUTO_BUY_IRON_AMOUNT_TO_BUY,
    AUTO_BUY_HERBS_DEFICIT_THRESHOLD, AUTO_BUY_HERBS_AMOUNT_TO_BUY,
    AUTO_BUY_TEA_DEFICIT_THRESHOLD, AUTO_BUY_TEA_AMOUNT_TO_BUY,
    AUTO_BUILDING_MIN_GOLD_FOR_ANY_BUILDING, AUTO_BUILDING_RELATIONSHIP_THRESHOLD,
    AUTO_FINANCIAL_MIN_GOLD_FOR_STIMULATE, AUTO_FINANCIAL_MIN_GOLD_FOR_SLANDER,
    AUTO_SLANDER_WEALTH_DIFFERENCE_THRESHOLD, AUTO_SLANDER_STANDING_DIFFERENCE_THRESHOLD,
    AUTO_FAVORED_FACTION_MIN_TERRITORIES_CONSIDERATION, AUTO_FAVORED_FACTION_TERRITORY_SCORE_MULTIPLIER, AUTO_FAVORED_FACTION_ECON_SCORE_DIVISOR,
    AUTO_COMPETITIVE_WEALTH_RATIO_THRESHOLD, AUTO_COMPETITIVE_STANDING_DIFFERENCE_THRESHOLD, 
    AUTO_SLANDER_CHANCE_IF_BEHIND_MULTIPLIER, AUTO_STIMULATE_FAVORED_FACTION_CHANCE_IF_BEHIND, 
    AUTO_SELL_SURPLUS_AGGRESSION_FACTOR_IF_BEHIND, AUTO_MISSION_GOLD_PRIORITY_FACTOR_IF_BEHIND, 
    AUTO_SLANDER_FAVORED_FACTION_REL_THRESHOLD,
    AUTO_MISSION_ACCEPT_RELATIONSHIP_THRESHOLD, AUTO_MISSION_ACCEPT_MIN_GOLD_REWARD, 
    AUTO_MISSION_ACCEPT_MIN_REL_REWARD, AUTO_MISSION_ACCEPT_RESOURCE_BUFFER_FACTOR, 
    AUTO_MISSION_ACCEPT_MIN_TIME_LIMIT, AUTO_MISSION_MAX_NEWLY_ACCEPTED_PER_TURN, 
    AUTO_MISSION_CONTRIBUTION_MAX_PERCENT_PER_TURN, AUTO_MISSION_CRITICAL_RESOURCE_RESERVE_FACTOR, 
    AUTO_MISSION_CRITICAL_GOLD_RESERVE_FACTOR, AUTO_MISSION_ESPIONAGE_MIN_INFLUENCE,
    AUTO_SELL_MIN_PROFIT_MARGIN_IF_BEHIND, AUTO_INVESTMENT_MIN_GOLD_HELD_IF_BEHIND_MULTIPLIER,
    AUTO_BUILDING_MIN_GOLD_IF_BEHIND_MULTIPLIER, AUTO_SABOTAGE_MARKET_CHANCE_IF_BEHIND,
    AUTO_TRADE_ARBITRAGE_MIN_PROFIT_MARGIN, AUTO_TRADE_ARBITRAGE_MAX_GOLD_COMMIT_FACTOR,
    AUTO_TRADE_OPPORTUNISTIC_BUY_PRICE_THRESHOLD_FACTOR, AUTO_TRADE_OPPORTUNISTIC_BUY_AMOUNT_SILK,
    AUTO_TRADE_OPPORTUNISTIC_BUY_AMOUNT_HERBS_TEA, AUTO_TRADE_MIN_GOLD_RESERVE_FOR_TRADING_FACTOR,
    AUTO_TRADE_MAX_OPPORTUNISTIC_BUYS_PER_TURN, AUTO_TRADE_MAX_ARBITRAGE_TRADES_PER_TURN
} from '../constants';


export const generateId = (): string => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    // Fallback for environments where crypto.randomUUID is not available or misconfigured
    console.warn('crypto.randomUUID not available, using Math.random fallback for ID generation.');
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};


const getUnitStringKorean = (units: Partial<ArmyUnits>): string => {
  return Object.entries(units)
    .filter(([, count]) => count && count > 0)
    .map(([type, count]) => `${KOREAN_UNIT_NAMES[type as keyof ArmyUnits]} ${count}`)
    .join(', ');
};

const addEventToState = (state: GameState, message: string, type: GameEventType = GameEventType.INFO): GameState => {
  console.log(`[Event T${state.turn} ${type}]: ${message}`);
  const newEvent: GameEvent = { id: generateId(), turn: state.turn, message, type };
  return {...state, events: [...state.events, newEvent]};
};

export const getRelationshipLevel = (score: number): RelationshipLevel => {
    if (score <= RELATIONSHIP_THRESHOLDS[RelationshipLevel.HOSTILE].max) return RelationshipLevel.HOSTILE;
    if (score <= RELATIONSHIP_THRESHOLDS[RelationshipLevel.UNFRIENDLY].max) return RelationshipLevel.UNFRIENDLY;
    if (score <= RELATIONSHIP_THRESHOLDS[RelationshipLevel.NEUTRAL].max) return RelationshipLevel.NEUTRAL;
    if (score <= RELATIONSHIP_THRESHOLDS[RelationshipLevel.FRIENDLY].max) return RelationshipLevel.FRIENDLY;
    return RelationshipLevel.ALLIED;
};

const updateFactionRelation = (state: GameState, factionId: FactionId, change: number, reason?: string): GameState => {
    if (factionId === FactionId.NEUTRAL) return state;

    const currentScore = state.player.factionRelations[factionId] || 0;
    const newScore = Math.max(MIN_RELATIONSHIP_SCORE, Math.min(MAX_RELATIONSHIP_SCORE, currentScore + change));
    
    let newState = {...state};
    newState.player.factionRelations[factionId] = newScore;

    const oldLevel = getRelationshipLevel(currentScore);
    const newLevel = getRelationshipLevel(newScore);

    let message = `${KOREAN_FACTION_NAMES[factionId]}와(과)의 관계가 ${change > 0 ? '개선': '악화'}되었습니다 (${currentScore} -> ${newScore}).`;
    if (reason) message += ` 사유: ${reason}.`;
    if (oldLevel !== newLevel) {
        message += ` 관계 단계 변경: ${KOREAN_RELATIONSHIP_LEVEL_NAMES[oldLevel]} -> ${KOREAN_RELATIONSHIP_LEVEL_NAMES[newLevel]}.`;
    }
    newState = addEventToState(newState, message, GameEventType.RELATIONSHIP);
    return newState;
};

const calculateEntityWealth = (resources: Resources, market: MarketState): number => {
    let wealth = resources[ResourceType.GOLD] || 0;
    (Object.keys(resources) as ResourceType[]).forEach(res => {
        if (res !== ResourceType.GOLD && market.initialBasePrices[res] !== undefined) {
            wealth += (resources[res] || 0) * (market.initialBasePrices[res] as number);
        }
    });
    return Math.floor(wealth);
};


const calculateMerchantStandingForEntity = (entity: PlayerState | AIMerchant, market: MarketState): MerchantStandingLevel => {
    const totalWealth = entity.totalWealthHistory.length > 0 ? entity.totalWealthHistory[entity.totalWealthHistory.length - 1].wealth : calculateEntityWealth(entity.resources, market);
    for (let i = MERCHANT_STANDING_THRESHOLDS.length - 1; i >= 0; i--) {
        if (totalWealth >= MERCHANT_STANDING_THRESHOLDS[i].wealth) {
            return MERCHANT_STANDING_THRESHOLDS[i].standing;
        }
    }
    return MerchantStandingLevel.OBSCURE;
};


const updatePlayerMerchantStandingIfNeeded = (state: GameState): GameState => {
    const newStanding = calculateMerchantStandingForEntity(state.player, state.market);
    if (newStanding !== state.player.merchantStanding) {
        let newState = {...state};
        newState.player.merchantStanding = newStanding;
        newState = addEventToState(newState, `당신의 상인 평판이 ${KOREAN_MERCHANT_STANDING_NAMES[newStanding]}(으)로 변경되었습니다!`, GameEventType.INFO);
        return newState;
    }
    return state;
};

const updateAIMerchantStandingIfNeeded = (state: GameState, merchantIndex: number): GameState => {
    const merchant = state.aiMerchants[merchantIndex];
    const newStanding = calculateMerchantStandingForEntity(merchant, state.market);
    if (newStanding !== merchant.merchantStanding) {
        let newState = {...state};
        newState.aiMerchants[merchantIndex].merchantStanding = newStanding;
        return newState;
    }
    return state;
};

const generateDynamicEconomicEvents = (state: GameState): GameState => {
    let newState = { ...state };
    const activeTerritories = newState.territories.filter(t => t.ownerFactionId !== FactionId.NEUTRAL && t.ownerFactionId !== null);
    const activeFactions = newState.factions.filter(f => f.id !== FactionId.NEUTRAL);

    for (const eventDef of ECONOMIC_EVENT_DEFINITIONS) {
        if (Math.random() < eventDef.probability) {
            const duration = Math.floor(Math.random() * (eventDef.maxDuration - eventDef.minDuration + 1)) + eventDef.minDuration;
            const magnitude = eventDef.minMagnitude && eventDef.maxMagnitude ? 
                              (Math.random() * (eventDef.maxMagnitude - eventDef.minMagnitude)) + eventDef.minMagnitude : undefined;
            
            let targetTerritoryId: string | undefined = undefined;
            let targetFactionId: FactionId | undefined = undefined;
            let targetResourceType: ResourceType | undefined = undefined;
            let eventSpecificDescription = "";

            switch (eventDef.type) {
                case EconomicEventType.RESOURCE_BOOM:
                case EconomicEventType.LOCAL_DROUGHT:
                case EconomicEventType.BANDIT_ACTIVITY:
                case EconomicEventType.PLAGUE_OUTBREAK:
                    if (activeTerritories.length > 0) {
                        targetTerritoryId = activeTerritories[Math.floor(Math.random() * activeTerritories.length)].id;
                        const targetTerritory = newState.territories.find(t=> t.id === targetTerritoryId)!;
                        eventSpecificDescription = `${targetTerritory.name}(${KOREAN_FACTION_NAMES[targetTerritory.ownerFactionId as FactionId]}) 지역에 `;
                        if (eventDef.possibleTargetResourceTypes && eventDef.possibleTargetResourceTypes.length > 0) {
                             targetResourceType = eventDef.possibleTargetResourceTypes[Math.floor(Math.random() * eventDef.possibleTargetResourceTypes.length)];
                             eventSpecificDescription += `${KOREAN_RESOURCE_NAMES[targetResourceType]} 관련하여 `;
                        }
                    } else continue; 
                    break;
                case EconomicEventType.GOOD_HARVEST_REGIONAL:
                     if (activeFactions.length > 0) {
                        targetFactionId = activeFactions[Math.floor(Math.random() * activeFactions.length)].id;
                        eventSpecificDescription = `${KOREAN_FACTION_NAMES[targetFactionId]}의 영토 전반에 `;
                        targetResourceType = ResourceType.FOOD; 
                    } else continue;
                    break;
            }
            if(!targetTerritoryId && !targetFactionId && !eventDef.isGlobal) continue;


            const description = `${eventSpecificDescription}${KOREAN_ECONOMIC_EVENT_NAMES[eventDef.type]} 발생! (지속 ${duration}턴)`;
            const newEconomicEvent: EconomicEvent = {
                id: generateId(),
                type: eventDef.type,
                description: description,
                startTurn: newState.turn,
                duration: duration,
                remainingDuration: duration,
                targetTerritoryId,
                targetFactionId,
                targetResourceType,
                effectMagnitude: magnitude,
            };
            newState.activeEconomicEvents = [...newState.activeEconomicEvents, newEconomicEvent];
            newState = addEventToState(newState, description, GameEventType.ECONOMIC);
        }
    }
    return newState;
};

const expireEconomicEvents = (state: GameState): GameState => {
    let newState = { ...state };
    const stillActiveEvents: EconomicEvent[] = [];
    newState.activeEconomicEvents.forEach(event => {
        event.remainingDuration -= 1;
        if (event.remainingDuration > 0) {
            stillActiveEvents.push(event);
        } else {
            newState = addEventToState(newState, `${KOREAN_ECONOMIC_EVENT_NAMES[event.type]} 효과가 ${event.targetTerritoryId ? newState.territories.find(t=>t.id === event.targetTerritoryId)?.name : (event.targetFactionId? KOREAN_FACTION_NAMES[event.targetFactionId]:'')}에서 종료되었습니다.`, GameEventType.ECONOMIC);
        }
    });
    newState.activeEconomicEvents = stillActiveEvents;
    return newState;
};

const generateFactionMissions = (state: GameState): GameState => {
    let newState = { ...state };
    const aiFactions = newState.factions.filter(f => f.id !== FactionId.NEUTRAL);

    aiFactions.forEach(faction => {
        const existingMissionsFromFaction = newState.availableMissions.filter(m => m.offeringFactionId === faction.id).length;
        if (existingMissionsFromFaction >= 2) return; 

        const playerRelationshipScore = newState.player.factionRelations[faction.id] || 0;
        const playerRelationshipLevel = getRelationshipLevel(playerRelationshipScore);

        if (playerRelationshipLevel === RelationshipLevel.HOSTILE) return; 

        for (const missionDef of MISSION_DEFINITIONS) {
            if (Math.random() < missionDef.baseProbability) {
                if (missionDef.minRelationship && getRelationshipLevel(playerRelationshipScore) < missionDef.minRelationship) continue;
                if (missionDef.maxRelationship && getRelationshipLevel(playerRelationshipScore) > missionDef.maxRelationship) continue;

                let newMission: Mission | null = null;
                const timeLimit = Math.floor(Math.random() * (missionDef.baseTimeLimitTurns.max - missionDef.baseTimeLimitTurns.min + 1)) + missionDef.baseTimeLimitTurns.min;
                const rewardGold = Math.floor(Math.random() * (missionDef.rewardGoldRange.max - missionDef.rewardGoldRange.min + 1)) + missionDef.rewardGoldRange.min;
                const rewardRelationship = Math.floor(Math.random() * (missionDef.rewardRelationshipRange.max - missionDef.rewardRelationshipRange.min + 1)) + missionDef.rewardRelationshipRange.min;
                
                let targetTerritory: Territory | undefined;
                let description = "";

                switch (missionDef.type) {
                    case MissionType.DELIVER_RESOURCES:
                        const factionTerritories = newState.territories.filter(t => t.ownerFactionId === faction.id);
                        if (factionTerritories.length === 0) continue;
                        targetTerritory = factionTerritories[Math.floor(Math.random() * factionTerritories.length)];
                        
                        let resourceToDeliver: ResourceType;
                        const randRes = Math.random();
                        if ((faction.resources[ResourceType.FOOD] || 0) < 300 && randRes < 0.4) resourceToDeliver = ResourceType.FOOD;
                        else if ((faction.resources[ResourceType.IRON] || 0) < 150 && randRes < 0.6) resourceToDeliver = ResourceType.IRON;
                        else if ((faction.resources[ResourceType.HERBS] || 0) < 50 && randRes < 0.75 && targetTerritory.localMarketPrices[ResourceType.HERBS] !== undefined) resourceToDeliver = ResourceType.HERBS;
                        else if ((faction.resources[ResourceType.TEA] || 0) < 50 && randRes < 0.9 && targetTerritory.localMarketPrices[ResourceType.TEA] !== undefined) resourceToDeliver = ResourceType.TEA;
                        else resourceToDeliver = ResourceType.SILK;

                        const amountToDeliver = Math.floor(Math.random() * (missionDef.requiredResourceAmountRange!.max - missionDef.requiredResourceAmountRange!.min + 1)) + missionDef.requiredResourceAmountRange!.min;
                        description = `${KOREAN_FACTION_NAMES[faction.id]}의 ${targetTerritory.name}에 ${KOREAN_RESOURCE_NAMES[resourceToDeliver]} ${amountToDeliver}개를 ${timeLimit}턴 안에 공급 요청.`;
                        newMission = {
                            id: generateId(), type: missionDef.type, status: MissionStatus.AVAILABLE, offeringFactionId: faction.id,
                            description, startTurn: newState.turn, timeLimitTurns: timeLimit,
                            targetTerritoryId: targetTerritory.id, targetResourceType: resourceToDeliver, requiredAmount: amountToDeliver, currentAmount: 0,
                            rewardGold, rewardRelationshipPoints: rewardRelationship,
                        };
                        break;
                    case MissionType.INVEST_TERRITORY:
                        const developableTerritories = newState.territories.filter(t => t.ownerFactionId === faction.id && t.developmentLevel < MAX_DEVELOPMENT_LEVEL);
                        if (developableTerritories.length === 0) continue;
                        targetTerritory = developableTerritories[Math.floor(Math.random() * developableTerritories.length)];
                        const investmentAmount = Math.floor(Math.random() * (missionDef.requiredInvestmentAmountRange!.max - missionDef.requiredInvestmentAmountRange!.min + 1)) + missionDef.requiredInvestmentAmountRange!.min;
                        description = `${KOREAN_FACTION_NAMES[faction.id]}이(가) ${targetTerritory.name}에 ${investmentAmount} ${KOREAN_RESOURCE_NAMES[ResourceType.GOLD]} 투자를 ${timeLimit}턴 안에 요청합니다.`;
                         newMission = {
                            id: generateId(), type: missionDef.type, status: MissionStatus.AVAILABLE, offeringFactionId: faction.id,
                            description, startTurn: newState.turn, timeLimitTurns: timeLimit,
                            targetTerritoryId: targetTerritory.id, requiredAmount: investmentAmount, currentAmount: 0, 
                            rewardGold, rewardRelationshipPoints: rewardRelationship,
                        };
                        break;
                     case MissionType.ESPIONAGE_ASSESS_ECONOMY:
                        const enemyFactions = newState.factions.filter(f => f.id !== FactionId.NEUTRAL && f.id !== faction.id);
                        if (enemyFactions.length === 0) continue;
                        const targetEnemyFaction = enemyFactions[Math.floor(Math.random()*enemyFactions.length)];
                        const enemyTerritories = newState.territories.filter(t => t.ownerFactionId === targetEnemyFaction.id);
                        if(enemyTerritories.length === 0) continue;
                        targetTerritory = enemyTerritories[Math.floor(Math.random()*enemyTerritories.length)];

                        description = `${KOREAN_FACTION_NAMES[faction.id]}이(가) ${targetTerritory.name}(${KOREAN_FACTION_NAMES[targetEnemyFaction.id]} 소유)의 경제 상황 평가를 ${timeLimit}턴 안에 요청합니다.`;
                        newMission = {
                            id: generateId(), type: missionDef.type, status: MissionStatus.AVAILABLE, offeringFactionId: faction.id,
                            description, startTurn: newState.turn, timeLimitTurns: timeLimit,
                            targetTerritoryId: targetTerritory.id, 
                            rewardGold, rewardRelationshipPoints: rewardRelationship,
                        };
                        break;
                }

                if (newMission && !newState.availableMissions.find(m => m.id === newMission!.id) && !newState.acceptedMissions.find(m => m.id === newMission!.id)) {
                    newState.availableMissions.push(newMission);
                    newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}로부터 새로운 임무: "${KOREAN_MISSION_TYPE_NAMES[newMission.type]}"`, GameEventType.MISSION);
                    break; 
                }
            }
        }
    });
    return newState;
};

const processAcceptedMissions = (state: GameState): GameState => {
    let newState = { ...state };
    const stillAcceptedMissions: Mission[] = [];

    newState.acceptedMissions.forEach(mission => {
        let missionUpdated = { ...mission };
        missionUpdated.remainingTurns = (mission.startTurn + mission.timeLimitTurns) - newState.turn;

        if (missionUpdated.status === MissionStatus.ACCEPTED) {
            if (missionUpdated.remainingTurns <= 0) {
                missionUpdated.status = MissionStatus.EXPIRED;
            } else {
                let justCompletedByType = false;
                switch (missionUpdated.type) {
                    case MissionType.DELIVER_RESOURCES:
                        if ((missionUpdated.currentAmount || 0) >= (missionUpdated.requiredAmount || Infinity)) {
                            justCompletedByType = true;
                        }
                        break;
                    case MissionType.INVEST_TERRITORY:
                        if ((missionUpdated.currentAmount || 0) >= (missionUpdated.requiredAmount || Infinity)) {
                            justCompletedByType = true;
                        }
                        break;
                }
                if (justCompletedByType) {
                    missionUpdated.status = MissionStatus.COMPLETED;
                }
            }
        }
        
        if (missionUpdated.status === MissionStatus.COMPLETED) {
            newState.player.resources[ResourceType.GOLD] = (newState.player.resources[ResourceType.GOLD] || 0) + (missionUpdated.rewardGold || 0);
            newState = updateFactionRelation(newState, missionUpdated.offeringFactionId, (missionUpdated.rewardRelationshipPoints || REL_CHANGE.MISSION_SUCCESS), `${KOREAN_MISSION_TYPE_NAMES[missionUpdated.type]} 임무 완료`);
            newState = addEventToState(newState, `"${KOREAN_MISSION_TYPE_NAMES[missionUpdated.type]}" 임무 (${KOREAN_FACTION_NAMES[missionUpdated.offeringFactionId]}) 완료! 보상 획득.`, GameEventType.MISSION);
        
        } else if (missionUpdated.status === MissionStatus.EXPIRED) { 
            newState = updateFactionRelation(newState, missionUpdated.offeringFactionId, REL_CHANGE.MISSION_FAILURE, `${KOREAN_MISSION_TYPE_NAMES[missionUpdated.type]} 임무 시간 초과`);
            newState = addEventToState(newState, `"${KOREAN_MISSION_TYPE_NAMES[missionUpdated.type]}" 임무 (${KOREAN_FACTION_NAMES[missionUpdated.offeringFactionId]}) 시간 초과.`, GameEventType.MISSION);
        
        } else if (missionUpdated.status === MissionStatus.FAILED) { // Currently not explicitly set, but placeholder
        } else if (missionUpdated.status === MissionStatus.ACCEPTED) { 
            stillAcceptedMissions.push(missionUpdated);
        }
    });
    newState.acceptedMissions = stillAcceptedMissions;
    return newState;
};

const applyTradePriceImpact = (
    currentLocalPrice: number,
    initialGlobalBasePrice: number, 
    amount: number,
    tradeType: 'BUY' | 'SELL',
    resourceType: ResourceType // Not used in current logic but good for future context
): { newPrice: number; oldPrice: number, priceChangePercent: number } => {
    
    const percentageImpactBase = (amount / MARKET_DEPTH_FOR_PRICE_CHANGE) * 100; 
    const impactDirection = tradeType === 'BUY' ? 1 : -1; // Buying increases price, selling decreases
    
    let newPrice = currentLocalPrice * (1 + (percentageImpactBase * impactDirection / 100));

    newPrice = Math.max(MIN_RESOURCE_PRICE, newPrice);
    newPrice = Math.min(newPrice, initialGlobalBasePrice * MAX_RESOURCE_PRICE_MULTIPLIER_FROM_INITIAL);
    
    const priceChangePercent = currentLocalPrice > 0 ? (newPrice - currentLocalPrice) / currentLocalPrice : 0;
    return { newPrice: newPrice, oldPrice: currentLocalPrice, priceChangePercent };
};

const expireSlanderEffects = (state: GameState): GameState => {
    let newState = {...state};
    newState.player.slanderEffects = newState.player.slanderEffects
        .map(effect => ({ ...effect, remainingTurns: effect.remainingTurns - 1 }))
        .filter(effect => effect.remainingTurns > 0);

    newState.aiMerchants = newState.aiMerchants.map(merchant => ({
        ...merchant,
        slanderEffects: merchant.slanderEffects
            .map(effect => ({ ...effect, remainingTurns: effect.remainingTurns - 1 }))
            .filter(effect => effect.remainingTurns > 0)
    }));
    return newState;
};

const expirePlayerTradeAdvantages = (state: GameState): GameState => {
    let newState = {...state};
    newState.player.temporaryTradeAdvantages = newState.player.temporaryTradeAdvantages
        .map(advantage => ({ ...advantage, turnsRemaining: advantage.turnsRemaining - 1 }))
        .filter(advantage => advantage.turnsRemaining > 0);
    return newState;
}

const clearOldMarketSignals = (state: GameState): GameState => {
    let newState = {...state};
    if (newState.market.marketSignals.length > MAX_MARKET_SIGNALS) {
        newState.market.marketSignals = newState.market.marketSignals.slice(-MAX_MARKET_SIGNALS);
    }
    newState.market.marketSignals = newState.market.marketSignals.filter(signal => (newState.turn - signal.turn) <= 3); 
    return newState;
};


const processAIMerchantActions = (initialState: GameState): GameState => {
    let newState = JSON.parse(JSON.stringify(initialState)) as GameState;

    for (let i = 0; i < newState.aiMerchants.length; i++) {
        let currentMerchant = newState.aiMerchants[i];
        let actionTakenThisTurn = false;
        let actionLog = "특별한 활동 없음";

        // Slander Player Logic
        if (!actionTakenThisTurn && 
            (currentMerchant.personality === AIMerchantPersonality.AGGRESSIVE_TRADER && Math.random() < AI_SLANDER_PLAYER_CHANCE * 1.5) ||
            (Math.random() < AI_SLANDER_PLAYER_CHANCE)) {
            
            const existingSlander = newState.player.slanderEffects.find(eff => eff.byMerchantId === currentMerchant.id);
            if (!existingSlander) { 
                const slanderEffect: SlanderEffect = {
                    byMerchantId: currentMerchant.id,
                    remainingTurns: SLANDER_EFFECT_DURATION_TURNS,
                    pricePenaltyPercent: SLANDER_PRICE_PENALTY_PERCENT,
                };
                newState.player.slanderEffects.push(slanderEffect);
                actionLog = `플레이어에 대한 악의적인 소문을 퍼뜨림.`;
                newState = addEventToState(newState, `${currentMerchant.name}이(가) ${actionLog}`, GameEventType.SLANDER);
                actionTakenThisTurn = true;
            }
        }

        // Investment Logic
        if (!actionTakenThisTurn && (currentMerchant.resources[ResourceType.GOLD] || 0) > AI_MERCHANT_INVESTMENT_THRESHOLD_GOLD && 
            (currentMerchant.personality === AIMerchantPersonality.CAUTIOUS_INVESTOR || (currentMerchant.personality === AIMerchantPersonality.BALANCED_OPPORTUNIST && Math.random() < 0.3))) {
            const potentialTerritoriesToInvest = newState.territories.filter(t => 
                (t.ownerFactionId === currentMerchant.favoredFactionId || !currentMerchant.favoredFactionId) && 
                t.ownerFactionId !== FactionId.NEUTRAL &&
                t.developmentLevel < MAX_DEVELOPMENT_LEVEL
            );
            if (potentialTerritoriesToInvest.length > 0) {
                const targetTerritoryToInvest = potentialTerritoriesToInvest[Math.floor(Math.random() * potentialTerritoriesToInvest.length)];
                const investmentCost = AI_MERCHANT_INVESTMENT_AMOUNT_BASE * (targetTerritoryToInvest.developmentLevel + 1);
                if (((currentMerchant.resources[ResourceType.GOLD] || 0) - AI_MERCHANT_MIN_GOLD_RESERVE) >= investmentCost) {
                    const terrIdx = newState.territories.findIndex(t => t.id === targetTerritoryToInvest.id);
                    newState.territories[terrIdx].developmentLevel += 1;
                    currentMerchant.resources[ResourceType.GOLD] = (currentMerchant.resources[ResourceType.GOLD] || 0) - investmentCost;
                    actionLog = `${targetTerritoryToInvest.name}에 ${investmentCost} ${KOREAN_RESOURCE_NAMES.Gold} 투자 (개발 수준 ${newState.territories[terrIdx].developmentLevel} 달성).`;
                    newState = addEventToState(newState, `${currentMerchant.name}이(가) ${actionLog}`, GameEventType.AI_MERCHANT_ACTION);
                    actionTakenThisTurn = true;
                }
            }
        }
        
        // Reactive Hoarding based on Market Signals
        if (!actionTakenThisTurn && (currentMerchant.personality === AIMerchantPersonality.AGGRESSIVE_TRADER || currentMerchant.personality === AIMerchantPersonality.BALANCED_OPPORTUNIST)) {
            const recentPlayerHoardingSignals = newState.market.marketSignals.filter(s => (newState.turn - s.turn) <= 2); 
            if (recentPlayerHoardingSignals.length > 0) {
                const signalToReactTo = recentPlayerHoardingSignals[Math.floor(Math.random() * recentPlayerHoardingSignals.length)];
                const resourceInDemand = signalToReactTo.resource;

                const potentialBuyTerritories = newState.territories.filter(t => 
                    t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL && 
                    t.id !== signalToReactTo.territoryId && 
                    t.localMarketPrices[resourceInDemand] !== undefined &&
                    t.localMarketPrices[resourceInDemand]! < (INITIAL_MARKET_STATE.initialBasePrices[resourceInDemand]! * 1.5) 
                );

                if (potentialBuyTerritories.length > 0) {
                    const buyTerritory = potentialBuyTerritories[Math.floor(Math.random() * potentialBuyTerritories.length)];
                    const buyTerritoryIdx = newState.territories.findIndex(t => t.id === buyTerritory.id);
                    const localPrice = buyTerritory.localMarketPrices[resourceInDemand]!;
                    const targetFactionOriginal = newState.factions.find(f => f.id === buyTerritory.ownerFactionId)!;
                    const targetFactionIdx = newState.factions.findIndex(f => f.id === targetFactionOriginal.id);
                    let targetFaction = newState.factions[targetFactionIdx];

                    const tradeAmount = Math.floor(Math.random() * (AI_MERCHANT_TRADE_AMOUNT_MAX - AI_MERCHANT_TRADE_AMOUNT_MIN + 1)) + AI_MERCHANT_TRADE_AMOUNT_MIN;
                    const pricePerUnit = Math.floor(localPrice * (1 - AI_MERCHANT_TRADE_MARKUP * 0.5)); 
                    const totalCost = pricePerUnit * tradeAmount;

                    if ((targetFaction.resources[resourceInDemand] || 0) >= tradeAmount && 
                        ((currentMerchant.resources[ResourceType.GOLD] || 0) - AI_MERCHANT_MIN_GOLD_RESERVE) >= totalCost) {
                        
                        currentMerchant.resources[resourceInDemand] = (currentMerchant.resources[resourceInDemand] || 0) + tradeAmount;
                        currentMerchant.resources[ResourceType.GOLD] = (currentMerchant.resources[ResourceType.GOLD] || 0) - totalCost;
                        targetFaction.resources[resourceInDemand] = (targetFaction.resources[resourceInDemand] || 0) - tradeAmount;
                        targetFaction.resources[ResourceType.GOLD] = (targetFaction.resources[ResourceType.GOLD] || 0) + totalCost;
                        
                        actionLog = `플레이어의 ${KOREAN_RESOURCE_NAMES[resourceInDemand]} 매입에 반응하여 ${buyTerritory.name}에서 ${tradeAmount}개 구매.`;
                        newState = addEventToState(newState, `${currentMerchant.name}이(가) ${actionLog}`, GameEventType.AI_MERCHANT_ACTION);
                        actionTakenThisTurn = true;
                        
                        const priceImpactResult = applyTradePriceImpact(localPrice, INITIAL_MARKET_STATE.initialBasePrices[resourceInDemand]!, tradeAmount, 'BUY', resourceInDemand);
                        if (priceImpactResult.newPrice !== priceImpactResult.oldPrice) {
                            newState.territories[buyTerritoryIdx].localMarketPrices[resourceInDemand] = priceImpactResult.newPrice;
                        }
                        newState.factions[targetFactionIdx] = targetFaction;
                    }
                }
            }
        }

        // Regular Trade Logic
        if (!actionTakenThisTurn && (currentMerchant.personality === AIMerchantPersonality.AGGRESSIVE_TRADER || (currentMerchant.personality === AIMerchantPersonality.BALANCED_OPPORTUNIST && Math.random() < 0.7))) {
            const aiOwnedTerritories = newState.territories.filter(t => t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL);
            if (aiOwnedTerritories.length === 0) { /* continue loop */ }
            else {
                const tradeTerritory = aiOwnedTerritories[Math.floor(Math.random() * aiOwnedTerritories.length)];
                const tradeTerritoryIdx = newState.territories.findIndex(t => t.id === tradeTerritory.id);
                if (tradeTerritoryIdx !== -1) {
                    const tradeableResourcesAtTerritory = (Object.keys(tradeTerritory.localMarketPrices) as ResourceType[])
                        .filter(r => r !== ResourceType.GOLD && tradeTerritory.localMarketPrices[r] !== undefined);

                    if (tradeableResourcesAtTerritory.length > 0) {
                        const randomResource = tradeableResourcesAtTerritory[Math.floor(Math.random() * tradeableResourcesAtTerritory.length)];
                        let localPrice = tradeTerritory.localMarketPrices[randomResource]!;
                        
                        const targetFactionOriginal = newState.factions.find(f => f.id === tradeTerritory.ownerFactionId)!;
                        const targetFactionIdx = newState.factions.findIndex(f => f.id === targetFactionOriginal.id); 
                        let targetFaction = newState.factions[targetFactionIdx];

                        const tradeAmount = Math.floor(Math.random() * (AI_MERCHANT_TRADE_AMOUNT_MAX - AI_MERCHANT_TRADE_AMOUNT_MIN + 1)) + AI_MERCHANT_TRADE_AMOUNT_MIN;
                        
                        let effectiveSlanderPenalty = 0;
                        currentMerchant.slanderEffects.forEach(eff => effectiveSlanderPenalty += eff.pricePenaltyPercent);
                        
                        if ((currentMerchant.resources[randomResource] || 0) > tradeAmount + 20) { 
                            const pricePerUnit = Math.ceil(localPrice * (1 + AI_MERCHANT_TRADE_MARKUP) * (1 - effectiveSlanderPenalty)); 
                            const totalRevenue = pricePerUnit * tradeAmount;
                            if ((targetFaction.resources[ResourceType.GOLD] || 0) >= totalRevenue) {
                                currentMerchant.resources[randomResource] = (currentMerchant.resources[randomResource] || 0) - tradeAmount;
                                currentMerchant.resources[ResourceType.GOLD] = (currentMerchant.resources[ResourceType.GOLD] || 0) + totalRevenue;
                                targetFaction.resources[randomResource] = (targetFaction.resources[randomResource] || 0) + tradeAmount;
                                targetFaction.resources[ResourceType.GOLD] = (targetFaction.resources[ResourceType.GOLD] || 0) - totalRevenue;
                                actionLog = `${tradeTerritory.name}의 ${KOREAN_FACTION_NAMES[targetFaction.id]}에게 ${KOREAN_RESOURCE_NAMES[randomResource]} ${tradeAmount}개를 판매 (총 ${totalRevenue} ${KOREAN_RESOURCE_NAMES.Gold} 획득).`;
                                newState = addEventToState(newState, `${currentMerchant.name}이(가) ${actionLog}`, GameEventType.AI_MERCHANT_ACTION);
                                
                                const priceImpactResult = applyTradePriceImpact(localPrice, INITIAL_MARKET_STATE.initialBasePrices[randomResource]!, tradeAmount, 'SELL', randomResource);
                                if (priceImpactResult.newPrice !== priceImpactResult.oldPrice) {
                                    newState.territories[tradeTerritoryIdx].localMarketPrices[randomResource] = priceImpactResult.newPrice;
                                }
                                newState.factions[targetFactionIdx] = targetFaction;
                            }
                        } 
                        else if ((currentMerchant.resources[randomResource] || 0) < 50) { 
                            const pricePerUnit = Math.floor(localPrice * (1 - AI_MERCHANT_TRADE_MARKUP * 0.5) * (1 + effectiveSlanderPenalty)); 
                            const totalCost = pricePerUnit * tradeAmount;
                            if ((targetFaction.resources[randomResource] || 0) >= tradeAmount && ((currentMerchant.resources[ResourceType.GOLD] || 0) - AI_MERCHANT_MIN_GOLD_RESERVE) >= totalCost) {
                                currentMerchant.resources[randomResource] = (currentMerchant.resources[randomResource] || 0) + tradeAmount;
                                currentMerchant.resources[ResourceType.GOLD] = (currentMerchant.resources[ResourceType.GOLD] || 0) - totalCost;
                                targetFaction.resources[randomResource] = (targetFaction.resources[randomResource] || 0) - tradeAmount;
                                targetFaction.resources[ResourceType.GOLD] = (targetFaction.resources[ResourceType.GOLD] || 0) + totalCost;
                                actionLog = `${tradeTerritory.name}의 ${KOREAN_FACTION_NAMES[targetFaction.id]}에게서 ${KOREAN_RESOURCE_NAMES[randomResource]} ${tradeAmount}개를 구매 (총 ${totalCost} ${KOREAN_RESOURCE_NAMES.Gold} 지출).`;
                                newState = addEventToState(newState, `${currentMerchant.name}이(가) ${actionLog}`, GameEventType.AI_MERCHANT_ACTION);
                                
                                const priceImpactResult = applyTradePriceImpact(localPrice, INITIAL_MARKET_STATE.initialBasePrices[randomResource]!, tradeAmount, 'BUY', randomResource);
                                if (priceImpactResult.newPrice !== priceImpactResult.oldPrice) {
                                    newState.territories[tradeTerritoryIdx].localMarketPrices[randomResource] = priceImpactResult.newPrice;
                                }
                                newState.factions[targetFactionIdx] = targetFaction; 
                            }
                        }
                    }
                }
            }
        }
        currentMerchant.lastActionLog = actionLog;
        
        const currentWealth = calculateEntityWealth(currentMerchant.resources, newState.market);
        currentMerchant.totalWealthHistory.push({ turn: newState.turn, wealth: currentWealth });
        newState.aiMerchants[i] = currentMerchant; 
        newState = updateAIMerchantStandingIfNeeded(newState, i);
    }
    return newState;
};

const collectFactionResources = (state: GameState): GameState => {
  let newFactions = state.factions.map(faction => {
    if (faction.id === FactionId.NEUTRAL) return faction; 
    
    const updatedResources: Resources = { ...(faction.resources as Resources) };
    state.territories.forEach(territory => {
      if (territory.ownerFactionId === faction.id) {
        let productionMultiplier = 1 + (territory.developmentLevel * PRODUCTION_BONUS_PER_LEVEL);
        
        // Apply Market Hall production bonus if present
        if (territory.specialBuilding?.type === SpecializedBuildingType.MARKET_HALL) {
            productionMultiplier += SPECIAL_BUILDING_MARKET_HALL_PROD_BONUS;
        }
        
        (Object.keys(territory.baseProduction) as ResourceType[]).forEach(resource => {
          let baseAmount = territory.baseProduction[resource] || 0;

          // Apply direct production bonus from specialized buildings
          if (territory.specialBuilding) {
            switch (territory.specialBuilding.type) {
                case SpecializedBuildingType.ADVANCED_FARM:
                    if (resource === ResourceType.FOOD) baseAmount += SPECIAL_BUILDING_FARM_FOOD_BONUS;
                    break;
                case SpecializedBuildingType.ENHANCED_MINE:
                    if (resource === ResourceType.IRON) baseAmount += SPECIAL_BUILDING_MINE_IRON_BONUS;
                    break;
                case SpecializedBuildingType.SILK_WORKSHOP:
                     if (resource === ResourceType.SILK) baseAmount += SPECIAL_BUILDING_SILK_WORKSHOP_SILK_BONUS;
                    break;
            }
          }
          
          let currentAmount = baseAmount;

          state.activeEconomicEvents.forEach(event => {
            if (event.targetTerritoryId === territory.id && event.targetResourceType === resource && event.effectMagnitude) {
                if (event.type === EconomicEventType.RESOURCE_BOOM || event.type === EconomicEventType.LOCAL_DROUGHT) {
                     currentAmount *= event.effectMagnitude;
                }
            } else if (event.targetTerritoryId === territory.id && !event.targetResourceType && event.effectMagnitude) { 
                 if (event.type === EconomicEventType.BANDIT_ACTIVITY || event.type === EconomicEventType.PLAGUE_OUTBREAK) {
                    currentAmount *= event.effectMagnitude;
                 }
            } else if (event.targetFactionId === faction.id && event.targetResourceType === resource && event.effectMagnitude) { 
                if (event.type === EconomicEventType.GOOD_HARVEST_REGIONAL && resource === ResourceType.FOOD) {
                    currentAmount *= event.effectMagnitude;
                }
            }
          });
          updatedResources[resource] = Math.floor((updatedResources[resource] || 0) + currentAmount * productionMultiplier);
        });
      }
    });
    return { ...faction, resources: updatedResources };
  });
  return addEventToState({ ...state, factions: newFactions}, `각 AI 세력이 영토에서 자원을 수집했습니다.`, GameEventType.INFO);
};

const updateMarketPrices = (state: GameState): GameState => {
    let newState = { ...state };
    newState.territories = newState.territories.map(territory => {
        if (territory.ownerFactionId === FactionId.NEUTRAL || territory.ownerFactionId === null) {
            return territory;
        }

        const updatedLocalPrices: Partial<Resources> = { ...territory.localMarketPrices };
        let updatedHistory = territory.localMarketPriceHistory ? { ...territory.localMarketPriceHistory } : {};

        (Object.keys(updatedLocalPrices) as ResourceType[]).forEach(resKey => {
            const resource = resKey as ResourceType;
            if (resource === ResourceType.GOLD || updatedLocalPrices[resource] === undefined) return;

            const currentPrice = updatedLocalPrices[resource]!;
            const fluctuation = (Math.random() - 0.5) * 2 * MARKET_PRICE_FLUCTUATION_PERCENT; // e.g., +/- up to 5%
            let fluctuatedPrice = currentPrice * (1 + fluctuation);

            // Apply global economic event modifiers if any apply to this resource type (not territory specific)
            newState.activeEconomicEvents.forEach(event => {
                if (!event.targetTerritoryId && !event.targetFactionId && event.targetResourceType === resource && event.effectMagnitude) {
                    // This is a global event affecting this resource type
                    fluctuatedPrice *= event.effectMagnitude;
                }
            });
            
            fluctuatedPrice = Math.max(MIN_RESOURCE_PRICE, fluctuatedPrice);
            const initialBaseForResource = newState.market.initialBasePrices[resource];
            if (initialBaseForResource !== undefined) {
                 fluctuatedPrice = Math.min(fluctuatedPrice, (initialBaseForResource as number) * MAX_RESOURCE_PRICE_MULTIPLIER_FROM_INITIAL);
            } else { 
                 fluctuatedPrice = Math.min(fluctuatedPrice, currentPrice * MAX_RESOURCE_PRICE_MULTIPLIER_FROM_INITIAL);
            }
            
            updatedLocalPrices[resource] = Math.round(fluctuatedPrice * 100) / 100; // Round to 2 decimal places

            // Record price history
            const historyEntry: PriceHistoryEntry = { turn: newState.turn, price: updatedLocalPrices[resource]! };
            let currentResourceHistory = updatedHistory[resource] ? [...updatedHistory[resource]!] : [];
            currentResourceHistory.push(historyEntry);
            if (currentResourceHistory.length > MAX_PRICE_HISTORY_PER_RESOURCE) {
                currentResourceHistory = currentResourceHistory.slice(-MAX_PRICE_HISTORY_PER_RESOURCE);
            }
            updatedHistory[resource] = currentResourceHistory;
        });
        return { ...territory, localMarketPrices: updatedLocalPrices, localMarketPriceHistory: updatedHistory };
    });
    return newState;
};


const processFactionAutomation = (currentState: GameState, factionToProcess: Faction): GameState => {
    let newState = JSON.parse(JSON.stringify(currentState)) as GameState;
    const currentFactionData = newState.factions.find(f => f.id === factionToProcess.id);
    if (!currentFactionData || currentFactionData.id === FactionId.NEUTRAL) return newState;

    // AI Investment
    if (currentFactionData.automationStrategy === 'EconomicDominance' && (currentFactionData.resources[ResourceType.GOLD] || 0) > AI_INVESTMENT_COST_PER_LEVEL * 2) {
        const ownTerritories = newState.territories.filter(t => t.ownerFactionId === currentFactionData.id);
        const developableTerritory = ownTerritories.sort((a,b) => a.developmentLevel - b.developmentLevel).find(t => t.developmentLevel < MAX_DEVELOPMENT_LEVEL);
        if (developableTerritory) {
            const cost = AI_INVESTMENT_COST_PER_LEVEL * (developableTerritory.developmentLevel + 1);
            if ((currentFactionData.resources[ResourceType.GOLD] || 0) >= cost) {
                 const factionIdx = newState.factions.findIndex(f => f.id === currentFactionData.id);
                 const terrIdx = newState.territories.findIndex(t => t.id === developableTerritory.id);
                 newState.factions[factionIdx].resources[ResourceType.GOLD] = (newState.factions[factionIdx].resources[ResourceType.GOLD] || 0) - cost;
                 newState.territories[terrIdx].developmentLevel +=1;
                 newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[currentFactionData.id]}이(가) ${developableTerritory.name}에 자동으로 투자했습니다. (AI 자동화)`, GameEventType.INFO);
            }
        }
    }

    // AI Recruitment
    if (currentFactionData.automationStrategy === 'AggressiveExpansion' && (currentFactionData.resources[ResourceType.GOLD] || 0) > 500) {
        const ownTerritories = newState.territories.filter(t => t.ownerFactionId === currentFactionData.id);
        if (ownTerritories.length > 0) {
            const targetTerritoryForRecruitment = ownTerritories[Math.floor(Math.random() * ownTerritories.length)];
            const unitType: keyof ArmyUnits = 'infantry'; 
            const costs = AI_RECRUITMENT_COST[unitType];
            
            let canAfford = true;
            for (const resKey in costs) {
                const resource = resKey as ResourceType;
                const costValue = (costs[resource as ResourceType] || 0) as number;
                 if ((currentFactionData.resources[resource] || 0) < costValue * AI_RECRUITMENT_BATCH_SIZE) {
                    canAfford = false;
                    break;
                }
            }

            if (canAfford) {
                const factionIdx = newState.factions.findIndex(f => f.id === currentFactionData.id);
                const terrIdx = newState.territories.findIndex(t => t.id === targetTerritoryForRecruitment.id);

                for (const resKey in costs) {
                    const resource = resKey as ResourceType;
                    const costValue = (costs[resource as ResourceType] || 0) as number;
                    newState.factions[factionIdx].resources[resource] = (newState.factions[factionIdx].resources[resource] || 0) - costValue * AI_RECRUITMENT_BATCH_SIZE;
                }
                newState.territories[terrIdx].garrison[unitType] = (newState.territories[terrIdx].garrison[unitType] || 0) + AI_RECRUITMENT_BATCH_SIZE;
                newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[currentFactionData.id]}이(가) ${targetTerritoryForRecruitment.name}에 ${KOREAN_UNIT_NAMES[unitType]} ${AI_RECRUITMENT_BATCH_SIZE}명을 자동으로 모집했습니다. (AI 자동화)`, GameEventType.INFO);
            }
        }
    }
    return newState;
};

// AI initiates policies
const processFactionPolicyInitiation = (state: GameState): GameState => {
    let newState = { ...state };
    newState.factions.forEach(faction => {
        if (faction.id === FactionId.NEUTRAL || Math.random() > FACTION_POLICY_INITIATION_CHANCE) return;
        if (newState.activeFactionPolicies.filter(p => p.factionId === faction.id).length > 0) return; // Limit one active policy per faction

        const availablePolicyTypes = Object.values(FactionPolicyType);
        const policyType = availablePolicyTypes[Math.floor(Math.random() * availablePolicyTypes.length)];
        const config = FACTION_POLICY_CONFIGS[policyType];
        
        let targetTerritoryId: string | undefined = undefined;
        if (policyType === FactionPolicyType.CAPITAL_WALL_REINFORCEMENT) {
            // Find faction's "capital" (e.g., first territory owned or most developed)
            const factionTerritories = newState.territories.filter(t => t.ownerFactionId === faction.id);
            if (factionTerritories.length === 0) return; // No territory to target
            targetTerritoryId = factionTerritories.sort((a,b) => b.developmentLevel - a.developmentLevel)[0].id;
        }


        const newPolicy: ActiveFactionPolicy = {
            id: generateId(),
            type: policyType,
            factionId: faction.id,
            targetTerritoryId: targetTerritoryId,
            startTurn: newState.turn,
            durationTurns: config.durationTurns,
            turnsRemaining: config.durationTurns,
            fundingGoal: config.baseFundingGoal,
            currentFunding: 0,
            playerContribution: 0,
            effectsApplied: false,
        };
        newState.activeFactionPolicies.push(newPolicy);
        newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}이(가) '${KOREAN_FACTION_POLICY_NAMES[policyType]}' 정책을 시작했습니다.`, GameEventType.POLICY);
    });
    return newState;
};

// Update active policies, apply effects if completed
const processActiveFactionPolicies = (state: GameState): GameState => {
    let newState = { ...state };
    const remainingPolicies: ActiveFactionPolicy[] = [];

    newState.activeFactionPolicies.forEach(policy => {
        policy.turnsRemaining -=1;
        let policyCompleted = false;
        let completionReason = "";

        if (policy.currentFunding >= policy.fundingGoal && !policy.effectsApplied) {
            policyCompleted = true;
            completionReason = "자금 목표 달성";
        } else if (policy.turnsRemaining <= 0 && !policy.effectsApplied) {
            policyCompleted = true;
            completionReason = "기간 만료";
        }

        if (policyCompleted) {
            policy.effectsApplied = true; // Mark as applied
            const factionIdx = newState.factions.findIndex(f => f.id === policy.factionId);
            if (factionIdx === -1) return; // Faction might have been destroyed

            let factionToUpdate = newState.factions[factionIdx];
            let policyOutcomeMessage = `${KOREAN_FACTION_NAMES[policy.factionId]}의 '${KOREAN_FACTION_POLICY_NAMES[policy.type]}' 정책이 ${completionReason}(으)로 완료되었습니다. `;

            switch (policy.type) {
                case FactionPolicyType.AGRICULTURAL_BOOST:
                    // Effect: Faction's Food production +20% for its duration (this should be a temporary modifier, complex to add here, simple bonus for now)
                    // Simplified: Grant a lump sum of food based on their current food prod
                    const foodBonus = Math.floor((factionToUpdate.resources[ResourceType.FOOD] || 500) * 0.2);
                    factionToUpdate.resources[ResourceType.FOOD] = (factionToUpdate.resources[ResourceType.FOOD] || 0) + foodBonus;
                    policyOutcomeMessage += `식량 ${foodBonus} 증가.`;
                    break;
                case FactionPolicyType.COMMERCIAL_FAIR_ORGANIZATION:
                    // Effect: Player gets +5% better trade prices with this faction for duration
                    // Simplified: Faction gets some gold
                    const goldBonus = Math.floor(policy.fundingGoal * 0.5);
                    factionToUpdate.resources[ResourceType.GOLD] = (factionToUpdate.resources[ResourceType.GOLD] || 0) + goldBonus;
                    policyOutcomeMessage += `교역 활성화로 ${goldBonus} 금 획득.`;
                    // Player specific bonus if contributed significantly
                     if (policy.playerContribution / policy.fundingGoal >= POLICY_PLAYER_CONTRIBUTION_THRESHOLD_PERCENT) {
                        const playerTradeAdv: TemporaryTradeAdvantage = { // This needs a new type of effect processing
                            territoryId: 'FACTION_WIDE_' + policy.factionId, // Special ID for faction-wide bonus
                            turnsRemaining: 3, // Short bonus
                            bonusType: 'WAR_SPOILS' // Re-use for simplicity, means better prices
                        };
                        newState.player.temporaryTradeAdvantages.push(playerTradeAdv);
                        policyOutcomeMessage += ` 플레이어는 해당 세력과의 교역에서 임시 이점을 얻습니다.`;
                    }
                    break;
                case FactionPolicyType.CAPITAL_WALL_REINFORCEMENT:
                    if (policy.targetTerritoryId) {
                        const terrIdx = newState.territories.findIndex(t => t.id === policy.targetTerritoryId);
                        if (terrIdx !== -1) {
                            newState.territories[terrIdx].garrison.infantry += 50;
                            newState.territories[terrIdx].garrison.archers += 20;
                            policyOutcomeMessage += `${newState.territories[terrIdx].name}의 수비 병력 증가.`;
                        }
                    }
                    break;
            }
            
            newState.factions[factionIdx] = factionToUpdate;
            newState = addEventToState(newState, policyOutcomeMessage, GameEventType.POLICY);

            // Player rewards for contribution
            if (policy.playerContribution > 0) {
                 const relChange = policy.playerContribution / policy.fundingGoal >= POLICY_PLAYER_CONTRIBUTION_THRESHOLD_PERCENT ? REL_CHANGE.FUND_POLICY_SIGNIFICANT : REL_CHANGE.FUND_POLICY_BASIC;
                 newState = updateFactionRelation(newState, policy.factionId, relChange, `${KOREAN_FACTION_POLICY_NAMES[policy.type]} 자금 지원 완료`);
            }
            // Do not add to remainingPolicies
        } else {
            remainingPolicies.push(policy);
        }
    });
    newState.activeFactionPolicies = remainingPolicies;
    return newState;
};

// AI Declares War
const processFactionWarDeclarations = (state: GameState): GameState => {
    let newState = { ...state };
    const potentialAggressors = newState.factions.filter(f => f.id !== FactionId.NEUTRAL && (f.aiPersonality === 'Aggressive' || (f.aiPersonality === 'Balanced' && Math.random() < 0.5)));

    for (const aggressor of potentialAggressors) {
        if (newState.activeWars.some(w => (w.aggressorFactionId === aggressor.id || w.defenderFactionId === aggressor.id) && w.isActive)) continue; // Already in a war

        if (Math.random() < FACTION_WAR_DECLARATION_CHANCE) {
            const aggressorTerritories = newState.territories.filter(t => t.ownerFactionId === aggressor.id);
            if (aggressorTerritories.length === 0) continue;

            const potentialTargets = newState.factions.filter(f => 
                f.id !== FactionId.NEUTRAL && f.id !== aggressor.id && 
                !newState.activeWars.some(w => ((w.aggressorFactionId === f.id || w.defenderFactionId === f.id) && w.isActive)) // Target not already in a war
            );
            if (potentialTargets.length === 0) continue;

            // Simple targeting: weaker neighbor
            const defender = potentialTargets.sort((a,b) => {
                const aStrength = newState.territories.filter(t=>t.ownerFactionId === a.id).reduce((sum, t) => sum + t.garrison.infantry,0);
                const bStrength = newState.territories.filter(t=>t.ownerFactionId === b.id).reduce((sum, t) => sum + t.garrison.infantry,0);
                return aStrength - bStrength;
            })[0];
            
            if (defender) {
                const newWar: ActiveWar = {
                    id: generateId(),
                    aggressorFactionId: aggressor.id,
                    defenderFactionId: defender.id,
                    startedTurn: newState.turn,
                    playerContributions: {},
                    isActive: true,
                };
                newState.activeWars.push(newWar);
                newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[aggressor.id]}이(가) ${KOREAN_FACTION_NAMES[defender.id]}에게 전쟁을 선포했습니다!`, GameEventType.WAR_EVENT);
            }
        }
    }
    return newState;
};


const processAIActions = (initialState: GameState): GameState => {
  let currentState = JSON.parse(JSON.stringify(initialState)) as GameState;
  const aiFactionsToProcess = currentState.factions.filter(f => f.id !== FactionId.NEUTRAL);

  for (const aiFaction of aiFactionsToProcess) {
    currentState = processFactionAutomation(currentState, aiFaction); 
    const updatedAIFaction = currentState.factions.find(f => f.id === aiFaction.id)!;

    // Aggression logic for factions potentially involved in an active war, or starting one
    const involvedWar = currentState.activeWars.find(w => (w.aggressorFactionId === updatedAIFaction.id || w.defenderFactionId === updatedAIFaction.id) && w.isActive);
    
    if (involvedWar || updatedAIFaction.aiPersonality === 'Aggressive' || (updatedAIFaction.aiPersonality === 'Balanced' && Math.random() < 0.3)) {
        const ownTerritories = currentState.territories.filter(t => t.ownerFactionId === updatedAIFaction.id);
        if (ownTerritories.length === 0) continue;

        const strongTerritory = ownTerritories.sort((a,b) => (b.garrison.infantry + b.garrison.cavalry + b.garrison.archers) - (a.garrison.infantry + a.garrison.cavalry + a.garrison.archers))[0];
        if (!strongTerritory || (strongTerritory.garrison.infantry + strongTerritory.garrison.cavalry + strongTerritory.garrison.archers < 50)) continue; 

        const targetFactionIdForAttack = involvedWar ? (involvedWar.aggressorFactionId === updatedAIFaction.id ? involvedWar.defenderFactionId : involvedWar.aggressorFactionId) : null;

        const potentialTargets = currentState.territories.filter(t => {
            if (t.id === strongTerritory.id) return false;
            const dx = Math.abs(t.position.x - strongTerritory.position.x);
            const dy = Math.abs(t.position.y - strongTerritory.position.y);
            const isAdjacent = (dx <= 1 && dy <= 1);
            
            if (targetFactionIdForAttack) { // If in a declared war, only target that enemy
                return isAdjacent && t.ownerFactionId === targetFactionIdForAttack;
            } else { // If not in a declared war, pick any non-neutral, non-self.
                 return isAdjacent && t.ownerFactionId !== updatedAIFaction.id && t.ownerFactionId !== FactionId.NEUTRAL; 
            }
        });
        
        if(potentialTargets.length > 0) {
            const target = potentialTargets.sort((a,b) => (a.garrison.infantry + a.garrison.cavalry + a.garrison.archers) - (b.garrison.infantry + b.garrison.cavalry + b.garrison.archers))[0]; 
            
            const attackerStrength = (strongTerritory.garrison.infantry || 0) * 1 + (strongTerritory.garrison.cavalry || 0) * 1.5 + (strongTerritory.garrison.archers || 0) * 1.2;
            const defenderStrength = (target.garrison.infantry || 0) + (target.garrison.cavalry || 0) * 1.5 + (target.garrison.archers || 0) * 1.2; 

            if (attackerStrength > defenderStrength * 1.2) { 
                 currentState = addEventToState(currentState, `${KOREAN_FACTION_NAMES[updatedAIFaction.id]}이(가) ${strongTerritory.name}에서 ${target.name}(${KOREAN_FACTION_NAMES[target.ownerFactionId as FactionId]}) (으)로 공격을 시작했습니다!`, GameEventType.BATTLE);
                 currentState = resolveCombat(currentState, strongTerritory, target, updatedAIFaction, { ...strongTerritory.garrison }); 
            }
        }
    }
  }
  return currentState;
};

const resolveCombat = (initialState: GameState, attackerTerritorySnapshot: Territory, defenderTerritorySnapshot: Territory, attackerFaction: Faction, attackingUnits: ArmyUnits): GameState => {
    let stateCopy = JSON.parse(JSON.stringify(initialState)) as GameState; 
    
    const attTerrOriginalIdx = stateCopy.territories.findIndex(t => t.id === attackerTerritorySnapshot.id);
    const defTerrIdx = stateCopy.territories.findIndex(t => t.id === defenderTerritorySnapshot.id);

    if (attTerrOriginalIdx === -1 || defTerrIdx === -1) return initialState; 
    const originalDefenderFactionId = stateCopy.territories[defTerrIdx].ownerFactionId;


    let defenderUnits = { ...stateCopy.territories[defTerrIdx].garrison };

    let attackerStrength = (Number(attackingUnits.infantry) || 0) * 1 + (Number(attackingUnits.cavalry) || 0) * 1.5 + (Number(attackingUnits.archers) || 0) * 0.8;
    let defenderStrength = (Number(defenderUnits.infantry) || 0) * 1 + (Number(defenderUnits.cavalry) || 0) * 1.2 + (Number(defenderUnits.archers) || 0) * 1.2; 

    attackerStrength *= (0.8 + Math.random() * 0.4); 
    defenderStrength *= (0.8 + Math.random() * 0.4);

    const totalStrength = attackerStrength + defenderStrength;
    if (totalStrength === 0) { 
      return addEventToState(stateCopy, `${attackerTerritorySnapshot.name}과(와) ${defenderTerritorySnapshot.name}의 전투 시도 중 오류 발생.`, GameEventType.BATTLE);
    }

    const attackerLossRate = Math.min(1, (defenderStrength / totalStrength) * (Math.random()*0.4 + 0.8)); 
    const defenderLossRate = Math.min(1, (attackerStrength / totalStrength) * (Math.random()*0.4 + 0.8));

    const newAttackerUnitsSurvived: ArmyUnits = { 
        infantry: Math.round((Number(attackingUnits.infantry) || 0) * (1 - attackerLossRate)), 
        cavalry: Math.round((Number(attackingUnits.cavalry) || 0) * (1 - attackerLossRate)), 
        archers: Math.round((Number(attackingUnits.archers) || 0) * (1 - attackerLossRate))
    };
    
    const newDefenderUnitsSurvived: ArmyUnits = { 
        infantry: Math.round((Number(defenderUnits.infantry) || 0) * (1 - defenderLossRate)), 
        cavalry: Math.round((Number(defenderUnits.cavalry) || 0) * (1 - defenderLossRate)), 
        archers: Math.round((Number(defenderUnits.archers) || 0) * (1 - defenderLossRate))
    };
    
    stateCopy.territories[attTerrOriginalIdx].garrison.infantry = Math.max(0, stateCopy.territories[attTerrOriginalIdx].garrison.infantry - (Number(attackingUnits.infantry) || 0));
    stateCopy.territories[attTerrOriginalIdx].garrison.cavalry = Math.max(0, stateCopy.territories[attTerrOriginalIdx].garrison.cavalry - (Number(attackingUnits.cavalry) || 0));
    stateCopy.territories[attTerrOriginalIdx].garrison.archers = Math.max(0, stateCopy.territories[attTerrOriginalIdx].garrison.archers - (Number(attackingUnits.archers) || 0));

    stateCopy.territories[defTerrIdx].garrison = newDefenderUnitsSurvived;

    const attackerLostCount = ((Number(attackingUnits.infantry) || 0) - newAttackerUnitsSurvived.infantry) + ((Number(attackingUnits.cavalry) || 0) - newAttackerUnitsSurvived.cavalry) + ((Number(attackingUnits.archers) || 0) - newAttackerUnitsSurvived.archers);
    const defenderLostCount = ((Number(defenderUnits.infantry) || 0) - newDefenderUnitsSurvived.infantry) + ((Number(defenderUnits.cavalry) || 0) - newDefenderUnitsSurvived.cavalry) + ((Number(defenderUnits.archers) || 0) - newDefenderUnitsSurvived.archers);
    
    let battleMessage = `${KOREAN_FACTION_NAMES[attackerFaction.id]}이(가) ${defenderTerritorySnapshot.name}(${KOREAN_FACTION_NAMES[defenderTerritorySnapshot.ownerFactionId as FactionId]})을(를) 공격! ${attackerFaction.name} 손실: ${attackerLostCount}, 방어측 손실: ${defenderLostCount}.`;

    if (newDefenderUnitsSurvived.infantry + newDefenderUnitsSurvived.cavalry + newDefenderUnitsSurvived.archers <= 0 && attackerStrength > defenderStrength) {
        stateCopy.territories[defTerrIdx].ownerFactionId = attackerFaction.id;
        stateCopy.territories[defTerrIdx].garrison = newAttackerUnitsSurvived; 
        battleMessage += ` ${KOREAN_FACTION_NAMES[attackerFaction.id]}이(가) ${defenderTerritorySnapshot.name}을(를) 점령했습니다!`;
        
        // War Spoils Distribution
        const involvedWar = stateCopy.activeWars.find(w => 
            w.isActive && 
            ((w.aggressorFactionId === attackerFaction.id && w.defenderFactionId === originalDefenderFactionId) || 
             (w.aggressorFactionId === originalDefenderFactionId && w.defenderFactionId === attackerFaction.id))
        );

        if (involvedWar && involvedWar.playerContributions[attackerFaction.id] && involvedWar.playerContributions[attackerFaction.id]! > 0) {
            const playerContribution = involvedWar.playerContributions[attackerFaction.id]!;
            const goldSpoils = Math.floor(playerContribution * WAR_FUNDING_SPOILS_GOLD_FACTOR);
            const resourceSpoilsValue = Math.floor(playerContribution * WAR_FUNDING_SPOILS_RESOURCES_VALUE_FACTOR);
            
            stateCopy.player.resources[ResourceType.GOLD] = (stateCopy.player.resources[ResourceType.GOLD] || 0) + goldSpoils;
            battleMessage += ` 전쟁 자금 지원에 대한 보상으로 ${goldSpoils}${RESOURCE_EMOJIS.Gold} 획득.`;

            // Distribute resource spoils (simplified)
            const spoilsResources: Partial<Resources> = {};
            if (resourceSpoilsValue > 0) {
                 spoilsResources[ResourceType.FOOD] = (spoilsResources[ResourceType.FOOD] || 0) + Math.floor(resourceSpoilsValue / 3 / (INITIAL_MARKET_STATE.initialBasePrices[ResourceType.FOOD] || 10));
                 spoilsResources[ResourceType.IRON] = (spoilsResources[ResourceType.IRON] || 0) + Math.floor(resourceSpoilsValue / 3 / (INITIAL_MARKET_STATE.initialBasePrices[ResourceType.IRON] || 25));
                 spoilsResources[ResourceType.SILK] = (spoilsResources[ResourceType.SILK] || 0) + Math.floor(resourceSpoilsValue / 3 / (INITIAL_MARKET_STATE.initialBasePrices[ResourceType.SILK] || 50));
                
                Object.entries(spoilsResources).forEach(([res, amount]) => {
                     stateCopy.player.resources[res as ResourceType] = (stateCopy.player.resources[res as ResourceType] || 0) + amount;
                });
                battleMessage += ` 추가로 가치 ${resourceSpoilsValue}${RESOURCE_EMOJIS.Gold} 상당의 자원 획득.`;
            }
             // Grant temporary trade advantage
            const tradeAdvantage: TemporaryTradeAdvantage = {
                territoryId: defenderTerritorySnapshot.id, // The captured territory
                turnsRemaining: WAR_FUNDING_TRADE_ADVANTAGE_TURNS,
                bonusType: 'WAR_SPOILS',
            };
            stateCopy.player.temporaryTradeAdvantages.push(tradeAdvantage);
            battleMessage += ` ${defenderTerritorySnapshot.name}에서 ${WAR_FUNDING_TRADE_ADVANTAGE_TURNS}턴 동안 특별 교역권 획득!`;
            
            // Clear contribution for this specific attacker in this war to prevent double-dipping on same funds for multiple captures
            // involvedWar.playerContributions[attackerFaction.id] = 0; // Or reduce based on spoils given
        }


    } else if (newAttackerUnitsSurvived.infantry + newAttackerUnitsSurvived.cavalry + newAttackerUnitsSurvived.archers <= 0) {
        battleMessage += ` ${KOREAN_FACTION_NAMES[attackerFaction.id]}의 공격은 격퇴되었고 모든 공격 유닛을 잃었습니다!`;
    } else {
         battleMessage += ` ${defenderTerritorySnapshot.name} 방어 성공. 전투는 계속됩니다.`;
    }
    stateCopy = addEventToState(stateCopy, battleMessage, GameEventType.BATTLE);
    return stateCopy;
};

const checkGameOver = (state: GameState): GameState => {
  const activeAIFactions = state.factions.filter(f => f.id !== FactionId.NEUTRAL);
  
  for (const faction of activeAIFactions) {
    const factionTerritories = state.territories.filter(t => t.ownerFactionId === faction.id);
    
    const otherAIFactionsWithTerritories = activeAIFactions.filter(
        other => other.id !== faction.id && state.territories.some(t => t.ownerFactionId === other.id)
    );

    if (factionTerritories.length > 0 && otherAIFactionsWithTerritories.length === 0) {
      const playerFinalWealth = state.player.totalWealthHistory[state.player.totalWealthHistory.length - 1]?.wealth || 0;
      return addEventToState({ 
        ...state, 
        gameOver: true, 
        victoriousFactionId: faction.id, 
      }, `${KOREAN_FACTION_NAMES[faction.id]}이(가) 천하를 통일했습니다! 게임 종료. 당신의 최종 자산: ${playerFinalWealth.toLocaleString()} 금.`, GameEventType.SYSTEM) ;
    }
  }
  return state; 
};

export const getEffectiveTradePrice = (state: GameState, factionId: FactionId, territoryId: string, localBasePriceInput: number | undefined, tradeType: 'BUY' | 'SELL'): number => {
    const localBasePrice = localBasePriceInput === undefined ? 0 : localBasePriceInput;
    if (localBasePrice === 0) return 0; 

    const territory = state.territories.find(t => t.id === territoryId);
    const playerInfluenceInTerritory = state.player.influence[territoryId] || 0;
    let influenceBonusFactor = playerInfluenceInTerritory * INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL;

    const relationshipScore = state.player.factionRelations[factionId] || 0;
    const relationshipLevel = getRelationshipLevel(relationshipScore);
    let relationshipPriceModifier = 0;

    switch (relationshipLevel) {
        case RelationshipLevel.FRIENDLY: relationshipPriceModifier = RELATIONSHIP_MODIFIERS.TRADE_PRICE_BONUS_FRIENDLY; break;
        case RelationshipLevel.ALLIED: relationshipPriceModifier = RELATIONSHIP_MODIFIERS.TRADE_PRICE_BONUS_ALLIED; break;
        case RelationshipLevel.UNFRIENDLY: relationshipPriceModifier = -RELATIONSHIP_MODIFIERS.TRADE_PRICE_PENALTY_UNFRIENDLY; break;
        case RelationshipLevel.HOSTILE: relationshipPriceModifier = -RELATIONSHIP_MODIFIERS.TRADE_PRICE_PENALTY_HOSTILE; break;
    }

    let totalSlanderPenaltyPercent = 0;
    state.player.slanderEffects.forEach(effect => totalSlanderPenaltyPercent += effect.pricePenaltyPercent);

    // Apply Trade Depot Bonus
    if (territory?.specialBuilding?.type === SpecializedBuildingType.TRADE_DEPOT && territory.specialBuilding.fundedByPlayer) {
        influenceBonusFactor += SPECIAL_BUILDING_TRADE_DEPOT_PRICE_BONUS;
    }
    
    // Apply War Spoils Trade Advantage
    const warSpoilsAdvantage = state.player.temporaryTradeAdvantages.find(adv => adv.territoryId === territoryId && adv.bonusType === 'WAR_SPOILS');
    if (warSpoilsAdvantage) {
        // This gives exceptionally good prices, overriding normal markup/bonuses from player side
        const price = tradeType === 'BUY' ? localBasePrice * 0.9 : localBasePrice * 1.1; // Example: 10% better fixed
        return Math.max(1, tradeType === 'BUY' ? Math.ceil(price) : Math.floor(price));
    }
    
    // Apply faction-wide trade advantage from policies (if applicable)
    const factionWideAdvantage = state.player.temporaryTradeAdvantages.find(adv => adv.territoryId === `FACTION_WIDE_${factionId}` && adv.bonusType === 'WAR_SPOILS');
    if (factionWideAdvantage) {
        influenceBonusFactor += 0.05; // Example: Flat 5% bonus for faction-wide policies
    }


    let finalPrice;
    if (tradeType === 'BUY') { 
        finalPrice = localBasePrice * (1 + TRADE_MARKUP - influenceBonusFactor - relationshipPriceModifier) * (1 + totalSlanderPenaltyPercent);
    } else { 
        finalPrice = localBasePrice * (1 - TRADE_MARKUP + influenceBonusFactor + relationshipPriceModifier) * (1 - totalSlanderPenaltyPercent);
    }
    
    return tradeType === 'BUY' ? Math.ceil(Math.max(1, finalPrice)) : Math.floor(Math.max(1, finalPrice));
};

const getEspionageDetectionChance = (state: GameState, targetFactionId: FactionId): number => {
    let baseChance = ESPIONAGE_DETECTION_CHANCE_BASE;
    const relationshipScore = state.player.factionRelations[targetFactionId] || 0;
    const relationshipLevel = getRelationshipLevel(relationshipScore);

    switch(relationshipLevel) {
        case RelationshipLevel.FRIENDLY: baseChance -= RELATIONSHIP_MODIFIERS.ESPIONAGE_DETECTION_DECREASE_FRIENDLY; break;
        case RelationshipLevel.ALLIED: baseChance -= RELATIONSHIP_MODIFIERS.ESPIONAGE_DETECTION_DECREASE_ALLIED; break;
        case RelationshipLevel.UNFRIENDLY: baseChance += RELATIONSHIP_MODIFIERS.ESPIONAGE_DETECTION_INCREASE_UNFRIENDLY; break;
        case RelationshipLevel.HOSTILE: baseChance += RELATIONSHIP_MODIFIERS.ESPIONAGE_DETECTION_INCREASE_HOSTILE; break;
    }
    return Math.max(0.05, Math.min(0.95, baseChance));
};

const findArbitrageOpportunities = (state: GameState, simulatedPlayerResources: Resources): GameAction[] => {
    const opportunities: {
        resource: ResourceType;
        buyTerritoryId: string;
        sellTerritoryId: string;
        buyFactionId: FactionId;
        sellFactionId: FactionId;
        buyPrice: number;
        sellPrice: number;
        potentialProfitPerUnit: number;
        maxAffordableAmount: number;
    }[] = [];
    const automatedActions: GameAction[] = [];
    let executedArbitrageTrades = 0;

    const keyTradeResources = [ResourceType.SILK, ResourceType.HERBS, ResourceType.TEA, ResourceType.IRON, ResourceType.FOOD];

    for (const resource of keyTradeResources) {
        const potentialBuys: { territoryId: string; factionId: FactionId; price: number; factionStock: number }[] = [];
        const potentialSells: { territoryId: string; factionId: FactionId; price: number; factionAffordableGold: number }[] = [];

        state.territories.forEach(t => {
            if (t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL && t.localMarketPrices[resource] !== undefined) {
                const ownerFaction = state.factions.find(f => f.id === t.ownerFactionId)!;
                const relationshipLevel = getRelationshipLevel(state.player.factionRelations[ownerFaction.id] || 0);
                if (relationshipLevel === RelationshipLevel.HOSTILE) return;

                const effectiveBuyPrice = getEffectiveTradePrice(state, ownerFaction.id, t.id, t.localMarketPrices[resource], 'BUY');
                const effectiveSellPrice = getEffectiveTradePrice(state, ownerFaction.id, t.id, t.localMarketPrices[resource], 'SELL');
                
                if ((ownerFaction.resources[resource] || 0) > 0) { // Faction has stock to sell to player
                    potentialBuys.push({ territoryId: t.id, factionId: ownerFaction.id, price: effectiveBuyPrice, factionStock: ownerFaction.resources[resource] || 0 });
                }
                if ((ownerFaction.resources[ResourceType.GOLD] || 0) > 0) { // Faction has gold to buy from player
                    potentialSells.push({ territoryId: t.id, factionId: ownerFaction.id, price: effectiveSellPrice, factionAffordableGold: ownerFaction.resources[ResourceType.GOLD] || 0 });
                }
            }
        });

        potentialBuys.sort((a, b) => a.price - b.price);
        potentialSells.sort((a, b) => b.price - a.price);

        if (potentialBuys.length > 0 && potentialSells.length > 0) {
            const bestBuy = potentialBuys[0];
            for (const bestSell of potentialSells) {
                if (bestBuy.territoryId === bestSell.territoryId) continue; // Cannot buy and sell in the same place for arbitrage

                const profitPerUnit = bestSell.price - bestBuy.price;
                if (profitPerUnit > 0 && bestBuy.price > 0 && (profitPerUnit / bestBuy.price) >= AUTO_TRADE_ARBITRAGE_MIN_PROFIT_MARGIN) {
                    const maxCanBuyWithGold = Math.floor(((simulatedPlayerResources[ResourceType.GOLD] || 0) * AUTO_TRADE_ARBITRAGE_MAX_GOLD_COMMIT_FACTOR) / bestBuy.price);
                    const maxSellFactionCanAfford = Math.floor(bestSell.factionAffordableGold / bestSell.price);
                    const maxAffordableAmount = Math.min(bestBuy.factionStock, maxCanBuyWithGold, maxSellFactionCanAfford, 50); // Cap trade amount

                    if (maxAffordableAmount > 0) {
                        opportunities.push({
                            resource,
                            buyTerritoryId: bestBuy.territoryId,
                            sellTerritoryId: bestSell.territoryId,
                            buyFactionId: bestBuy.factionId,
                            sellFactionId: bestSell.factionId,
                            buyPrice: bestBuy.price,
                            sellPrice: bestSell.price,
                            potentialProfitPerUnit: profitPerUnit,
                            maxAffordableAmount
                        });
                        break; // Found a good sell partner for this buy, move to next resource
                    }
                }
            }
        }
    }

    opportunities.sort((a,b) => (b.potentialProfitPerUnit * b.maxAffordableAmount) - (a.potentialProfitPerUnit * a.maxAffordableAmount)); // Sort by total potential profit

    if (opportunities.length > 0 && executedArbitrageTrades < AUTO_TRADE_MAX_ARBITRAGE_TRADES_PER_TURN) {
        const bestOpp = opportunities[0];
        const tradeAmount = bestOpp.maxAffordableAmount;
        const totalBuyCost = bestOpp.buyPrice * tradeAmount;

        if ((simulatedPlayerResources[ResourceType.GOLD] || 0) >= totalBuyCost) {
            // Simulate Buy
            automatedActions.push({ type: 'PLAYER_TRADE_RESOURCES', payload: { targetFactionId: bestOpp.buyFactionId, territoryId: bestOpp.buyTerritoryId, resource: bestOpp.resource, amount: tradeAmount, tradeType: 'BUY' } });
            simulatedPlayerResources[ResourceType.GOLD] = (simulatedPlayerResources[ResourceType.GOLD] || 0) - totalBuyCost;
            simulatedPlayerResources[bestOpp.resource] = (simulatedPlayerResources[bestOpp.resource] || 0) + tradeAmount;
            
            // Simulate Sell
            automatedActions.push({ type: 'PLAYER_TRADE_RESOURCES', payload: { targetFactionId: bestOpp.sellFactionId, territoryId: bestOpp.sellTerritoryId, resource: bestOpp.resource, amount: tradeAmount, tradeType: 'SELL' } });
            simulatedPlayerResources[ResourceType.GOLD] = (simulatedPlayerResources[ResourceType.GOLD] || 0) + bestOpp.sellPrice * tradeAmount;
            simulatedPlayerResources[bestOpp.resource] = (simulatedPlayerResources[bestOpp.resource] || 0) - tradeAmount;

            automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { 
                message: `[자동 위임 - 차익 거래] ${KOREAN_RESOURCE_NAMES[bestOpp.resource]} ${tradeAmount}개: ${KOREAN_FACTION_NAMES[bestOpp.buyFactionId]} (${state.territories.find(t=>t.id===bestOpp.buyTerritoryId)?.name})에서 @${bestOpp.buyPrice} 구매 -> ${KOREAN_FACTION_NAMES[bestOpp.sellFactionId]} (${state.territories.find(t=>t.id===bestOpp.sellTerritoryId)?.name})에 @${bestOpp.sellPrice} 판매. 예상 순이익: ${Math.round(bestOpp.potentialProfitPerUnit * tradeAmount)}${RESOURCE_EMOJIS.Gold}`, 
                type: GameEventType.TRADE 
            }});
            executedArbitrageTrades++;
        }
    }
    return automatedActions;
};


// Heuristic-based player automation logic
const generatePlayerAutomatedActions = (state: GameState): GameAction[] => {
    let automatedActions: GameAction[] = [];
    const simulatedPlayerResources = JSON.parse(JSON.stringify(state.player.resources)) as Resources;
    let simulatedFavoredFactionId = state.player.favoredFactionId; 
    const playerCurrentStanding = state.player.merchantStanding;
    const playerTotalWealth = state.player.totalWealthHistory[state.player.totalWealthHistory.length-1]?.wealth || 0;
    let newlyAcceptedMissionsThisTurn = 0;
    let opportunisticBuysThisTurn = 0;

    // --- Determine if player is falling behind ---
    let isPlayerFallingBehind = false;
    if (state.aiMerchants.length > 0) {
        const totalAIMerchantWealth = state.aiMerchants.reduce((sum, m) => sum + (m.totalWealthHistory.slice(-1)[0]?.wealth || 0), 0);
        const averageAIMerchantWealth = totalAIMerchantWealth / state.aiMerchants.length;
        
        const aiMerchantStandingLevels = state.aiMerchants.map(m => Object.values(MerchantStandingLevel).indexOf(m.merchantStanding));
        const averageAIMerchantStandingIndex = aiMerchantStandingLevels.reduce((sum, level) => sum + level, 0) / state.aiMerchants.length;
        const playerStandingIndex = Object.values(MerchantStandingLevel).indexOf(playerCurrentStanding);

        if (playerTotalWealth < averageAIMerchantWealth * AUTO_COMPETITIVE_WEALTH_RATIO_THRESHOLD) {
            isPlayerFallingBehind = true;
        }
        if (playerStandingIndex < averageAIMerchantStandingIndex - AUTO_COMPETITIVE_STANDING_DIFFERENCE_THRESHOLD) {
            isPlayerFallingBehind = true;
        }
        if (isPlayerFallingBehind && automatedActions.filter(a => a.type === 'ADD_GAME_EVENT' && a.payload.message.includes("경쟁자 대비 뒤처지고")).length === 0) {
             automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임 분석] 현재 경쟁자 대비 뒤처지고 있는 것으로 판단됩니다. 보다 적극적인 전략을 고려합니다.`, type: GameEventType.SYSTEM }});
        }
    }


    // --- Favored Faction Logic ---
    if (state.isFavoredFactionDelegationActive) {
        let favoredFactionChangedThisTurn = false;
        const originalFavoredFactionId = state.player.favoredFactionId;

        if (simulatedFavoredFactionId) {
            const currentFavFaction = state.factions.find(f => f.id === simulatedFavoredFactionId);
            const relationshipWithCurrentFav = getRelationshipLevel(state.player.factionRelations[simulatedFavoredFactionId] || 0);
            const territoriesOfCurrentFav = state.territories.filter(t => t.ownerFactionId === simulatedFavoredFactionId).length;

            if (!currentFavFaction || currentFavFaction.id === FactionId.NEUTRAL ||
                relationshipWithCurrentFav <= RelationshipLevel.UNFRIENDLY ||
                territoriesOfCurrentFav < AUTO_FAVORED_FACTION_MIN_TERRITORIES_CONSIDERATION) {
                
                if (currentFavFaction) { 
                    automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] 기존 주요 지원 세력 (${KOREAN_FACTION_NAMES[simulatedFavoredFactionId]}) 상태 변경으로 재선정을 고려합니다.`, type: GameEventType.SYSTEM }});
                }
                simulatedFavoredFactionId = null; 
                favoredFactionChangedThisTurn = true; 
            }
        }

        if (simulatedFavoredFactionId === null) {
            const potentialFactions = state.factions
                .filter(f => f.id !== FactionId.NEUTRAL && state.territories.some(t => t.ownerFactionId === f.id))
                .map(faction => {
                    const relationshipScoreVal = state.player.factionRelations[faction.id] || 0;
                    const relationshipLevelVal = getRelationshipLevel(relationshipScoreVal);
                    const numTerritoriesVal = state.territories.filter(t => t.ownerFactionId === faction.id).length;
                    const economicPowerVal = faction.resources.Gold || 0;
                    let score = 0;
                    if (relationshipLevelVal === RelationshipLevel.ALLIED) score += 50;
                    else if (relationshipLevelVal === RelationshipLevel.FRIENDLY) score += 30;
                    else if (relationshipLevelVal === RelationshipLevel.NEUTRAL) score += 5;
                    else if (relationshipLevelVal === RelationshipLevel.UNFRIENDLY) score -= 50;
                    else if (relationshipLevelVal === RelationshipLevel.HOSTILE) score -= 1000;
                    score += numTerritoriesVal * AUTO_FAVORED_FACTION_TERRITORY_SCORE_MULTIPLIER;
                    score += Math.floor(economicPowerVal / AUTO_FAVORED_FACTION_ECON_SCORE_DIVISOR);
                    if (numTerritoriesVal >= AUTO_FAVORED_FACTION_MIN_TERRITORIES_CONSIDERATION) score += 20;
                    else score -= 20; 
                    return { faction, score, numTerritories: numTerritoriesVal };
                })
                .filter(item => item.score > 0 && item.numTerritories >= AUTO_FAVORED_FACTION_MIN_TERRITORIES_CONSIDERATION)
                .sort((a, b) => b.score - a.score);

            if (potentialFactions.length > 0) {
                const bestFaction = potentialFactions[0].faction;
                if (originalFavoredFactionId !== bestFaction.id || favoredFactionChangedThisTurn) { 
                    automatedActions.push({ type: 'PLAYER_SET_FAVORED_FACTION', payload: bestFaction.id });
                    automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] 주요 지원 세력을 ${KOREAN_FACTION_NAMES[bestFaction.id]}(으)로 자동 설정했습니다. (점수: ${potentialFactions[0].score.toFixed(0)})`, type: GameEventType.SYSTEM }});
                    simulatedFavoredFactionId = bestFaction.id; 
                } else {
                    simulatedFavoredFactionId = bestFaction.id; 
                }
            } else if (favoredFactionChangedThisTurn && originalFavoredFactionId !== null) {
                automatedActions.push({ type: 'PLAYER_SET_FAVORED_FACTION', payload: null });
                automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] 적절한 주요 지원 세력을 찾지 못해 설정을 해제합니다.`, type: GameEventType.SYSTEM }});
                simulatedFavoredFactionId = null;
            }
        }
    }

    // --- Arbitrage Trading ---
    const arbitrageActions = findArbitrageOpportunities(state, simulatedPlayerResources);
    if (arbitrageActions.length > 0) {
        automatedActions.push(...arbitrageActions);
        // Update simulated resources based on arbitrage outcome
        arbitrageActions.forEach(action => {
            if(action.type === 'PLAYER_TRADE_RESOURCES'){
                const { resource, amount, tradeType } = action.payload;
                const price = tradeType === 'BUY' ? getEffectiveTradePrice(state, action.payload.targetFactionId, action.payload.territoryId, state.territories.find(t=>t.id === action.payload.territoryId)?.localMarketPrices[resource], 'BUY') : getEffectiveTradePrice(state, action.payload.targetFactionId, action.payload.territoryId, state.territories.find(t=>t.id === action.payload.territoryId)?.localMarketPrices[resource], 'SELL');
                if (tradeType === 'BUY') {
                    simulatedPlayerResources[ResourceType.GOLD] = (simulatedPlayerResources[ResourceType.GOLD] || 0) - price * amount;
                    simulatedPlayerResources[resource] = (simulatedPlayerResources[resource] || 0) + amount;
                } else { // SELL
                    simulatedPlayerResources[ResourceType.GOLD] = (simulatedPlayerResources[ResourceType.GOLD] || 0) + price * amount;
                    simulatedPlayerResources[resource] = (simulatedPlayerResources[resource] || 0) - amount;
                }
            }
        });
    }
    
    // --- Automated Investment ---
    const effectiveMinGoldForInvestment = AUTO_INVESTMENT_MIN_GOLD_HELD * (isPlayerFallingBehind ? AUTO_INVESTMENT_MIN_GOLD_HELD_IF_BEHIND_MULTIPLIER : 1.0);
    if ((simulatedPlayerResources.Gold || 0) >= effectiveMinGoldForInvestment) {
        const potentialInvestments = state.territories
            .filter(t => {
                if (!t.ownerFactionId || t.ownerFactionId === FactionId.NEUTRAL || t.developmentLevel >= MAX_DEVELOPMENT_LEVEL) return false;
                const relationshipWithOwner = getRelationshipLevel(state.player.factionRelations[t.ownerFactionId] || 0);
                return (t.ownerFactionId === simulatedFavoredFactionId || 
                       (!simulatedFavoredFactionId && relationshipWithOwner >= AUTO_INVESTMENT_RELATIONSHIP_THRESHOLD)
                       );
            })
            .map(t => ({
                territory: t,
                cost: PLAYER_INVESTMENT_COST_PER_LEVEL_BASE * (t.developmentLevel + 1)
            }))
            .filter(inv => (simulatedPlayerResources.Gold || 0) >= inv.cost + ( isPlayerFallingBehind ? PLAYER_INVESTMENT_COST_PER_LEVEL_BASE : 0 )) // Keep more buffer if behind
            .sort((a, b) => a.territory.developmentLevel - b.territory.developmentLevel || a.cost - b.cost); 

        if (potentialInvestments.length > 0) {
            const bestInvestment = potentialInvestments[0];
            automatedActions.push({ type: 'PLAYER_INVEST_IN_TERRITORY', payload: { territoryId: bestInvestment.territory.id, amount: bestInvestment.cost } });
            automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] ${isPlayerFallingBehind ? "(신중 투자) ":""}${bestInvestment.territory.name}에 ${bestInvestment.cost}${RESOURCE_EMOJIS[ResourceType.GOLD]} 투자. (개발 수준 ${bestInvestment.territory.developmentLevel + 1} 목표)`, type: GameEventType.FINANCE } });
            simulatedPlayerResources.Gold = (simulatedPlayerResources.Gold || 0) - bestInvestment.cost;
        }
    }
    
    // --- Automated Building Construction Support ---
    const effectiveMinGoldForBuilding = AUTO_BUILDING_MIN_GOLD_FOR_ANY_BUILDING * (isPlayerFallingBehind ? AUTO_BUILDING_MIN_GOLD_IF_BEHIND_MULTIPLIER : 1.0);
    if ((simulatedPlayerResources.Gold || 0) >= effectiveMinGoldForBuilding) {
        const potentialBuildingSites = state.territories.filter(t => {
            if (!t.ownerFactionId || t.ownerFactionId === FactionId.NEUTRAL || t.specialBuilding) return false;
            const relationshipWithOwner = getRelationshipLevel(state.player.factionRelations[t.ownerFactionId] || 0);
            return (t.ownerFactionId === simulatedFavoredFactionId || 
                    (!simulatedFavoredFactionId && relationshipWithOwner >= AUTO_BUILDING_RELATIONSHIP_THRESHOLD)
                   );
        });

        const buildingPriorities: SpecializedBuildingType[] = [
            SpecializedBuildingType.MARKET_HALL, SpecializedBuildingType.ADVANCED_FARM,
            SpecializedBuildingType.ENHANCED_MINE, SpecializedBuildingType.SILK_WORKSHOP,
            SpecializedBuildingType.TRADE_DEPOT,
        ];

        for (const territory of potentialBuildingSites) {
            for (const buildingType of buildingPriorities) {
                const config = SPECIALIZED_BUILDING_CONFIGS[buildingType];
                if (config.requiresBaseProduction && (territory.baseProduction[config.requiresBaseProduction!] === undefined || territory.baseProduction[config.requiresBaseProduction!] === 0)) continue; 

                let canAfford = true;
                let totalBuildingCostGold = 0;
                for (const resKey in config.cost) {
                    if(resKey === ResourceType.GOLD) totalBuildingCostGold += (config.cost[resKey as ResourceType] || 0);
                    if ((simulatedPlayerResources[resKey as ResourceType] || 0) < (config.cost[resKey as ResourceType] || 0)) {
                        canAfford = false; break;
                    }
                }
                if (isPlayerFallingBehind && ( (simulatedPlayerResources.Gold || 0) - totalBuildingCostGold < effectiveMinGoldForBuilding * 0.8) ) {
                    canAfford = false;
                }

                if (canAfford) {
                    automatedActions.push({ type: 'PLAYER_FUND_SPECIALIZED_BUILDING', payload: { territoryId: territory.id, buildingType: buildingType, cost: config.cost } });
                    automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] ${isPlayerFallingBehind ? "(선별 건설) ":""}${territory.name}에 ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원.`, type: GameEventType.CONSTRUCTION } });
                     for (const resKey in config.cost) { 
                        simulatedPlayerResources[resKey as ResourceType] = (simulatedPlayerResources[resKey as ResourceType] || 0) - (config.cost[resKey as ResourceType] || 0);
                    }
                    potentialBuildingSites.length = 0; break; 
                }
            }
            if (potentialBuildingSites.length === 0) break;
        }
    }

    // --- Automated Resource Trading (Surplus Selling / Deficit Buying / Opportunistic Buying) ---
    const tradingGoldReserve = AUTO_INVESTMENT_MIN_GOLD_HELD * AUTO_TRADE_MIN_GOLD_RESERVE_FOR_TRADING_FACTOR;
    const resourcesToAutomate: {
        resource: ResourceType; sellThreshold: number; sellAmount: number; sellProfitMargin: number; 
        buyThreshold: number; buyAmount: number; buyCostMargin: number; 
        isValuable?: boolean; opportunisticBuyAmount?: number;
    }[] = [
        { resource: ResourceType.SILK, sellThreshold: AUTO_SELL_SILK_SURPLUS_THRESHOLD, sellAmount: AUTO_SELL_SILK_AMOUNT_TO_SELL, sellProfitMargin: AUTO_SELL_SILK_MIN_PROFIT_MARGIN, buyThreshold: 0, buyAmount: 0, buyCostMargin: 0, isValuable: true, opportunisticBuyAmount: AUTO_TRADE_OPPORTUNISTIC_BUY_AMOUNT_SILK },
        { resource: ResourceType.FOOD, sellThreshold: AUTO_SELL_FOOD_SURPLUS_THRESHOLD, sellAmount: AUTO_SELL_FOOD_AMOUNT_TO_SELL, sellProfitMargin: AUTO_SELL_DEFAULT_MIN_PROFIT_MARGIN, buyThreshold: AUTO_BUY_FOOD_DEFICIT_THRESHOLD, buyAmount: AUTO_BUY_FOOD_AMOUNT_TO_BUY, buyCostMargin: AUTO_BUY_DEFAULT_MAX_COST_INCREASE_MARGIN },
        { resource: ResourceType.IRON, sellThreshold: AUTO_SELL_IRON_SURPLUS_THRESHOLD, sellAmount: AUTO_SELL_IRON_AMOUNT_TO_SELL, sellProfitMargin: AUTO_SELL_DEFAULT_MIN_PROFIT_MARGIN, buyThreshold: AUTO_BUY_IRON_DEFICIT_THRESHOLD, buyAmount: AUTO_BUY_IRON_AMOUNT_TO_BUY, buyCostMargin: AUTO_BUY_DEFAULT_MAX_COST_INCREASE_MARGIN },
        { resource: ResourceType.HERBS, sellThreshold: AUTO_SELL_HERBS_SURPLUS_THRESHOLD, sellAmount: AUTO_SELL_HERBS_AMOUNT_TO_SELL, sellProfitMargin: AUTO_SELL_DEFAULT_MIN_PROFIT_MARGIN, buyThreshold: AUTO_BUY_HERBS_DEFICIT_THRESHOLD, buyAmount: AUTO_BUY_HERBS_AMOUNT_TO_BUY, buyCostMargin: AUTO_BUY_DEFAULT_MAX_COST_INCREASE_MARGIN, isValuable: true, opportunisticBuyAmount: AUTO_TRADE_OPPORTUNISTIC_BUY_AMOUNT_HERBS_TEA },
        { resource: ResourceType.TEA, sellThreshold: AUTO_SELL_TEA_SURPLUS_THRESHOLD, sellAmount: AUTO_SELL_TEA_AMOUNT_TO_SELL, sellProfitMargin: AUTO_SELL_DEFAULT_MIN_PROFIT_MARGIN, buyThreshold: AUTO_BUY_TEA_DEFICIT_THRESHOLD, buyAmount: AUTO_BUY_TEA_AMOUNT_TO_BUY, buyCostMargin: AUTO_BUY_DEFAULT_MAX_COST_INCREASE_MARGIN, isValuable: true, opportunisticBuyAmount: AUTO_TRADE_OPPORTUNISTIC_BUY_AMOUNT_HERBS_TEA },
    ];

    for (const autoParam of resourcesToAutomate) {
        const playerResourceAmount = simulatedPlayerResources[autoParam.resource] || 0;
        const effectiveSellThreshold = autoParam.sellThreshold * (isPlayerFallingBehind ? AUTO_SELL_SURPLUS_AGGRESSION_FACTOR_IF_BEHIND : 1.0);
        const requiredSellProfitMargin = isPlayerFallingBehind ? AUTO_SELL_MIN_PROFIT_MARGIN_IF_BEHIND : autoParam.sellProfitMargin;

        // Selling Surplus
        if (playerResourceAmount > effectiveSellThreshold) {
            const surplus = playerResourceAmount - effectiveSellThreshold;
            const amountToSell = Math.min(surplus, autoParam.sellAmount);
            if (amountToSell > 0) {
                const potentialSellTerritories = state.territories
                    .filter(t => t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL && t.localMarketPrices[autoParam.resource] && getRelationshipLevel(state.player.factionRelations[t.ownerFactionId] || 0) !== RelationshipLevel.HOSTILE)
                    .map(t => ({ territory: t, sellPrice: getEffectiveTradePrice(state, t.ownerFactionId!, t.id, t.localMarketPrices[autoParam.resource], 'SELL'), owner: state.factions.find(f=>f.id === t.ownerFactionId) }))
                    .filter(t_1 => t_1.owner && (t_1.owner.resources.Gold || 0) >= t_1.sellPrice * amountToSell && t_1.sellPrice > (INITIAL_MARKET_STATE.initialBasePrices[autoParam.resource]! * requiredSellProfitMargin))
                    .sort((a, b) => b.sellPrice - a.sellPrice);
                if (potentialSellTerritories.length > 0) {
                    const bestSellTerritory = potentialSellTerritories[0];
                    automatedActions.push({ type: 'PLAYER_TRADE_RESOURCES', payload: { targetFactionId: bestSellTerritory.territory.ownerFactionId!, territoryId: bestSellTerritory.territory.id, resource: autoParam.resource, amount: amountToSell, tradeType: 'SELL' } });
                    automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] ${isPlayerFallingBehind ? "(공격적 판매) ":""}${bestSellTerritory.territory.name}에 ${KOREAN_RESOURCE_NAMES[autoParam.resource]} ${amountToSell}개를 개당 ${bestSellTerritory.sellPrice}${RESOURCE_EMOJIS[ResourceType.GOLD]}에 판매. (수익 마진 조건: ${requiredSellProfitMargin*100}%)`, type: GameEventType.TRADE } });
                    simulatedPlayerResources[autoParam.resource] = (simulatedPlayerResources[autoParam.resource] || 0) - amountToSell;
                    simulatedPlayerResources.Gold = (simulatedPlayerResources.Gold || 0) + bestSellTerritory.sellPrice * amountToSell;
                }
            }
        }
        // Buying Deficit (excluding Silk for deficit buying)
        const effectiveBuyCostMargin = autoParam.buyCostMargin * (isPlayerFallingBehind ? 0.95 : 1.0); // Tighter margin if behind
        if (autoParam.resource !== ResourceType.SILK && playerResourceAmount < autoParam.buyThreshold) {
            const amountToBuy = autoParam.buyAmount;
             if (amountToBuy > 0 && (simulatedPlayerResources.Gold || 0) > tradingGoldReserve) {
                const potentialBuyTerritories = state.territories
                    .filter(t => t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL && t.localMarketPrices[autoParam.resource] && getRelationshipLevel(state.player.factionRelations[t.ownerFactionId] || 0) !== RelationshipLevel.HOSTILE)
                    .map(t => ({ territory: t, buyPrice: getEffectiveTradePrice(state, t.ownerFactionId!, t.id, t.localMarketPrices[autoParam.resource], 'BUY'), owner: state.factions.find(f=>f.id === t.ownerFactionId) }))
                    .filter(t_2 => t_2.owner && (t_2.owner.resources[autoParam.resource] || 0) >= amountToBuy && t_2.buyPrice < (INITIAL_MARKET_STATE.initialBasePrices[autoParam.resource]! * effectiveBuyCostMargin) && (simulatedPlayerResources.Gold || 0) >= t_2.buyPrice * amountToBuy)
                    .sort((a,b) => a.buyPrice - b.buyPrice);
                
                if(potentialBuyTerritories.length > 0) {
                    const bestBuyTerritory = potentialBuyTerritories[0];
                    automatedActions.push({ type: 'PLAYER_TRADE_RESOURCES', payload: { targetFactionId: bestBuyTerritory.territory.ownerFactionId!, territoryId: bestBuyTerritory.territory.id, resource: autoParam.resource, amount: amountToBuy, tradeType: 'BUY' } });
                    automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] ${isPlayerFallingBehind ? "(신중 구매) ":""}${bestBuyTerritory.territory.name}에서 ${KOREAN_RESOURCE_NAMES[autoParam.resource]} ${amountToBuy}개를 개당 ${bestBuyTerritory.buyPrice}${RESOURCE_EMOJIS[ResourceType.GOLD]}에 구매. (비용 한계: ${effectiveBuyCostMargin*100}%)`, type: GameEventType.TRADE } });
                    simulatedPlayerResources[autoParam.resource] = (simulatedPlayerResources[autoParam.resource] || 0) + amountToBuy;
                    simulatedPlayerResources.Gold = (simulatedPlayerResources.Gold || 0) - bestBuyTerritory.buyPrice * amountToBuy;
                }
            }
        }
        // Opportunistic Buying (for valuable resources)
        if (autoParam.isValuable && autoParam.opportunisticBuyAmount && opportunisticBuysThisTurn < AUTO_TRADE_MAX_OPPORTUNISTIC_BUYS_PER_TURN && (simulatedPlayerResources.Gold || 0) > tradingGoldReserve * 1.5) { // Need more gold for opportunistic
            const amountToBuy = autoParam.opportunisticBuyAmount;
            const potentialBuyTerritories = state.territories
                .filter(t => t.ownerFactionId && t.ownerFactionId !== FactionId.NEUTRAL && t.localMarketPrices[autoParam.resource] && getRelationshipLevel(state.player.factionRelations[t.ownerFactionId] || 0) !== RelationshipLevel.HOSTILE)
                .map(t => ({ territory: t, buyPrice: getEffectiveTradePrice(state, t.ownerFactionId!, t.id, t.localMarketPrices[autoParam.resource], 'BUY'), owner: state.factions.find(f=>f.id === t.ownerFactionId) }))
                .filter(t_3 => t_3.owner && (t_3.owner.resources[autoParam.resource] || 0) >= amountToBuy && t_3.buyPrice < (INITIAL_MARKET_STATE.initialBasePrices[autoParam.resource]! * AUTO_TRADE_OPPORTUNISTIC_BUY_PRICE_THRESHOLD_FACTOR) && (simulatedPlayerResources.Gold || 0) >= t_3.buyPrice * amountToBuy)
                .sort((a,b) => a.buyPrice - b.buyPrice);

            if (potentialBuyTerritories.length > 0) {
                const bestBuyTerritory = potentialBuyTerritories[0];
                 automatedActions.push({ type: 'PLAYER_TRADE_RESOURCES', payload: { targetFactionId: bestBuyTerritory.territory.ownerFactionId!, territoryId: bestBuyTerritory.territory.id, resource: autoParam.resource, amount: amountToBuy, tradeType: 'BUY' } });
                 automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임 - 기회 매입] ${bestBuyTerritory.territory.name}에서 저렴한 ${KOREAN_RESOURCE_NAMES[autoParam.resource]} ${amountToBuy}개를 개당 ${bestBuyTerritory.buyPrice}${RESOURCE_EMOJIS[ResourceType.GOLD]}에 확보.`, type: GameEventType.TRADE }});
                 simulatedPlayerResources[autoParam.resource] = (simulatedPlayerResources[autoParam.resource] || 0) + amountToBuy;
                 simulatedPlayerResources.Gold = (simulatedPlayerResources.Gold || 0) - bestBuyTerritory.buyPrice * amountToBuy;
                 opportunisticBuysThisTurn++;
            }
        }
    }
    
    // --- Automated Financial Tactics ---
    // Stimulate Economy for Favored Faction (especially if behind)
    if (simulatedFavoredFactionId && (simulatedPlayerResources.Gold || 0) >= AUTO_FINANCIAL_MIN_GOLD_FOR_STIMULATE) {
        let shouldStimulate = false;
        if (isPlayerFallingBehind && Math.random() < AUTO_STIMULATE_FAVORED_FACTION_CHANCE_IF_BEHIND) {
            shouldStimulate = true;
        } else if (!isPlayerFallingBehind && Math.random() < 0.1) { // Lower chance if not behind
            shouldStimulate = true;
        }

        if (shouldStimulate) {
            const favoredFactionTerritories = state.territories.filter(t => t.ownerFactionId === simulatedFavoredFactionId).sort((a,b) => a.developmentLevel - b.developmentLevel);
            if (favoredFactionTerritories.length > 0) {
                const targetTerritoryForStimulate = favoredFactionTerritories[0];
                automatedActions.push({ type: 'PLAYER_EXECUTE_FINANCIAL_TACTIC', payload: { tactic: FinancialTacticType.STIMULATE_ECONOMY, cost: FINANCIAL_TACTIC_PLAYER_COST, targetTerritoryId: targetTerritoryForStimulate.id } });
                automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임]${isPlayerFallingBehind ? "(전략적 지원) ":""} ${KOREAN_FACTION_NAMES[simulatedFavoredFactionId]}의 ${targetTerritoryForStimulate.name}에 경제 부양 전술 실행.`, type: GameEventType.FINANCE } });
                simulatedPlayerResources.Gold = (simulatedPlayerResources.Gold || 0) - FINANCIAL_TACTIC_PLAYER_COST;
            }
        }
    }

    // Slander Competing Merchant (more aggressive if behind)
    const BASE_AUTO_SLANDER_CHANCE = 0.1; 
    const actualSlanderConsiderationChance = BASE_AUTO_SLANDER_CHANCE * (isPlayerFallingBehind ? AUTO_SLANDER_CHANCE_IF_BEHIND_MULTIPLIER : 1.0);
    const effectiveSlanderFavoredFactionRelThreshold = isPlayerFallingBehind ? RelationshipLevel.UNFRIENDLY : AUTO_SLANDER_FAVORED_FACTION_REL_THRESHOLD;


    if (state.aiMerchants.length > 0 && (simulatedPlayerResources.Gold || 0) >= SLANDER_MERCHANT_COST_GOLD && Math.random() < actualSlanderConsiderationChance) {
        const potentialSlanderTargets = state.aiMerchants
            .filter(merchant => {
                const merchantWealth = merchant.totalWealthHistory.slice(-1)[0]?.wealth || 0;
                const merchantStanding = merchant.merchantStanding;
                const standingDifference = Object.values(MerchantStandingLevel).indexOf(merchantStanding) - Object.values(MerchantStandingLevel).indexOf(playerCurrentStanding);
                if (merchant.slanderEffects.some(eff => eff.byMerchantId === 'PLAYER')) return false; 

                if (merchant.favoredFactionId) {
                    const playerRelWithMerchantsFavFaction = getRelationshipLevel(state.player.factionRelations[merchant.favoredFactionId] || 0);
                    if (playerRelWithMerchantsFavFaction >= effectiveSlanderFavoredFactionRelThreshold) {
                        return false; 
                    }
                }
                return (merchantWealth > playerTotalWealth + AUTO_SLANDER_WEALTH_DIFFERENCE_THRESHOLD) || (standingDifference >= AUTO_SLANDER_STANDING_DIFFERENCE_THRESHOLD);
            })
            .sort((a, b) => (b.totalWealthHistory.slice(-1)[0]?.wealth || 0) - (a.totalWealthHistory.slice(-1)[0]?.wealth || 0));

        if (potentialSlanderTargets.length > 0) {
            const targetMerchantForSlander = potentialSlanderTargets[0];
            automatedActions.push({ type: 'PLAYER_EXECUTE_FINANCIAL_TACTIC', payload: { tactic: FinancialTacticType.SLANDER_MERCHANT, cost: SLANDER_MERCHANT_COST_GOLD, targetMerchantId: targetMerchantForSlander.id } });
            automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임]${isPlayerFallingBehind ? "(경쟁자 집중 견제) ":""} 경쟁 상인 ${targetMerchantForSlander.name} 비방 전술 실행. (관계 허용치: ${KOREAN_RELATIONSHIP_LEVEL_NAMES[effectiveSlanderFavoredFactionRelThreshold]})`, type: GameEventType.SLANDER } });
            simulatedPlayerResources.Gold = (simulatedPlayerResources.Gold || 0) - SLANDER_MERCHANT_COST_GOLD;
        }
    }

     // Sabotage Market Tactic (if behind)
    if (isPlayerFallingBehind && Math.random() < AUTO_SABOTAGE_MARKET_CHANCE_IF_BEHIND && (simulatedPlayerResources.Gold || 0) >= FINANCIAL_TACTIC_PLAYER_COST * 1.2) {
        const sortedAIMerchantsByWealth = [...state.aiMerchants].sort((a,b) => (b.totalWealthHistory.slice(-1)[0]?.wealth || 0) - (a.totalWealthHistory.slice(-1)[0]?.wealth || 0));
        let targetTerritoryForSabotage: Territory | null = null;

        if (sortedAIMerchantsByWealth.length > 0) {
            const topMerchant = sortedAIMerchantsByWealth[0];
            if (topMerchant.favoredFactionId) {
                const targetFactionTerritories = state.territories.filter(t => t.ownerFactionId === topMerchant.favoredFactionId).sort((a,b) => b.developmentLevel - a.developmentLevel);
                if (targetFactionTerritories.length > 0) targetTerritoryForSabotage = targetFactionTerritories[0];
            }
        }
        // If no top merchant target, consider wealthiest faction's territory
        if (!targetTerritoryForSabotage) {
            const sortedFactionsByWealth = state.factions
                .filter(f => f.id !== FactionId.NEUTRAL)
                .map(f => ({faction: f, wealth: calculateEntityWealth(f.resources, state.market)}))
                .sort((a,b) => b.wealth - a.wealth);
            if (sortedFactionsByWealth.length > 0) {
                const topFactionTerritories = state.territories.filter(t => t.ownerFactionId === sortedFactionsByWealth[0].faction.id).sort((a,b) => b.developmentLevel - a.developmentLevel);
                if (topFactionTerritories.length > 0) targetTerritoryForSabotage = topFactionTerritories[0];
            }
        }

        if (targetTerritoryForSabotage && targetTerritoryForSabotage.ownerFactionId) {
            const relationshipWithTargetOwner = getRelationshipLevel(state.player.factionRelations[targetTerritoryForSabotage.ownerFactionId] || 0);
            if (relationshipWithTargetOwner < RelationshipLevel.FRIENDLY) { // Don't sabotage friends/allies
                 automatedActions.push({ type: 'PLAYER_EXECUTE_FINANCIAL_TACTIC', payload: { tactic: FinancialTacticType.SABOTAGE_MARKET, cost: FINANCIAL_TACTIC_PLAYER_COST, targetTerritoryId: targetTerritoryForSabotage.id } });
                 automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] (시장 교란 시도) ${targetTerritoryForSabotage.name}(${KOREAN_FACTION_NAMES[targetTerritoryForSabotage.ownerFactionId]})에 시장 교란 전술 실행.`, type: GameEventType.FINANCE } });
                 simulatedPlayerResources.Gold = (simulatedPlayerResources.Gold || 0) - FINANCIAL_TACTIC_PLAYER_COST;
            }
        }
    }
    
    // --- Automated Mission Management ---
    // Accept Missions
    if (newlyAcceptedMissionsThisTurn < AUTO_MISSION_MAX_NEWLY_ACCEPTED_PER_TURN && state.availableMissions.length > 0) {
        const sortedAvailableMissions = [...state.availableMissions]
            .map(mission => {
                let score = 0;
                let goldReward = mission.rewardGold || 0;
                if (isPlayerFallingBehind) {
                    goldReward *= AUTO_MISSION_GOLD_PRIORITY_FACTOR_IF_BEHIND;
                }
                score += goldReward;
                score += (mission.rewardRelationshipPoints || 0) * 10; // Simple factor for relationship points
                if (mission.offeringFactionId === simulatedFavoredFactionId) {
                    score *= 1.5; // Prioritize favored faction missions
                }
                // Penalize missions that require resources player doesn't have enough buffer for
                if (mission.type === MissionType.DELIVER_RESOURCES && mission.targetResourceType && mission.requiredAmount) {
                    if ((simulatedPlayerResources[mission.targetResourceType] || 0) < mission.requiredAmount * AUTO_MISSION_ACCEPT_RESOURCE_BUFFER_FACTOR) {
                        score -= 1000; // Heavy penalty
                    }
                }
                return { ...mission, score };
            })
            .filter(mission => {
                if (getRelationshipLevel(state.player.factionRelations[mission.offeringFactionId] || 0) < AUTO_MISSION_ACCEPT_RELATIONSHIP_THRESHOLD) return false;
                if (mission.timeLimitTurns < AUTO_MISSION_ACCEPT_MIN_TIME_LIMIT) return false;
                if ((mission.rewardGold || 0) < AUTO_MISSION_ACCEPT_MIN_GOLD_REWARD && (mission.rewardRelationshipPoints || 0) < AUTO_MISSION_ACCEPT_MIN_REL_REWARD) return false;
                if (mission.type === MissionType.ESPIONAGE_ASSESS_ECONOMY || mission.type === MissionType.ESPIONAGE_INCITE_UNREST) {
                    const playerInfluence = mission.targetTerritoryId ? (state.player.influence[mission.targetTerritoryId] || 0) : 0;
                    if (playerInfluence < AUTO_MISSION_ESPIONAGE_MIN_INFLUENCE) return false;
                }
                return mission.score > 0; // Only consider positively scored missions
            })
            .sort((a,b) => b.score - a.score);

        if (sortedAvailableMissions.length > 0) {
            const missionToAccept = sortedAvailableMissions[0];
            // Final check for resource delivery missions
            let canAccept = true;
            if (missionToAccept.type === MissionType.DELIVER_RESOURCES && missionToAccept.targetResourceType && missionToAccept.requiredAmount) {
                if ((simulatedPlayerResources[missionToAccept.targetResourceType] || 0) < missionToAccept.requiredAmount * AUTO_MISSION_ACCEPT_RESOURCE_BUFFER_FACTOR) {
                    canAccept = false;
                }
            }
            if (canAccept) {
                automatedActions.push({ type: 'ACCEPT_MISSION', payload: { missionId: missionToAccept.id } });
                automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] 임무 "${KOREAN_MISSION_TYPE_NAMES[missionToAccept.type]}" (${KOREAN_FACTION_NAMES[missionToAccept.offeringFactionId]}) 자동 수락.`, type: GameEventType.MISSION }});
                newlyAcceptedMissionsThisTurn++;
            }
        }
    }

    // Contribute to Accepted Missions
    for (const mission of state.acceptedMissions) {
        if (mission.status !== MissionStatus.ACCEPTED) continue;
        if (mission.type === MissionType.DELIVER_RESOURCES && mission.targetResourceType && mission.requiredAmount && mission.currentAmount !== undefined) {
            const needed = mission.requiredAmount - mission.currentAmount;
            if (needed <= 0) continue;

            const maxCanContributeThisTurn = Math.floor(needed * AUTO_MISSION_CONTRIBUTION_MAX_PERCENT_PER_TURN);
            const playerHas = simulatedPlayerResources[mission.targetResourceType] || 0;
            
            let criticalReserve = 0;
            if (mission.targetResourceType === ResourceType.FOOD) criticalReserve = AUTO_BUY_FOOD_DEFICIT_THRESHOLD * AUTO_MISSION_CRITICAL_RESOURCE_RESERVE_FACTOR;
            // Add other critical resource reserves if needed

            const amountToContribute = Math.min(maxCanContributeThisTurn, Math.max(0, playerHas - criticalReserve), needed);

            if (amountToContribute > 0) {
                automatedActions.push({ type: 'PLAYER_CONTRIBUTE_TO_MISSION', payload: { missionId: mission.id, resourceType: mission.targetResourceType, amount: amountToContribute }});
                automatedActions.push({ type: 'ADD_GAME_EVENT', payload: { message: `[자동 위임] 임무 "${KOREAN_MISSION_TYPE_NAMES[mission.type]}"에 ${KOREAN_RESOURCE_NAMES[mission.targetResourceType]} ${amountToContribute}개 자동 기여.`, type: GameEventType.MISSION }});
                simulatedPlayerResources[mission.targetResourceType] = playerHas - amountToContribute;
            }
        }
        // INVEST_TERRITORY missions are handled by the general investment logic.
        // ESPIONAGE missions require player to manually execute the espionage action.
    }

    return automatedActions;
};


export const gameReducer = (state: GameState, action: GameAction): GameState => {
  let newState = JSON.parse(JSON.stringify(state)) as GameState; // Deep copy for safety

  switch (action.type) {
    case 'NEXT_TURN':
      if (state.gameOver) return state;
      let processingState = JSON.parse(JSON.stringify(state)); 

      if (processingState.isDelegationActive) {
        const playerAutomatedActions = generatePlayerAutomatedActions(processingState);
        for (const playerAction of playerAutomatedActions) {
          processingState = gameReducer(processingState, playerAction); 
        }
      }
      processingState = processTurn(processingState); 
      return processingState;

    case 'TOGGLE_DELEGATION':
        newState.isDelegationActive = !newState.isDelegationActive;
        const delegationStatus = newState.isDelegationActive ? "활성화" : "비활성화";
        newState = addEventToState(newState, `자동 위임 모드가 ${delegationStatus}되었습니다.`, GameEventType.SYSTEM);
        return newState;
    
    case 'TOGGLE_FAVORED_FACTION_DELEGATION':
        newState.isFavoredFactionDelegationActive = !newState.isFavoredFactionDelegationActive;
        const favoredDelegationStatus = newState.isFavoredFactionDelegationActive ? "활성화" : "비활성화";
        newState = addEventToState(newState, `주요 지원 세력 자동 선정 모드가 ${favoredDelegationStatus}되었습니다.`, GameEventType.SYSTEM);
        return newState;

    case 'ADD_GAME_EVENT': 
        return addEventToState(newState, action.payload.message, action.payload.type);

    case 'SELECT_TERRITORY':
      return { ...state, selectedTerritoryId: action.payload, activeTab: ControlTab.TERRITORY_MARKET };
    
    case 'DESELECT_TERRITORY':
      return { ...state, selectedTerritoryId: null };

    case 'RESET_GAME': {
        const newInitialState = JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
        newInitialState.events = [{ id: generateId(), turn: 1, message: '게임이 초기화되었습니다. 위대한 상인의 여정을 다시 시작합니다!', type: GameEventType.SYSTEM }];
        INITIAL_FACTIONS.forEach(f => {
            if (f.id !== FactionId.NEUTRAL) {
                newInitialState.player.factionRelations[f.id] = 0;
            }
        });
        newInitialState.player.slanderEffects = [];
        newInitialState.player.temporaryTradeAdvantages = [];
        newInitialState.aiMerchants.forEach((m: AIMerchant) => { 
            m.slanderEffects = [];
            m.totalWealthHistory = [{ turn: 1, wealth: calculateEntityWealth(m.resources, newInitialState.market) }];
        });
        newInitialState.market.marketSignals = [];
        newInitialState.market.activeMisinformation = [];
        newInitialState.activeEconomicEvents = []; 
        newInitialState.availableMissions = []; 
        newInitialState.acceptedMissions = [];  
        newInitialState.territories = JSON.parse(JSON.stringify(INITIAL_TERRITORIES)).map((t: Territory) => ({
            ...t,
            localMarketPriceHistory: {}, 
        }));
        newInitialState.activeFactionPolicies = [];
        newInitialState.activeWars = [];
        newInitialState.isDelegationActive = false; 
        newInitialState.isFavoredFactionDelegationActive = false; 
        return newInitialState;
    }

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'PLAYER_SET_FAVORED_FACTION': {
        newState.player.favoredFactionId = action.payload;
        const facName = action.payload ? KOREAN_FACTION_NAMES[action.payload] : '없음';
        
        const isAutomatedChange = newState.events.some(
            ev => ev.turn === newState.turn && 
                  ev.type === GameEventType.SYSTEM &&
                  ev.message.includes("[자동 위임] 주요 지원 세력을") &&
                  ev.message.includes(facName)
        );

        if (!isAutomatedChange) {
            newState = addEventToState(newState, `주요 지원 세력을 ${facName}(으)로 변경했습니다.`, GameEventType.POLITICS);
        }
        return newState;
    }

    case 'PLAYER_INVEST_IN_TERRITORY': {
        const { territoryId, amount } = action.payload;
        const terrIdx = newState.territories.findIndex(t => t.id === territoryId);
        if (terrIdx === -1) return state;
        
        let territory = newState.territories[terrIdx]; 
        const ownerFaction = newState.factions.find(f => f.id === territory.ownerFactionId);

        if (!ownerFaction || ownerFaction.id === FactionId.NEUTRAL) {
            newState = addEventToState(newState, `중립 영토에는 투자할 수 없습니다.`, GameEventType.FINANCE);
            return newState;
        }
        
        const relationshipScore = newState.player.factionRelations[ownerFaction.id] || 0;
        if (getRelationshipLevel(relationshipScore) === RelationshipLevel.HOSTILE) {
            if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 투자`) && e.turn === newState.turn))) { 
                 newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[ownerFaction.id]} 세력과의 관계가 적대적이어서 ${territory.name}에 투자할 수 없습니다.`, GameEventType.FINANCE);
            }
            return newState;
        }

        if ((newState.player.resources[ResourceType.GOLD] || 0) >= amount && territory.developmentLevel < MAX_DEVELOPMENT_LEVEL) {
            newState.player.resources[ResourceType.GOLD] = (newState.player.resources[ResourceType.GOLD] || 0) - amount;
            territory.developmentLevel += 1; 
            newState.territories[terrIdx] = territory; 
            if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 투자`) && e.turn === newState.turn))) { 
                newState = addEventToState(newState, `당신은 ${KOREAN_FACTION_NAMES[ownerFaction.id]} 소유의 ${territory.name}에 ${amount} ${KOREAN_RESOURCE_NAMES.Gold}을(를) 투자하여 개발 수준을 ${territory.developmentLevel}(으)로 올렸습니다.`, GameEventType.FINANCE);
            }
            newState = updateFactionRelation(newState, ownerFaction.id, REL_CHANGE.INVEST_PLAYER, `${territory.name} 투자`);

            newState.acceptedMissions.forEach(mission => {
                if (mission.type === MissionType.INVEST_TERRITORY &&
                    mission.targetTerritoryId === territoryId &&
                    mission.status === MissionStatus.ACCEPTED) {
                    mission.currentAmount = (mission.currentAmount || 0) + amount;
                    if ((mission.currentAmount || 0) >= (mission.requiredAmount || Infinity)) {
                         newState = addEventToState(newState, `"${KOREAN_MISSION_TYPE_NAMES[mission.type]}" 임무(${KOREAN_FACTION_NAMES[mission.offeringFactionId]})에 대한 투자 진행 (${mission.currentAmount}/${mission.requiredAmount}).`, GameEventType.MISSION);
                    }
                }
            });

        } else {
            if (!newState.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 투자`) && e.turn === newState.turn))) { 
                newState = addEventToState(newState, `${territory.name} 투자 실패: ${KOREAN_RESOURCE_NAMES.Gold} 부족 또는 최대 개발 수준 도달.`, GameEventType.FINANCE);
            }
        }
        return newState;
    }

    case 'PLAYER_TRADE_RESOURCES': {
        const { targetFactionId, territoryId, resource, amount, tradeType } = action.payload;
        
        const player = newState.player; 
        const territoryIdx = newState.territories.findIndex(t => t.id === territoryId);
        if (territoryIdx === -1) {
            if (!state.isDelegationActive) newState = addEventToState(newState, `교역 대상 영토를 찾을 수 없습니다. (ID: ${territoryId})`, GameEventType.TRADE);
            return newState;
        }
        let territory = newState.territories[territoryIdx];

        const factionOriginal = newState.factions.find(f => f.id === targetFactionId);
        
        if (!factionOriginal || factionOriginal.id === FactionId.NEUTRAL) {
             if (!state.isDelegationActive) newState = addEventToState(newState, `교역 대상 세력을 찾을 수 없습니다. (ID: ${targetFactionId})`, GameEventType.TRADE);
            return newState;
        }
        if (amount <= 0 || territory.localMarketPrices[resource] === undefined) {
             if (!state.isDelegationActive) newState = addEventToState(newState, `교역 실패: 유효하지 않은 수량 또는 ${territory.name}에 ${KOREAN_RESOURCE_NAMES[resource]} 시세 정보 없음.`, GameEventType.TRADE);
            return newState;
        }

        const factionIdx = newState.factions.findIndex(f => f.id === targetFactionId);
        if (factionIdx === -1) return newState; 
        let faction = newState.factions[factionIdx]; 

        const relationshipScore = newState.player.factionRelations[targetFactionId] || 0;
        const relationshipLevel = getRelationshipLevel(relationshipScore);
        
        const localBasePrice = territory.localMarketPrices[resource]!;
        const pricePerUnit = getEffectiveTradePrice(newState, targetFactionId, territoryId, localBasePrice, tradeType);
        const totalGoldTransaction = pricePerUnit * amount;

        if (tradeType === 'BUY') { 
            if (relationshipLevel === RelationshipLevel.HOSTILE) { 
                if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('구매') && e.turn === newState.turn))) {
                     newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]} 세력과의 관계가 적대적이어서 구매할 수 없습니다.`, GameEventType.TRADE);
                }
                return newState;
            }
            if ((faction.resources[resource] || 0) < amount) {
                if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('구매') && e.turn === newState.turn))) {
                    newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}의 ${KOREAN_RESOURCE_NAMES[resource]} 재고 부족(${(faction.resources[resource] || 0)}/${amount})으로 구매 실패.`, GameEventType.TRADE);
                }
                return newState;
            }
            if ((player.resources[ResourceType.GOLD] || 0) < totalGoldTransaction) {
                 if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('구매') && e.turn === newState.turn))) {
                    newState = addEventToState(newState, `${KOREAN_RESOURCE_NAMES.Gold} 부족(${(player.resources[ResourceType.GOLD] || 0)}/${totalGoldTransaction})으로 구매 실패.`, GameEventType.TRADE);
                 }
                return newState;
            }
            
            player.resources[resource] = (player.resources[resource] || 0) + amount;
            player.resources[ResourceType.GOLD] = (player.resources[ResourceType.GOLD] || 0) - totalGoldTransaction;

            faction.resources[resource] = (faction.resources[resource] || 0) - amount;
            faction.resources[ResourceType.GOLD] = (faction.resources[ResourceType.GOLD] || 0) + totalGoldTransaction;
            if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('구매') && e.turn === newState.turn))) {
                newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}에게서 ${KOREAN_RESOURCE_NAMES[resource]} ${amount}개를 개당 ${pricePerUnit}${KOREAN_RESOURCE_NAMES.Gold} (총 ${totalGoldTransaction}${KOREAN_RESOURCE_NAMES.Gold})에 구매했습니다. (영토: ${territory.name})`, GameEventType.TRADE);
            }
            newState = updateFactionRelation(newState, targetFactionId, REL_CHANGE.TRADE_SUCCESSFUL, `${territory.name}에서 ${KOREAN_RESOURCE_NAMES[resource]} 구매`);
        } else { // SELL
             if (relationshipLevel === RelationshipLevel.HOSTILE) {
                 if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('판매') && e.turn === newState.turn))) {
                     newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]} 세력과의 관계가 적대적이어서 판매할 수 없습니다.`, GameEventType.TRADE);
                 }
                 return newState;
             }
            if ((player.resources[resource] || 0) < amount) {
                 if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('판매') && e.turn === newState.turn))) {
                     newState = addEventToState(newState, `보유 ${KOREAN_RESOURCE_NAMES[resource]} 부족(${(player.resources[resource] || 0)}/${amount})으로 판매 실패.`, GameEventType.TRADE);
                 }
                return newState;
            }
            if ((faction.resources[ResourceType.GOLD] || 0) < totalGoldTransaction) {
                 if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('판매') && e.turn === newState.turn))) {
                     newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}의 ${KOREAN_RESOURCE_NAMES.Gold} 부족(${(faction.resources[ResourceType.GOLD] || 0)}/${totalGoldTransaction})으로 판매 실패.`, GameEventType.TRADE);
                 }
                return newState;
            }
            
            player.resources[resource] = (player.resources[resource] || 0) - amount;
            player.resources[ResourceType.GOLD] = (player.resources[ResourceType.GOLD] || 0) + totalGoldTransaction;
            
            faction.resources[resource] = (faction.resources[resource] || 0) + amount;
            faction.resources[ResourceType.GOLD] = (faction.resources[ResourceType.GOLD] || 0) - totalGoldTransaction;
             if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(`${KOREAN_RESOURCE_NAMES[resource]}`) && e.message.includes('판매') && e.turn === newState.turn))) {
                newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}에게 ${KOREAN_RESOURCE_NAMES[resource]} ${amount}개를 개당 ${pricePerUnit}${KOREAN_RESOURCE_NAMES.Gold} (총 ${totalGoldTransaction}${KOREAN_RESOURCE_NAMES.Gold})에 판매했습니다. (영토: ${territory.name})`, GameEventType.TRADE);
            }
            newState = updateFactionRelation(newState, targetFactionId, REL_CHANGE.TRADE_SUCCESSFUL, `${territory.name}에 ${KOREAN_RESOURCE_NAMES[resource]} 판매`);
            
            newState.acceptedMissions.forEach(mission => {
                if (mission.type === MissionType.DELIVER_RESOURCES &&
                    mission.offeringFactionId === targetFactionId && 
                    mission.targetTerritoryId === territoryId &&     
                    mission.targetResourceType === resource &&
                    mission.status === MissionStatus.ACCEPTED) {
                    
                    const amountContributed = Math.min(amount, (mission.requiredAmount || 0) - (mission.currentAmount || 0));
                    if (amountContributed > 0) {
                        mission.currentAmount = (mission.currentAmount || 0) + amountContributed;
                        newState = addEventToState(newState, `임무 "${KOREAN_MISSION_TYPE_NAMES[mission.type]}"(${KOREAN_FACTION_NAMES[mission.offeringFactionId]})에 ${KOREAN_RESOURCE_NAMES[resource]} ${amountContributed}개 공급 (${mission.currentAmount}/${mission.requiredAmount}).`, GameEventType.MISSION);
                    }
                }
            });
        }
        newState.factions[factionIdx] = faction; 

        const priceImpactResult = applyTradePriceImpact(
            localBasePrice,
            INITIAL_MARKET_STATE.initialBasePrices[resource]!,
            amount,
            tradeType,
            resource
        );
        if (priceImpactResult.newPrice !== priceImpactResult.oldPrice) {
            territory.localMarketPrices[resource] = priceImpactResult.newPrice;
            newState.territories[territoryIdx] = territory; 
            newState = addEventToState(newState, 
                `${territory.name}의 ${KOREAN_RESOURCE_NAMES[resource]} 시장 가격 변동: ${priceImpactResult.oldPrice.toFixed(2)} -> ${priceImpactResult.newPrice.toFixed(2)} ${RESOURCE_EMOJIS[ResourceType.GOLD]} (플레이어 교역 영향).`, 
                GameEventType.FINANCE
            );
            if (tradeType === 'BUY' && priceImpactResult.priceChangePercent > AI_REACTION_HOARD_THRESHOLD_PERCENT) {
                const newSignal: MarketSignal = {
                    resource,
                    territoryId,
                    priceSpikePercent: priceImpactResult.priceChangePercent,
                    turn: newState.turn,
                };
                newState.market.marketSignals.push(newSignal);
                if (newState.market.marketSignals.length > MAX_MARKET_SIGNALS) {
                    newState.market.marketSignals.shift();
                }
            }
        }
        return newState;
    }
    
    case 'PLAYER_SUPPLY_FACTION': { 
        const { targetFactionId, resource, amount, pricePerUnit } = action.payload; 
        const player = newState.player;
        const factionOriginal = newState.factions.find(f => f.id === targetFactionId);

        if (!factionOriginal || factionOriginal.id === FactionId.NEUTRAL || INITIAL_MARKET_STATE.initialBasePrices[resource] === undefined) return state;
        if (amount <=0 ) return state;
        
        const factionIdx = newState.factions.findIndex(f => f.id === targetFactionId);
        if (factionIdx === -1) return state;
        let faction = newState.factions[factionIdx];

        const relationshipScore = newState.player.factionRelations[targetFactionId] || 0;
        if (getRelationshipLevel(relationshipScore) === RelationshipLevel.HOSTILE) {
            if (!state.isDelegationActive) newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]} 세력과의 관계가 적대적이어서 물자를 공급할 수 없습니다.`, GameEventType.TRADE);
            return newState;
        }

        if ((player.resources[resource] || 0) < amount) {
             if (!state.isDelegationActive) newState = addEventToState(newState, `공급할 ${KOREAN_RESOURCE_NAMES[resource]} 재고 부족.`, GameEventType.TRADE);
            return newState;
        }
        
        const totalRevenue = pricePerUnit * amount; 
        if ((faction.resources[ResourceType.GOLD] || 0) < totalRevenue) {
             if (!state.isDelegationActive) newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}의 ${KOREAN_RESOURCE_NAMES.Gold} 부족으로 공급품 판매 실패.`, GameEventType.TRADE);
            return newState;
        }

        player.resources[resource] = (player.resources[resource] || 0) - amount;
        player.resources[ResourceType.GOLD] = (player.resources[ResourceType.GOLD] || 0) + totalRevenue;
        faction.resources[resource] = (faction.resources[resource] || 0) + amount;
        faction.resources[ResourceType.GOLD] = (faction.resources[ResourceType.GOLD] || 0) - totalRevenue;
        
        if (!state.isDelegationActive) {
            newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[faction.id]}에게 ${KOREAN_RESOURCE_NAMES[resource]} ${amount}개를 총 ${totalRevenue} ${KOREAN_RESOURCE_NAMES.Gold}에 공급했습니다.`, GameEventType.TRADE);
        }
        
        let relationChange = REL_CHANGE.SUPPLY_FACTION;
        if (newState.player.favoredFactionId === targetFactionId) {
            relationChange += REL_CHANGE.SUPPLY_FAVORED_FACTION;
        }
        newState = updateFactionRelation(newState, targetFactionId, relationChange, `${KOREAN_RESOURCE_NAMES[resource]} 공급`);
        newState.factions[factionIdx] = faction; 

        const factionTerritories = newState.territories.filter(t => t.ownerFactionId === targetFactionId);
        if (factionTerritories.length > 0) {
            const supplyImpactTerritoryIdx = newState.territories.findIndex(t => t.id === factionTerritories[0].id); 
            if (supplyImpactTerritoryIdx !== -1 && newState.territories[supplyImpactTerritoryIdx].localMarketPrices[resource] !== undefined) {
                const terrLocalPrice = newState.territories[supplyImpactTerritoryIdx].localMarketPrices[resource]!;
                const priceImpactResult = applyTradePriceImpact(
                    terrLocalPrice,
                    INITIAL_MARKET_STATE.initialBasePrices[resource]!,
                    amount,
                    'SELL', 
                    resource
                );
                if (priceImpactResult.newPrice !== priceImpactResult.oldPrice) {
                    newState.territories[supplyImpactTerritoryIdx].localMarketPrices[resource] = priceImpactResult.newPrice;
                    newState = addEventToState(newState, 
                        `${newState.territories[supplyImpactTerritoryIdx].name}의 ${KOREAN_RESOURCE_NAMES[resource]} 시장 가격 변동: ${priceImpactResult.oldPrice.toFixed(2)} -> ${priceImpactResult.newPrice.toFixed(2)} ${RESOURCE_EMOJIS[ResourceType.GOLD]} (플레이어 공급 영향).`, 
                        GameEventType.FINANCE
                    );
                }
            }
        }
        return newState;
    }

    case 'PLAYER_EXECUTE_FINANCIAL_TACTIC': {
      const { tactic, cost, targetTerritoryId, resourceType, targetMerchantId } = action.payload; 
      const player = newState.player;
      
      const actualCost = tactic === FinancialTacticType.SLANDER_MERCHANT ? SLANDER_MERCHANT_COST_GOLD : FINANCIAL_TACTIC_PLAYER_COST;

      if ((player.resources[ResourceType.GOLD] || 0) < actualCost) {
         if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(KOREAN_FINANCIAL_TACTIC_NAMES[tactic]) && e.turn === newState.turn))) {
            newState = addEventToState(newState, `금융 전술 실패: ${KOREAN_RESOURCE_NAMES.Gold} 부족.`, GameEventType.FINANCE);
         }
        return newState;
      }
      player.resources[ResourceType.GOLD] = (player.resources[ResourceType.GOLD] || 0) - actualCost;
      let tacticMessage = `당신은 ${KOREAN_FINANCIAL_TACTIC_NAMES[tactic]} 전술을 수행했습니다`;
      
      let affectedFactionId: FactionId | null = null;
      let targetTerritory: Territory | undefined = undefined;
      let targetTerritoryIdx = -1;

      if (targetTerritoryId) {
          targetTerritoryIdx = newState.territories.findIndex(t => t.id === targetTerritoryId);
          if (targetTerritoryIdx !== -1) {
              targetTerritory = newState.territories[targetTerritoryIdx];
              if (targetTerritory.ownerFactionId && targetTerritory.ownerFactionId !== FactionId.NEUTRAL) {
                  affectedFactionId = targetTerritory.ownerFactionId;
              }
          }
      }

      switch (tactic) {
        case FinancialTacticType.SPREAD_RUMORS:
        case FinancialTacticType.HOARD_RESOURCE:
          if (targetTerritory && resourceType && resourceType !== ResourceType.GOLD && targetTerritory.localMarketPrices[resourceType] !== undefined) {
            const oldPrice = targetTerritory.localMarketPrices[resourceType]!;
            const tradeTypeForImpact = tactic === FinancialTacticType.HOARD_RESOURCE ? 'BUY' : 'SELL'; 
            const amountForImpact = MARKET_DEPTH_FOR_PRICE_CHANGE * (tactic === FinancialTacticType.HOARD_RESOURCE ? 0.3 : 0.2);

            const priceImpactResult = applyTradePriceImpact(oldPrice, INITIAL_MARKET_STATE.initialBasePrices[resourceType]!, amountForImpact, tradeTypeForImpact, resourceType);
            targetTerritory.localMarketPrices[resourceType] = priceImpactResult.newPrice;
             newState.territories[targetTerritoryIdx] = targetTerritory; 
            tacticMessage += ` (${targetTerritory.name}의 ${KOREAN_RESOURCE_NAMES[resourceType]} 대상). 지역 시장 가격이 ${oldPrice.toFixed(2)}에서 ${targetTerritory.localMarketPrices[resourceType]!.toFixed(2)}(으)로 변경되었습니다.`;
            
            if (affectedFactionId) { 
                 const relChange = tactic === FinancialTacticType.HOARD_RESOURCE ? REL_CHANGE.FINANCIAL_TACTIC_HOARD_NEGATIVE : REL_CHANGE.FINANCIAL_TACTIC_RUMOR_NEGATIVE;
                 newState = updateFactionRelation(newState, affectedFactionId, -relChange, `${targetTerritory.name} ${KOREAN_RESOURCE_NAMES[resourceType]} 가격 조작`);
            }
          } else {
             tacticMessage += `, 그러나 유효한 자원 또는 AI 소유 영토가 대상이 아닙니다.`;
          }
          break;
        case FinancialTacticType.STIMULATE_ECONOMY: 
          if (targetTerritory && affectedFactionId) { 
            const factionIdxStim = newState.factions.findIndex(f => f.id === affectedFactionId);
            if(factionIdxStim === -1) break;
            let ownerFactionStim = newState.factions[factionIdxStim]; 
            
            (Object.keys(targetTerritory.baseProduction) as ResourceType[]).forEach(res => { 
                ownerFactionStim.resources[res] = (ownerFactionStim.resources[res] || 0) + Math.round((targetTerritory.baseProduction[res] || 0) * 0.3); 
            });
             newState.factions[factionIdxStim] = ownerFactionStim;
            tacticMessage += ` (${targetTerritory.name} 대상). ${KOREAN_FACTION_NAMES[ownerFactionStim.id]}의 지역 경제가 일시적으로 활성화되었습니다.`;
            newState = updateFactionRelation(newState, affectedFactionId, REL_CHANGE.FINANCIAL_TACTIC_STIMULATE_POSITIVE, `${targetTerritory.name} 경제 부양`);
          } else {
             tacticMessage += `, 그러나 유효한 AI 세력 영토를 찾지 못했습니다.`;
          }
          break;
        case FinancialTacticType.SABOTAGE_MARKET: 
          if (targetTerritory && affectedFactionId) { 
            const factionIdxSab = newState.factions.findIndex(f => f.id === affectedFactionId);
            if(factionIdxSab === -1) break;
            let targetFactionToUpdate = newState.factions[factionIdxSab];

            let lostGoldValue = 0; 
            (Object.values(ResourceType) as ResourceType[]).filter(r => r !== ResourceType.GOLD && INITIAL_MARKET_STATE.initialBasePrices[r] !== undefined).forEach(resType => {
                const amountToLose = Math.min((targetFactionToUpdate.resources[resType] || 0), Math.round((targetTerritory.baseProduction[resType] || 0) * 0.15 + (Math.random() * 50))); 
                targetFactionToUpdate.resources[resType] = Math.max(0, (targetFactionToUpdate.resources[resType] || 0) - amountToLose);
                lostGoldValue += amountToLose * ((targetTerritory.localMarketPrices[resType] || INITIAL_MARKET_STATE.initialBasePrices[resType]!) as number) * 0.1; 
            });
            newState.factions[factionIdxSab] = targetFactionToUpdate;
            tacticMessage += ` (${targetTerritory.name} 대상). ${KOREAN_FACTION_NAMES[targetFactionToUpdate.id]}의 경제에 혼란을 야기하여 약 ${Math.round(lostGoldValue)} ${KOREAN_RESOURCE_NAMES.Gold} 가치의 손실을 입혔습니다.`;
            newState = updateFactionRelation(newState, affectedFactionId, -REL_CHANGE.FINANCIAL_TACTIC_SABOTAGE_NEGATIVE, `${targetTerritory.name} 시장 교란`);
          } else {
            tacticMessage += `, 그러나 유효한 AI 세력 영토를 찾지 못했습니다.`;
          }
          break;
        case FinancialTacticType.SLANDER_MERCHANT:
            if (targetMerchantId) {
                const merchantIdx = newState.aiMerchants.findIndex(m => m.id === targetMerchantId);
                if (merchantIdx !== -1) {
                    const slanderEffect: SlanderEffect = {
                        byMerchantId: 'PLAYER',
                        remainingTurns: SLANDER_EFFECT_DURATION_TURNS,
                        pricePenaltyPercent: SLANDER_PRICE_PENALTY_PERCENT,
                    };
                    const existingSlander = newState.aiMerchants[merchantIdx].slanderEffects.find(eff => eff.byMerchantId === 'PLAYER');
                    if (!existingSlander) {
                         newState.aiMerchants[merchantIdx].slanderEffects.push(slanderEffect);
                         tacticMessage += ` (${newState.aiMerchants[merchantIdx].name} 대상). 해당 상인의 평판에 흠집을 냈습니다.`;
                         if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(KOREAN_FINANCIAL_TACTIC_NAMES[tactic]) && e.turn === newState.turn))) { 
                             newState = addEventToState(newState, tacticMessage, GameEventType.SLANDER);
                         }
                    } else {
                        tacticMessage += ` (${newState.aiMerchants[merchantIdx].name} 대상). 이미 당신의 비방이 진행 중입니다.`;
                         if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(KOREAN_FINANCIAL_TACTIC_NAMES[tactic]) && e.turn === newState.turn))) {
                            newState = addEventToState(newState, tacticMessage, GameEventType.FINANCE); 
                         }
                         player.resources[ResourceType.GOLD] = (player.resources[ResourceType.GOLD] || 0) + actualCost; 
                    }
                } else {
                    tacticMessage += `, 그러나 대상 상인을 찾지 못했습니다.`;
                    player.resources[ResourceType.GOLD] = (player.resources[ResourceType.GOLD] || 0) + actualCost; 
                    if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(KOREAN_FINANCIAL_TACTIC_NAMES[tactic]) && e.turn === newState.turn))) {
                        newState = addEventToState(newState, tacticMessage, GameEventType.FINANCE);
                    }
                }
            } else {
                tacticMessage += `, 그러나 비방할 대상 상인이 선택되지 않았습니다.`;
                player.resources[ResourceType.GOLD] = (player.resources[ResourceType.GOLD] || 0) + actualCost; 
                 if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(KOREAN_FINANCIAL_TACTIC_NAMES[tactic]) && e.turn === newState.turn))) {
                    newState = addEventToState(newState, tacticMessage, GameEventType.FINANCE);
                }
            }
            return newState; 
      }
       if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임]`) && e.message.includes(KOREAN_FINANCIAL_TACTIC_NAMES[tactic]) && e.turn === newState.turn))) {
         newState = addEventToState(newState, tacticMessage, GameEventType.FINANCE);
      }
      return newState;
    }
    
    case 'PLAYER_ESTABLISH_INFLUENCE': {
        const { territoryId } = action.payload;
        const territory = newState.territories.find(t => t.id === territoryId);
        if (!territory || !territory.ownerFactionId || territory.ownerFactionId === FactionId.NEUTRAL) return newState;
        
        const ownerFactionId = territory.ownerFactionId;
        const relationshipScore = newState.player.factionRelations[ownerFactionId] || 0;
        if (getRelationshipLevel(relationshipScore) === RelationshipLevel.HOSTILE) {
            newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[ownerFactionId]} 세력과의 관계가 적대적이어서 ${territory.name}에 영향력을 구축할 수 없습니다.`, GameEventType.ESPIONAGE);
            return newState;
        }
        let cost = INFLUENCE_ESTABLISH_COST_GOLD;
        if(territory.specialBuilding?.type === SpecializedBuildingType.MARKET_HALL && territory.specialBuilding.fundedByPlayer){
            cost = Math.floor(cost * (1 - SPECIAL_BUILDING_MARKET_HALL_INFLUENCE_COST_REDUCTION));
        }

        if ((newState.player.resources[ResourceType.GOLD] || 0) >= cost) {
            newState.player.resources[ResourceType.GOLD] = (newState.player.resources[ResourceType.GOLD] || 0) - cost;
            newState.player.influence[territoryId] = 1;
            newState = addEventToState(newState, `${territory.name}에 영향력 기반을 구축했습니다 (레벨 1). 비용: ${cost} ${KOREAN_RESOURCE_NAMES.Gold}.`, GameEventType.ESPIONAGE);
        } else {
            newState = addEventToState(newState, `${territory.name} 영향력 기반 구축 실패: ${KOREAN_RESOURCE_NAMES.Gold} 부족.`, GameEventType.ESPIONAGE);
        }
        return newState;
    }

    case 'PLAYER_UPGRADE_INFLUENCE': {
        const { territoryId } = action.payload;
        const territory = newState.territories.find(t => t.id === territoryId);
        if (!territory || !territory.ownerFactionId || territory.ownerFactionId === FactionId.NEUTRAL) return newState;

        const ownerFactionId = territory.ownerFactionId;
        const relationshipScore = newState.player.factionRelations[ownerFactionId] || 0;
        if (getRelationshipLevel(relationshipScore) === RelationshipLevel.HOSTILE) {
            newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[ownerFactionId]} 세력과 적대적이어서 ${territory.name}의 영향력을 확대할 수 없습니다.`, GameEventType.ESPIONAGE);
            return newState;
        }

        const currentLevel = newState.player.influence[territoryId] || 0;
        if (currentLevel >= MAX_INFLUENCE_LEVEL) return newState;

        let cost = INFLUENCE_UPGRADE_COST_GOLD_PER_LEVEL[currentLevel + 1];
        if (territory.specialBuilding?.type === SpecializedBuildingType.MARKET_HALL && territory.specialBuilding.fundedByPlayer) {
            cost = Math.floor(cost * (1 - SPECIAL_BUILDING_MARKET_HALL_INFLUENCE_COST_REDUCTION));
        }

        if (cost && (newState.player.resources[ResourceType.GOLD] || 0) >= cost) {
            newState.player.resources[ResourceType.GOLD] = (newState.player.resources[ResourceType.GOLD] || 0) - cost;
            newState.player.influence[territoryId] = currentLevel + 1;
            newState = addEventToState(newState, `${territory.name}의 영향력을 레벨 ${currentLevel + 1}(으)로 확대했습니다. 비용: ${cost} ${KOREAN_RESOURCE_NAMES.Gold}.`, GameEventType.ESPIONAGE);
        } else {
            newState = addEventToState(newState, `${territory.name} 영향력 확대 실패: ${KOREAN_RESOURCE_NAMES.Gold} 부족 또는 최대 레벨 도달.`, GameEventType.ESPIONAGE);
        }
        return newState;
    }

    case 'PLAYER_FUND_SPECIALIZED_BUILDING': {
        const { territoryId, buildingType, cost } = action.payload;
        const terrIdx = newState.territories.findIndex(t => t.id === territoryId);
        if (terrIdx === -1) return newState;

        let territory = newState.territories[terrIdx];
        if (territory.specialBuilding) {
            if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원`) && e.turn === newState.turn))) {
                 newState = addEventToState(newState, `${territory.name}에는 이미 특화 건물이 존재합니다.`, GameEventType.CONSTRUCTION);
            }
            return newState;
        }
        
        const ownerFactionId = territory.ownerFactionId;
        if (!ownerFactionId || ownerFactionId === FactionId.NEUTRAL) {
             if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원`) && e.turn === newState.turn))) {
                 newState = addEventToState(newState, `중립 영토에는 특화 건물을 건설할 수 없습니다.`, GameEventType.CONSTRUCTION);
             }
            return newState;
        }
        if (getRelationshipLevel(newState.player.factionRelations[ownerFactionId] || 0) === RelationshipLevel.HOSTILE) {
             if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원`) && e.turn === newState.turn))) {
                 newState = addEventToState(newState, `${KOREAN_FACTION_NAMES[ownerFactionId]}와 적대적이어서 ${territory.name}에 건물 지원 불가.`, GameEventType.CONSTRUCTION);
             }
            return newState;
        }

        let canAfford = true;
        for (const resKey in cost) {
            if ((newState.player.resources[resKey as ResourceType] || 0) < (cost[resKey as ResourceType] || 0) ) {
                canAfford = false; break;
            }
        }
        if (!canAfford) {
            if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원`) && e.turn === newState.turn))) {
                 newState = addEventToState(newState, `${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원 실패: 자원 부족.`, GameEventType.CONSTRUCTION);
            }
            return newState;
        }

        for (const resKey in cost) {
             newState.player.resources[resKey as ResourceType] = (newState.player.resources[resKey as ResourceType] || 0) - (cost[resKey as ResourceType] || 0);
        }
        
        territory.specialBuilding = { type: buildingType, fundedByPlayer: true };
        newState.territories[terrIdx] = territory; 
        newState = updateFactionRelation(newState, ownerFactionId, REL_CHANGE.FUND_SPECIAL_BUILDING, `${territory.name} ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원`);
         if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] ${territory.name}에 ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설 지원`) && e.turn === newState.turn))) {
            newState = addEventToState(newState, `플레이어가 ${territory.name}에 ${KOREAN_SPECIALIZED_BUILDING_NAMES[buildingType]} 건설을 지원했습니다!`, GameEventType.CONSTRUCTION);
        }
        return newState;
    }

    case 'PLAYER_FUND_FACTION_POLICY': {
        const { policyId, amount } = action.payload;
        const policyIdx = newState.activeFactionPolicies.findIndex(p => p.id === policyId);
        if (policyIdx === -1) return newState;

        if ((newState.player.resources[ResourceType.GOLD] || 0) < amount) {
            if (!state.isDelegationActive) newState = addEventToState(newState, `정책 자금 지원 실패: ${KOREAN_RESOURCE_NAMES.Gold} 부족.`, GameEventType.POLICY);
            return newState;
        }
        newState.player.resources[ResourceType.GOLD] = (newState.player.resources[ResourceType.GOLD] || 0) - amount;
        
        let policyToUpdate = newState.activeFactionPolicies[policyIdx];
        policyToUpdate.currentFunding += amount;
        policyToUpdate.playerContribution += amount;
        
        const policyFactionName = KOREAN_FACTION_NAMES[policyToUpdate.factionId];
        const policyTypeName = KOREAN_FACTION_POLICY_NAMES[policyToUpdate.type];
        
        if (!state.isDelegationActive) {
            newState = addEventToState(newState, `${policyFactionName}의 '${policyTypeName}' 정책에 ${amount}${RESOURCE_EMOJIS.Gold} 지원. (총 모금액: ${policyToUpdate.currentFunding}/${policyToUpdate.fundingGoal})`, GameEventType.POLICY);
        }
        newState.activeFactionPolicies[policyIdx] = policyToUpdate;
        return newState;
    }
    case 'PLAYER_CONTRIBUTE_WAR_FUNDS': {
        const { warId, supportedFactionId, amount } = action.payload;
        const warIdx = newState.activeWars.findIndex(w => w.id === warId && w.isActive);
        if (warIdx === -1) return newState;

        if ((newState.player.resources[ResourceType.GOLD] || 0) < amount) {
            if (!state.isDelegationActive) newState = addEventToState(newState, `전쟁 자금 지원 실패: ${KOREAN_RESOURCE_NAMES.Gold} 부족.`, GameEventType.WAR_EVENT);
            return newState;
        }
        newState.player.resources[ResourceType.GOLD] = (newState.player.resources[ResourceType.GOLD] || 0) - amount;

        let warToUpdate = newState.activeWars[warIdx];
        warToUpdate.playerContributions[supportedFactionId] = (warToUpdate.playerContributions[supportedFactionId] || 0) + amount;
        
        const supportedFactionName = KOREAN_FACTION_NAMES[supportedFactionId];
        if (!state.isDelegationActive) {
            newState = addEventToState(newState, `${supportedFactionName}에 전쟁 자금 ${amount}${RESOURCE_EMOJIS.Gold} 지원.`, GameEventType.WAR_EVENT);
        }
        newState = updateFactionRelation(newState, supportedFactionId, REL_CHANGE.CONTRIBUTE_WAR_FUNDS, `${supportedFactionName} 전쟁 자금 지원`);
        newState.activeWars[warIdx] = warToUpdate;
        return newState;
    }

    case 'OPEN_ESPIONAGE_MODAL':
      return { ...state, selectedEspionageTargetTerritoryId: action.payload };
    case 'CLOSE_ESPIONAGE_MODAL':
      return { ...state, selectedEspionageTargetTerritoryId: null };

    case 'PLAYER_EXECUTE_ESPIONAGE_ACTION': {
        const { territoryId, actionType } = action.payload;
        const territory = newState.territories.find(t => t.id === territoryId);
        if (!territory || !territory.ownerFactionId || territory.ownerFactionId === FactionId.NEUTRAL) return newState;

        const config = ESPIONAGE_ACTION_CONFIGS[actionType];
        if ((newState.player.influence[territoryId] || 0) < config.minInfluenceLevel) {
            if (!state.isDelegationActive) newState = addEventToState(newState, `첩보 활동 실패: 영향력 부족.`, GameEventType.ESPIONAGE);
            return newState;
        }

        let canAfford = true;
        for (const resKey in config.cost) {
            const resource = resKey as ResourceType;
            if ((newState.player.resources[resource] || 0) < (config.cost[resource] || 0)) {
                canAfford = false; break;
            }
        }
        if (!canAfford) {
            if (!state.isDelegationActive) newState = addEventToState(newState, `첩보 활동 실패: 비용 부족.`, GameEventType.ESPIONAGE);
            return newState;
        }

        for (const resKey in config.cost) {
            const resource = resKey as ResourceType;
            newState.player.resources[resource] = (newState.player.resources[resource] || 0) - (config.cost[resource] || 0);
        }
        
        let actionMessage = `당신은 ${territory.name}에 ${KOREAN_ESPIONAGE_ACTION_NAMES[actionType]} 첩보 활동을 수행했습니다.`;
        const ownerFactionId = territory.ownerFactionId;
        const detectionChance = getEspionageDetectionChance(newState, ownerFactionId);
        const detected = Math.random() < detectionChance;

        switch(actionType) {
            case EspionageActionType.ASSESS_ECONOMY:
                const ownerFactionData = newState.factions.find(f => f.id === ownerFactionId)!;
                const foodInfo = ownerFactionData.resources[ResourceType.FOOD] || 0;
                const ironInfo = ownerFactionData.resources[ResourceType.IRON] || 0;
                actionMessage += ` 결과: ${territory.name}의 기본 생산량 - 식량 ${territory.baseProduction[ResourceType.FOOD] || 0}, 철 ${territory.baseProduction[ResourceType.IRON] || 0}. ${KOREAN_FACTION_NAMES[ownerFactionId]} 보유 자원 - 식량 ${foodInfo}, 철 ${ironInfo}.`;
                if (detected) {
                    actionMessage += ` (발각됨!)`;
                    newState = updateFactionRelation(newState, ownerFactionId, -REL_CHANGE.ESPIONAGE_ASSESS_ECONOMY_DETECTED, `${territory.name} 경제 상황 평가 발각`);
                }
                break;
            case EspionageActionType.INCITE_UNREST:
                const factionIdx = newState.factions.findIndex(f => f.id === ownerFactionId);
                if (factionIdx !== -1) {
                    let targetFaction = newState.factions[factionIdx];
                    const foodLoss = Math.min(INCITE_UNREST_RESOURCE_LOSS_FOOD, (targetFaction.resources[ResourceType.FOOD] || 0));
                    const ironLoss = Math.min(INCITE_UNREST_RESOURCE_LOSS_IRON, (targetFaction.resources[ResourceType.IRON] || 0));
                    targetFaction.resources[ResourceType.FOOD] = (targetFaction.resources[ResourceType.FOOD] || 0) - foodLoss;
                    targetFaction.resources[ResourceType.IRON] = (targetFaction.resources[ResourceType.IRON] || 0) - ironLoss;
                    newState.factions[factionIdx] = targetFaction;
                    actionMessage += ` ${territory.name}에 불안을 선동하여 ${KOREAN_FACTION_NAMES[ownerFactionId]}에게 식량 ${foodLoss}, 철 ${ironLoss} 손실을 입혔습니다.`;
                    
                    if (detected) {
                        actionMessage += ` (발각됨!)`;
                        newState = updateFactionRelation(newState, ownerFactionId, -(REL_CHANGE.ESPIONAGE_INCITE_UNREST_SUCCESS + REL_CHANGE.ESPIONAGE_INCITE_UNREST_DETECTED_BONUS), `${territory.name} 불안 선동 발각`);
                    } else {
                        newState = updateFactionRelation(newState, ownerFactionId, -REL_CHANGE.ESPIONAGE_INCITE_UNREST_SUCCESS, `${territory.name} 불안 선동 성공 (비밀리에)`);
                    }
                }
                break;
        }
        if (!state.isDelegationActive) {
            newState = addEventToState(newState, actionMessage, GameEventType.ESPIONAGE);
        }
        newState.selectedEspionageTargetTerritoryId = null; 
        return newState;
    }
    
    case 'ACCEPT_MISSION': {
        const missionIdx = newState.availableMissions.findIndex(m => m.id === action.payload.missionId);
        if (missionIdx === -1) return newState;

        const missionToAccept = newState.availableMissions.splice(missionIdx, 1)[0];
        missionToAccept.status = MissionStatus.ACCEPTED;
        missionToAccept.remainingTurns = missionToAccept.timeLimitTurns; 
        newState.acceptedMissions.push(missionToAccept);
        if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] 임무 "${KOREAN_MISSION_TYPE_NAMES[missionToAccept.type]}"`) && e.turn === newState.turn))) {
            newState = addEventToState(newState, `임무 "${KOREAN_MISSION_TYPE_NAMES[missionToAccept.type]}" (${KOREAN_FACTION_NAMES[missionToAccept.offeringFactionId]}) 수락.`, GameEventType.MISSION);
        }
        return newState;
    }
    case 'ABANDON_MISSION': {
        const missionIdx = newState.acceptedMissions.findIndex(m => m.id === action.payload.missionId);
        if (missionIdx === -1) return newState;

        const missionToAbandon = newState.acceptedMissions.splice(missionIdx, 1)[0];
        newState = updateFactionRelation(newState, missionToAbandon.offeringFactionId, REL_CHANGE.MISSION_FAILURE, `${KOREAN_MISSION_TYPE_NAMES[missionToAbandon.type]} 임무 포기`);
        newState = addEventToState(newState, `임무 "${KOREAN_MISSION_TYPE_NAMES[missionToAbandon.type]}" (${KOREAN_FACTION_NAMES[missionToAbandon.offeringFactionId]}) 포기.`, GameEventType.MISSION);
        return newState;
    }

    case 'PLAYER_CONTRIBUTE_TO_MISSION': {
        const { missionId, resourceType, amount } = action.payload;
        const missionIdx = newState.acceptedMissions.findIndex(m => m.id === missionId);
        if (missionIdx === -1) return newState;

        let mission = newState.acceptedMissions[missionIdx];
        if (mission.status !== MissionStatus.ACCEPTED) return newState;

        if (mission.type === MissionType.DELIVER_RESOURCES && resourceType && amount && amount > 0) {
            if ((newState.player.resources[resourceType] || 0) < amount) {
                if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] 임무 "${KOREAN_MISSION_TYPE_NAMES[mission.type]}"에 ${KOREAN_RESOURCE_NAMES[resourceType]}`) && e.turn === newState.turn))) {
                     newState = addEventToState(newState, `${KOREAN_RESOURCE_NAMES[resourceType]} 부족으로 임무 기여 실패.`, GameEventType.MISSION);
                }
                return newState;
            }
            newState.player.resources[resourceType] = (newState.player.resources[resourceType] || 0) - amount;
            mission.currentAmount = (mission.currentAmount || 0) + amount;
            if (!state.isDelegationActive || (state.isDelegationActive && !newState.events.some(e => e.message.includes(`[자동 위임] 임무 "${KOREAN_MISSION_TYPE_NAMES[mission.type]}"에 ${KOREAN_RESOURCE_NAMES[resourceType]}`) && e.turn === newState.turn))) {
                 newState = addEventToState(newState, `임무 "${KOREAN_MISSION_TYPE_NAMES[mission.type]}"(${KOREAN_FACTION_NAMES[mission.offeringFactionId]})에 ${KOREAN_RESOURCE_NAMES[resourceType]} ${amount}개 기여 (${mission.currentAmount}/${mission.requiredAmount}).`, GameEventType.MISSION);
            }
        }
        
        newState.acceptedMissions[missionIdx] = mission;
        return newState;
    }

    case 'FACTION_INVEST_TERRITORY': {
        const { territoryId, amount: investAmount, factionId } = action.payload;
        const terrIdx = newState.territories.findIndex(t => t.id === territoryId);
        const factionIdx = newState.factions.findIndex(f => f.id === factionId);

        if (terrIdx !== -1 && factionIdx !== -1 && newState.factions[factionIdx].id !== FactionId.NEUTRAL) {
            if ((newState.factions[factionIdx].resources[ResourceType.GOLD] || 0) >= investAmount && newState.territories[terrIdx].developmentLevel < MAX_DEVELOPMENT_LEVEL) {
                newState.factions[factionIdx].resources[ResourceType.GOLD] = (newState.factions[factionIdx].resources[ResourceType.GOLD] || 0) - investAmount;
                newState.territories[terrIdx].developmentLevel += 1;
            }
        }
        return newState;
    }
    case 'FACTION_RECRUIT_UNITS': {
        const { territoryId, units, factionId } = action.payload;
        const terrIdx = newState.territories.findIndex(t => t.id === territoryId);
        const factionIdx = newState.factions.findIndex(f => f.id === factionId);

        if (terrIdx !== -1 && factionIdx !== -1 && newState.factions[factionIdx].id !== FactionId.NEUTRAL) {
            for (const unitType in units) {
                newState.territories[terrIdx].garrison[unitType as keyof ArmyUnits] = (newState.territories[terrIdx].garrison[unitType as keyof ArmyUnits] || 0) + (units[unitType as keyof ArmyUnits] || 0);
            }
        }
        return newState;
    }
     case 'LOAD_GAME_STATE':
            return action.payload; 

    default:
      return state;
  }
};
export const processTurn = (state: GameState): GameState => {
  let newState = JSON.parse(JSON.stringify(state)) as GameState;
  newState.turn += 1;
  newState = addEventToState(newState, `제 ${newState.turn}턴 시작.`, GameEventType.SYSTEM);

  newState = expireEconomicEvents(newState);       
  newState = generateDynamicEconomicEvents(newState); 
  newState = expireSlanderEffects(newState);
  newState = expirePlayerTradeAdvantages(newState);
  newState = clearOldMarketSignals(newState);

  newState = collectFactionResources(newState); 
  newState = updateMarketPrices(newState); // Changed from updateMarket
  
  newState = processFactionPolicyInitiation(newState);
  newState = processActiveFactionPolicies(newState);
  newState = processFactionWarDeclarations(newState);

  newState = processAIActions(newState); 
  newState = processAIMerchantActions(newState); 
  
  newState = generateFactionMissions(newState); 
  newState = processAcceptedMissions(newState); 
  
  const currentPlayerWealth = calculateEntityWealth(newState.player.resources, newState.market);
  newState.player.totalWealthHistory.push({ turn: newState.turn, wealth: currentPlayerWealth });

  newState = updatePlayerMerchantStandingIfNeeded(newState);
  newState = checkGameOver(newState);

  return newState;
};

