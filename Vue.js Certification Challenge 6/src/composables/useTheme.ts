// @ts-nocheck
// remove the line above if you want to use TS
// if you prefer plain JS, leave as is

import { ref, watch } from "vue";

export const useTheme = (theme: string = "light") => {
  const _theme = ref(theme);

  watch(
    _theme,
    (newValue) => {
      const HTML = document.querySelector("html");
      if (HTML) {
        HTML.setAttribute("data-theme", newValue);
        // HTML.dataset.theme = newTheme;
      }
    },
    { immediate: true },
  );

  return _theme;
};
