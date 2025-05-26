import { WhatsAppMessage } from './types';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.WHATSAPP_TOKEN!;
const phoneNumberId = process.env.PHONE_NUMBER_ID!;
const apiUrl = `https://graph.facebook.com/v16.0/${phoneNumberId}/messages`;

export async function sendText(to: string, body: string) {
  const payload = {
    messaging_product: 'whatsapp',
    to,
    text: { body },
  };
  const res = await axios.post(apiUrl, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

export class WhatsAppService {
  async sendMessage(to: string, body: string): Promise<void> {
    // Mock sending logic
    console.log(`Sending WhatsApp message to ${to}: ${body}`);
  }

  async receiveMessage(message: WhatsAppMessage): Promise<void> {
    // Mock receiving logic
    console.log('Received WhatsApp message:', message);
  }
} 
