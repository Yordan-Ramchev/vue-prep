<script setup lang="ts">
import AppAlert from "./components/AppAlert.vue";
function handleDismiss(payload: boolean) {
  alert(`Alert is dismissed: ${payload}`);
}
</script>
<template>
  <div class="page">
    <div>
      <AppAlert
        :dismissible="true"
        type="success"
        @dismiss="handleDismiss($event)"
      >
        Something successful happened 🎉
      </AppAlert>
      <AppAlert :dismissible="false" type="error">
        Oh no, something went wrong 😢
      </AppAlert>
    </div>
  </div>
</template>
