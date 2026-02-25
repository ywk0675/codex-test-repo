import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowLeft, Loader2, Key } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { APICard } from '../components/settings/APICard';
import { APIFormDialog } from '../components/settings/APIFormDialog';
import { Button } from '../components/ui/Button';

export default function Settings() {
  const { apiConfigs, loading, saveConfig, deleteConfig, setDefault, toggleActive } = useSettings();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editConfig, setEditConfig] = useState(null);

  const openAdd = () => { setEditConfig(null); setDialogOpen(true); };
  const openEdit = (config) => { setEditConfig(config); setDialogOpen(true); };
  const handleClose = () => { setDialogOpen(false); setEditConfig(null); };

  const handleDelete = async (id) => {
    if (window.confirm('이 API 설정을 삭제하시겠습니까?')) {
      await deleteConfig(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Key size={20} className="text-indigo-400" />
              <h1 className="text-xl font-bold">API 설정</h1>
            </div>
          </div>
          <Button onClick={openAdd}>
            <Plus size={16} /> API 추가
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Info banner */}
        <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300 font-medium mb-1">🔒 보안 안내</p>
          <p className="text-xs text-blue-300/70">
            API 키는 브라우저의 Web Crypto API(AES-GCM)로 암호화되어 로컬에 저장됩니다.
            서버로 전송되지 않으며, 세션 종료 시 마스터 키가 초기화됩니다.
            일부 API는 CORS 정책으로 인해 브라우저에서 직접 호출이 제한될 수 있습니다.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-indigo-400" />
          </div>
        ) : apiConfigs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🔑</div>
            <h2 className="text-xl font-semibold text-white mb-2">API가 등록되지 않았습니다</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Claude, Gemini, Kimi 등 AI API를 등록하면 에이전트들이 실제 AI 모델을 사용합니다.
              등록하지 않아도 시뮬레이션 모드로 테스트할 수 있습니다.
            </p>
            <Button onClick={openAdd}>
              <Plus size={16} /> 첫 API 등록하기
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400">
                {apiConfigs.length}개 API 등록됨 · {apiConfigs.filter(c => c.isActive).length}개 활성
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {apiConfigs.map(config => (
                <APICard
                  key={config.id}
                  config={config}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onSetDefault={setDefault}
                  onToggleActive={toggleActive}
                />
              ))}
            </div>

            {/* Provider recommendation */}
            <div className="mt-8 p-5 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="font-semibold text-white mb-3">API 선택 가이드</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { badge: 'Claude', color: '#d97706', roles: 'PM, 리뷰어, 개발자', strength: '복잡한 추론, 코드 품질' },
                  { badge: 'Gemini', color: '#2563eb', roles: '리서처, 문서화', strength: '대용량 컨텍스트, 비용 효율' },
                  { badge: 'Kimi', color: '#7c3aed', roles: '한국어 작가', strength: '한국어 자연스러움, 저렴' },
                  { badge: 'GPT', color: '#16a34a', roles: '범용 어시스턴트', strength: '툴 사용, 범용성' },
                ].map(item => (
                  <div key={item.badge} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: item.color + '22', color: item.color }}
                    >
                      {item.badge}
                    </span>
                    <div>
                      <p className="text-slate-300 text-xs font-medium">{item.roles}</p>
                      <p className="text-slate-500 text-xs">{item.strength}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <APIFormDialog
        open={dialogOpen}
        onClose={handleClose}
        onSave={saveConfig}
        editConfig={editConfig}
      />
    </div>
  );
}
