import { ref, watch, toValue, nextTick, watchEffect } from "vue";
// @ts-nocheck
// remove the line above if you want to use TS
// if you prefer plain JS, leave as is

// 1. take in 2 agruments:
//     - `source` - the ref to keep the history for (required)
//   - `capacity` - a number of how many records to keep in the history before it starts "forgetting" older values (default: Infinity) It could be a raw number, a reactive ref, a computed ref, or a callback function (getter)
// 2. return 3 things:
//     - `history` - an array of all past values along with a timestamp of when that value was first set
// - `undo` - a function that reset's the `source` value to the last history point
// - `redo` - a function that does the opposite of `undo` (only works for values that were undone with the `undo` function. In other words, redo would only work after an undo)
//
// > 💡 HINT: You could structure each item within the history array something like this:
// > `{ value: (past source value),  timestamp:  1714595894070}`
//
// > 💡 HINT: Feel free to use TypeScript to make your composable type safe if you'd like. This is NOT required however.

export const useRefHistory = (source: any, capacity = Infinity) => {
  const history = ref([]);
  const future = ref([]);

  let updating = false;
  let updatedAt = new Date();

  watch(source, (newVal, oldVal) => {
    if (updating) return;

    future.value = [];

    const cap = toValue(capacity);

    if (cap === 0) return;

    if (cap === history.value.length) history.value.pop();

    history.value.unshift(clone({ value: oldVal, timestamp: updatedAt }));

    updatedAt = new Date();
  });

  function undo() {
    updating = true;

    const record = history.value.shift();

    if (record) {
      future.value.unshift(
        clone({ value: source.value, timestamp: updatedAt }),
      );

      source.value = record.value;
    }

    nextTick(() => (updating = false));
  }

  function redo() {
    updating = true;
    const record = future.value.unshift();

    if (record && history.value.length < toValue(capacity)) {
      history.value.unshift(
        clone({ value: source.value, timestamp: updatedAt }),
      );

      source.value = record.value;
    }

    nextTick(() => (updating = false));
  }

  watchEffect(() => {
    const cap = toValue(capacity);
    // and if the capacity becomes less than the current history length
    if (history.value.length > cap) {
      // we remove the oldest records to match the new capacity
      history.value = history.value.slice(0, cap);
    }
  });

  return {
    undo,
    redo,
    history,
  };
};

function clone(value: any) {
  return JSON.parse(JSON.stringify(value));
}
