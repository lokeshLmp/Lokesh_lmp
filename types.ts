
export enum Urgency {
  CRITICAL = 'CRITICAL', 
  HIGH = 'HIGH',         
  MEDIUM = 'MEDIUM',     
  LOW = 'LOW'            
}

export type Theme = 'light' | 'dark' | 'system';

export interface UserSettings {
  theme: Theme;
  notificationsEnabled: boolean;
  wasteThreshold: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  expiryDate: string;
  urgency: Urgency;
  confidence: number; 
  isLocked: boolean; 
  category: 'Produce' | 'Protein' | 'Dairy' | 'Pantry' | 'Grains' | 'Other';
}

export interface MealPlan {
  id: string;
  timestamp: string;
  meals: Meal[];
  wasteAvoidedKg: number;
  monetarySaving: number;
  carbonSavedKg: number;
  zeroPointScore: number;
  requiredShopping: ShoppingItem[];
}

export interface Meal {
  day: number;
  slot: 'Breakfast' | 'Lunch' | 'Dinner';
  recipeName: string;
  usedIngredients: string[];
  substitutions: { original: string; replacedWith: string }[];
  confidence: number;
  executionNote?: string;
}

export interface ShoppingItem {
  name: string;
  necessity: 'High' | 'Low';
  reason: string;
}

export interface ImpactStats {
  totalWasteSavedKg: number;
  totalMoneySaved: number;
  totalCarbonSavedKg: number;
  efficiencyTrend: number[];
}

export interface VisionResult {
  name: string;
  suggestedQuantity: string;
  estimatedExpiryDays: number;
  confidence: number;
  category: string;
}
