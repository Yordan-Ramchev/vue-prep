<script setup lang="ts">
import { ref, provide, readonly } from 'vue'

const tabs = ref<string[]>([])
const activeTab = ref<string>()

function setActive(title: string) {
  activeTab.value = title
}

function registerTab(title: string) {
  if(tabs.value.includes(title)) return;
  tabs.value.push(title)
}

provide(injectionKey, {
  withinTabs: true,
  registerTab,
  setActive,
  activeTab: readonly(activeTab)
})
</script>

<script lang="ts">
import type { InjectionKey, Ref } from "vue";
export const injectionKey = Symbol("vTabs") as InjectionKey<{
  withinTabs: boolean;
  registerTab: (title: string) => void;
  setActive: (title: string) => void;
  activeTab: Readonly<Ref<string | undefined>>;
}>;
</script>
<template>
  <div class="tabs">
    <div class="tab-trigger-wrapper">
      <button class="tab-trigger" :class="{ active: activeTab === tab }" v-for="tab in tabs" :key="tab" @click="setActive(tab)">{{ tab}}</button>
    </div>
    <div class="tab-content-wrapper">
      <slot />
    </div>
  </div>
</template>
