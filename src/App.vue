<template>
  <n-config-provider :theme="base.theme">
    <n-dialog-provider>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </n-dialog-provider>
    <n-message-provider>
      <n-message />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { debounce } from 'lodash';
import useBaseStore from '@/store/base';
import { WIDTH } from '@/utils/config';
import NMessage from '@/components/NMessage.vue';
import { ThemeType } from '@/utils/types.ts';
import useChatStore from '@/store/chat.ts';

const base = useBaseStore();
const chat = useChatStore();
const currentDevice = () => {
  const rect = document.body.getBoundingClientRect();
  const device = rect.width - 1 < WIDTH ? 'mobile' : 'desktop';
  base.setDevice(device);
};
const listener = debounce(currentDevice, 300);

onMounted(() => {
  // chat.initChatSetting({ model, openContext: open_context, stream });
  currentDevice();
  const theme = localStorage.getItem('shell-chart-theme');
  if (theme) base.setTheme(theme as ThemeType);
  window.addEventListener('resize', listener);
});
onUnmounted(() => {
  window.removeEventListener('resize', listener);
});

</script>
