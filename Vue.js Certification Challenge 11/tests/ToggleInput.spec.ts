import { describe, it, expect, beforeEach, test } from "vitest";
import { mount } from "@vue/test-utils";
import ToggleInput from "../src/components/ToggleInput.vue";

describe("the toggle input component", () => {
  test("toggles the v-model value between true and false when clicked", async () => {
    const toggleInputComponent = mount(ToggleInput, {
      attachTo: document.body,
      props: {
        modelValue: false,
      },
    });

    // Click the component twice
    await toggleInputComponent.trigger("click");
    await toggleInputComponent.trigger("click");

    // Get the values that were emitted
    const emittedValues = toggleInputComponent.emitted("update:modelValue");

    const valueOnFirstClick = emittedValues ? emittedValues[0][0] : null;
    const valueOnSecondClick = emittedValues ? emittedValues[1][0] : null;

    // On the first click the value should be true since we passed false for the initial prop value
    expect(valueOnFirstClick).toBe(true);
    // On the second click the value should be false since we clicked it again
    expect(valueOnSecondClick).toBe(false);
  });

  test("supports a binary v-model modifier", async () => {
    const toggleInputComponent = mount(ToggleInput, {
      attachTo: document.body,
      props: {
        modelValue: false,
        modelModifiers: { binary: true },
      },
    });

    // Click the component twice
    await toggleInputComponent.trigger("click");
    await toggleInputComponent.trigger("click");
    await toggleInputComponent.trigger("click");

    // Get the values that were emitted
    const emittedValues = toggleInputComponent.emitted("update:modelValue");
    const valueOnFirstClick = emittedValues ? emittedValues[0][0] : null;
    const valueOnSecondClick = emittedValues ? emittedValues[1][0] : null;

    // On the first click the value should be true since we passed false for the initial prop value
    expect(valueOnFirstClick).toBe(1);
    // On the second click the value should be false since we clicked it again
    expect(valueOnSecondClick).toBe(0);
  });
});
