import express from 'express';
import { contextService } from './context.service';
import { sendToModel } from './model.service';
import { sendText } from './whatsapp.service';
import { ContextMessage, ModelContextProtocol } from './types';

export const router = express.Router();

// 1️⃣ Webhook verification
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    return res.status(200).send(challenge as string);
  }
  res.sendStatus(403);
});

// 2️⃣ Incoming messages
router.post('/webhook', async (req, res) => {
  const entries = req.body.entry as any[];
  for (const entry of entries) {
    for (const change of entry.changes) {
      const msg = change.value.messages?.[0];
      if (!msg?.text?.body) continue;

      const from = msg.from;              // e.g. '919876543210'
      const text = msg.text.body.trim();  // user text

      // A) build & store user message
      const userMessage: ContextMessage = {
        role: 'user',
        content: text,
        timestamp: Date.now(),
      };
      const history = contextService.append(from, userMessage);

      // B) call your model with the protocol
      const protocol: ModelContextProtocol = {
        conversationId: from,
        messages: history,
      };
      const modelResp = await sendToModel(protocol);

      // C) store assistant reply
      const botMessage: ContextMessage = {
        role: 'assistant',
        content: modelResp.reply,
        timestamp: Date.now(),
      };
      contextService.append(from, botMessage);

      // D) send back via WhatsApp
      await sendText(from, modelResp.reply);
    }
  }
  res.sendStatus(200);
}); 
