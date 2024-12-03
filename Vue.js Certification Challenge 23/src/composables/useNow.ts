import { ref } from "vue";
import { useInterval } from "@/composables/useInterval";

export const useNow = () => {
  const now = ref(new Date());

  useInterval(() => {
    now.value = new Date();
  }, 100);
  return now;
};
