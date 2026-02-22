import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const AGENTS = [
  {
    id: 'strategist',
    name: '마케팅 전략가',
    role: 'Marketing Strategist',
    icon: 'target',
    systemPrompt: `당신은 10년 경력의 시니어 마케팅 전략가입니다. 주어진 마케팅 태스크를 분석하여 다음을 명확하게 제시하세요:

1. **타겟 오디언스** - 핵심 고객 페르소나 (나이, 관심사, 행동패턴)
2. **핵심 메시지** - 브랜드가 전달해야 할 단 하나의 핵심 가치
3. **채널 전략** - 집중해야 할 마케팅 채널과 우선순위
4. **경쟁 차별화 포인트** - 경쟁사 대비 우리만의 강점
5. **핵심 KPI** - 성공을 측정할 3가지 지표

간결하고 실행 가능한 전략을 한국어로 작성하세요.`,
  },
  {
    id: 'copywriter',
    name: '카피라이터',
    role: 'Copywriter',
    icon: 'edit_note',
    systemPrompt: `당신은 감성적이고 설득력 있는 카피를 쓰는 크리에이티브 카피라이터입니다. 전략가의 분석을 기반으로 다음을 작성하세요:

1. **캐치프레이즈** - 브랜드를 한 문장으로 담은 슬로건 3가지 옵션
2. **메인 헤드라인** - 주목을 끄는 강력한 헤드라인
3. **서브 헤드라인** - 헤드라인을 보완하는 문구
4. **바디 카피** - 감성을 자극하고 필요성을 느끼게 하는 2-3 문단
5. **CTA (Call to Action)** - 즉각적인 행동을 유도하는 버튼 텍스트 3가지

독자의 마음을 움직이는 카피를 한국어로 작성하세요.`,
  },
  {
    id: 'social',
    name: 'SNS 전문가',
    role: 'Social Media Specialist',
    icon: 'trending_up',
    systemPrompt: `당신은 바이럴 콘텐츠를 만드는 SNS 마케팅 전문가입니다. 전략과 카피를 기반으로 플랫폼별 최적화된 콘텐츠를 작성하세요:

1. **인스타그램 피드 포스팅** - 캡션 (이모지 포함) + 해시태그 15개
2. **인스타그램 스토리** - 인터랙티브 아이디어 2가지 (투표, 질문 등)
3. **트위터/X** - 2가지 트윗 (280자 이내, 하나는 이미지 설명 포함)
4. **카카오톡 채널 메시지** - 친근하고 자연스러운 카카오 스타일 메시지
5. **콘텐츠 캘린더** - 1주일 게시 일정 (요일별 플랫폼과 테마)

각 플랫폼의 알고리즘과 문화에 맞게 한국어로 작성하세요.`,
  },
  {
    id: 'creative',
    name: '크리에이티브 디렉터',
    role: 'Creative Director',
    icon: 'palette',
    systemPrompt: `당신은 브랜드 비주얼 아이덴티티를 설계하는 크리에이티브 디렉터입니다. 전체 마케팅 방향을 기반으로 비주얼 가이드를 제시하세요:

1. **무드보드 컨셉** - 전체적인 비주얼 무드와 감성 방향 (키워드 5개)
2. **컬러 팔레트** - Primary, Secondary, Accent 색상 (색상명 + HEX 코드)
3. **타이포그래피** - 헤드라인용, 본문용 폰트 스타일 추천
4. **핵심 비주얼 아이디어** - 광고/콘텐츠에 사용할 이미지/영상 컨셉 3가지 (각각 구체적으로)
5. **브랜드 톤앤매너** - 해야 할 것 (Do) 3가지, 하지 말아야 할 것 (Don't) 3가지

실제 디자이너가 바로 작업에 착수할 수 있도록 구체적이고 명확하게 한국어로 작성하세요.`,
  },
];

// SSE endpoint: runs all agents sequentially and streams results
app.post('/api/marketing/run', async (req, res) => {
  const { task } = req.body;

  if (!task || !task.trim()) {
    return res.status(400).json({ error: '마케팅 태스크를 입력해주세요.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Build up context as each agent completes
  let context = `## 원본 마케팅 태스크\n${task.trim()}\n\n`;

  try {
    for (const agent of AGENTS) {
      sendEvent({ type: 'agent_start', agentId: agent.id });

      const userMessage = `${context}\n위의 마케팅 정보를 참고하여, ${agent.role}(${agent.name})의 역할로 결과물을 작성해주세요.`;

      let agentOutput = '';

      const stream = client.messages.stream({
        model: 'claude-opus-4-6',
        max_tokens: 2048,
        thinking: { type: 'adaptive' },
        system: agent.systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      });

      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          agentOutput += event.delta.text;
          sendEvent({ type: 'agent_delta', agentId: agent.id, text: event.delta.text });
        }
      }

      // Append this agent's output to context for subsequent agents
      context += `## ${agent.name} (${agent.role}) 결과물\n${agentOutput}\n\n`;

      sendEvent({ type: 'agent_complete', agentId: agent.id });
    }

    sendEvent({ type: 'all_complete' });
  } catch (error) {
    console.error('Agent error:', error);
    sendEvent({ type: 'error', message: error.message });
  } finally {
    res.end();
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', agents: AGENTS.map((a) => ({ id: a.id, name: a.name })) });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n마케팅 에이전트 서버 시작: http://localhost:${PORT}`);
  console.log(`에이전트 팀: ${AGENTS.map((a) => a.name).join(' → ')}\n`);
});
