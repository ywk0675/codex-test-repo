import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AGENT_ROLES } from '../../lib/orchestrator';
import { PROVIDERS } from '../../lib/apiManager';
import { Badge } from '../ui/Badge';

export function AgentCard({ agent, apiConfigs, onUpdate }) {
  const roleInfo = AGENT_ROLES[agent.role] || {};
  const activeConfigs = apiConfigs.filter(c => c.isActive);

  const assignedConfig = activeConfigs.find(c => c.id === agent.assignedAPIId);
  const fallbackConfig = activeConfigs.find(c => c.id === agent.fallbackAPIId);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: (roleInfo.color || '#6b7280') + '22' }}
      >
        {agent.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white truncate">{agent.name}</p>
          <Badge color={roleInfo.color}>{agent.role}</Badge>
        </div>
      </div>

      {/* API Selectors */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">주 API</label>
          <div className="relative">
            <select
              className="appearance-none bg-slate-900 border border-slate-600 rounded-lg px-2 py-1 pr-6 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 min-w-[120px]"
              value={agent.assignedAPIId || ''}
              onChange={e => onUpdate({ ...agent, assignedAPIId: e.target.value || null })}
            >
              <option value="">-- 선택 없음 --</option>
              {activeConfigs.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({PROVIDERS[c.provider]?.badge || c.provider})
                </option>
              ))}
            </select>
            <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Fallback</label>
          <div className="relative">
            <select
              className="appearance-none bg-slate-900 border border-slate-600 rounded-lg px-2 py-1 pr-6 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 min-w-[120px]"
              value={agent.fallbackAPIId || ''}
              onChange={e => onUpdate({ ...agent, fallbackAPIId: e.target.value || null })}
            >
              <option value="">-- 없음 --</option>
              {activeConfigs
                .filter(c => c.id !== agent.assignedAPIId)
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({PROVIDERS[c.provider]?.badge || c.provider})
                  </option>
                ))}
            </select>
            <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
