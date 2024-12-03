// 1. `useLocalStorage` accepts a `key` and uses it to set and retrieve the value in local storage
// 2. `useLocalStorage` accepts a `defaultValue` used to set the value of the ref when nothing is currently set under the provided key in localStorage.
// 3. The composable returns a ref called value that holds the value from localStorage
// 4. The returned value updates when the related data in localStorage updates
// 5. The data in localStorage should updates when the ref value updates
// 6. When you type in the input in the running app, the value syncs to local storage (and vice versa)
import { ref, watch, onMounted } from "vue";

export function useLocalStorage(key: string, defaultValue: string) {
  const value = ref(defaultValue);

  onMounted(() => {
    value.value = localStorage.getItem(key) || "";
  });

  watch(value, (nawValue) => localStorage.setItem(key, value.value));

  return value;
}
