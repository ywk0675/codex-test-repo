import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Play, Users, AlertCircle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useTeam } from '../contexts/TeamContext';
import { generateAgentsFromDescription, AGENT_ROLES } from '../lib/orchestrator';
import { suggestAPIForRole } from '../lib/apiManager';
import { AgentCard } from '../components/team/AgentCard';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { StorageManager } from '../lib/storage';

export default function TeamCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiConfigs } = useSettings();
  const { currentTeam, createTeam, loadTeam, updateCurrentTeam, updateAgent, saveCurrentTeam } = useTeam();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agents, setAgents] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      const team = loadTeam(id);
      if (team) {
        setName(team.name);
        setDescription(team.description);
        setAgents(team.agents);
      }
    } else {
      createTeam({ name: '', description: '', agents: [] });
    }
  }, [id]);

  const activeAPIConfigs = apiConfigs.filter(c => c.isActive);

  const handleGenerate = () => {
    if (!description.trim()) return;
    setGenerating(true);

    setTimeout(() => {
      const generated = generateAgentsFromDescription(description, activeAPIConfigs);
      const withAPIs = generated.map(agent => ({
        ...agent,
        assignedAPIId: suggestAPIForRole(agent.role, activeAPIConfigs),
        fallbackAPIId: null,
      }));

      // Suggest fallback = second best API
      const withFallback = withAPIs.map(agent => {
        const primary = agent.assignedAPIId;
        const fallback = activeAPIConfigs
          .filter(c => c.id !== primary)
          .find(c => c.isActive);
        return { ...agent, fallbackAPIId: fallback?.id || null };
      });

      setAgents(withFallback);
      if (!name) {
        const taskWords = description.split(' ').slice(0, 3).join(' ');
        setName(taskWords + ' 팀');
      }
      setGenerating(false);
    }, 800);
  };

  const handleUpdateAgent = (updated) => {
    setAgents(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleSaveAndGo = async () => {
    if (!name || agents.length === 0) return;
    setSaving(true);

    updateCurrentTeam({ name, description, agents });

    // Small delay to ensure state update
    await new Promise(r => setTimeout(r, 50));

    const saved = saveCurrentTeam();

    // Save directly to ensure persistence
    const teamToSave = {
      id: currentTeam?.id || crypto.randomUUID(),
      name,
      description,
      agents,
      createdAt: currentTeam?.createdAt || Date.now(),
      updatedAt: Date.now(),
      globalSettings: { simulationSpeed: 1, autoSave: true, showSystemMessages: true },
      sessions: [],
    };
    const savedTeam = StorageManager.saveTeam(teamToSave);

    setSaving(false);
    navigate(`/office/${savedTeam.id}`);
  };

  const exampleTasks = [
    '쇼핑몰 앱을 위한 상품 추천 알고리즘을 개발해주세요',
    '경쟁사 분석 보고서를 작성해주세요',
    '회사 소개 랜딩 페이지 디자인 및 개발',
    '월간 마케팅 성과 데이터 분석 및 인사이트 도출',
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm"><ArrowLeft size={16} /></Button>
            </Link>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-indigo-400" />
              <h1 className="text-xl font-bold">{id && id !== 'new' ? '팀 편집' : '새 팀 만들기'}</h1>
            </div>
          </div>
          {agents.length > 0 && (
            <Button onClick={handleSaveAndGo} disabled={!name || saving}>
              <Play size={16} />
              {saving ? '저장 중...' : '오피스로 이동'}
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* API warning */}
        {activeAPIConfigs.length === 0 && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-400">API가 등록되지 않았습니다</p>
              <p className="text-xs text-amber-400/70 mt-1">
                시뮬레이션 모드로 테스트할 수 있습니다.{' '}
                <Link to="/settings" className="underline">API 등록하기 →</Link>
              </p>
            </div>
          </div>
        )}

        {/* Team info */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <h2 className="font-semibold text-white">팀 기본 정보</h2>
          <Input
            label="팀 이름"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="예: 커머스 개발팀"
          />
        </div>

        {/* Task description */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <h2 className="font-semibold text-white">업무 설명</h2>
          <Textarea
            label="어떤 업무를 진행하나요?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="자연어로 업무를 설명해주세요. AI가 자동으로 필요한 에이전트 팀을 구성합니다."
            rows={4}
          />

          {/* Example tasks */}
          {!description && (
            <div>
              <p className="text-xs text-slate-500 mb-2">예시:</p>
              <div className="flex flex-wrap gap-2">
                {exampleTasks.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setDescription(t)}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-indigo-300 transition-colors"
                  >
                    {t.length > 30 ? t.slice(0, 30) + '...' : t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!description.trim() || generating}
            variant="secondary"
          >
            <Sparkles size={16} className={generating ? 'animate-spin' : ''} />
            {generating ? '에이전트 생성 중...' : '에이전트 자동 생성'}
          </Button>
        </div>

        {/* Generated agents */}
        {agents.length > 0 && (
          <div className="space-y-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">생성된 에이전트 ({agents.length}명)</h2>
              <Button variant="ghost" size="sm" onClick={handleGenerate}>
                <Sparkles size={12} /> 재생성
              </Button>
            </div>

            {activeAPIConfigs.length === 0 && (
              <p className="text-xs text-slate-500">API 미등록 — 시뮬레이션 모드로 실행됩니다</p>
            )}

            <div className="space-y-2">
              {agents.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  apiConfigs={apiConfigs}
                  onUpdate={handleUpdateAgent}
                />
              ))}
            </div>

            {/* Role legend */}
            <div className="mt-2 p-3 rounded-lg bg-slate-800/50 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {agents.map(a => {
                const info = AGENT_ROLES[a.role];
                return (
                  <div key={a.id} className="flex items-center gap-1.5 text-xs">
                    <span>{a.emoji}</span>
                    <span className="text-slate-400 truncate">{a.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSaveAndGo} disabled={!name || saving}>
                <Play size={16} />
                {saving ? '저장 중...' : '저장 후 오피스로 이동'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
