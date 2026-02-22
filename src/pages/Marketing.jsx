import React, { useState, useRef, useCallback } from 'react';
import BottomNav from '../components/BottomNav';

const AGENTS = [
  {
    id: 'strategist',
    name: '마케팅 전략가',
    role: 'Marketing Strategist',
    icon: 'target',
    color: 'indigo',
    bgClass: 'bg-indigo-50 dark:bg-indigo-900/20',
    textClass: 'text-indigo-600 dark:text-indigo-400',
    borderClass: 'border-indigo-200 dark:border-indigo-800',
    badgeClass: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
    description: '타겟 오디언스, 핵심 메시지, 채널 전략 수립',
  },
  {
    id: 'copywriter',
    name: '카피라이터',
    role: 'Copywriter',
    icon: 'edit_note',
    color: 'blue',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    textClass: 'text-blue-600 dark:text-blue-400',
    borderClass: 'border-blue-200 dark:border-blue-800',
    badgeClass: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    description: '캐치프레이즈, 헤드라인, 바디 카피, CTA 작성',
  },
  {
    id: 'social',
    name: 'SNS 전문가',
    role: 'Social Media Specialist',
    icon: 'trending_up',
    color: 'pink',
    bgClass: 'bg-pink-50 dark:bg-pink-900/20',
    textClass: 'text-pink-600 dark:text-pink-400',
    borderClass: 'border-pink-200 dark:border-pink-800',
    badgeClass: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
    description: '인스타그램, 트위터, 카카오 채널 콘텐츠 제작',
  },
  {
    id: 'creative',
    name: '크리에이티브 디렉터',
    role: 'Creative Director',
    icon: 'palette',
    color: 'violet',
    bgClass: 'bg-violet-50 dark:bg-violet-900/20',
    textClass: 'text-violet-600 dark:text-violet-400',
    borderClass: 'border-violet-200 dark:border-violet-800',
    badgeClass: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    description: '비주얼 컨셉, 컬러 팔레트, 톤앤매너 설계',
  },
];

const EXAMPLE_TASKS = [
  '새로 오픈한 강남 브런치 카페 "모닝글로우"를 인스타그램 감성으로 홍보하고 싶어요. 20-30대 직장인 여성이 타겟이에요.',
  '친환경 텀블러 브랜드 "에코컵" 신제품 출시 마케팅. 환경에 관심 있는 MZ세대 공략.',
  '온라인 영어 회화 앱 "스피크업" 구독자 모집 캠페인. 직장인 대상 실용 영어 강조.',
];

// Renders markdown-like text with bold/headers highlighted
function AgentOutput({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {lines.map((line, i) => {
        if (line.startsWith('## ') || line.startsWith('# ')) {
          return (
            <p key={i} className="font-bold text-slate-900 dark:text-white mt-3 first:mt-0">
              {line.replace(/^#+\s/, '')}
            </p>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={i} className="font-semibold text-slate-800 dark:text-slate-200">
              {line.slice(2, -2)}
            </p>
          );
        }
        // Inline bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className={line === '' ? 'h-2' : ''}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j} className="font-semibold text-slate-800 dark:text-slate-200">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

function AgentCard({ agent, status, output }) {
  const [expanded, setExpanded] = useState(true);
  const isDone = status === 'complete';
  const isRunning = status === 'running';

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isDone
          ? `${agent.borderClass} bg-white dark:bg-surface-dark shadow-sm`
          : isRunning
          ? `${agent.borderClass} bg-white dark:bg-surface-dark shadow-md ring-1 ${agent.borderClass}`
          : 'border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-surface-dark/50'
      }`}
    >
      {/* Header */}
      <button
        className="w-full flex items-center gap-3 p-4 text-left"
        onClick={() => isDone && setExpanded((v) => !v)}
      >
        <div
          className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            isRunning || isDone ? agent.bgClass : 'bg-slate-100 dark:bg-slate-800'
          }`}
        >
          {isRunning ? (
            <span className={`material-symbols-outlined text-xl animate-pulse ${agent.textClass}`}>
              {agent.icon}
            </span>
          ) : (
            <span
              className={`material-symbols-outlined text-xl ${
                isDone ? agent.textClass : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {isDone ? agent.icon : 'hourglass_empty'}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-bold ${
                isDone || isRunning ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {agent.name}
            </span>
            {isRunning && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium animate-pulse ${agent.badgeClass}`}>
                작업 중...
              </span>
            )}
            {isDone && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                완료
              </span>
            )}
          </div>
          <p className={`text-xs mt-0.5 ${isDone || isRunning ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-700'}`}>
            {agent.description}
          </p>
        </div>

        {isDone && (
          <span className="material-symbols-outlined text-slate-400 text-lg flex-shrink-0">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
        )}
      </button>

      {/* Output */}
      {(isRunning || (isDone && expanded)) && output && (
        <div className={`px-4 pb-4 border-t ${agent.borderClass}`}>
          <div className="pt-3">
            <AgentOutput text={output} />
            {isRunning && (
              <span className="inline-block w-0.5 h-4 bg-slate-400 animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const Marketing = () => {
  const [task, setTask] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [agentStatuses, setAgentStatuses] = useState({});
  const [agentOutputs, setAgentOutputs] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const reset = useCallback(() => {
    setAgentStatuses({});
    setAgentOutputs({});
    setIsDone(false);
    setError(null);
  }, []);

  const runAgents = useCallback(async () => {
    if (!task.trim() || isRunning) return;

    reset();
    setIsRunning(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/marketing/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || '서버 오류가 발생했습니다.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          let event;
          try {
            event = JSON.parse(raw);
          } catch {
            continue;
          }

          if (event.type === 'agent_start') {
            setAgentStatuses((prev) => ({ ...prev, [event.agentId]: 'running' }));
          } else if (event.type === 'agent_delta') {
            setAgentOutputs((prev) => ({
              ...prev,
              [event.agentId]: (prev[event.agentId] || '') + event.text,
            }));
          } else if (event.type === 'agent_complete') {
            setAgentStatuses((prev) => ({ ...prev, [event.agentId]: 'complete' }));
          } else if (event.type === 'all_complete') {
            setIsDone(true);
          } else if (event.type === 'error') {
            throw new Error(event.message);
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || '알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsRunning(false);
    }
  }, [task, isRunning, reset]);

  const handleStop = () => {
    if (abortRef.current) abortRef.current.abort();
    setIsRunning(false);
  };

  const handleNewTask = () => {
    handleStop();
    reset();
    setTask('');
  };

  const hasStarted = Object.keys(agentStatuses).length > 0;

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 pt-6 pb-3 sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <span className="material-symbols-outlined text-white text-xl">groups</span>
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">AI 마케팅 팀</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">4명의 전문 에이전트가 광고물을 제작합니다</p>
        </div>
        {hasStarted && (
          <button
            onClick={handleNewTask}
            className="ml-auto text-xs font-semibold text-primary hover:text-blue-400 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            새 작업
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-28 hide-scrollbar">
        {/* Task Input */}
        {!hasStarted && (
          <section className="space-y-3">
            {/* Team intro */}
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl p-4 border border-violet-100 dark:border-violet-800">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-500 dark:text-violet-400 mb-3">에이전트 팀 구성</p>
              <div className="grid grid-cols-2 gap-2">
                {AGENTS.map((agent) => (
                  <div key={agent.id} className={`flex items-center gap-2 p-2 rounded-xl ${agent.bgClass}`}>
                    <span className={`material-symbols-outlined text-base ${agent.textClass}`}>{agent.icon}</span>
                    <span className={`text-xs font-semibold ${agent.textClass}`}>{agent.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Task input */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 space-y-3">
              <label className="text-sm font-bold text-slate-900 dark:text-white">마케팅 태스크 입력</label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="어떤 제품/서비스를 홍보하고 싶으신가요? 타겟, 목표, 특징을 자유롭게 설명해주세요."
                rows={4}
                className="w-full resize-none text-sm bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{task.length}자</span>
                <span>Ctrl+Enter로 실행</span>
              </div>
            </div>

            {/* Example tasks */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">예시 태스크</p>
              {EXAMPLE_TASKS.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setTask(example)}
                  className="w-full text-left text-xs p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Task summary (when running) */}
        {hasStarted && (
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">마케팅 태스크</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{task}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <span className="material-symbols-outlined text-red-500 text-xl flex-shrink-0">error</span>
            <div>
              <p className="text-sm font-bold text-red-700 dark:text-red-400">오류 발생</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{error}</p>
              {error.includes('API') || error.includes('key') ? (
                <p className="text-xs text-red-500 dark:text-red-500 mt-1">
                  서버에 ANTHROPIC_API_KEY가 설정되어 있는지 확인하세요.
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* Agent cards */}
        {hasStarted && (
          <div className="space-y-3">
            {AGENTS.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                status={agentStatuses[agent.id] || 'pending'}
                output={agentOutputs[agent.id] || ''}
              />
            ))}
          </div>
        )}

        {/* Done banner */}
        {isDone && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <span className="material-symbols-outlined text-green-500 text-2xl">check_circle</span>
            <div>
              <p className="text-sm font-bold text-green-700 dark:text-green-400">마케팅 패키지 완성!</p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
                4명의 에이전트가 완성한 마케팅 자료를 확인하세요.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom action area */}
      <div className="fixed bottom-[80px] left-0 right-0 px-4 pb-2 z-30">
        {!hasStarted ? (
          <button
            onClick={runAgents}
            disabled={!task.trim() || isRunning}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-700 dark:disabled:to-slate-700 text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-violet-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
            <span>에이전트 팀 가동하기</span>
          </button>
        ) : isRunning ? (
          <button
            onClick={handleStop}
            className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-4 px-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">stop_circle</span>
            <span>중지</span>
          </button>
        ) : null}
      </div>

      <BottomNav />
    </div>
  );
};

export default Marketing;
