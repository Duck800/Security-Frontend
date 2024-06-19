<template>
<!--  <div class="flex flex-col justify-between items-center w-full h-full">-->
<!--    <div :class="`w-full h-14 rounded cursor-pointer ${base.themeName === 'dark' ? 'hover:bg-dark-model' : 'hover:bg-gray-100'}`" @click="handleCreate">-->
<!--      <div :class="[onActive ? 'scaled' : 'done']" class="w-full h-full flex items-center px-3 box-border origin-center transition-transform duration-100 ease-in-out">-->
<!--        <chat-gpt-svg />-->
<!--        <span class="font-semibold ml-2 overflow-ellipsis whitespace-nowrap overflow-hidden">New chat</span>-->
<!--      </div>-->
<!--    </div>-->

<!--    <n-scrollbar class="flex-1 relative my-2.5">-->
<!--      <n-spin v-if="isLoading('list')" size="small" class="absolute inset-0 m-auto" />-->
<!--      <n-list v-else-if="!isLoading('list') && dataList.length" hoverable clickable style="width: 220px;">-->
<!--        <n-list-item-->
<!--          v-for="(item, index) in dataList"-->
<!--          :key="index"-->
<!--          :class="`${activeId === item._id ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-50 dark:bg-black'} n-list-item`"-->
<!--          @click="handleItem(item)"-->
<!--        >-->
<!--          <div class="w-full flex justify-between items-center relative">-->
<!--            <n-input-->
<!--              ref="titleInputRef"-->
<!--              v-if="editForm._id === item._id"-->
<!--              v-model:value="editForm.title"-->
<!--              type="text"-->
<!--              size="tiny"-->
<!--              placeholder="请输入"-->
<!--              @keyup.enter="handleSaveTitle(item)"-->
<!--              @blur="handleSaveTitle(item)"-->
<!--            />-->
<!--            <n-tooltip v-else trigger="hover" :disabled="item.titleLength < 150">-->
<!--              <template #trigger>-->
<!--                <div style="width: 160px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">-->
<!--                  <span @mouseenter="e => handleTitleFocus(e, item)">{{ item.title }}</span>-->
<!--                </div>-->
<!--              </template>-->
<!--              {{ item.title }}-->
<!--            </n-tooltip>-->
<!--            <div v-if="!item.loading" :class="`w-8 justify-between ${activeId === item._id ? '' : 'hidden'} options`">-->
<!--              <n-icon @click.stop="handleEdit(item)"><pencil-sharp /></n-icon>-->
<!--              <n-icon @click.stop="handleRemove(item)"><trash /></n-icon>-->
<!--            </div>-->
<!--            <n-spin v-if="item.loading" size="small" class="absolute -right-2" />-->
<!--          </div>-->
<!--        </n-list-item>-->
<!--      </n-list>-->
<!--      <n-empty v-else description="暂无数据" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);"></n-empty>-->
<!--    </n-scrollbar>-->

<!--  </div>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  NSelect,
  NSwitch,
  NTabs,
  NTabPane,
  NPopselect,
  NAvatar,
  NList,
  NListItem,
  NScrollbar,
  NIcon,
  NInput,
  NInputGroup,
  NTooltip,
  NSkeleton,
  NSpin,
  NEmpty,
  NModal,
  NButton,
  NForm,
  NFormItem,
} from 'naive-ui';
import { useChatList, useChatListModel } from '@/views/ChatList/hooks';
import { PencilSharp, Trash, HelpCircle } from '@vicons/ionicons5';
import ChatGptSvg from '@/components/ChatGptSvg.vue';
import { noSideSpace, onlyAllowNumber } from '@/utils/tools.ts';
import useModalConfig from '@/hooks/useModalConfig.ts';

export default defineComponent({
  name: 'ChatList',
  components: {
    HelpCircle,
    NInputGroup,
    NSelect,
    NSwitch,
    NFormItem,
    NForm,
    NTabs,
    NTabPane,
    NButton,
    NModal,
    ChatGptSvg,
    NPopselect,
    NAvatar,
    NList,
    NListItem,
    NScrollbar,
    NIcon,
    PencilSharp,
    Trash,
    NInput,
    NTooltip,
    NSkeleton,
    NSpin,
    NEmpty
  },
  setup() {
    return {
      onlyAllowNumber,
      noSideSpace,
      ...useModalConfig(),
      ...useChatListModel(),
      ...useChatList()
    };
  }
});
</script>

<style scoped>
.n-list-item:hover .options {
  display: flex;
}
.scaled {
  transform: scale(0.9);
}
.done {
  transform: scale(1);
}
</style>
