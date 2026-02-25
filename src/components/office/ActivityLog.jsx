import React, { useEffect, useRef } from 'react';

const EVENT_STYLES = {
  start: 'text-indigo-400',
  agent_start: 'text-slate-300',
  thinking: 'text-yellow-400',
  agent_done: 'text-green-400',
  fallback: 'text-orange-400',
  info: 'text-blue-400',
  complete: 'text-emerald-400',
  error: 'text-red-400',
};

// Simple markdown renderer
function SimpleMarkdown({ children }) {
  if (!children) return null;
  // Basic rendering: bold, code blocks, line breaks
  const lines = children.split('\n');
  return (
    <div className="text-xs text-slate-300 leading-relaxed space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith('```')) return null;
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-semibold text-white">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <p key={i} className="pl-2">{line}</p>;
        }
        if (!line.trim()) return <div key={i} className="h-1" />;
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}

function LogEntrySimple({ event }) {
  const style = EVENT_STYLES[event.type] || 'text-slate-300';
  const time = new Date(event.timestamp).toLocaleTimeString('ko-KR', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  return (
    <div className="border-b border-slate-800/50 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xs text-slate-600 font-mono flex-shrink-0">{time}</span>
        <span className={`text-sm font-medium ${style}`}>{event.message}</span>
      </div>
      {event.response && (
        <div className="mt-2 ml-4 pl-3 border-l-2 border-slate-700">
          <SimpleMarkdown>{event.response}</SimpleMarkdown>
        </div>
      )}
    </div>
  );
}

export function ActivityLog({ events, isRunning }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events]);

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-sm font-medium text-white">활동 로그</span>
        </div>
        <span className="text-xs text-slate-500">{events.length}개 이벤트</span>
      </div>

      {/* Log entries */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="text-3xl mb-3">💬</div>
            <p className="text-slate-500 text-sm">에이전트 활동 로그가 여기에 표시됩니다.</p>
            <p className="text-slate-600 text-xs mt-1">"일 시작" 버튼을 눌러 시뮬레이션을 시작하세요.</p>
          </div>
        ) : (
          events.map((event, i) => (
            <LogEntrySimple key={i} event={event} />
          ))
        )}
        {isRunning && (
          <div className="flex items-center gap-2 text-slate-500 text-xs py-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>처리 중...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
