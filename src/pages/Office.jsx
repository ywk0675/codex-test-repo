import React, { useState, useCallback, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Square, Edit2, Download, RefreshCw } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { OfficeGrid } from '../components/office/OfficeGrid';
import { ActivityLog } from '../components/office/ActivityLog';
import { Button } from '../components/ui/Button';
import { runSimulation } from '../lib/orchestrator';
import { StorageManager } from '../lib/storage';

export default function Office() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { apiConfigs } = useSettings();

  const [team, setTeam] = useState(null);
  const [agents, setAgents] = useState([]);
  const [events, setEvents] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeAgentId, setActiveAgentId] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const teams = StorageManager.getTeams();
    const found = teams.find(t => t.id === teamId);
    if (found) {
      setTeam(found);
      setAgents(found.agents.map(a => ({ ...a, status: 'idle' })));
    }
  }, [teamId]);

  const updateAgentStatus = useCallback((agentId, status) => {
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status } : a));
    setActiveAgentId(agentId);
  }, []);

  const handleStart = useCallback(async () => {
    if (!team || isRunning) return;
    setIsRunning(true);
    setIsComplete(false);
    setEvents([]);
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle' })));
    setActiveAgentId(null);

    const resolvedConfigs = await StorageManager.getAPIConfigs();

    try {
      await runSimulation(team, resolvedConfigs, (event) => {
        setEvents(prev => [...prev, event]);

        if (event.type === 'agent_start' || event.type === 'thinking') {
          updateAgentStatus(event.agentId, 'thinking');
        } else if (event.type === 'agent_done') {
          updateAgentStatus(event.agentId, 'done');
        } else if (event.type === 'error') {
          if (event.agentId) updateAgentStatus(event.agentId, 'error');
        } else if (event.type === 'complete') {
          setActiveAgentId(null);
          setIsComplete(true);
        }
      });
    } catch (err) {
      setEvents(prev => [...prev, {
        type: 'error',
        message: `오류 발생: ${err.message}`,
        timestamp: Date.now(),
      }]);
    } finally {
      setIsRunning(false);
    }
  }, [team, apiConfigs, updateAgentStatus]);

  const handleReset = () => {
    setEvents([]);
    setIsComplete(false);
    setActiveAgentId(null);
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle' })));
  };

  const handleDownload = () => {
    const content = events
      .map(e => `[${new Date(e.timestamp).toLocaleTimeString('ko-KR')}] ${e.message}\n${e.response || ''}`)
      .join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${team?.name || 'simulation'}-log.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!team) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">팀을 찾을 수 없습니다.</p>
          <Link to="/"><Button>홈으로 돌아가기</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm"><ArrowLeft size={16} /></Button>
            </Link>
            <div>
              <h1 className="font-bold text-white">{team.name}</h1>
              <p className="text-xs text-slate-400 truncate max-w-xs">{team.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isComplete && (
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download size={14} /> 로그 저장
              </Button>
            )}
            {(events.length > 0 || isComplete) && !isRunning && (
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw size={14} /> 초기화
              </Button>
            )}
            <Link to={`/team/${team.id}`}>
              <Button variant="outline" size="sm">
                <Edit2 size={14} /> 팀 편집
              </Button>
            </Link>
            <Button
              onClick={handleStart}
              disabled={isRunning}
              size="sm"
            >
              {isRunning ? (
                <><Square size={14} /> 실행 중...</>
              ) : (
                <><Play size={14} /> 일 시작</>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Office grid - left */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Status bar */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-4">
              {[
                { label: '에이전트', value: agents.length },
                { label: '완료', value: agents.filter(a => a.status === 'done').length },
                { label: '이벤트', value: events.length },
                {
                  label: 'API 모드',
                  value: apiConfigs.filter(c => c.isActive).length > 0 ? '실제 API' : '시뮬레이션',
                  color: apiConfigs.filter(c => c.isActive).length > 0 ? 'text-green-400' : 'text-amber-400'
                },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1">
                  <span className="text-slate-500">{s.label}:</span>
                  <span className={s.color || 'text-white font-medium'}>{s.value}</span>
                </div>
              ))}
            </div>
            {isComplete && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                ✓ 완료
              </span>
            )}
          </div>

          {/* Office visualization */}
          <div className="flex-1 overflow-auto">
            <OfficeGrid agents={agents} activeAgentId={activeAgentId} />
          </div>

          {/* Tip when idle */}
          {!isRunning && events.length === 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 py-4">
              <Play size={14} />
              위의 "일 시작" 버튼을 눌러 시뮬레이션을 시작하세요
            </div>
          )}
        </div>

        {/* Activity log - right */}
        <div className="w-96 flex-shrink-0 flex flex-col">
          <ActivityLog events={events} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}
