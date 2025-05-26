import { ContextMessage } from './types';

class ContextService {
  private store = new Map<string, ContextMessage[]>();

  // fetch the full history (or start new)
  get(conversationId: string): ContextMessage[] {
    if (!this.store.has(conversationId)) {
      this.store.set(conversationId, []);
    }
    return this.store.get(conversationId)!;
  }

  // append and return updated history
  append(conversationId: string, msg: ContextMessage): ContextMessage[] {
    const history = this.get(conversationId);
    history.push(msg);
    return history;
  }

  // (optional) clear history for a conversation
  clear(conversationId: string) {
    this.store.delete(conversationId);
  }
}

export const contextService = new ContextService(); 
