<script setup lang="ts">
import {inject, computed, readonly, ref} from 'vue'
import { injectionKey } from "./vTabs.vue";

const props = defineProps({ title: {type: String, required: true  }})

const tabsProvider = inject(injectionKey, {
  withinTabs: false,
  registerTab: (title: string) => {},
  activeTab: readonly(ref()),
  setActive: (title: string) => {},
});

if(!tabsProvider.withinTabs) {
 throw new Error('vTabPanel should be part of vTab!')
}

tabsProvider.registerTab(props.title)

if(!tabsProvider.activeTab.value) {
  tabsProvider.setActive(props.title)
}
const isActive = computed(() => tabsProvider.activeTab.value === props.title);
</script>
<template>
  <div class="tab-content" v-show="isActive">
    <slot />
  </div>
</template>
