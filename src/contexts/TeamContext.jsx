import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { StorageManager } from '../lib/storage';

const TeamContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    case 'SET_CURRENT':
      return { ...state, currentTeam: action.payload };
    case 'UPDATE_CURRENT':
      return { ...state, currentTeam: { ...state.currentTeam, ...action.payload } };
    case 'UPDATE_AGENT':
      return {
        ...state,
        currentTeam: {
          ...state.currentTeam,
          agents: state.currentTeam.agents.map(a =>
            a.id === action.payload.id ? { ...a, ...action.payload } : a
          ),
        },
      };
    default:
      return state;
  }
}

export function TeamProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    teams: StorageManager.getTeams(),
    currentTeam: null,
  });

  const loadTeams = useCallback(() => {
    dispatch({ type: 'SET_TEAMS', payload: StorageManager.getTeams() });
  }, []);

  const createTeam = useCallback((teamData) => {
    const team = {
      id: crypto.randomUUID(),
      name: teamData.name || '새 팀',
      description: teamData.description || '',
      agents: teamData.agents || [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      globalSettings: { simulationSpeed: 1, autoSave: true, showSystemMessages: true },
      sessions: [],
    };
    dispatch({ type: 'SET_CURRENT', payload: team });
    return team;
  }, []);

  const saveCurrentTeam = useCallback(() => {
    if (!state.currentTeam) return null;
    const saved = StorageManager.saveTeam(state.currentTeam);
    dispatch({ type: 'SET_CURRENT', payload: saved });
    dispatch({ type: 'SET_TEAMS', payload: StorageManager.getTeams() });
    return saved;
  }, [state.currentTeam]);

  const loadTeam = useCallback((id) => {
    const team = StorageManager.getTeams().find(t => t.id === id);
    if (team) dispatch({ type: 'SET_CURRENT', payload: team });
    return team;
  }, []);

  const deleteTeam = useCallback((id) => {
    StorageManager.deleteTeam(id);
    loadTeams();
  }, [loadTeams]);

  const updateCurrentTeam = useCallback((data) => {
    dispatch({ type: 'UPDATE_CURRENT', payload: data });
  }, []);

  const updateAgent = useCallback((agentData) => {
    dispatch({ type: 'UPDATE_AGENT', payload: agentData });
  }, []);

  return (
    <TeamContext.Provider value={{
      ...state,
      createTeam,
      saveCurrentTeam,
      loadTeam,
      loadTeams,
      deleteTeam,
      updateCurrentTeam,
      updateAgent,
    }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error('useTeam must be used within TeamProvider');
  return ctx;
}
