

import { ResourceType, FactionId, Territory, Faction, MarketState, GameState, AutomationStrategy, ControlTab, ArmyUnits, Resources, FinancialTacticType, PlayerState, EspionageActionType, RelationshipLevel, MerchantStandingLevel, EconomicEventType, EconomicEvent, Mission, MissionType, MissionStatus, GameEventType, AIMerchant, AIMerchantPersonality, MarketSignal, TemporaryMisinformation, SpecializedBuildingType, FactionPolicyType, TerritorySpecialBuilding, ActiveFactionPolicy, ActiveWar, TemporaryTradeAdvantage, PriceHistoryEntry } from './types';
import { generateId } from './services/gameService'; // Import generateId

export const KOREAN_RESOURCE_NAMES: Record<ResourceType, string> = {
  [ResourceType.GOLD]: '금',
  [ResourceType.FOOD]: '식량',
  [ResourceType.IRON]: '철',
  [ResourceType.SILK]: '비단',
  [ResourceType.HERBS]: '약재',
  [ResourceType.TEA]: '차',
};

export const KOREAN_UNIT_NAMES: Record<keyof ArmyUnits, string> = {
  infantry: '보병',
  cavalry: '기병',
  archers: '궁수',
};

export const KOREAN_FACTION_NAMES: Record<FactionId, string> = {
  [FactionId.SHU]: '유비',
  [FactionId.WEI]: '조조',
  [FactionId.WU]: '손권',
  [FactionId.NEUTRAL]: '중립',
  [FactionId.YUAN_SHAO]: '원소',
  [FactionId.GONGSUN_ZAN]: '공손찬',
  [FactionId.MA_TENG]: '마등',
  [FactionId.LIU_BIAO]: '유표',
  [FactionId.YUAN_SHU]: '원술',
};


export const KOREAN_FINANCIAL_TACTIC_NAMES: Record<FinancialTacticType, string> = {
  [FinancialTacticType.SPREAD_RUMORS]: '소문 퍼뜨리기 (시장 조작)',
  [FinancialTacticType.HOARD_RESOURCE]: '자원 사재기 (가격 인상 유도)',
  [FinancialTacticType.SABOTAGE_MARKET]: '적대 세력 시장 교란',
  [FinancialTacticType.STIMULATE_ECONOMY]: '지역 경제 부양 (투자 효과 증진)',
  [FinancialTacticType.SLANDER_MERCHANT]: '경쟁 상인 비방',
};

export const KOREAN_ESPIONAGE_ACTION_NAMES: Record<EspionageActionType, string> = {
  [EspionageActionType.ASSESS_ECONOMY]: '경제 상황 평가',
  [EspionageActionType.INCITE_UNREST]: '불안 선동',
};

export const KOREAN_AUTOMATION_STRATEGY_NAMES: Record<AutomationStrategy, string> = { 
  BalancedGrowth: '균형 성장',
  AggressiveExpansion: '공격적 확장',
  EconomicDominance: '경제적 지배',
  FortifyDefenses: '방어 강화',
};

export const KOREAN_RELATIONSHIP_LEVEL_NAMES: Record<RelationshipLevel, string> = {
  [RelationshipLevel.HOSTILE]: '적대적',
  [RelationshipLevel.UNFRIENDLY]: '비우호적',
  [RelationshipLevel.NEUTRAL]: '중립적',
  [RelationshipLevel.FRIENDLY]: '우호적',
  [RelationshipLevel.ALLIED]: '동맹적',
};

export const KOREAN_MERCHANT_STANDING_NAMES: Record<MerchantStandingLevel, string> = {
  [MerchantStandingLevel.OBSCURE]: '무명 상인',
  [MerchantStandingLevel.KNOWN]: '알려진 상인',
  [MerchantStandingLevel.INFLUENTIAL]: '유력 호상',
  [MerchantStandingLevel.POWERBROKER]: '금융 거두',
  [MerchantStandingLevel.SHADOW_TYCOON]: '그림자 실세',
};

export const KOREAN_ECONOMIC_EVENT_NAMES: Record<EconomicEventType, string> = {
  [EconomicEventType.RESOURCE_BOOM]: "자원 풍년",
  [EconomicEventType.LOCAL_DROUGHT]: "지역 가뭄",
  [EconomicEventType.TRADE_FAIR]: "교역 박람회",
  [EconomicEventType.BANDIT_ACTIVITY]: "도적 창궐",
  [EconomicEventType.GOOD_HARVEST_REGIONAL]: "지역적 대풍년",
  [EconomicEventType.PLAGUE_OUTBREAK]: "역병 발생",
};

export const KOREAN_MISSION_TYPE_NAMES: Record<MissionType, string> = {
  [MissionType.DELIVER_RESOURCES]: "자원 조달",
  [MissionType.INVEST_TERRITORY]: "영토 투자 지원",
  [MissionType.ESPIONAGE_ASSESS_ECONOMY]: "경제 정보 수집 요청",
  [MissionType.ESPIONAGE_INCITE_UNREST]: "불안 선동 공작 요청",
};

export const KOREAN_MISSION_STATUS_NAMES: Record<MissionStatus, string> = {
  [MissionStatus.AVAILABLE]: "수락 가능",
  [MissionStatus.ACCEPTED]: "진행 중",
  [MissionStatus.COMPLETED]: "완료됨",
  [MissionStatus.FAILED]: "실패함",
  [MissionStatus.EXPIRED]: "기간 만료",
};

export const KOREAN_AI_MERCHANT_PERSONALITY_NAMES: Record<AIMerchantPersonality, string> = {
  [AIMerchantPersonality.AGGRESSIVE_TRADER]: '공격적 교역가',
  [AIMerchantPersonality.CAUTIOUS_INVESTOR]: '신중한 투자가',
  [AIMerchantPersonality.BALANCED_OPPORTUNIST]: '균형적 기회주의자',
};

export const KOREAN_GAME_EVENT_TYPE_NAMES: Record<GameEventType, string> = {
    [GameEventType.INFO]: "정보",
    [GameEventType.BATTLE]: "전투",
    [GameEventType.FINANCE]: "재정",
    [GameEventType.SYSTEM]: "시스템",
    [GameEventType.TRADE]: "교역",
    [GameEventType.POLITICS]: "정치",
    [GameEventType.ESPIONAGE]: "첩보",
    [GameEventType.RELATIONSHIP]: "관계",
    [GameEventType.ECONOMIC]: "경제",
    [GameEventType.MISSION]: "임무",
    [GameEventType.AI_MERCHANT_ACTION]: "AI 상인 활동",
    [GameEventType.SLANDER]: "비방",
    [GameEventType.CONSTRUCTION]: "건설",
    [GameEventType.POLICY]: "정책",
    [GameEventType.WAR_EVENT]: "전쟁",
};


export const KOREAN_SPECIALIZED_BUILDING_NAMES: Record<SpecializedBuildingType, string> = {
  [SpecializedBuildingType.MARKET_HALL]: '시장 회관',
  [SpecializedBuildingType.TRADE_DEPOT]: '교역 창고',
  [SpecializedBuildingType.ADVANCED_FARM]: '개량 농지',
  [SpecializedBuildingType.ENHANCED_MINE]: '제련소',
  [SpecializedBuildingType.SILK_WORKSHOP]: '비단 공방',
};

export interface SpecializedBuildingConfig {
  cost: Resources;
  description: string;
  effectDescription: string;
  requiresBaseProduction?: ResourceType; // e.g., Mine requires Iron base production
  // Effects are handled in gameService
}

export const SPECIALIZED_BUILDING_CONFIGS: Record<SpecializedBuildingType, SpecializedBuildingConfig> = {
  [SpecializedBuildingType.MARKET_HALL]: {
    cost: { [ResourceType.GOLD]: 500, [ResourceType.FOOD]: 100, [ResourceType.IRON]: 0, [ResourceType.SILK]: 0 },
    description: '지역 시장을 활성화하고 행정 효율을 높입니다.',
    effectDescription: '영토 기본 생산량 +5% (식량, 비단, 약재, 차), 플레이어 영향력 비용 -10%.',
  },
  [SpecializedBuildingType.TRADE_DEPOT]: {
    cost: { [ResourceType.GOLD]: 700, [ResourceType.FOOD]: 0, [ResourceType.IRON]: 50, [ResourceType.SILK]: 0 },
    description: '대규모 교역을 위한 창고 및 물류 시설입니다.',
    effectDescription: '플레이어의 해당 영토 교역 시 구매/판매 가격 +3% 추가 개선.',
  },
  [SpecializedBuildingType.ADVANCED_FARM]: {
    cost: { [ResourceType.GOLD]: 400, [ResourceType.FOOD]: 0, [ResourceType.IRON]: 20, [ResourceType.SILK]: 0 },
    description: '농업 기술을 도입하여 식량 생산을 증대시킵니다.',
    effectDescription: '영토 기본 식량 생산 +25.',
    requiresBaseProduction: ResourceType.FOOD,
  },
  [SpecializedBuildingType.ENHANCED_MINE]: {
    cost: { [ResourceType.GOLD]: 600, [ResourceType.FOOD]: 30, [ResourceType.IRON]: 0, [ResourceType.SILK]: 0 },
    description: '채광 및 제련 기술을 향상시켜 철 생산을 증대시킵니다.',
    effectDescription: '영토 기본 철 생산 +15.',
    requiresBaseProduction: ResourceType.IRON,
  },
  [SpecializedBuildingType.SILK_WORKSHOP]: {
    cost: { [ResourceType.GOLD]: 450, [ResourceType.FOOD]: 20, [ResourceType.IRON]: 0, [ResourceType.SILK]: 0 },
    description: '비단 생산을 위한 전문 공방입니다.',
    effectDescription: '영토 기본 비단 생산 +20.',
    requiresBaseProduction: ResourceType.SILK,
  },
};

export const KOREAN_FACTION_POLICY_NAMES: Record<FactionPolicyType, string> = {
  [FactionPolicyType.AGRICULTURAL_BOOST]: '중농 장려책',
  [FactionPolicyType.COMMERCIAL_FAIR_ORGANIZATION]: '상업 박람회 개최',
  [FactionPolicyType.CAPITAL_WALL_REINFORCEMENT]: '수도 성벽 증축',
};

export interface FactionPolicyConfig {
  durationTurns: number;
  baseFundingGoal: number;
  description: string;
  playerBonusDescription?: string; // Bonus for significant contribution
  // Effects are handled in gameService
}

export const FACTION_POLICY_CONFIGS: Record<FactionPolicyType, FactionPolicyConfig> = {
  [FactionPolicyType.AGRICULTURAL_BOOST]: {
    durationTurns: 5,
    baseFundingGoal: 1000,
    description: '기간 동안 세력 전체의 식량 생산량을 증대시킵니다.',
    playerBonusDescription: '상당량 지원 시: 추가 관계도 향상 및 약간의 식량 보너스.',
  },
  [FactionPolicyType.COMMERCIAL_FAIR_ORGANIZATION]: {
    durationTurns: 3,
    baseFundingGoal: 800,
    description: '기간 동안 세력 영토 내 교역을 활성화하고, 플레이어에게 교역 이점을 제공합니다.',
    playerBonusDescription: '상당량 지원 시: 추가 관계도 및 교역 이점 강화.',
  },
  [FactionPolicyType.CAPITAL_WALL_REINFORCEMENT]: {
    durationTurns: 10, // Longer project
    baseFundingGoal: 2000,
    description: '세력 수도의 방어력을 강화합니다.',
    playerBonusDescription: '상당량 지원 시: 큰 폭의 관계도 향상 및 해당 세력으로부터 감사 선물(금).',
  },
};
export const POLICY_PLAYER_CONTRIBUTION_THRESHOLD_PERCENT = 0.25; // Player needs to contribute at least 25% of goal for "significant" bonus
export const WAR_FUNDING_SPOILS_GOLD_FACTOR = 0.2; // Player gets 20% of their contribution back as gold if supported side wins territory
export const WAR_FUNDING_SPOILS_RESOURCES_VALUE_FACTOR = 0.1; // Player gets resources valued at 10% of their contribution
export const WAR_FUNDING_TRADE_ADVANTAGE_TURNS = 5; // Duration of trade advantage in captured territory
export const FACTION_POLICY_INITIATION_CHANCE = 0.05; // Chance per faction per turn to initiate a policy
export const FACTION_WAR_DECLARATION_CHANCE = 0.02; // Chance per aggressive/balanced faction to declare war if conditions met


export interface EconomicEventDefinition {
  type: EconomicEventType;
  probability: number; 
  minDuration: number;
  maxDuration: number;
  minMagnitude?: number; 
  maxMagnitude?: number; 
  possibleTargetResourceTypes?: ResourceType[]; 
  canTargetPlayer?: boolean; 
  isGlobal?: boolean; 
}

export const ECONOMIC_EVENT_DEFINITIONS: EconomicEventDefinition[] = [
  { type: EconomicEventType.RESOURCE_BOOM, probability: 0.03, minDuration: 3, maxDuration: 6, minMagnitude: 1.3, maxMagnitude: 1.7, possibleTargetResourceTypes: [ResourceType.FOOD, ResourceType.IRON, ResourceType.SILK, ResourceType.HERBS, ResourceType.TEA] },
  { type: EconomicEventType.LOCAL_DROUGHT, probability: 0.02, minDuration: 4, maxDuration: 7, minMagnitude: 0.5, maxMagnitude: 0.8, possibleTargetResourceTypes: [ResourceType.FOOD, ResourceType.TEA, ResourceType.HERBS] },
  { type: EconomicEventType.BANDIT_ACTIVITY, probability: 0.025, minDuration: 3, maxDuration: 5, minMagnitude: 0.7, maxMagnitude: 0.9 }, 
  { type: EconomicEventType.GOOD_HARVEST_REGIONAL, probability: 0.015, minDuration: 2, maxDuration: 4, minMagnitude: 1.2, maxMagnitude: 1.4 }, 
  { type: EconomicEventType.PLAGUE_OUTBREAK, probability: 0.005, minDuration: 5, maxDuration: 10, minMagnitude: 0.6, maxMagnitude: 0.8 }, 
];

export interface MissionGenerationParams {
  type: MissionType;
  baseProbability: number;
  minRelationship?: RelationshipLevel;
  maxRelationship?: RelationshipLevel;
  requiresFactionState?: 'WAR' | 'PEACE' | 'LOW_RESOURCE_FOOD' | 'LOW_RESOURCE_IRON' | 'LOW_RESOURCE_HERBS' | 'LOW_RESOURCE_TEA'; 
  baseTimeLimitTurns: { min: number, max: number };
  rewardGoldRange: { min: number, max: number };
  rewardRelationshipRange: { min: number, max: number };
  requiredResourceAmountRange?: { min: number, max: number };
  requiredInvestmentAmountRange?: { min: number, max: number };
}

export const MISSION_DEFINITIONS: MissionGenerationParams[] = [
  {
    type: MissionType.DELIVER_RESOURCES,
    baseProbability: 0.1, 
    minRelationship: RelationshipLevel.NEUTRAL,
    baseTimeLimitTurns: { min: 5, max: 10 },
    rewardGoldRange: { min: 300, max: 1000 },
    rewardRelationshipRange: { min: 5, max: 15 },
    requiredResourceAmountRange: { min: 100, max: 500 },
  },
  {
    type: MissionType.INVEST_TERRITORY,
    baseProbability: 0.05,
    minRelationship: RelationshipLevel.FRIENDLY,
    baseTimeLimitTurns: { min: 8, max: 15 },
    rewardGoldRange: { min: 100, max: 500 }, 
    rewardRelationshipRange: { min: 10, max: 20 },
    requiredInvestmentAmountRange: { min: 500, max: 2000 },
  },
  {
    type: MissionType.ESPIONAGE_ASSESS_ECONOMY,
    baseProbability: 0.03,
    minRelationship: RelationshipLevel.FRIENDLY,
    requiresFactionState: 'WAR', 
    baseTimeLimitTurns: { min: 3, max: 7 },
    rewardGoldRange: { min: 200, max: 600 },
    rewardRelationshipRange: { min: 3, max: 8 },
  },
];


export const INITIAL_PLAYER_RESOURCES: Resources = {
  [ResourceType.GOLD]: 2000,
  [ResourceType.FOOD]: 100,
  [ResourceType.IRON]: 50,
  [ResourceType.SILK]: 200, 
  [ResourceType.HERBS]: 10,
  [ResourceType.TEA]: 10,
};

export const INITIAL_AI_FACTION_RESOURCES: Resources = {
  [ResourceType.GOLD]: 1000,
  [ResourceType.FOOD]: 500,
  [ResourceType.IRON]: 200,
  [ResourceType.SILK]: 100,
  [ResourceType.HERBS]: 20,
  [ResourceType.TEA]: 20,
};

export const INITIAL_AI_MERCHANT_RESOURCES: Resources = { // Base for default, will be overridden below
  [ResourceType.GOLD]: 1500,
  [ResourceType.FOOD]: 80,
  [ResourceType.IRON]: 40,
  [ResourceType.SILK]: 150,
  [ResourceType.HERBS]: 15,
  [ResourceType.TEA]: 15,
};


export const INITIAL_ARMY_UNITS: ArmyUnits = {
  infantry: 100,
  cavalry: 20,
  archers: 30,
};

// Ensure all resources have a default price for history initialization.
const getDefaultLocalMarketPrices = (): Partial<Resources> => ({
  [ResourceType.FOOD]: 10,
  [ResourceType.IRON]: 25,
  [ResourceType.SILK]: 50,
  [ResourceType.HERBS]: 35,
  [ResourceType.TEA]: 45,
});

export const INITIAL_TERRITORIES: Territory[] = [
  // Row 0
  { id: 't1', name: '성도', ownerFactionId: FactionId.SHU, position: { x: 0, y: 0 }, baseProduction: { [ResourceType.GOLD]: 50, [ResourceType.FOOD]: 100, [ResourceType.IRON]: 20, [ResourceType.SILK]: 10, [ResourceType.HERBS]: 15 }, developmentLevel: 1, garrison: { ...INITIAL_ARMY_UNITS }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.HERBS]: 30 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't2', name: '한중', ownerFactionId: FactionId.NEUTRAL, position: { x: 1, y: 0 }, baseProduction: { [ResourceType.GOLD]: 30, [ResourceType.FOOD]: 80, [ResourceType.IRON]: 30, [ResourceType.SILK]: 5, [ResourceType.HERBS]: 5 }, developmentLevel: 1, garrison: { infantry: 50, cavalry: 10, archers: 10 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't3', name: '허창', ownerFactionId: FactionId.WEI, position: { x: 2, y: 0 }, baseProduction: { [ResourceType.GOLD]: 60, [ResourceType.FOOD]: 90, [ResourceType.IRON]: 25, [ResourceType.SILK]: 15 }, developmentLevel: 1, garrison: { infantry: 90, cavalry: 25, archers: 35 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't4', name: '업', ownerFactionId: FactionId.YUAN_SHAO, position: { x: 3, y: 0 }, baseProduction: { [ResourceType.GOLD]: 55, [ResourceType.FOOD]: 85, [ResourceType.IRON]: 22, [ResourceType.SILK]: 12 }, developmentLevel: 1, garrison: { infantry: 80, cavalry: 15, archers: 25 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't5', name: '진양', ownerFactionId: FactionId.YUAN_SHAO, position: { x: 4, y: 0 }, baseProduction: { [ResourceType.GOLD]: 35, [ResourceType.FOOD]: 70, [ResourceType.IRON]: 15, [ResourceType.SILK]: 8 }, developmentLevel: 1, garrison: { infantry: 40, cavalry: 10, archers: 15 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't6', name: '북평', ownerFactionId: FactionId.GONGSUN_ZAN, position: { x: 5, y: 0 }, baseProduction: { [ResourceType.GOLD]: 25, [ResourceType.FOOD]: 60, [ResourceType.IRON]: 10, [ResourceType.SILK]: 18 }, developmentLevel: 1, garrison: { infantry: 30, cavalry: 5, archers: 10 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't7', name: '양평', ownerFactionId: FactionId.GONGSUN_ZAN, position: { x: 6, y: 0 }, baseProduction: { [ResourceType.GOLD]: 20, [ResourceType.FOOD]: 50, [ResourceType.IRON]: 8, [ResourceType.SILK]: 4 }, developmentLevel: 1, garrison: { infantry: 25, cavalry: 5, archers: 5 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't8', name: '서하', ownerFactionId: FactionId.MA_TENG, position: { x: 7, y: 0 }, baseProduction: { [ResourceType.GOLD]: 30, [ResourceType.FOOD]: 65, [ResourceType.IRON]: 12, [ResourceType.SILK]: 7 }, developmentLevel: 1, garrison: { infantry: 35, cavalry: 8, archers: 12 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  // Row 1
  { id: 't9', name: '무도', ownerFactionId: FactionId.MA_TENG, position: { x: 0, y: 1 }, baseProduction: { [ResourceType.GOLD]: 28, [ResourceType.FOOD]: 75, [ResourceType.IRON]: 25, [ResourceType.SILK]: 6, [ResourceType.HERBS]: 8 }, developmentLevel: 1, garrison: { infantry: 45, cavalry: 12, archers: 10 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.HERBS]: 33 }, specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't10', name: '장안', ownerFactionId: FactionId.WEI, position: { x: 1, y: 1 }, baseProduction: { [ResourceType.GOLD]: 70, [ResourceType.FOOD]: 100, [ResourceType.IRON]: 35, [ResourceType.SILK]: 10 }, developmentLevel: 1, garrison: { infantry: 100, cavalry: 30, archers: 40 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't11', name: '낙양', ownerFactionId: FactionId.WEI, position: { x: 2, y: 1 }, baseProduction: { [ResourceType.GOLD]: 75, [ResourceType.FOOD]: 80, [ResourceType.IRON]: 40, [ResourceType.SILK]: 5 }, developmentLevel: 1, garrison: { infantry: 110, cavalry: 35, archers: 45 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't12', name: '완', ownerFactionId: FactionId.NEUTRAL, position: { x: 3, y: 1 }, baseProduction: { [ResourceType.GOLD]: 45, [ResourceType.FOOD]: 90, [ResourceType.IRON]: 18, [ResourceType.SILK]: 14 }, developmentLevel: 1, garrison: { infantry: 60, cavalry: 15, archers: 20 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't13', name: '여남', ownerFactionId: FactionId.YUAN_SHU, position: { x: 4, y: 1 }, baseProduction: { [ResourceType.GOLD]: 40, [ResourceType.FOOD]: 80, [ResourceType.IRON]: 20, [ResourceType.SILK]: 10 }, developmentLevel: 1, garrison: { infantry: 55, cavalry: 10, archers: 18 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't14', name: '하비', ownerFactionId: FactionId.NEUTRAL, position: { x: 5, y: 1 }, baseProduction: { [ResourceType.GOLD]: 38, [ResourceType.FOOD]: 70, [ResourceType.IRON]: 16, [ResourceType.SILK]: 20 }, developmentLevel: 1, garrison: { infantry: 50, cavalry: 12, archers: 15 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't15', name: '북해', ownerFactionId: FactionId.YUAN_SHAO, position: { x: 6, y: 1 }, baseProduction: { [ResourceType.GOLD]: 32, [ResourceType.FOOD]: 65, [ResourceType.IRON]: 14, [ResourceType.SILK]: 9 }, developmentLevel: 1, garrison: { infantry: 40, cavalry: 8, archers: 12 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't16', name: '동해', ownerFactionId: FactionId.NEUTRAL, position: { x: 7, y: 1 }, baseProduction: { [ResourceType.GOLD]: 28, [ResourceType.FOOD]: 55, [ResourceType.IRON]: 10, [ResourceType.SILK]: 15 }, developmentLevel: 1, garrison: { infantry: 35, cavalry: 7, archers: 10 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  // Row 2
  { id: 't17', name: '영안', ownerFactionId: FactionId.SHU, position: { x: 0, y: 2 }, baseProduction: { [ResourceType.GOLD]: 45, [ResourceType.FOOD]: 90, [ResourceType.IRON]: 15, [ResourceType.SILK]: 12, [ResourceType.HERBS]: 10 }, developmentLevel: 1, garrison: { infantry: 70, cavalry: 15, archers: 25 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.HERBS]: 32 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't18', name: '양양', ownerFactionId: FactionId.LIU_BIAO, position: { x: 1, y: 2 }, baseProduction: { [ResourceType.GOLD]: 40, [ResourceType.FOOD]: 70, [ResourceType.IRON]: 20, [ResourceType.SILK]: 10, [ResourceType.TEA]: 5 }, developmentLevel: 1, garrison: { infantry: 60, cavalry: 5, archers: 15 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.TEA]: 42 }, specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't19', name: '강릉', ownerFactionId: FactionId.LIU_BIAO, position: { x: 2, y: 2 }, baseProduction: { [ResourceType.GOLD]: 50, [ResourceType.FOOD]: 85, [ResourceType.IRON]: 18, [ResourceType.SILK]: 22, [ResourceType.TEA]: 8 }, developmentLevel: 1, garrison: { infantry: 75, cavalry: 18, archers: 28 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.TEA]: 40 }, specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't20', name: '강하', ownerFactionId: FactionId.WU, position: { x: 3, y: 2 }, baseProduction: { [ResourceType.GOLD]: 48, [ResourceType.FOOD]: 80, [ResourceType.IRON]: 17, [ResourceType.SILK]: 25, [ResourceType.TEA]: 10 }, developmentLevel: 1, garrison: { infantry: 70, cavalry: 15, archers: 22 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.TEA]: 38 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't21', name: '수춘', ownerFactionId: FactionId.YUAN_SHU, position: { x: 4, y: 2 }, baseProduction: { [ResourceType.GOLD]: 42, [ResourceType.FOOD]: 75, [ResourceType.IRON]: 22, [ResourceType.SILK]: 8 }, developmentLevel: 1, garrison: { infantry: 58, cavalry: 10, archers: 16 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} }, 
  { id: 't22', name: '광릉', ownerFactionId: FactionId.NEUTRAL, position: { x: 5, y: 2 }, baseProduction: { [ResourceType.GOLD]: 36, [ResourceType.FOOD]: 68, [ResourceType.IRON]: 12, [ResourceType.SILK]: 17 }, developmentLevel: 1, garrison: { infantry: 48, cavalry: 9, archers: 14 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't23', name: '낭야', ownerFactionId: FactionId.NEUTRAL, position: { x: 6, y: 2 }, baseProduction: { [ResourceType.GOLD]: 30, [ResourceType.FOOD]: 60, [ResourceType.IRON]: 10, [ResourceType.SILK]: 11 }, developmentLevel: 1, garrison: { infantry: 38, cavalry: 7, archers: 11 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't24', name: '서주', ownerFactionId: FactionId.NEUTRAL, position: { x: 7, y: 2 }, baseProduction: { [ResourceType.GOLD]: 33, [ResourceType.FOOD]: 72, [ResourceType.IRON]: 19, [ResourceType.SILK]: 13 }, developmentLevel: 1, garrison: { infantry: 52, cavalry: 11, archers: 17 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  // Row 3
  { id: 't25', name: '운남', ownerFactionId: FactionId.SHU, position: { x: 0, y: 3 }, baseProduction: { [ResourceType.GOLD]: 25, [ResourceType.FOOD]: 60, [ResourceType.IRON]: 10, [ResourceType.SILK]: 20, [ResourceType.HERBS]: 20 }, developmentLevel: 1, garrison: { infantry: 30, cavalry: 10, archers: 5 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.HERBS]: 28 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't26', name: '파군', ownerFactionId: FactionId.SHU, position: { x: 1, y: 3 }, baseProduction: { [ResourceType.GOLD]: 30, [ResourceType.FOOD]: 70, [ResourceType.IRON]: 12, [ResourceType.SILK]: 15, [ResourceType.HERBS]: 12 }, developmentLevel: 1, garrison: { infantry: 40, cavalry: 8, archers: 10 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.HERBS]: 30 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't27', name: '장사', ownerFactionId: FactionId.WU, position: { x: 2, y: 3 }, baseProduction: { [ResourceType.GOLD]: 52, [ResourceType.FOOD]: 95, [ResourceType.IRON]: 20, [ResourceType.SILK]: 18, [ResourceType.TEA]: 12 }, developmentLevel: 1, garrison: { infantry: 80, cavalry: 20, archers: 30 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.TEA]: 35 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't28', name: '건업', ownerFactionId: FactionId.WU, position: { x: 3, y: 3 }, baseProduction: { [ResourceType.GOLD]: 65, [ResourceType.FOOD]: 110, [ResourceType.IRON]: 28, [ResourceType.SILK]: 30, [ResourceType.TEA]: 20 }, developmentLevel: 1, garrison: { ...INITIAL_ARMY_UNITS, infantry: 120, cavalry: 40, archers: 50 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.TEA]: 30 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't29', name: '오군', ownerFactionId: FactionId.WU, position: { x: 4, y: 3 }, baseProduction: { [ResourceType.GOLD]: 58, [ResourceType.FOOD]: 100, [ResourceType.IRON]: 24, [ResourceType.SILK]: 35, [ResourceType.TEA]: 18 }, developmentLevel: 1, garrison: { infantry: 85, cavalry: 22, archers: 32 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.TEA]: 32 }, specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't30', name: '회계', ownerFactionId: FactionId.NEUTRAL, position: { x: 5, y: 3 }, baseProduction: { [ResourceType.GOLD]: 40, [ResourceType.FOOD]: 80, [ResourceType.IRON]: 15, [ResourceType.SILK]: 28, [ResourceType.TEA]: 15 }, developmentLevel: 1, garrison: { infantry: 50, cavalry: 10, archers: 15 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't31', name: '여강', ownerFactionId: FactionId.NEUTRAL, position: { x: 6, y: 3 }, baseProduction: { [ResourceType.GOLD]: 37, [ResourceType.FOOD]: 78, [ResourceType.IRON]: 16, [ResourceType.SILK]: 10 }, developmentLevel: 1, garrison: { infantry: 47, cavalry: 11, archers: 13 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't32', name: '단양', ownerFactionId: FactionId.NEUTRAL, position: { x: 7, y: 3 }, baseProduction: { [ResourceType.GOLD]: 34, [ResourceType.FOOD]: 73, [ResourceType.IRON]: 13, [ResourceType.SILK]: 19, [ResourceType.TEA]: 7 }, developmentLevel: 1, garrison: { infantry: 43, cavalry: 9, archers: 12 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  // Row 4
  { id: 't33', name: '교지', ownerFactionId: FactionId.NEUTRAL, position: { x: 0, y: 4 }, baseProduction: { [ResourceType.GOLD]: 20, [ResourceType.FOOD]: 50, [ResourceType.IRON]: 5, [ResourceType.SILK]: 25, [ResourceType.HERBS]: 7 }, developmentLevel: 1, garrison: { infantry: 25, cavalry: 5, archers: 8 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't34', name: '합포', ownerFactionId: FactionId.NEUTRAL, position: { x: 1, y: 4 }, baseProduction: { [ResourceType.GOLD]: 22, [ResourceType.FOOD]: 55, [ResourceType.IRON]: 7, [ResourceType.SILK]: 22 }, developmentLevel: 1, garrison: { infantry: 28, cavalry: 6, archers: 9 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't35', name: '계양', ownerFactionId: FactionId.NEUTRAL, position: { x: 2, y: 4 }, baseProduction: { [ResourceType.GOLD]: 26, [ResourceType.FOOD]: 62, [ResourceType.IRON]: 9, [ResourceType.SILK]: 16, [ResourceType.TEA]: 6 }, developmentLevel: 1, garrison: { infantry: 32, cavalry: 7, archers: 10 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't36', name: '예장', ownerFactionId: FactionId.NEUTRAL, position: { x: 3, y: 4 }, baseProduction: { [ResourceType.GOLD]: 30, [ResourceType.FOOD]: 68, [ResourceType.IRON]: 11, [ResourceType.SILK]: 14 }, developmentLevel: 1, garrison: { infantry: 36, cavalry: 8, archers: 11 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't37', name: '시상', ownerFactionId: FactionId.NEUTRAL, position: { x: 4, y: 4 }, baseProduction: { [ResourceType.GOLD]: 29, [ResourceType.FOOD]: 66, [ResourceType.IRON]: 10, [ResourceType.SILK]: 12, [ResourceType.TEA]: 9 }, developmentLevel: 1, garrison: { infantry: 34, cavalry: 7, archers: 10 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't38', name: '건안', ownerFactionId: FactionId.NEUTRAL, position: { x: 5, y: 4 }, baseProduction: { [ResourceType.GOLD]: 27, [ResourceType.FOOD]: 64, [ResourceType.IRON]: 8, [ResourceType.SILK]: 20 }, developmentLevel: 1, garrison: { infantry: 33, cavalry: 6, archers: 9 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't39', name: '남해', ownerFactionId: FactionId.NEUTRAL, position: { x: 6, y: 4 }, baseProduction: { [ResourceType.GOLD]: 23, [ResourceType.FOOD]: 58, [ResourceType.IRON]: 6, [ResourceType.SILK]: 26, [ResourceType.TEA]: 10 }, developmentLevel: 1, garrison: { infantry: 29, cavalry: 5, archers: 7 }, localMarketPrices: getDefaultLocalMarketPrices(), specialBuilding: null, localMarketPriceHistory: {} },
  { id: 't40', name: '상용', ownerFactionId: FactionId.SHU, position: { x: 7, y: 4 }, baseProduction: { [ResourceType.GOLD]: 31, [ResourceType.FOOD]: 71, [ResourceType.IRON]: 17, [ResourceType.SILK]: 9, [ResourceType.HERBS]: 6 }, developmentLevel: 1, garrison: { infantry: 39, cavalry: 10, archers: 14 }, localMarketPrices: { ...getDefaultLocalMarketPrices(), [ResourceType.HERBS]: 34 }, specialBuilding: null, localMarketPriceHistory: {} },
];


export const INITIAL_FACTIONS: Faction[] = [
  { id: FactionId.SHU, name: KOREAN_FACTION_NAMES[FactionId.SHU], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 1200, [ResourceType.HERBS]: 50 }, color: '#16a34a', aiPersonality: 'Balanced', automationStrategy: 'BalancedGrowth' }, // bg-green-600
  { id: FactionId.WEI, name: KOREAN_FACTION_NAMES[FactionId.WEI], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 1150 }, color: '#2563eb', aiPersonality: 'Aggressive', automationStrategy: 'AggressiveExpansion' }, // bg-blue-600
  { id: FactionId.WU, name: KOREAN_FACTION_NAMES[FactionId.WU], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 1100, [ResourceType.TEA]: 50 }, color: '#dc2626', aiPersonality: 'Economic', automationStrategy: 'EconomicDominance' }, // bg-red-600
  
  { id: FactionId.YUAN_SHAO, name: KOREAN_FACTION_NAMES[FactionId.YUAN_SHAO], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 1100 }, color: '#f97316', aiPersonality: 'Aggressive', automationStrategy: 'AggressiveExpansion' }, // bg-orange-500
  { id: FactionId.GONGSUN_ZAN, name: KOREAN_FACTION_NAMES[FactionId.GONGSUN_ZAN], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 900 }, color: '#14b8a6', aiPersonality: 'Balanced', automationStrategy: 'FortifyDefenses' }, // bg-teal-500
  { id: FactionId.MA_TENG, name: KOREAN_FACTION_NAMES[FactionId.MA_TENG], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 950 }, color: '#4f46e5', aiPersonality: 'Aggressive', automationStrategy: 'BalancedGrowth' }, // bg-indigo-600
  { id: FactionId.LIU_BIAO, name: KOREAN_FACTION_NAMES[FactionId.LIU_BIAO], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 1000, [ResourceType.TEA]: 30 }, color: '#9333ea', aiPersonality: 'Economic', automationStrategy: 'EconomicDominance' }, // bg-purple-600
  { id: FactionId.YUAN_SHU, name: KOREAN_FACTION_NAMES[FactionId.YUAN_SHU], resources: { ...INITIAL_AI_FACTION_RESOURCES, [ResourceType.GOLD]: 850 }, color: '#db2777', aiPersonality: 'Aggressive', automationStrategy: 'AggressiveExpansion' }, // bg-pink-600
  
  { id: FactionId.NEUTRAL, name: KOREAN_FACTION_NAMES[FactionId.NEUTRAL], resources: { [ResourceType.GOLD]: 0, [ResourceType.FOOD]: 0, [ResourceType.IRON]: 0, [ResourceType.SILK]: 0, [ResourceType.HERBS]: 0, [ResourceType.TEA]: 0 }, color: '#6b7280', automationStrategy: 'FortifyDefenses' }, // bg-gray-500
];

export const INITIAL_AI_MERCHANTS: AIMerchant[] = [
  {
    id: 'ai_merchant_1',
    name: '상인 왕서방',
    resources: { ...INITIAL_AI_MERCHANT_RESOURCES, [ResourceType.GOLD]: 2000, [ResourceType.SILK]: 250, [ResourceType.HERBS]: 20 },
    totalWealthHistory: [{ turn: 1, wealth: 2000 }],
    favoredFactionId: FactionId.WEI,
    personality: AIMerchantPersonality.AGGRESSIVE_TRADER,
    merchantStanding: MerchantStandingLevel.OBSCURE,
    lastActionLog: '활동 시작',
    slanderEffects: [],
  },
  {
    id: 'ai_merchant_2',
    name: '거상 심만삼',
    resources: { ...INITIAL_AI_MERCHANT_RESOURCES, [ResourceType.GOLD]: 1800, [ResourceType.FOOD]: 150, [ResourceType.TEA]: 40 },
    totalWealthHistory: [{ turn: 1, wealth: 1800 }],
    favoredFactionId: FactionId.WU,
    personality: AIMerchantPersonality.CAUTIOUS_INVESTOR,
    merchantStanding: MerchantStandingLevel.OBSCURE,
    lastActionLog: '활동 시작',
    slanderEffects: [],
  },
    {
    id: 'ai_merchant_3',
    name: '객주 이소월',
    resources: { ...INITIAL_AI_MERCHANT_RESOURCES, [ResourceType.GOLD]: 1900, [ResourceType.IRON]: 60 },
    totalWealthHistory: [{ turn: 1, wealth: 1900 }],
    favoredFactionId: null, 
    personality: AIMerchantPersonality.BALANCED_OPPORTUNIST,
    merchantStanding: MerchantStandingLevel.OBSCURE,
    lastActionLog: '활동 시작',
    slanderEffects: [],
  },
];


export const INITIAL_MARKET_STATE: MarketState = {
  initialBasePrices: {
    [ResourceType.GOLD]: 1, 
    [ResourceType.FOOD]: 10,
    [ResourceType.IRON]: 25,
    [ResourceType.SILK]: 50,
    [ResourceType.HERBS]: 35,
    [ResourceType.TEA]: 45,
  },
  temporaryPriceModifiers: {},
  marketSignals: [],
  activeMisinformation: [],
};

export const INITIAL_PLAYER_STATE: PlayerState = {
  resources: { ...INITIAL_PLAYER_RESOURCES },
  favoredFactionId: null,
  totalWealthHistory: [{ turn: 1, wealth: INITIAL_PLAYER_RESOURCES[ResourceType.GOLD] }],
  influence: {}, 
  factionRelations: {}, 
  merchantStanding: MerchantStandingLevel.OBSCURE,
  slanderEffects: [],
  temporaryTradeAdvantages: [],
};

export const INITIAL_GAME_STATE: GameState = {
  turn: 1,
  territories: JSON.parse(JSON.stringify(INITIAL_TERRITORIES)),
  factions: JSON.parse(JSON.stringify(INITIAL_FACTIONS)),
  market: JSON.parse(JSON.stringify(INITIAL_MARKET_STATE)),
  events: [{ id: generateId(), turn: 1, message: '상인의 시대가 도래했습니다! 혼란 속에서 부를 쌓으십시오.', type: GameEventType.SYSTEM }],
  selectedTerritoryId: null,
  gameOver: false,
  victoriousFactionId: null,
  activeTab: ControlTab.DASHBOARD, // Changed default to Dashboard
  player: JSON.parse(JSON.stringify(INITIAL_PLAYER_STATE)),
  selectedEspionageTargetTerritoryId: null,
  activeEconomicEvents: [], 
  availableMissions: [], 
  acceptedMissions: [],  
  aiMerchants: JSON.parse(JSON.stringify(INITIAL_AI_MERCHANTS)),
  activeFactionPolicies: [],
  activeWars: [],
  isDelegationActive: false, 
  isFavoredFactionDelegationActive: false, // Initialized new state
};

export const MAP_DIMENSIONS = {
  cols: 8,
  rows: 5,
};

export const RESOURCE_EMOJIS: Record<ResourceType, string> = {
  [ResourceType.GOLD]: '💰',
  [ResourceType.FOOD]: '🍚',
  [ResourceType.IRON]: '🔩',
  [ResourceType.SILK]: '🧶',
  [ResourceType.HERBS]: '🌿',
  [ResourceType.TEA]: '🍵',
};

export const AUTOMATION_STRATEGIES: AutomationStrategy[] = ['BalancedGrowth', 'AggressiveExpansion', 'EconomicDominance', 'FortifyDefenses'];

export const FINANCIAL_TACTIC_PLAYER_COST = 300; 
export const SLANDER_MERCHANT_COST_GOLD = 250;


export const PLAYER_INVESTMENT_COST_PER_LEVEL_BASE = 500; 

export const AI_INVESTMENT_COST_PER_LEVEL = 500;
export const AI_RECRUITMENT_COST: Record<keyof ArmyUnits, Resources> = {
    infantry: { [ResourceType.GOLD]: 10, [ResourceType.FOOD]: 5, [ResourceType.IRON]: 1, [ResourceType.SILK]: 0 },
    cavalry: { [ResourceType.GOLD]: 30, [ResourceType.FOOD]: 10, [ResourceType.IRON]: 5, [ResourceType.SILK]: 0 },
    archers: { [ResourceType.GOLD]: 15, [ResourceType.FOOD]: 5, [ResourceType.IRON]: 2, [ResourceType.SILK]: 0 },
};
export const AI_RECRUITMENT_BATCH_SIZE = 10;

export const MAX_DEVELOPMENT_LEVEL = 5;
export const PRODUCTION_BONUS_PER_LEVEL = 0.2; 
export const SPECIAL_BUILDING_MARKET_HALL_PROD_BONUS = 0.05; // 5% bonus to Food, Silk, Herbs, Tea
export const SPECIAL_BUILDING_MARKET_HALL_INFLUENCE_COST_REDUCTION = 0.1; // 10% cheaper influence
export const SPECIAL_BUILDING_TRADE_DEPOT_PRICE_BONUS = 0.03; // 3% better prices for player
export const SPECIAL_BUILDING_FARM_FOOD_BONUS = 25;
export const SPECIAL_BUILDING_MINE_IRON_BONUS = 15;
export const SPECIAL_BUILDING_SILK_WORKSHOP_SILK_BONUS = 20;


export const TRADE_MARKUP = 0.1; 
export const SUPPLY_PROFIT_MARGIN = 0.25;

export const MAX_INFLUENCE_LEVEL = 2;
export const INFLUENCE_ESTABLISH_COST_GOLD = 300; 
export const INFLUENCE_UPGRADE_COST_GOLD_PER_LEVEL: Record<number, number> = {
  2: 700, 
};
export const INFLUENCE_TRADE_BONUS_PERCENT_PER_LEVEL = 0.02; 

export interface EspionageActionConfig {
  cost: Partial<Resources>;
  minInfluenceLevel: number;
  description: string;
}
export const ESPIONAGE_ACTION_CONFIGS: Record<EspionageActionType, EspionageActionConfig> = {
  [EspionageActionType.ASSESS_ECONOMY]: {
    cost: { [ResourceType.GOLD]: 100 },
    minInfluenceLevel: 1,
    description: '대상 영토의 상세 경제 정보 (생산량, 세력 자원 일부)를 파악합니다.',
  },
  [EspionageActionType.INCITE_UNREST]: {
    cost: { [ResourceType.GOLD]: 400, [ResourceType.SILK]: 20 },
    minInfluenceLevel: 2,
    description: '대상 영토에 불안을 선동하여 소유 세력의 자원을 일부 손실시킵니다. 발각 위험이 있습니다.',
  },
};
export const ESPIONAGE_DETECTION_CHANCE_BASE = 0.2; 
export const INCITE_UNREST_RESOURCE_LOSS_FOOD = 200;
export const INCITE_UNREST_RESOURCE_LOSS_IRON = 100;

export const RELATIONSHIP_THRESHOLDS: Record<RelationshipLevel, { min: number, max: number }> = {
  [RelationshipLevel.HOSTILE]: { min: -100, max: -51 },
  [RelationshipLevel.UNFRIENDLY]: { min: -50, max: -11 },
  [RelationshipLevel.NEUTRAL]: { min: -10, max: 10 },
  [RelationshipLevel.FRIENDLY]: { min: 11, max: 50 },
  [RelationshipLevel.ALLIED]: { min: 51, max: 100 },
};
export const MAX_RELATIONSHIP_SCORE = 100;
export const MIN_RELATIONSHIP_SCORE = -100;

export const MERCHANT_STANDING_THRESHOLDS: {wealth: number, standing: MerchantStandingLevel}[] = [
    { wealth: 0, standing: MerchantStandingLevel.OBSCURE },
    { wealth: 10000, standing: MerchantStandingLevel.KNOWN },
    { wealth: 50000, standing: MerchantStandingLevel.INFLUENTIAL },
    { wealth: 200000, standing: MerchantStandingLevel.POWERBROKER },
    { wealth: 1000000, standing: MerchantStandingLevel.SHADOW_TYCOON },
];


export const REL_CHANGE = {
  TRADE_SUCCESSFUL: 1,      
  INVEST_PLAYER: 5,        
  SUPPLY_FACTION: 8,       
  SUPPLY_FAVORED_FACTION: 3, 
  FINANCIAL_TACTIC_STIMULATE_POSITIVE: 3, 
  ESPIONAGE_ASSESS_ECONOMY_DETECTED: 2, 
  ESPIONAGE_INCITE_UNREST_SUCCESS: 10,   
  ESPIONAGE_INCITE_UNREST_DETECTED_BONUS: 15, 
  FINANCIAL_TACTIC_RUMOR_NEGATIVE: 4,     
  FINANCIAL_TACTIC_HOARD_NEGATIVE: 4,      
  FINANCIAL_TACTIC_SABOTAGE_NEGATIVE: 15,  
  MISSION_SUCCESS: 10,
  MISSION_FAILURE: -5,
  SLANDER_DETECTED_PENALTY: -5,
  FUND_SPECIAL_BUILDING: 7,
  FUND_POLICY_BASIC: 3,
  FUND_POLICY_SIGNIFICANT: 8,
  CONTRIBUTE_WAR_FUNDS: 5,
};

export const RELATIONSHIP_MODIFIERS = {
  TRADE_PRICE_BONUS_FRIENDLY: 0.02, 
  TRADE_PRICE_BONUS_ALLIED: 0.05,   
  TRADE_PRICE_PENALTY_UNFRIENDLY: 0.03, 
  TRADE_PRICE_PENALTY_HOSTILE: 0.07,  
  ESPIONAGE_DETECTION_DECREASE_FRIENDLY: 0.05, 
  ESPIONAGE_DETECTION_DECREASE_ALLIED: 0.10,   
  ESPIONAGE_DETECTION_INCREASE_UNFRIENDLY: 0.05, 
  ESPIONAGE_DETECTION_INCREASE_HOSTILE: 0.10,  
};

// --- AI Merchant Difficulty Increase ---
export const AI_MERCHANT_TRADE_MARKUP = 0.06; // Decreased from 0.08 (more competitive prices)
export const AI_MERCHANT_INVESTMENT_THRESHOLD_GOLD = 700; // Decreased from 1000 (invest more often)
export const AI_MERCHANT_MIN_GOLD_RESERVE = 200; // Decreased from 300 (spend more freely)
export const AI_MERCHANT_TRADE_AMOUNT_MIN = 50; // Increased from 30 (larger min trades)
export const AI_MERCHANT_TRADE_AMOUNT_MAX = 250; // Increased from 150 (larger max trades)
export const AI_MERCHANT_INVESTMENT_AMOUNT_BASE = 600; // Increased from 400 (larger investments)
export const AI_REACTION_HOARD_THRESHOLD_PERCENT = 0.10; // Decreased from 0.20 (react more to player market impact)
export const AI_SLANDER_PLAYER_CHANCE = 0.10; // Increased from 0.05 (more slandering)
// --- End AI Merchant Difficulty Increase ---


export const MARKET_PRICE_FLUCTUATION_PERCENT = 0.05; // Max +/- 5% per turn for general fluctuation
export const MARKET_DEPTH_FOR_PRICE_CHANGE = 2000; 
export const MIN_RESOURCE_PRICE = 2; 
export const MAX_RESOURCE_PRICE_MULTIPLIER_FROM_INITIAL = 5;
export const MAX_MARKET_SIGNALS = 10; 
export const MAX_PRICE_HISTORY_PER_RESOURCE = 20; // Max turns of price history to store

export const SLANDER_EFFECT_DURATION_TURNS = 5;
export const SLANDER_PRICE_PENALTY_PERCENT = 0.05;


// --- Constants for Smarter Player Automation ---
export const AUTO_COMPETITIVE_WEALTH_RATIO_THRESHOLD = 0.6; 
export const AUTO_COMPETITIVE_STANDING_DIFFERENCE_THRESHOLD = 2; 
export const AUTO_SLANDER_CHANCE_IF_BEHIND_MULTIPLIER = 2.5; // Increased from 1.5
export const AUTO_STIMULATE_FAVORED_FACTION_CHANCE_IF_BEHIND = 0.4; 
export const AUTO_SELL_SURPLUS_AGGRESSION_FACTOR_IF_BEHIND = 0.6; // Decreased from 0.8
export const AUTO_MISSION_GOLD_PRIORITY_FACTOR_IF_BEHIND = 1.25; 
export const AUTO_SELL_MIN_PROFIT_MARGIN_IF_BEHIND = 0.80; // New: Lower profit margin when behind
export const AUTO_INVESTMENT_MIN_GOLD_HELD_IF_BEHIND_MULTIPLIER = 1.5; // New: Need more gold to invest if behind
export const AUTO_BUILDING_MIN_GOLD_IF_BEHIND_MULTIPLIER = 1.5; // New: Need more gold for buildings if behind
export const AUTO_SABOTAGE_MARKET_CHANCE_IF_BEHIND = 0.15; // New: Chance to use Sabotage Market if behind


// Constants for player automation
export const AUTO_INVESTMENT_MIN_GOLD_HELD = 2000; 
export const AUTO_INVESTMENT_RELATIONSHIP_THRESHOLD = RelationshipLevel.FRIENDLY;

export const AUTO_SELL_SILK_SURPLUS_THRESHOLD = 70; 
export const AUTO_SELL_SILK_AMOUNT_TO_SELL = 15;  
export const AUTO_SELL_SILK_MIN_PROFIT_MARGIN = 0.90; 

export const AUTO_SELL_FOOD_SURPLUS_THRESHOLD = 200;
export const AUTO_SELL_FOOD_AMOUNT_TO_SELL = 50;
export const AUTO_SELL_IRON_SURPLUS_THRESHOLD = 100;
export const AUTO_SELL_IRON_AMOUNT_TO_SELL = 30;
export const AUTO_SELL_HERBS_SURPLUS_THRESHOLD = 50;
export const AUTO_SELL_HERBS_AMOUNT_TO_SELL = 15;
export const AUTO_SELL_TEA_SURPLUS_THRESHOLD = 50;
export const AUTO_SELL_TEA_AMOUNT_TO_SELL = 15;
export const AUTO_SELL_DEFAULT_MIN_PROFIT_MARGIN = 0.90;

export const AUTO_BUY_FOOD_DEFICIT_THRESHOLD = 50;
export const AUTO_BUY_FOOD_AMOUNT_TO_BUY = 100;
export const AUTO_BUY_IRON_DEFICIT_THRESHOLD = 20;
export const AUTO_BUY_IRON_AMOUNT_TO_BUY = 50;
export const AUTO_BUY_HERBS_DEFICIT_THRESHOLD = 5;
export const AUTO_BUY_HERBS_AMOUNT_TO_BUY = 20;
export const AUTO_BUY_TEA_DEFICIT_THRESHOLD = 5;
export const AUTO_BUY_TEA_AMOUNT_TO_BUY = 20;
export const AUTO_BUY_DEFAULT_MAX_COST_INCREASE_MARGIN = 1.08; 

export const AUTO_BUILDING_MIN_GOLD_FOR_ANY_BUILDING = 1500;
export const AUTO_BUILDING_RELATIONSHIP_THRESHOLD = RelationshipLevel.FRIENDLY;

export const AUTO_FINANCIAL_MIN_GOLD_FOR_STIMULATE = 2500;
export const AUTO_FINANCIAL_MIN_GOLD_FOR_SLANDER = 2000; 
export const AUTO_SLANDER_WEALTH_DIFFERENCE_THRESHOLD = 1500; // Decreased from 3000
export const AUTO_SLANDER_STANDING_DIFFERENCE_THRESHOLD = 1; 
export const AUTO_SLANDER_FAVORED_FACTION_REL_THRESHOLD = RelationshipLevel.NEUTRAL; 

// Constants for player automation - Missions
export const AUTO_MISSION_ACCEPT_RELATIONSHIP_THRESHOLD = RelationshipLevel.NEUTRAL;
export const AUTO_MISSION_ACCEPT_MIN_GOLD_REWARD = 200;
export const AUTO_MISSION_ACCEPT_MIN_REL_REWARD = 5;
export const AUTO_MISSION_ACCEPT_RESOURCE_BUFFER_FACTOR = 1.3; 
export const AUTO_MISSION_ACCEPT_MIN_TIME_LIMIT = 3; 
export const AUTO_MISSION_MAX_NEWLY_ACCEPTED_PER_TURN = 1;
export const AUTO_MISSION_CONTRIBUTION_MAX_PERCENT_PER_TURN = 0.75; 
export const AUTO_MISSION_CRITICAL_RESOURCE_RESERVE_FACTOR = 0.8; 
export const AUTO_MISSION_CRITICAL_GOLD_RESERVE_FACTOR = 0.5; 
export const AUTO_MISSION_ESPIONAGE_MIN_INFLUENCE = 1; 

// Constants for player automation - Favored Faction Selection
export const AUTO_FAVORED_FACTION_MIN_TERRITORIES_CONSIDERATION = 2; 
export const AUTO_FAVORED_FACTION_TERRITORY_SCORE_MULTIPLIER = 5;    
export const AUTO_FAVORED_FACTION_ECON_SCORE_DIVISOR = 200;          
export const AUTO_FAVORED_FACTION_MIN_RELATIONSHIP_TO_CONSIDER = RelationshipLevel.NEUTRAL;

// --- NEW Player Automation Trading Heuristics ---
export const AUTO_TRADE_ARBITRAGE_MIN_PROFIT_MARGIN = 0.25; // Minimum 25% profit for an arbitrage trade
export const AUTO_TRADE_ARBITRAGE_MAX_GOLD_COMMIT_FACTOR = 0.3; // Commit max 30% of current gold to an arbitrage buy
export const AUTO_TRADE_OPPORTUNISTIC_BUY_PRICE_THRESHOLD_FACTOR = 0.75; // Buy if price < 75% of initial base
export const AUTO_TRADE_OPPORTUNISTIC_BUY_AMOUNT_SILK = 15;
export const AUTO_TRADE_OPPORTUNISTIC_BUY_AMOUNT_HERBS_TEA = 10;
export const AUTO_TRADE_MIN_GOLD_RESERVE_FOR_TRADING_FACTOR = 0.4; // Keep 40% of AUTO_INVESTMENT_MIN_GOLD_HELD as trading reserve
export const AUTO_TRADE_MAX_OPPORTUNISTIC_BUYS_PER_TURN = 1;
export const AUTO_TRADE_MAX_ARBITRAGE_TRADES_PER_TURN = 1;