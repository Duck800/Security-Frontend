<template>
  <div class="w-auto h-auto flex justify-center items-center bg-white rounded-full">
    <img src='../assets/images/flight.jpg' class="round">
  </div>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { defineProps, withDefaults } from 'vue';

interface ChatGptSvgProps {
  size?: number | string;
}

const { size } = withDefaults(defineProps<ChatGptSvgProps>(), {
  size: 24
});
</script>

<style scoped>
.round{
  width:60px;
  border-radius:50%;
}
</style>
