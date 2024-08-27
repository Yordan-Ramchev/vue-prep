<script setup>
import { ref, watch, nextTick } from "vue";
const modelValue = defineModel();
const el = ref();

watch(modelValue, async () => {
  el.value.style.height = "auto";
  await nextTick();
  el.value.style.height = el.value.scrollHeight + "px";
});
</script>
<template>
  <textarea v-model="modelValue" ref="el" rows="1"></textarea>
</template>
