import { computed, ref, toRef } from "vue";

export const useCycleList = (data: string[]) => {
  const list = ref(data);
  const index = ref(0);

  const state = computed({
    get() {
      return list.value[index.value];
    },
    set(value) {
      return (list.value[index.value] = value);
    },
  });

  function prev() {
    if (index.value === 0) {
      index.value = data.length - 1;
    } else {
      index.value -= 1;
    }
  }

  function next() {
    if (index.value === data.length - 1) {
      index.value = 0;
    } else {
      index.value += 1;
    }
  }

  return {
    prev,
    next,
    state,
  };
};
