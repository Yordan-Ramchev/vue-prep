<script setup lang="ts">
import { useNow } from "./composables/useNow";
const now = useNow();
</script>

<template>
  <div class="page">
    {{ now }}
  </div>
</template>
