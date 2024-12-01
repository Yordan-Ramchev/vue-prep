---
difficulty: 1
training: true
chapter: "Chapter 6: TypeScript"
tags: vue
---

# Type the Component Data Challenge

In this challenge, we're loading blog posts from an API endpoint. Because the reactive `posts` array does NOT have any initial hardcoded data it cannot be implicitly typed. Therefore, you'll need to explicitly type it as an array of posts that have the same properties from the API endpoint (see `/public/api.json`).

## Requirements

1. Type the `posts` ref as an array of `Post` objects.
2. Try explicitly typing the computed prop for practice (even though it can be easily implicitly typed)

## Screenshot of TS Errors Before Explicit Typing

![Screenshot of the solution](https://images.certificates.dev/csvd-training-code-challenge-before-20.png)

## Screenshot of TS Errors Resolved

![Screenshot of the solution](https://images.certificates.dev/csvd-training-code-challenge-20.png)
