import React from 'react';

const STATUS_RING = {
  idle: 'ring-slate-600',
  thinking: 'ring-yellow-400 animate-pulse',
  working: 'ring-indigo-400 animate-pulse',
  done: 'ring-green-400',
  error: 'ring-red-400',
};

const STATUS_LABEL = {
  idle: '대기',
  thinking: '생각 중...',
  working: '작업 중...',
  done: '완료',
  error: '오류',
};

function AgentDesk({ agent, isActive }) {
  const status = agent.status || 'idle';
  return (
    <div className={`
      relative flex flex-col items-center gap-2 p-3 rounded-xl
      bg-slate-800 border border-slate-700 transition-all duration-300
      ${isActive ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : ''}
    `}>
      {/* Desk surface */}
      <div className="w-full h-2 rounded bg-slate-700 mb-1" />

      {/* Avatar */}
      <div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center text-2xl
          ring-2 transition-all duration-300 ${STATUS_RING[status]}
        `}
        style={{ backgroundColor: (agent.color || '#6b7280') + '33' }}
      >
        {agent.emoji}
        {(status === 'thinking' || status === 'working') && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
          </div>
        )}
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="text-xs font-medium text-white leading-tight truncate max-w-[90px]">{agent.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{STATUS_LABEL[status]}</p>
      </div>

      {/* Status dot */}
      <div className={`
        absolute top-2 right-2 w-2 h-2 rounded-full
        ${status === 'done' ? 'bg-green-400' :
          status === 'error' ? 'bg-red-400' :
          status === 'thinking' || status === 'working' ? 'bg-yellow-400 animate-pulse' :
          'bg-slate-600'}
      `} />
    </div>
  );
}

export function OfficeGrid({ agents, activeAgentId }) {
  if (!agents || agents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
        에이전트가 없습니다. 팀을 먼저 생성해주세요.
      </div>
    );
  }

  return (
    <div className="relative bg-slate-950 rounded-2xl p-6 overflow-hidden">
      {/* Office background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Office header */}
      <div className="relative flex items-center gap-2 mb-6">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-slate-500 ml-2">AI Team Office</span>
      </div>

      {/* Agent desks grid */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3">
        {agents.map(agent => (
          <AgentDesk
            key={agent.id}
            agent={agent}
            isActive={agent.id === activeAgentId}
          />
        ))}
      </div>

      {/* Floor decorations */}
      <div className="relative mt-4 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs text-slate-600">🏢 AI Tycoon Office</span>
        <div className="flex-1 h-px bg-slate-800" />
      </div>
    </div>
  );
}
