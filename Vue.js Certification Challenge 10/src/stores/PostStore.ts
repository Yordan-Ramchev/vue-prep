import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import type { Post } from "@/types";
import { useCachedFetch } from "@/composables/useCachedFetch";

export const usePostStore = defineStore("PostStore", () => {
  const posts = ref<Post[]>();
  const loadingList = ref(false);
  async function fetchPostList() {
    loadingList.value = true;
    const url = "/api/posts?fields=id,title,previewSnippet";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      posts.value = await response.json();
    } catch (error) {
      console.error(error?.message);
    } finally {
      loadingList.value = false;
    }
  }

  const loadingSingle = ref(false);
  const post = ref<Post>();
  async function fetchPostSingle({ id }) {
    loadingSingle.value = true;

    post.value = posts.value?.find((post) => post.id === id);

    const url = `/api/posts/${id}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      post.value = await response.json();
    } catch (error) {
      console.error(error?.message);
    } finally {
      loadingSingle.value = false;
    }
  }

  return {
    // list of posts
    loadingList,
    posts,
    fetchPostList,

    // single post
    fetchPostSingle,
    loadingSingle,
    post,
  };
});

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}
