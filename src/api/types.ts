import { ChatRoleType } from '@/utils/types.ts';

export interface CompletionsChatData {
  question?:string;
  temperature?:number;
  max_history_len?:number,
  max_len?:number,
  repetition_penalty?:number
}

export interface EditChatData {
  _id: string;
  title: string;
}
