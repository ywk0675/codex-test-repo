import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, Zap } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { PROVIDERS, testConnection } from '../../lib/apiManager';

const EMPTY_FORM = {
  provider: 'anthropic',
  name: '',
  apiKey: '',
  model: '',
  baseURL: '',
};

export function APIFormDialog({ open, onClose, onSave, editConfig }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (editConfig) {
        setForm({
          provider: editConfig.provider,
          name: editConfig.name,
          apiKey: editConfig.apiKey || '',
          model: editConfig.model,
          baseURL: editConfig.baseURL || '',
        });
      } else {
        setForm({ ...EMPTY_FORM, model: PROVIDERS['anthropic'].defaultModel });
      }
      setTestResult(null);
    }
  }, [open, editConfig]);

  const set = (key, val) => {
    setForm(f => {
      const next = { ...f, [key]: val };
      if (key === 'provider') {
        next.model = PROVIDERS[val]?.defaultModel || '';
        if (!next.name) next.name = PROVIDERS[val]?.label || '';
      }
      return next;
    });
    setTestResult(null);
  };

  const handleTest = async () => {
    if (!form.apiKey) return;
    setTesting(true);
    setTestResult(null);
    const config = { ...form, id: editConfig?.id || 'test' };
    const result = await testConnection(config);
    setTestResult(result);
    setTesting(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.apiKey || !form.model) return;
    setSaving(true);
    await onSave({
      ...editConfig,
      ...form,
      model: form.model,
    });
    setSaving(false);
    onClose();
  };

  const providerInfo = PROVIDERS[form.provider];
  const models = providerInfo?.models || [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editConfig ? 'API 설정 편집' : '새 API 추가'}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        <Select
          label="API 제공자"
          value={form.provider}
          onChange={e => set('provider', e.target.value)}
        >
          {Object.entries(PROVIDERS).map(([key, p]) => (
            <option key={key} value={key}>{p.label}</option>
          ))}
        </Select>

        <Input
          label="이름 (사용자 지정)"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder={providerInfo?.label || 'API 이름'}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">API 키</label>
          <div className="flex gap-2">
            <input
              type="password"
              value={form.apiKey}
              onChange={e => set('apiKey', e.target.value)}
              placeholder="sk-..."
              className="flex-1 rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleTest}
              disabled={!form.apiKey || testing}
            >
              {testing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
              테스트
            </Button>
          </div>
          {testResult && (
            <div className={`flex items-center gap-2 text-xs mt-1 ${testResult.success ? 'text-green-400' : 'text-red-400'}`}>
              {testResult.success ? <CheckCircle size={12} /> : <XCircle size={12} />}
              {testResult.success ? `연결 성공: ${testResult.message}` : `연결 실패: ${testResult.message}`}
            </div>
          )}
        </div>

        {models.length > 0 ? (
          <Select
            label="모델"
            value={form.model}
            onChange={e => set('model', e.target.value)}
          >
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </Select>
        ) : (
          <Input
            label="모델 이름"
            value={form.model}
            onChange={e => set('model', e.target.value)}
            placeholder="예: gpt-4o, llama-3..."
          />
        )}

        {(form.provider === 'custom' || form.provider === 'moonshot') && (
          <Input
            label={`Base URL${form.provider === 'custom' ? ' (필수)' : ' (선택)'}`}
            value={form.baseURL}
            onChange={e => set('baseURL', e.target.value)}
            placeholder="https://api.example.com/v1/chat/completions"
          />
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>취소</Button>
          <Button
            onClick={handleSave}
            disabled={!form.name || !form.apiKey || !form.model || saving}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            저장
          </Button>
        </div>
      </div>
    </Modal>
  );
}
