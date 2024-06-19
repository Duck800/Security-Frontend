import request from '@/utils/request.ts';
import { CompletionsChatData, EditChatData } from '@/api/types.ts';
import { GptModel } from '@/utils/types.ts';
import axios from 'axios';

// export function promptLibrary() {
//   return request.get('/shell/api/chat/prompt');
// }

const apiUrl = 'http://47.113.191.98:8000/answer';

export async function completionsChat(data: CompletionsChatData) {
  // 构建请求的URL，包括查询参数
  const queryParams = new URLSearchParams({
    question: data.question || '',
    temperature: data.temperature?.toString() || '1', // 默认值为1
    max_history_len: data.max_history_len?.toString() || '10', // 默认值为10
    max_len: data.max_len?.toString() || '100', // 默认值为100
    repetition_penalty: data.repetition_penalty?.toString() || '1' // 默认值为1
  });

  const requestUrl = `${apiUrl}?${queryParams}`;

  // 使用Axios发送GET请求
  return axios.get(requestUrl)
    .then(response => {
      // 处理成功响应
      console.log(response.data);
      return response.data; // 返回后端返回的数据
    })
    .catch(error => {
      // 处理错误情况
      console.error('Error fetching data:', error);
      throw error; // 可以选择抛出错误或者做其他处理
    });
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
