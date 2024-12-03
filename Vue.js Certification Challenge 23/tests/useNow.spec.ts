import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { useNow } from "../src/composables/useNow";
import { isRef } from "vue";

describe("useNow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  test.todo("should should return a reactive date object", () => {});

  test.todo("should always be accurate to the second", () => {});
});
