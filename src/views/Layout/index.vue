<template>
  <div class="w-full h-screen">
    <n-layout has-sider class="h-full">
      <n-layout-sider v-if="!isMobile" collapse-mode="width" :collapsed-width="0" show-trigger="arrow-circle" bordered
                      content-style="padding: 14px 10px;" :width="240" class="bg-gray-50 dark:bg-black">
        <!--        <chat-list/>-->
        <div class="flex flex-col justify-between items-center w-full h-full">
          <div
              :class="`w-full h-14 rounded cursor-pointer ${base.themeName === 'dark' ? 'hover:bg-dark-model' : 'hover:bg-gray-100'}`"
              @click="handleCreate">
            <div :class="[onActive ? 'scaled' : 'done']" @click="newChat"
                 class="w-full h-full flex items-center px-3 box-border origin-center transition-transform duration-100 ease-in-out">
              <chat-gpt-svg/>
              <span class="font-semibold ml-2 overflow-ellipsis whitespace-nowrap overflow-hidden">New chat</span>
            </div>
          </div>
          <n-scrollbar class="flex-1 relative my-2.5">
            <n-spin v-if="isLoading('list')" size="small" class="absolute inset-0 m-auto"/>
            <n-list v-else-if="!isLoading('list') && dataList.length" hoverable clickable style="width: 220px;">
              <n-list-item
                  v-for="(item, index) in dataList"
                  :key="index"
                  :class="`${activeId === item._id ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-50 dark:bg-black'} n-list-item`"
                  @click="handleItem(item)"
              >
                <div class="w-full flex justify-between items-center relative">
                  <n-tooltip trigger="hover" :disabled="item.titleLength < 150">
                    <template #trigger>
                      <div style="width: 160px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                        <span @mouseenter="e => handleTitleFocus(e, item)">{{ item.title }}</span>
                      </div>
                    </template>
                    {{ item.title }}
                  </n-tooltip>
                </div>
              </n-list-item>
              <div v-show="!is3Active" style="width: 220px; height: 47px; background: rgb(249,250,251); z-index: 1;
              position: relative;margin-top: -46.4px"></div>
            </n-list>
          </n-scrollbar>
        </div>

      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered class="h-20 w-full flex justify-between items-center px-8">
          <n-icon v-if="isMobile" size="34" @click="handleList">
            <reorder-three-sharp/>
          </n-icon>
          <span class="font-bold text-xl">{{ gptModel }}</span>
          <div id="title" class="Title"></div>
          <switch-theme/>
        </n-layout-header>
        <n-layout-content class="bg-white dark:bg-dark-content pt-3 box-border" bordered
                          content-style="height: calc(100vh - 5.75rem);" :native-scrollbar="false">

          <div v-if="isAble1" class="w-full h-full box-border px-28 n-scrollbar" role="none"
               style="--n-scrollbar-bezier: cubic-bezier(.4, 0, .2, 1); --n-scrollbar-color: rgba(0, 0, 0, 0.25); --n-scrollbar-color-hover: rgba(0, 0, 0, 0.4); --n-scrollbar-border-radius: 5px; --n-scrollbar-width: 5px; --n-scrollbar-height: 5px; --n-scrollbar-rail-inset-horizontal: auto 2px 4px 2px; --n-scrollbar-rail-inset-vertical: 2px 4px 2px auto; --n-scrollbar-rail-color: transparent;">
            <div role="none" class="n-scrollbar-container">
              <div role="none" class="n-scrollbar-content">
                <ul data-v-c70253f6="" class="n-list"
                    style="--n-font-size: 14px; --n-bezier: cubic-bezier(.4, 0, .2, 1); --n-text-color: rgb(51, 54, 57); --n-color: #fff; --n-border-radius: 3px; --n-border-color: rgb(239, 239, 245); --n-border-color-modal: rgba(239, 239, 245, 1); --n-border-color-popover: rgba(239, 239, 245, 1); --n-color-modal: #fff; --n-color-popover: #fff; --n-color-hover: rgb(243, 243, 245); --n-color-hover-modal: rgba(243, 243, 245, 1); --n-color-hover-popover: rgba(243, 243, 245, 1);">

                  <li data-v-c70253f6="" class="n-list-item">
                    <div class="n-list-item__main">
                      <div data-v-c70253f6="" class="w-full h-auto flex flex-col assistant-start py-3 text-content">
                        <div data-v-c70253f6="" class="w-full flex justify-end"><!--v-if-->
                          <div data-v-c70253f6=""
                               class="w-auto overflow-y-auto h-auto p-2 rounded-md mr-2 ml-2 break-all bg-green-200 dark:bg-green-600"
                               style="max-width: calc(100% - 100px);"><span
                              data-v-c70253f6="">你好，请问飞机几点可以吃饭？</span></div>
                          <span data-v-c70253f6="" class="n-avatar"
                                style="--n-font-size: 14px; --n-border: none; --n-border-radius: 50%; --n-color: rgba(204, 204, 204, 1); --n-color-modal: rgba(204, 204, 204, 1); --n-color-popover: rgba(204, 204, 204, 1); --n-bezier: cubic-bezier(.4, 0, .2, 1); --n-merged-size: var(--n-avatar-size-override, 28px);">
                            <img
                              loading="eager" src="/src/assets/images/avatar.png" width="28"
                              data-image-src="/src/assets/images/avatar.png"></span></div><!-- stream loading -->
                        <!--v-if--><!-- text copy --><!--v-if--></div>
                    </div>
                  </li>
                  <li data-v-c70253f6="" class="n-list-item">
                    <div class="n-list-item__main">
                      <div data-v-c70253f6="" class="w-full h-auto flex flex-col assistant-start py-3 text-content">
                        <div data-v-c70253f6="" class="w-full flex justify-start"><span data-v-c70253f6=""
                                                                                        class="n-avatar"
                                                                                        style="--n-font-size: 14px; --n-border: none; --n-border-radius: 50%; --n-color: rgba(204, 204, 204, 1); --n-color-modal: rgba(204, 204, 204, 1); --n-color-popover: rgba(204, 204, 204, 1); --n-bezier: cubic-bezier(.4, 0, .2, 1); --n-merged-size: var(--n-avatar-size-override, 28px);"><img
                            loading="eager" src="/src/assets/images/assistant.jpg"
                            data-image-src="/src/assets/images/assistant.jpg"></span>
                          <div data-v-c70253f6=""
                               class="w-auto overflow-y-auto h-auto p-2 rounded-md mr-2 ml-2 break-all bg-gray-200 dark:bg-gray-600"
                               style="max-width: calc(100% - 100px);">
                            <div data-v-c70253f6="" class="n-spin-container"
                                 style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-opacity-spinning: 0.5; --n-size: 34px; --n-color: #18a058; --n-text-color: #18a058;">
                              <div class="n-spin-content">
                                <div data-v-c70253f6="">
                                  <div data-v-c70253f6="">
                                    <div data-v-c70253f6="" class="whitespace-pre-wrap">
                                      您好，您可以在飞行中的任何时候使用餐食，也可以在飞行中使用饮料。请问您还有其他需求吗？
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div><!--v-if--></div><!-- stream loading --><!--v-if--><!-- text copy -->
                        <div data-v-c70253f6=""
                             class="w-full flex justify-between items-center h-6 pl-9 pr-12 pt-1 box-border opacity-0 transition-opacity duration-300 copy-text">
                          <button data-v-c70253f6=""
                                  class="n-button n-button--default-type n-button--medium-type n-button--ghost"
                                  tabindex="-1" type="button"
                                  style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #0000; --n-text-color: rgb(51, 54, 57); --n-text-color-hover: #36ad6a; --n-text-color-pressed: #0c7a43; --n-text-color-focus: #36ad6a; --n-text-color-disabled: rgb(51, 54, 57); --n-border: none; --n-border-hover: none; --n-border-pressed: none; --n-border-focus: none; --n-border-disabled: none; --n-width: initial; --n-height: initial; --n-font-size: 14px; --n-padding: initial; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: initial;">
                                      <span class="n-button__icon" style="margin: 0px;"><div class="n-icon-slot"
                                                                                             role="none"><i
                                          data-v-c70253f6="" role="img" class="n-icon"
                                          style="--n-bezier: cubic-bezier(.4, 0, .2, 1);"><svg data-v-c70253f6=""
                                                                                               xmlns="http://www.w3.org/2000/svg"
                                                                                               xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                                               viewBox="0 0 512 512"><rect
                                          x="128"
                                          y="128"
                                          width="336"
                                          height="336"
                                          rx="57"
                                          ry="57"
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-linejoin="round"
                                          stroke-width="32"></rect><path
                                          d="M383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
                                          fill="none" stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="32"></path></svg></i></div></span></button>
                          <span data-v-c70253f6="" class="ml-4 text-sm text-current"></span></div>
                      </div>
                    </div>
                  </li>
                  <li data-v-c70253f6="" class="n-list-item">
                    <div class="n-list-item__main">
                      <div data-v-c70253f6="" class="w-full h-auto flex flex-col assistant-start py-3 text-content">
                        <div data-v-c70253f6="" class="w-full flex justify-end"><!--v-if-->
                          <div data-v-c70253f6=""
                               class="w-auto overflow-y-auto h-auto p-2 rounded-md mr-2 ml-2 break-all bg-green-200 dark:bg-green-600"
                               style="max-width: calc(100% - 100px);"><span data-v-c70253f6="">没有了，谢谢。</span></div>
                          <span data-v-c70253f6="" class="n-avatar"
                                style="--n-font-size: 14px; --n-border: none; --n-border-radius: 50%; --n-color: rgba(204, 204, 204, 1); --n-color-modal: rgba(204, 204, 204, 1); --n-color-popover: rgba(204, 204, 204, 1); --n-bezier: cubic-bezier(.4, 0, .2, 1); --n-merged-size: var(--n-avatar-size-override, 28px);"><img
                              loading="eager" src="/src/assets/images/avatar.png"
                              data-image-src="/src/assets/images/avatar.png"></span></div><!-- stream loading -->
                        <!--v-if--><!-- text copy --><!--v-if--></div>
                    </div>
                  </li>
                  <li data-v-c70253f6="" class="n-list-item">
                    <div class="n-list-item__main">
                      <div data-v-c70253f6="" class="w-full h-auto flex flex-col assistant-start py-3 text-content">
                        <div data-v-c70253f6="" class="w-full flex justify-start"><span data-v-c70253f6=""
                                                                                        class="n-avatar"
                                                                                        style="--n-font-size: 14px; --n-border: none; --n-border-radius: 50%; --n-color: rgba(204, 204, 204, 1); --n-color-modal: rgba(204, 204, 204, 1); --n-color-popover: rgba(204, 204, 204, 1); --n-bezier: cubic-bezier(.4, 0, .2, 1); --n-merged-size: var(--n-avatar-size-override, 28px);"><img
                            loading="eager" src="/src/assets/images/assistant.jpg"
                            data-image-src="/src/assets/images/assistant.jpg"></span>
                          <div data-v-c70253f6=""
                               class="w-auto overflow-y-auto h-auto p-2 rounded-md mr-2 ml-2 break-all bg-gray-200 dark:bg-gray-600"
                               style="max-width: calc(100% - 100px);">
                            <div data-v-c70253f6="" class="n-spin-container"
                                 style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-opacity-spinning: 0.5; --n-size: 34px; --n-color: #18a058; --n-text-color: #18a058;">
                              <div class="n-spin-content">
                                <div data-v-c70253f6="">
                                  <div data-v-c70253f6="">
                                    <div data-v-c70253f6="" class="whitespace-pre-wrap">
                                      不客气，祝您旅途愉快!
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div><!--v-if--></div><!-- stream loading --><!--v-if--><!-- text copy -->
                        <div data-v-c70253f6=""
                             class="w-full flex justify-between items-center h-6 pl-9 pr-12 pt-1 box-border opacity-0 transition-opacity duration-300 copy-text">
                          <button data-v-c70253f6=""
                                  class="n-button n-button--default-type n-button--medium-type n-button--ghost"
                                  tabindex="-1" type="button"
                                  style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #0000; --n-text-color: rgb(51, 54, 57); --n-text-color-hover: #36ad6a; --n-text-color-pressed: #0c7a43; --n-text-color-focus: #36ad6a; --n-text-color-disabled: rgb(51, 54, 57); --n-border: none; --n-border-hover: none; --n-border-pressed: none; --n-border-focus: none; --n-border-disabled: none; --n-width: initial; --n-height: initial; --n-font-size: 14px; --n-padding: initial; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: initial;">
                                      <span class="n-button__icon" style="margin: 0px;"><div class="n-icon-slot"
                                                                                             role="none"><i
                                          data-v-c70253f6="" role="img" class="n-icon"
                                          style="--n-bezier: cubic-bezier(.4, 0, .2, 1);"><svg data-v-c70253f6=""
                                                                                               xmlns="http://www.w3.org/2000/svg"
                                                                                               xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                                               viewBox="0 0 512 512"><rect
                                          x="128"
                                          y="128"
                                          width="336"
                                          height="336"
                                          rx="57"
                                          ry="57"
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-linejoin="round"
                                          stroke-width="32"></rect><path
                                          d="M383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
                                          fill="none" stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="32"></path></svg></i></div></span></button>
                          <span data-v-c70253f6="" class="ml-4 text-sm text-current"></span></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="n-scrollbar-rail n-scrollbar-rail--vertical" data-scrollbar-rail="true" aria-hidden="true">
              <div class="n-scrollbar-rail__scrollbar fade-in-transition-enter-from fade-in-transition-enter-active"
                   style="height: 278.883px; top: 45.4073px;"></div>
            </div>
          </div>

          <div v-show="isAble1" data-v-c70253f6="" class="w-full h-20 pt-3 flex justify-center items-center box-border px-28" style="margin-top: -80px">
            <div data-v-c70253f6="" class="n-input-group">
              <div data-v-c70253f6="" class="n-input n-input--resizable n-input--stateful"
                   style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-count-text-color: rgb(118, 124, 130); --n-count-text-color-disabled: rgba(194, 194, 194, 1); --n-color: rgba(255, 255, 255, 1); --n-font-size: 15px; --n-border-radius: 3px; --n-height: 40px; --n-padding-left: 14px; --n-padding-right: 14px; --n-text-color: rgb(51, 54, 57); --n-caret-color: #18a058; --n-text-decoration-color: rgb(51, 54, 57); --n-border: 1px solid rgb(224, 224, 230); --n-border-disabled: 1px solid rgb(224, 224, 230); --n-border-hover: 1px solid #36ad6a; --n-border-focus: 1px solid #36ad6a; --n-placeholder-color: rgba(194, 194, 194, 1); --n-placeholder-color-disabled: rgba(209, 209, 209, 1); --n-icon-size: 16px; --n-line-height-textarea: 1.6; --n-color-disabled: rgb(250, 250, 252); --n-color-focus: rgba(255, 255, 255, 1); --n-text-color-disabled: rgba(194, 194, 194, 1); --n-box-shadow-focus: 0 0 0 2px rgba(24, 160, 88, 0.2); --n-loading-color: #18a058; --n-caret-color-warning: #f0a020; --n-color-focus-warning: rgba(255, 255, 255, 1); --n-box-shadow-focus-warning: 0 0 0 2px rgba(240, 160, 32, 0.2); --n-border-warning: 1px solid #f0a020; --n-border-focus-warning: 1px solid #fcb040; --n-border-hover-warning: 1px solid #fcb040; --n-loading-color-warning: #f0a020; --n-caret-color-error: #d03050; --n-color-focus-error: rgba(255, 255, 255, 1); --n-box-shadow-focus-error: 0 0 0 2px rgba(208, 48, 80, 0.2); --n-border-error: 1px solid #d03050; --n-border-focus-error: 1px solid #de576d; --n-border-hover-error: 1px solid #de576d; --n-loading-color-error: #d03050; --n-clear-color: rgba(194, 194, 194, 1); --n-clear-size: 16px; --n-clear-color-hover: rgba(146, 146, 146, 1); --n-clear-color-pressed: rgba(175, 175, 175, 1); --n-icon-color: rgba(194, 194, 194, 1); --n-icon-color-hover: rgba(146, 146, 146, 1); --n-icon-color-pressed: rgba(175, 175, 175, 1); --n-icon-color-disabled: rgba(209, 209, 209, 1); --n-suffix-text-color: rgb(51, 54, 57);">
                <div class="n-input-wrapper">
                  <div class="n-input__input"><input type="text" class="n-input__input-el" placeholder="请输入"
                                                     size="20" value="">
                    <div class="n-input__placeholder"><span>请输入</span></div>
                  </div>
                </div>
                <div class="n-input__border"></div>
                <div class="n-input__state-border"></div>
              </div>
              <button data-v-c70253f6="" class="n-button n-button--primary-type n-button--large-type n-button--disabled"
                      tabindex="-1" type="button" disabled=""
                      style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #18a058; --n-color-hover: #36ad6a; --n-color-pressed: #0c7a43; --n-color-focus: #36ad6a; --n-color-disabled: #18a058; --n-ripple-color: #18a058; --n-text-color: #FFF; --n-text-color-hover: #FFF; --n-text-color-pressed: #FFF; --n-text-color-focus: #FFF; --n-text-color-disabled: #FFF; --n-border: 1px solid #18a058; --n-border-hover: 1px solid #36ad6a; --n-border-pressed: 1px solid #0c7a43; --n-border-focus: 1px solid #36ad6a; --n-border-disabled: 1px solid #18a058; --n-width: initial; --n-height: 40px; --n-font-size: 15px; --n-padding: 0 18px; --n-icon-size: 20px; --n-icon-margin: 6px; --n-border-radius: 3px;">
                <span class="n-button__icon" style="margin: 0px;"><div class="n-icon-slot" role="none"><i
                    data-v-c70253f6="" role="img" class="n-icon" style="--n-bezier: cubic-bezier(.4, 0, .2, 1);"><svg
                    data-v-c70253f6="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"><path
                    d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05z"
                    fill="currentColor"></path></svg></i></div></span>
                <div aria-hidden="true" class="n-base-wave"></div>
                <div aria-hidden="true" class="n-button__border"></div>
                <div aria-hidden="true" class="n-button__state-border"></div>
              </button>
            </div>
          </div>

<!--          <div id="baga" v-show="is3Active" style="width: 300px; height: 300px; background-color: #f00;-->
<!--z-index: 999; position: absolute; top: 0;left: 30px"><span>baga</span></div>-->
          <div v-show="isAble2" style="width:100%;height:100%"><chat/></div>
          <div v-show="isAble3" style="width:100%;height:100%"><chat/></div>

        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NDrawer,
  NIcon,
  NEmpty,
  NInput,
  NSpin,
  NTooltip, NList, NListItem, NScrollbar
} from 'naive-ui';
import Chat from '@/views/Chat/index.vue';
import ChatList from '@/views/ChatList/index.vue';
import SwitchTheme from '@/components/SwitchTheme.vue';
import useBaseStore from '@/store/base';
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {PencilSharp, ReorderThreeSharp, Trash} from '@vicons/ionicons5';
import useChatStore from '@/store/chat.ts';
import {GPT_MODEL_MAP} from '@/utils/config.ts';
import {emitterChat} from '@/utils/eventbus.ts';
import {chatTitle, restart} from '@/api/chat.ts';
import ChatGptSvg from "@/components/ChatGptSvg.vue";
import useLoading from "@/hooks/useLoading.ts";

const base = useBaseStore();
const chatStore = useChatStore();
const visibleList = ref(false);
const isMobile = computed(() => base.device === 'mobile');
const gptModel = computed(() => GPT_MODEL_MAP[chatStore.model].title);

const {isLoading, startLoading, endLoading} = useLoading<'list'>();
const activeId = ref<string | null>(null);

const isAble1 = ref(true)
const isAble2 = ref(false)
const isAble3 = ref(false)
const is3Active = ref(false)

interface EditFormState {
  _id: string;
  title: string;
}

const editForm = ref<EditFormState>({
  _id: '',
  title: ''
});

interface DataListState {
  _id: string;
  title: string;
  titleLength: number;
  createdAt: string;
  loading: boolean;
}

const dataList = ref<DataListState[]>([]);
const onActive = ref(false);
dataList.value = [
  {
    _id: '1',
    title: '飞机就餐时间咨询',
    titleLength: 5,
    createdAt: '2021-09-01',
    loading: false
  },
  {
    _id: '2',
    title: '飞机上是否有牛奶供应',
    titleLength: 5,
    createdAt: '2021-09-01',
    loading: false
  },
  {
    _id: '3',
    title: '新会话',
    titleLength: 5,
    createdAt: '2021-09-01',
    loading: false
  }
];

const newChat = () => {
  is3Active.value = true
  restart();
  dataList.value[2].title = '新会话';
};

const handleTitleFocus = (event: MouseEvent, row: DataListState) => {
  row.titleLength = (event.target as HTMLSpanElement).offsetWidth;
};

const handleItem = ({_id}: DataListState) => {
  if (activeId.value === _id || editForm.value._id === _id) return;
  activeId.value = _id;
  // emitterChat.emit('on-chat-item', () => _id);
  // emitterChat.emit('on-close-list');
  const titleElement = document.getElementById('title');
  titleElement.textContent = dataList.value.find(item => item._id === _id)?.title;

  if (_id === '1') {
    isAble1.value = true
    isAble2.value = false
    isAble3.value = false
  } else if (_id === '2') {
    isAble1.value = false
    isAble2.value = true
    isAble3.value = false
  } else {
    isAble1.value = false
    isAble2.value = false
    isAble3.value = true
    fetchDataAndDisplay();
  }
};

const handleList = () => {
  visibleList.value = true;
};

async function fetchDataAndDisplay() {
  try {
    const data = await chatTitle(); // 调用 chatTitle 获取标题文本
    const titleElement = document.getElementById('title');
    if (titleElement) {
      if (data !== 'No title') {
        titleElement.textContent = data; // 将 data 写入到 #title 的文本内容中
        dataList.value[2].title = data;
      } else {
        await fetchDataAndDisplay(); // 递归调用自身继续获取数据
      }
    } else {
      console.error('Element with id "title" not found.');
    }
  } catch (error) {
    console.error('Error fetching and displaying data:', error);
    // 处理错误
  }
}

async function restartChat() {
  try {
    await restart();
  } catch (error) {
    console.error('Error fetching and displaying data:', error);
    // 处理错误
  }
}


onMounted(() => {
  emitterChat.on('on-close-list', () => {
    visibleList.value = false;
  });
  restartChat();
  fetchDataAndDisplay();
});

onUnmounted(() => {
  emitterChat.off('on-close-list');
});
</script>

<style>
.Title {
  font-weight: bold;
  font-size: 18px;
}
</style>
