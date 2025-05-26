import axios from 'axios';
import { ModelContextProtocol, ModelResponseProtocol } from './types';
import dotenv from 'dotenv';
dotenv.config();

export async function sendToModel(
  ctx: ModelContextProtocol
): Promise<ModelResponseProtocol> {
  // Here we call OpenAI's chat completions as an example:
  const openaiUrl = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const openaiMessages = ctx.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const resp = await axios.post(
    openaiUrl,
    {
      model: 'gpt-3.5-turbo',
      messages: openaiMessages,
    },
    { headers }
  );

  const reply = resp.data.choices[0].message.content as string;

  return {
    conversationId: ctx.conversationId,
    reply,
  };
} 
