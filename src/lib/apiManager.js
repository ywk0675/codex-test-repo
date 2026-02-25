export const PROVIDERS = {
  anthropic: {
    label: 'Anthropic (Claude)',
    models: ['claude-opus-4-6', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001'],
    defaultModel: 'claude-sonnet-4-6',
    color: '#d97706',
    badge: 'Claude',
  },
  google: {
    label: 'Google (Gemini)',
    models: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    defaultModel: 'gemini-2.0-flash',
    color: '#2563eb',
    badge: 'Gemini',
  },
  moonshot: {
    label: 'Moonshot (Kimi)',
    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
    defaultModel: 'moonshot-v1-8k',
    color: '#7c3aed',
    badge: 'Kimi',
  },
  openai: {
    label: 'OpenAI (GPT)',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
    defaultModel: 'gpt-4o-mini',
    color: '#16a34a',
    badge: 'GPT',
  },
  custom: {
    label: 'Custom API',
    models: [],
    defaultModel: '',
    color: '#6b7280',
    badge: 'Custom',
  },
};

export const ROLE_API_AFFINITY = {
  pm: ['anthropic', 'openai'],
  reviewer: ['anthropic', 'openai'],
  researcher: ['google', 'anthropic'],
  documentation: ['google', 'moonshot'],
  developer: ['anthropic', 'openai'],
  designer: ['anthropic', 'google'],
  writer: ['moonshot', 'anthropic'],
  data_analyst: ['google', 'openai'],
  general: ['anthropic', 'openai', 'google', 'moonshot'],
};

export function suggestAPIForRole(role, availableConfigs) {
  if (!availableConfigs.length) return null;
  const affinity = ROLE_API_AFFINITY[role] || ROLE_API_AFFINITY.general;
  for (const provider of affinity) {
    const match = availableConfigs.find(c => c.provider === provider && c.isActive);
    if (match) return match.id;
  }
  const def = availableConfigs.find(c => c.isDefault && c.isActive);
  return def?.id || availableConfigs.find(c => c.isActive)?.id || null;
}

async function callAnthropic(config, messages, maxTokens, temperature) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({ model: config.model, max_tokens: maxTokens, temperature, messages }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Anthropic ${res.status}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

async function callGoogle(config, messages, maxTokens, temperature) {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: maxTokens, temperature } }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Google ${res.status}`);
  }
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

async function callOpenAICompat(config, messages, maxTokens, temperature) {
  const baseURL = config.baseURL || (config.provider === 'moonshot'
    ? 'https://api.moonshot.cn/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions');
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model: config.model, messages, max_tokens: maxTokens, temperature }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function callLLM(config, messages, options = {}) {
  const { maxTokens = 800, temperature = 0.7 } = options;
  switch (config.provider) {
    case 'anthropic': return callAnthropic(config, messages, maxTokens, temperature);
    case 'google': return callGoogle(config, messages, maxTokens, temperature);
    case 'moonshot':
    case 'openai':
    case 'custom': return callOpenAICompat(config, messages, maxTokens, temperature);
    default: throw new Error(`Unknown provider: ${config.provider}`);
  }
}

export async function testConnection(config) {
  try {
    const result = await callLLM(config, [{ role: 'user', content: 'Reply with just "OK".' }], { maxTokens: 10 });
    return { success: true, message: result.trim() };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
