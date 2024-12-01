<script setup lang="ts">
import { ref, computed } from "vue";
import { sanitizeUrl } from "@braintree/sanitize-url";

const links = ref([
  {
    label: "Certificates.dev",
    url: "https://certificates.dev/",
  },
  {
    label: "Vue Docs",
    url: "https://vuejs.org/",
  },
  {
    label: "Vue School",
    url: "https://vueschool.io/",
  },
  {
    label: "Unsafe Link from Untrusted User",
    url: "javascript: alert('script kitties attack!! 🐱⚔️')",
  },
]);

const safeLinks = computed(() =>
  links.value.map((link) => ({
    label: link.label,
    url: sanitizeUrl(link.url),
  })),
);
</script>
<template>
  <div class="page">
    <ul class="menu bg-base-200 rounded-box">
      <li v-for="link in safeLinks" :key="link.url">
        <a :href="link.url">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>
