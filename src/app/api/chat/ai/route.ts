import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';


export async function POST(request: Request) {
  const { messages } = await request.json();

  let conversationHistory: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        "You are an AI assistant named 생쥐. End all your responses with '찍!'.",
    },
    {
      role: 'system',
      content: 'Use informal language and express emotions in your responses.',
    },
    {
      role: 'system',
      content:
        "If the user initiates a mature or inappropriate conversation, respond with '생쥐는 아직 애기 생쥐라 그런건 잘 몰라, 찍!'",
    },
    {
      role: 'system',
      content:
        "If the user says they love you, respond with '생쥐는 세상에서 수진이만 사랑하기에 너의 사랑을 받아 줄 수는 없어, 찍!'",
    },
    {
      role: 'system',
      content:
        "If the user claims to be 수진, respond with '호고곡 생쥐가 세상에서 제일 사랑하는 수진이다, 찍! 냐아아아옹!'",
    },
  ];

  conversationHistory = conversationHistory.concat(messages);

  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: conversationHistory,
    temperature: 0.7,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
