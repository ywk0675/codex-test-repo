import React from 'react';
import { Edit2, Trash2, Star, StarOff, Power, PowerOff } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PROVIDERS } from '../../lib/apiManager';

export function APICard({ config, onEdit, onDelete, onSetDefault, onToggleActive }) {
  const provider = PROVIDERS[config.provider];

  return (
    <div className={`
      relative rounded-xl border p-4 transition-all duration-200
      ${config.isActive
        ? 'bg-slate-800/80 border-slate-600 hover:border-slate-500'
        : 'bg-slate-900/50 border-slate-700/50 opacity-60'
      }
    `}>
      {config.isDefault && (
        <div className="absolute top-3 right-3">
          <Badge color="#f59e0b">기본</Badge>
        </div>
      )}

      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{ backgroundColor: (provider?.color || '#6b7280') + '22', color: provider?.color || '#6b7280' }}
        >
          {provider?.badge?.[0] || '?'}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-white truncate">{config.name}</h3>
          <p className="text-xs text-slate-400 truncate">{config.model}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge color={provider?.color}>{provider?.label || config.provider}</Badge>
        <span className="text-xs text-slate-500 font-mono">{config.apiKeyMasked}</span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <Button size="sm" variant="ghost" onClick={() => onEdit(config)} className="text-slate-400">
          <Edit2 size={12} /> 편집
        </Button>
        {!config.isDefault && (
          <Button size="sm" variant="ghost" onClick={() => onSetDefault(config.id)} className="text-slate-400">
            <Star size={12} /> 기본 설정
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onToggleActive(config.id)}
          className={config.isActive ? 'text-green-400' : 'text-slate-500'}
        >
          {config.isActive ? <Power size={12} /> : <PowerOff size={12} />}
          {config.isActive ? '활성' : '비활성'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(config.id)}
          className="text-red-400 hover:text-red-300 ml-auto"
        >
          <Trash2 size={12} />
        </Button>
      </div>
    </div>
  );
}
