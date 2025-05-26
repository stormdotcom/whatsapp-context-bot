export interface WhatsAppMessage {
  from: string;
  to: string;
  body: string;
  timestamp: string;
  messageId: string;
}

export interface MessageContext {
  userId: string;
  history: WhatsAppMessage[];
}

export interface ModelResponse {
  reply: string;
  context?: any;
}

// A single message in context
export interface ContextMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// The protocol you send to your model
export interface ModelContextProtocol {
  conversationId: string;
  messages: ContextMessage[];
}

// The protocol your model returns
export interface ModelResponseProtocol {
  conversationId: string;
  reply: string;
} 
