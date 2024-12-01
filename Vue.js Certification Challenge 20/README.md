---
difficulty: 1
training: true
chapter: "Chapter 6: TypeScript"
tags: vue
---

# Type an Alert Component Interface

In this challenge, we've created a simple `AppAlert` component. It takes 2 props: `type` and `dismissable`. It also emits an event `dismiss`.

Your task is to type these props and emits.

## Requirements

1. The `type` prop should be one of the following strings: "success", "error", "warning", or "info"
2. The `type` prop should default to 'info'
3. The `dismissable` prop should be a boolean
4. The `dismissable` prop should default to `false`
5. The `dismiss` event's payload should be the literal type `true`
6. All TS errors within the `AppAlert` component should be resolved

> 💡 HINT: Play with the usage of the `AppAlert` component in `App.vue` to see how your IDE's autocomplete is more useful with the typed props and events.

## Screenshot of Autocomplete results for `AppAlert` `type` prop

![Screenshot of Autocomplete results for AppAlert type prop](https://images.certificates.dev/csvd-training-code-challenge-21.png)

## Screenshot of Dismiss Event Payload properly Typed when Hovered

![Screenshot of Dismiss Event Payload properly Typed when Hovered](https://images.certificates.dev/csvd-training-code-challenge-21-2.png)

## Screenshot of the solution

![Screenshot of the solution](https://images.certificates.dev/csvd-training-code-challenge-21.gif)
