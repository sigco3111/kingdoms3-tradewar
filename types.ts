export enum ResourceType {
  GOLD = 'Gold',
  FOOD = 'Food',
  IRON = 'Iron',
  SILK = 'Silk', // For trade
  HERBS = 'Herbs', // New specialty good
  TEA = 'Tea',     // New specialty good
}

export interface Resources {
  [ResourceType.GOLD]: number;
  [ResourceType.FOOD]: number;
  [ResourceType.IRON]: number;
  [ResourceType.SILK]: number;
  [ResourceType.HERBS]?: number; 
  [ResourceType.TEA]?: number;   
}

export interface ArmyUnits {
  infantry: number;
  cavalry: number;
  archers: number;
}

export enum SpecializedBuildingType {
  MARKET_HALL = 'MARKET_HALL', // 시장 (Market Hall) - Influence cost down, minor local production up
  TRADE_DEPOT = 'TRADE_DEPOT', // 교역소 (Trade Depot) - Player trade prices better
  ADVANCED_FARM = 'ADVANCED_FARM', // 대농장 (Advanced Farm) - Food production up
  ENHANCED_MINE = 'ENHANCED_MINE', // 제철소 (Enhanced Mine) - Iron production up
  SILK_WORKSHOP = 'SILK_WORKSHOP', // 비단 공방 (Silk Workshop) - Silk production up
}

export interface TerritorySpecialBuilding {
  type: SpecializedBuildingType;
  fundedByPlayer: boolean; 
  // active: boolean; // Implicitly active if present
}

export interface PriceHistoryEntry {
  turn: number;
  price: number;
}

export interface Territory {
  id: string;
  name: string;
  ownerFactionId: FactionId | null; 
  position: { x: number; y: number }; 
  baseProduction: Resources;
  developmentLevel: number; 
  garrison: ArmyUnits;
  localMarketModifier?: number; 
  localMarketPrices: Partial<Resources>; 
  specialBuilding: TerritorySpecialBuilding | null; // Player/AI funded specialized building
  localMarketPriceHistory?: Partial<Record<ResourceType, PriceHistoryEntry[]>>; // Added for price trend chart
}

export enum FactionId {
  WEI = 'WEI_FACTION',
  WU = 'WU_FACTION',
  SHU = 'SHU_FACTION',
  NEUTRAL = 'NEUTRAL',
  YUAN_SHAO = 'YUAN_SHAO_FACTION',
  GONGSUN_ZAN = 'GONGSUN_ZAN_FACTION',
  MA_TENG = 'MA_TENG_FACTION',
  LIU_BIAO = 'LIU_BIAO_FACTION',
  YUAN_SHU = 'YUAN_SHU_FACTION',
}

export interface Faction {
  id: FactionId;
  name: string;
  resources: Resources; 
  color: string;
  aiPersonality?: 'Aggressive' | 'Economic' | 'Balanced';
  automationStrategy: AutomationStrategy;
  // isAtWarWith: FactionId[] // Consider using GameState.activeWars instead for centralized war management
}

export interface MarketSignal {
  resource: ResourceType;
  territoryId: string;
  priceSpikePercent: number; 
  turn: number;
}

export interface TemporaryMisinformation {
  territoryId: string;
  resource: ResourceType;
  fakePriceModifier: number; 
  remainingTurns: number;
}

export interface MarketState {
  initialBasePrices: Resources; 
  temporaryPriceModifiers?: Partial<Record<ResourceType, number>>; 
  marketSignals: MarketSignal[]; 
  activeMisinformation: TemporaryMisinformation[]; 
}

export enum GameEventType {
  INFO = 'INFO',
  BATTLE = 'BATTLE',
  FINANCE = 'FINANCE',
  SYSTEM = 'SYSTEM',
  TRADE = 'TRADE',
  POLITICS = 'POLITICS',
  ESPIONAGE = 'ESPIONAGE',
  RELATIONSHIP = 'RELATIONSHIP',
  ECONOMIC = 'ECONOMIC',
  MISSION = 'MISSION', 
  AI_MERCHANT_ACTION = 'AI_MERCHANT_ACTION',
  SLANDER = 'SLANDER',
  CONSTRUCTION = 'CONSTRUCTION', // For buildings
  POLICY = 'POLICY', // For faction policies
  WAR_EVENT = 'WAR_EVENT', // For war declarations, spoils
}

export interface GameEvent {
  id: string;
  turn: number;
  message: string;
  type: GameEventType;
}

export type AutomationStrategy = 'BalancedGrowth' | 'AggressiveExpansion' | 'EconomicDominance' | 'FortifyDefenses';
export type PlayerAutomationStrategy = 'MaximizeProfit' | 'SupportFavoredFaction' | 'DestabilizeMarkets';


export enum ControlTab {
  TERRITORY_MARKET = 'TERRITORY_MARKET',
  FACTION_SUPPORT = 'FACTION_SUPPORT', 
  BUSINESS_MANAGEMENT = 'BUSINESS_MANAGEMENT', 
  MISSIONS = 'MISSIONS',
  COMPETITOR_STATUS = 'COMPETITOR_STATUS', 
  DASHBOARD = 'DASHBOARD', // New tab for comprehensive information
}

export enum FinancialTacticType {
  SPREAD_RUMORS = 'Spread Rumors',
  HOARD_RESOURCE = 'Hoard Resource',
  SABOTAGE_MARKET = 'Sabotage Market', 
  STIMULATE_ECONOMY = 'Stimulate Economy', 
  SLANDER_MERCHANT = 'Slander Merchant',
}

export enum EspionageActionType {
  ASSESS_ECONOMY = 'Assess Economy', 
  INCITE_UNREST = 'Incite Unrest',   
}

export enum RelationshipLevel {
  HOSTILE = 'Hostile',
  UNFRIENDLY = 'Unfriendly',
  NEUTRAL = 'Neutral',
  FRIENDLY = 'Friendly',
  ALLIED = 'Allied',
}

export enum MerchantStandingLevel {
  OBSCURE = 'Obscure Merchant',
  KNOWN = 'Known Trader',
  INFLUENTIAL = 'Influential Magnate',
  POWERBROKER = 'Financial Powerbroker',
  SHADOW_TYCOON = 'Shadow Tycoon',
}

export enum EconomicEventType {
  RESOURCE_BOOM = 'RESOURCE_BOOM', 
  LOCAL_DROUGHT = 'LOCAL_DROUGHT', 
  TRADE_FAIR = 'TRADE_FAIR',       
  BANDIT_ACTIVITY = 'BANDIT_ACTIVITY', 
  GOOD_HARVEST_REGIONAL = 'GOOD_HARVEST_REGIONAL', 
  PLAGUE_OUTBREAK = 'PLAGUE_OUTBREAK', 
}

export interface EconomicEvent {
  id: string;
  type: EconomicEventType;
  description: string;
  startTurn: number;
  duration: number;
  remainingDuration: number;
  targetTerritoryId?: string; 
  targetFactionId?: FactionId;  
  targetResourceType?: ResourceType; 
  effectMagnitude?: number; 
}

export enum MissionStatus {
  AVAILABLE = 'AVAILABLE',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
}

export enum MissionType {
  DELIVER_RESOURCES = 'DELIVER_RESOURCES',
  INVEST_TERRITORY = 'INVEST_TERRITORY',
  ESPIONAGE_ASSESS_ECONOMY = 'ESPIONAGE_ASSESS_ECONOMY',
  ESPIONAGE_INCITE_UNREST = 'ESPIONAGE_INCITE_UNREST',
}

export interface Mission {
  id: string;
  type: MissionType;
  status: MissionStatus;
  offeringFactionId: FactionId;
  description: string;
  startTurn: number;
  timeLimitTurns: number;
  remainingTurns?: number;
  targetTerritoryId?: string;
  targetResourceType?: ResourceType;
  requiredAmount?: number;
  currentAmount?: number;
  rewardGold?: number;
  rewardRelationshipPoints?: number;
}

export interface SlanderEffect {
  byMerchantId: string; 
  remainingTurns: number;
  pricePenaltyPercent: number; 
}

export interface TemporaryTradeAdvantage {
  territoryId: string;
  turnsRemaining: number;
  bonusType: 'WAR_SPOILS'; // Can be expanded later
  // specificBonusValue?: number; // e.g., 0.1 for 10% better prices
}

export interface PlayerState {
  resources: Resources;
  favoredFactionId: FactionId | null;
  totalWealthHistory: { turn: number, wealth: number }[];
  influence: { [territoryId: string]: number }; 
  factionRelations: { [factionId in FactionId]?: number }; 
  merchantStanding: MerchantStandingLevel;
  slanderEffects: SlanderEffect[]; 
  temporaryTradeAdvantages: TemporaryTradeAdvantage[];
}

export enum AIMerchantPersonality {
  AGGRESSIVE_TRADER = 'AGGRESSIVE_TRADER',
  CAUTIOUS_INVESTOR = 'CAUTIOUS_INVESTOR',
  BALANCED_OPPORTUNIST = 'BALANCED_OPPORTUNIST',
}

export interface AIMerchant {
  id: string;
  name: string;
  resources: Resources;
  totalWealthHistory: { turn: number, wealth: number }[];
  favoredFactionId: FactionId | null;
  personality: AIMerchantPersonality;
  merchantStanding: MerchantStandingLevel;
  lastActionLog: string;
  slanderEffects: SlanderEffect[]; 
}

export enum FactionPolicyType {
  AGRICULTURAL_BOOST = 'AGRICULTURAL_BOOST', // 중농 정책 (Agricultural Boost)
  COMMERCIAL_FAIR_ORGANIZATION = 'COMMERCIAL_FAIR_ORGANIZATION', // 상업 장려책 (Commercial Fair Org)
  CAPITAL_WALL_REINFORCEMENT = 'CAPITAL_WALL_REINFORCEMENT', // 성벽 증축 (Capital Wall Reinforcement)
  // 운하 건설 (Canal Construction) - More complex, maybe later
}

export interface ActiveFactionPolicy {
  id: string;
  type: FactionPolicyType;
  factionId: FactionId;
  targetTerritoryId?: string; // For policies like wall reinforcement
  startTurn: number;
  durationTurns: number; // Total duration
  turnsRemaining: number; // Countdown
  fundingGoal: number;
  currentFunding: number;
  playerContribution: number;
  effectsApplied: boolean; // To ensure one-time effects are applied once
}

export interface ActiveWar {
  id: string;
  aggressorFactionId: FactionId;
  defenderFactionId: FactionId;
  startedTurn: number;
  playerContributions: Partial<Record<FactionId, number>>; // Key is FactionId player supported, value is amount
  isActive: boolean;
  // winningFactionId?: FactionId | null; // Set when war ends
}

export interface GameState {
  turn: number;
  territories: Territory[];
  factions: Faction[]; 
  market: MarketState;
  events: GameEvent[];
  selectedTerritoryId: string | null;
  gameOver: boolean;
  victoriousFactionId: FactionId | null; 
  activeTab: ControlTab;
  player: PlayerState;
  selectedEspionageTargetTerritoryId: string | null; 
  activeEconomicEvents: EconomicEvent[]; 
  availableMissions: Mission[]; 
  acceptedMissions: Mission[];  
  aiMerchants: AIMerchant[];
  activeFactionPolicies: ActiveFactionPolicy[];
  activeWars: ActiveWar[];
  isDelegationActive: boolean; // New state for delegation mode
  isFavoredFactionDelegationActive: boolean; // New state for favored faction delegation
}

export type GameAction =
  | { type: 'NEXT_TURN' }
  | { type: 'SELECT_TERRITORY'; payload: string }
  | { type: 'DESELECT_TERRITORY' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_ACTIVE_TAB'; payload: ControlTab }
  // Player-specific actions
  | { type: 'PLAYER_SET_FAVORED_FACTION'; payload: FactionId | null }
  | { type: 'PLAYER_TRADE_RESOURCES'; payload: { targetFactionId: FactionId, territoryId: string, resource: ResourceType, amount: number, tradeType: 'BUY' | 'SELL' } }
  | { type: 'PLAYER_INVEST_IN_TERRITORY'; payload: { territoryId: string, amount: number } } 
  | { type: 'PLAYER_SUPPLY_FACTION'; payload: { targetFactionId: FactionId, resource: ResourceType, amount: number, pricePerUnit: number } } 
  | { type: 'PLAYER_EXECUTE_FINANCIAL_TACTIC'; payload: { tactic: FinancialTacticType; cost: number; targetTerritoryId?: string; resourceType?: ResourceType; targetMerchantId?: string; } }
  | { type: 'PLAYER_ESTABLISH_INFLUENCE'; payload: { territoryId: string } }
  | { type: 'PLAYER_UPGRADE_INFLUENCE'; payload: { territoryId: string } }
  | { type: 'PLAYER_EXECUTE_ESPIONAGE_ACTION'; payload: { territoryId: string, actionType: EspionageActionType } }
  | { type: 'PLAYER_FUND_SPECIALIZED_BUILDING'; payload: { territoryId: string, buildingType: SpecializedBuildingType, cost: Resources } }
  | { type: 'PLAYER_FUND_FACTION_POLICY'; payload: { policyId: string, amount: number } }
  | { type: 'PLAYER_CONTRIBUTE_WAR_FUNDS'; payload: { warId: string, supportedFactionId: FactionId, amount: number } }
  | { type: 'OPEN_ESPIONAGE_MODAL'; payload: string } 
  | { type: 'CLOSE_ESPIONAGE_MODAL' }
  // Mission actions
  | { type: 'ACCEPT_MISSION'; payload: { missionId: string } }
  | { type: 'ABANDON_MISSION'; payload: { missionId: string } }
  | { type: 'PLAYER_CONTRIBUTE_TO_MISSION'; payload: { missionId: string, resourceType?: ResourceType, amount?: number } }
  // Faction actions
  | { type: 'FACTION_INVEST_TERRITORY'; payload: { territoryId: string; amount: number; factionId: FactionId } } 
  | { type: 'FACTION_RECRUIT_UNITS'; payload: { territoryId: string; units: Partial<ArmyUnits>; factionId: FactionId } }
  | { type: 'FACTION_MOVE_ARMY'; payload: { fromTerritoryId: string; toTerritoryId: string; units: ArmyUnits } }
  | { type: 'FACTION_SET_AUTOMATION_STRATEGY'; payload: { factionId: FactionId; strategy: AutomationStrategy } }
  | { type: 'LOAD_GAME_STATE'; payload: GameState }
  // Internal actions
  | { type: 'UPDATE_FACTION_RELATION'; payload: { factionId: FactionId, change: number, reason?: string } }
  // Delegation actions
  | { type: 'TOGGLE_DELEGATION' }
  | { type: 'TOGGLE_FAVORED_FACTION_DELEGATION' } // New action
  | { type: 'ADD_GAME_EVENT'; payload: { message: string, type: GameEventType } }; // New action for logging from automation
