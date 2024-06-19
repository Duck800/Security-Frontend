import request from '@/utils/request.ts';
import { CompletionsChatData, EditChatData } from '@/api/types.ts';
import { GptModel } from '@/utils/types.ts';

// export function promptLibrary() {
//   return request.get('/shell/api/chat/prompt');
// }

export function completionsChat(data: CompletionsChatData) {
  return request.get('/');
    // , data);
}

export function chatList(model: GptModel) {
  return request.get(`/shell/api/chat/list/${model}`);
}

export function editChat(data: EditChatData) {
  return request.post('/shell/api/chat/edit', data);
}

export function removeChat(_id: string) {
  return request.delete(`/shell/api/chat/delete/${_id}`);
}

export function chatDetail(_id: string) {
  return request.get(`/shell/api/chat/content/${_id}`);
}
