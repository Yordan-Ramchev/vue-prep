- the `useTheme` composables takes the initial theme as it's only argument
- the `useTheme` composables defaults to "light" if no value is provided in the argument
- the `useTheme` composable returns a reactive ref with the value of the current theme
- the page styles change based on the value of the theme ref returned from the composable
