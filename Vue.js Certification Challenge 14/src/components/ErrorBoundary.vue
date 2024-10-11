<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";

const error = ref<Error>();
const key = ref("init");

function clearError() {
  error.value = undefined;
  key.value = crypto.randomUUID();
}

onErrorCaptured((err: any) => {
  error.value = err;
  return false;
});
</script>

<template>
  <div v-if="error">
    <slot name="error" :error="error" :clearError="clearError" />
  </div>
  <div v-show="!error" :key="key">
    <slot></slot>
  </div>
</template>
