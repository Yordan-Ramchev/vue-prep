<script setup lang="ts">
import { ref, computed } from "vue";

interface Post {
  id: number;
  title: string;
}

// you should explicitly type this 👇
const posts = ref<Post[]>([]);

// try explicitly typing this too
// (even though it's not strictly necessary) 👇
const numberOfPosts = computed<number>(() => posts.value.length);

async function loadPosts() {
  const res = await fetch("/api.json");
  posts.value = await res.json();
}

loadPosts();
</script>
<template>
  <div class="page">
    <div>
      <h1>Posts ({{ numberOfPosts }})</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
