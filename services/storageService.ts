
import { Ingredient, UserSettings, Theme } from '../types';

const KEYS = {
  PANTRY: 'zp_pantry',
  SETTINGS: 'zp_settings',
  IMPACT: 'zp_impact'
};

export const backend = {
  // Mock API Endpoints
  getPantry: async (): Promise<Ingredient[]> => {
    const data = localStorage.getItem(KEYS.PANTRY);
    return data ? JSON.parse(data) : [];
  },

  savePantry: async (ingredients: Ingredient[]): Promise<void> => {
    localStorage.setItem(KEYS.PANTRY, JSON.stringify(ingredients));
  },

  getSettings: async (): Promise<UserSettings> => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { theme: 'system', notificationsEnabled: true, wasteThreshold: 10 };
  },

  updateSettings: async (settings: Partial<UserSettings>): Promise<UserSettings> => {
    const current = await backend.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }
};
