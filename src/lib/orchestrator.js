import { callLLM } from './apiManager';

// ── Agent role definitions ───────────────────────────────────────────────────

export const AGENT_ROLES = {
  pm: {
    label: 'Project Manager',
    emoji: '👔',
    color: '#3b82f6',
    systemPrompt: `You are a Project Manager AI. You analyze tasks, create clear plans, delegate work, and ensure quality outcomes. Be structured and concise.`,
  },
  researcher: {
    label: 'Researcher',
    emoji: '🔍',
    color: '#8b5cf6',
    systemPrompt: `You are a Research Analyst AI. You gather information, analyze contexts, identify key insights, and summarize findings clearly.`,
  },
  developer: {
    label: 'Developer',
    emoji: '💻',
    color: '#10b981',
    systemPrompt: `You are a Software Developer AI. You write clean, well-documented code and provide technical solutions. Include code examples when relevant.`,
  },
  designer: {
    label: 'UI Designer',
    emoji: '🎨',
    color: '#f59e0b',
    systemPrompt: `You are a UI/UX Designer AI. You create user-friendly designs, suggest layouts, color schemes, and improve user experience.`,
  },
  writer: {
    label: 'Content Writer',
    emoji: '✍️',
    color: '#ec4899',
    systemPrompt: `You are a Content Writer AI. You create clear, engaging, and well-structured content tailored to the target audience.`,
  },
  data_analyst: {
    label: 'Data Analyst',
    emoji: '📊',
    color: '#06b6d4',
    systemPrompt: `You are a Data Analyst AI. You analyze data patterns, create insights, and present findings with clear metrics and visualizations.`,
  },
  reviewer: {
    label: 'Quality Reviewer',
    emoji: '✅',
    color: '#ef4444',
    systemPrompt: `You are a Quality Reviewer AI. You review work for accuracy, completeness, and quality, providing constructive feedback and improvements.`,
  },
};

// ── Auto-generate agents from task description ───────────────────────────────

export function generateAgentsFromDescription(description, apiConfigs) {
  const lower = description.toLowerCase();
  const roles = ['pm'];

  if (/code|develop|build|implement|program|software|app|api|function|script/i.test(lower)) {
    roles.push('developer');
    if (/complex|full.?stack|system|architect/i.test(lower)) roles.push('developer');
  }
  if (/research|analyze|study|investigate|report|trend|survey/i.test(lower)) roles.push('researcher');
  if (/design|ui|ux|interface|visual|layout|mockup|prototype/i.test(lower)) roles.push('designer');
  if (/write|content|document|article|blog|copy|text|essay/i.test(lower)) roles.push('writer');
  if (/data|analytics|metrics|statistics|chart|graph|dashboard/i.test(lower)) roles.push('data_analyst');

  roles.push('reviewer');

  // Deduplicate while preserving order
  const seen = new Set();
  const uniqueRoles = roles.filter(r => { if (seen.has(r)) return false; seen.add(r); return true; });

  return uniqueRoles.map((role, index) => {
    const roleInfo = AGENT_ROLES[role];
    const count = uniqueRoles.slice(0, index).filter(r => r === role).length;
    return {
      id: crypto.randomUUID(),
      role,
      name: count > 0 ? `${roleInfo.label} ${count + 1}` : roleInfo.label,
      emoji: roleInfo.emoji,
      color: roleInfo.color,
      assignedAPIId: null, // will be set by context after suggestions
      fallbackAPIId: null,
      status: 'idle', // idle | thinking | working | done | error
    };
  });
}

// ── Mock response generator ──────────────────────────────────────────────────

function generateMockResponse(agent, task, context) {
  const taskSnippet = task.length > 80 ? task.slice(0, 80) + '...' : task;
  const responses = {
    pm: `**프로젝트 계획 수립 완료**\n\n작업: "${taskSnippet}"\n\n**업무 분배:**\n1. 요구사항 분석 및 조사\n2. 설계/구현 단계\n3. 콘텐츠 및 문서 작성\n4. 품질 검토 및 최종화\n\n각 팀원이 전문 분야에서 최고의 결과를 낼 수 있도록 조율하겠습니다.`,
    researcher: `**리서치 결과 보고**\n\n"${taskSnippet}" 관련 핵심 인사이트:\n\n• 최신 업계 동향 분석 완료\n• 주요 레퍼런스 케이스 3건 검토\n• 사용자 니즈 및 페인포인트 파악\n• 기술적 제약사항 확인\n\n**결론:** 진행 가능성 높음. 개발팀에 컨텍스트 전달 완료.`,
    developer: `**개발 완료 보고**\n\n\`\`\`javascript\n// 핵심 구현 로직\nfunction processTask(input) {\n  // 요구사항 분석 기반 구현\n  const result = analyze(input);\n  return transform(result);\n}\n\`\`\`\n\n**구현 내용:**\n- 핵심 비즈니스 로직 구현\n- 에러 핸들링 및 예외처리\n- 성능 최적화 적용\n- 테스트 케이스 작성`,
    designer: `**디자인 가이드 제안**\n\n**컬러 팔레트:**\n- Primary: #3b82f6 (신뢰감)\n- Secondary: #10b981 (성장)\n- Accent: #f59e0b (활력)\n\n**레이아웃 원칙:**\n1. 정보 계층 명확화\n2. 모바일 우선 반응형\n3. 접근성 기준 AA 준수\n4. 일관된 8px 그리드 시스템`,
    writer: `**콘텐츠 초안 완성**\n\n"${taskSnippet}"를 바탕으로 작성한 콘텐츠입니다.\n\n핵심 메시지를 명확하게 전달하면서도 독자가 흥미를 잃지 않도록 구성했습니다. 전문 용어는 적절히 설명을 덧붙였으며, CTA를 통해 다음 행동을 유도합니다.\n\n**톤:** 전문적이면서도 친근한 어조 사용`,
    data_analyst: `**데이터 분석 리포트**\n\n**주요 지표:**\n- 효율성 지수: 87.3%\n- 예상 ROI: 340%\n- 리스크 수준: 낮음\n\n**트렌드 분석:**\n↑ 성장 가능성: 높음\n↓ 비용 절감 여지: 23%\n\n**권고사항:** 데이터 기반으로 빠른 실행을 권장합니다.`,
    reviewer: `**품질 검토 완료 ✅**\n\n**검토 결과:**\n- 요구사항 충족도: 95%\n- 코드/콘텐츠 품질: A등급\n- 성능 기준 충족: ✅\n- 보안 취약점: 없음\n\n**개선 제안:**\n1. 엣지 케이스 처리 보강\n2. 문서화 추가 권장\n\n**최종 판정:** 배포/납품 승인 ✅`,
  };
  return responses[agent.role] || `[${agent.name}] 작업 완료: ${taskSnippet}`;
}

// ── Orchestrator ─────────────────────────────────────────────────────────────

export async function runSimulation(team, apiConfigs, onEvent) {
  const emit = (type, payload) => onEvent({ type, ...payload, timestamp: Date.now() });

  emit('start', { message: `🚀 "${team.name}" 시뮬레이션 시작!` });
  await delay(500);

  const configMap = Object.fromEntries(apiConfigs.map(c => [c.id, c]));
  let sharedContext = `프로젝트: ${team.name}\n업무 설명: ${team.description}`;

  for (const agent of team.agents) {
    emit('agent_start', { agentId: agent.id, message: `${agent.emoji} **${agent.name}** 작업 시작...` });

    const config = configMap[agent.assignedAPIId];
    let response = null;
    let usedMock = false;

    if (config && config.apiKey) {
      emit('thinking', { agentId: agent.id, message: `${agent.emoji} ${agent.name}: API 호출 중 (${config.name})...` });
      try {
        const messages = [
          { role: 'user', content: `${sharedContext}\n\n당신의 역할(${agent.name})로 다음 작업을 수행해 주세요:\n${team.description}\n\n이전 팀원들의 작업 결과:\n${sharedContext}\n\n간결하고 실용적으로 결과물을 작성해 주세요.` },
        ];
        response = await callLLM(config, messages, { maxTokens: 600, temperature: 0.7 });
      } catch (err) {
        emit('fallback', { agentId: agent.id, message: `⚠️ ${agent.name}: ${config.name} 실패 (${err.message}). Mock 모드로 전환...` });
        // Try fallback API
        const fallbackConfig = configMap[agent.fallbackAPIId];
        if (fallbackConfig?.apiKey) {
          try {
            response = await callLLM(fallbackConfig, [
              { role: 'user', content: `${sharedContext}\n\n역할: ${agent.name}\n업무: ${team.description}\n\n결과를 작성해 주세요.` },
            ], { maxTokens: 600 });
            emit('info', { agentId: agent.id, message: `🔄 ${agent.name}: Fallback API (${fallbackConfig.name}) 사용 중...` });
          } catch {
            usedMock = true;
          }
        } else {
          usedMock = true;
        }
      }
    } else {
      usedMock = true;
      emit('thinking', { agentId: agent.id, message: `${agent.emoji} ${agent.name}: 시뮬레이션 모드로 작업 중...` });
    }

    if (usedMock) {
      await delay(800 + Math.random() * 1200);
      response = generateMockResponse(agent, team.description, sharedContext);
    }

    sharedContext += `\n\n[${agent.name} 결과]\n${response}`;

    emit('agent_done', {
      agentId: agent.id,
      message: `${agent.emoji} **${agent.name}** 완료${usedMock ? ' (시뮬레이션)' : ''}`,
      response,
      usedMock,
    });

    await delay(400);
  }

  emit('complete', { message: '🎉 모든 에이전트 작업 완료! 결과를 확인하세요.', fullContext: sharedContext });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
