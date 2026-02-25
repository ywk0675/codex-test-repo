import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { StorageManager } from '../lib/storage';
import { PROVIDERS } from '../lib/apiManager';

const SettingsContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONFIGS':
      return { ...state, apiConfigs: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { apiConfigs: [], loading: true });

  const loadConfigs = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const configs = await StorageManager.getAPIConfigs();
    dispatch({ type: 'SET_CONFIGS', payload: configs });
  }, []);

  useEffect(() => { loadConfigs(); }, [loadConfigs]);

  const saveConfig = useCallback(async (config) => {
    const isNew = !config.id;
    const toSave = {
      ...config,
      id: config.id || crypto.randomUUID(),
      isDefault: isNew && state.apiConfigs.length === 0,
      isActive: true,
      createdAt: config.createdAt || Date.now(),
      settings: config.settings || {
        maxTokens: 1000,
        temperature: 0.7,
        timeout: 30000,
        retryCount: 2,
        rateLimitRPM: 60,
      },
      availableModels: PROVIDERS[config.provider]?.models || [],
    };
    await StorageManager.saveAPIConfig(toSave);
    await loadConfigs();
    return toSave;
  }, [state.apiConfigs.length, loadConfigs]);

  const deleteConfig = useCallback(async (id) => {
    await StorageManager.deleteAPIConfig(id);
    await loadConfigs();
  }, [loadConfigs]);

  const setDefault = useCallback(async (id) => {
    await StorageManager.setDefaultAPI(id);
    await loadConfigs();
  }, [loadConfigs]);

  const toggleActive = useCallback(async (id) => {
    const config = state.apiConfigs.find(c => c.id === id);
    if (!config) return;
    await StorageManager.saveAPIConfig({ ...config, isActive: !config.isActive });
    await loadConfigs();
  }, [state.apiConfigs, loadConfigs]);

  return (
    <SettingsContext.Provider value={{
      ...state,
      saveConfig,
      deleteConfig,
      setDefault,
      toggleActive,
      reload: loadConfigs,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
