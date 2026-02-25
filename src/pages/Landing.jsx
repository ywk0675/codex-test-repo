import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Users, Play, Trash2, Clock } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useTeam } from '../contexts/TeamContext';
import { Button } from '../components/ui/Button';

const FEATURES = [
  {
    icon: '🔑',
    title: '멀티 API 지원',
    desc: 'Claude, Gemini, Kimi, GPT-4 등 여러 LLM API를 등록하고 에이전트별로 최적의 모델을 선택하세요.',
  },
  {
    icon: '🤖',
    title: '자동 팀 구성',
    desc: '업무 설명만 입력하면 AI가 자동으로 필요한 에이전트 팀을 구성하고 역할을 분배합니다.',
  },
  {
    icon: '🏢',
    title: '가상 오피스 시각화',
    desc: '2D 오피스에서 AI 직원들이 실시간으로 협업하는 과정을 생동감 있게 시각화합니다.',
  },
  {
    icon: '🔄',
    title: '자동 Fallback',
    desc: '주 API 실패 시 백업 API로 자동 전환하여 끊김 없는 작업 진행을 보장합니다.',
  },
];

function TeamCard({ team, onDelete }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700 group">
      <div className="flex -space-x-2">
        {team.agents.slice(0, 3).map(a => (
          <div
            key={a.id}
            className="w-8 h-8 rounded-full flex items-center justify-center text-base border-2 border-slate-800"
            style={{ backgroundColor: (a.color || '#6b7280') + '33' }}
          >
            {a.emoji}
          </div>
        ))}
        {team.agents.length > 3 && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-slate-700 border-2 border-slate-800 text-slate-400">
            +{team.agents.length - 3}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{team.name}</p>
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <Clock size={10} />
          {new Date(team.updatedAt).toLocaleDateString('ko-KR')}
        </p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to={`/office/${team.id}`}>
          <Button size="sm" variant="secondary">
            <Play size={12} /> 실행
          </Button>
        </Link>
        <button
          onClick={() => onDelete(team.id)}
          className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

export default function Landing() {
  const { apiConfigs } = useSettings();
  const { teams, deleteTeam } = useTeam();

  const activeAPIs = apiConfigs.filter(c => c.isActive).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold">AI</div>
            <span className="font-bold text-lg">Tycoon Maker</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/settings">
              <Button variant="outline" size="sm">
                <Settings size={14} /> API 설정
                {activeAPIs > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-indigo-600 text-xs">{activeAPIs}</span>
                )}
              </Button>
            </Link>
            <Link to="/team/new">
              <Button size="sm">
                <Users size={14} /> 팀 만들기
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6">
          ✨ 멀티 에이전트 오피스 시뮬레이션
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent leading-tight">
          AI 팀을 구성하고<br />함께 일하게 하세요
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          자연어로 업무를 설명하면, AI가 자동으로 팀을 구성하고 가상 오피스에서
          각 에이전트가 협업하여 결과물을 만들어냅니다.
        </p>

        {activeAPIs === 0 ? (
          <div className="flex flex-col items-center gap-3">
            <Link to="/settings">
              <Button size="lg">
                <Settings size={18} /> API 키 등록하기
              </Button>
            </Link>
            <p className="text-sm text-slate-500">시작하려면 최소 1개의 API를 등록해주세요</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <Link to="/team/new">
              <Button size="lg">
                <Users size={18} /> 새 팀 만들기
              </Button>
            </Link>
            <Link to="/settings">
              <Button size="lg" variant="secondary">
                <Settings size={18} /> API 관리 ({activeAPIs}개)
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Teams */}
      {teams.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">최근 팀</h2>
            <Link to="/team/new">
              <Button size="sm" variant="ghost">새 팀 만들기 →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {teams.slice(0, 6).map(team => (
              <TeamCard key={team.id} team={team} onDelete={deleteTeam} />
            ))}
          </div>
        </div>
      )}

      {/* API status banner */}
      {activeAPIs === 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-medium text-amber-400">API가 등록되지 않았습니다</p>
              <p className="text-xs text-amber-400/70 mt-0.5">
                API 없이도 시뮬레이션 모드로 테스트할 수 있지만, 실제 AI 응답을 받으려면 API 키가 필요합니다.
              </p>
            </div>
            <Link to="/settings" className="ml-auto flex-shrink-0">
              <Button size="sm" variant="outline">등록하기</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
