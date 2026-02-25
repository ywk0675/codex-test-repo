import { encryptAPIKey, decryptAPIKey, maskAPIKey } from './crypto';

const API_CONFIGS_KEY = 'ai_tycoon_api_configs';
const TEAMS_KEY = 'ai_tycoon_teams';

export class StorageManager {
  // ── API Configs ──────────────────────────────────────────────────────────────

  static getRawConfigs() {
    try {
      return JSON.parse(localStorage.getItem(API_CONFIGS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  static async saveAPIConfig(config) {
    const configs = this.getRawConfigs();
    const encrypted = await encryptAPIKey(config.apiKey);
    const stored = {
      ...config,
      apiKey: encrypted,
      apiKeyMasked: maskAPIKey(config.apiKey),
      updatedAt: Date.now(),
    };
    const idx = configs.findIndex(c => c.id === config.id);
    if (idx >= 0) configs[idx] = stored;
    else configs.push(stored);
    localStorage.setItem(API_CONFIGS_KEY, JSON.stringify(configs));
  }

  static async getAPIConfigs() {
    const configs = this.getRawConfigs();
    return Promise.all(
      configs.map(async c => ({ ...c, apiKey: await decryptAPIKey(c.apiKey) }))
    );
  }

  static async deleteAPIConfig(id) {
    const configs = this.getRawConfigs().filter(c => c.id !== id);
    localStorage.setItem(API_CONFIGS_KEY, JSON.stringify(configs));
  }

  static async setDefaultAPI(id) {
    const configs = this.getRawConfigs().map(c => ({ ...c, isDefault: c.id === id }));
    localStorage.setItem(API_CONFIGS_KEY, JSON.stringify(configs));
  }

  // ── Teams ────────────────────────────────────────────────────────────────────

  static getTeams() {
    try {
      return JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  static saveTeam(team) {
    const teams = this.getTeams();
    const updated = { ...team, updatedAt: Date.now() };
    const idx = teams.findIndex(t => t.id === team.id);
    if (idx >= 0) teams[idx] = updated;
    else teams.push(updated);
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
    return updated;
  }

  static deleteTeam(id) {
    const teams = this.getTeams().filter(t => t.id !== id);
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
  }
}
