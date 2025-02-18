# Retrieving theme values

If you need color values at runtime, its best to retrieve them directly from `tailwindcss/colors`

```tsx
import colors from "tailwindcss/colors";

export function MyActivityIndicator(props) {
  return <ActivityIndicator size="small" color={colors.blue.500} {...props} />;
}
```

If you use custom theme values, extract them to a file that is shared with your code and your `tailwind.config.js`. [Tailwind CSS has documentation on referencing theme values in Javascript](https://tailwindcss.com/docs/configuration#referencing-in-java-script).

```tsx title=colors.ts
module.exports = {
  tahiti: {
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
};
```

```ts title=tailwind.config.js
const colors = require("./colors");

module.exports = {
  theme: {
    extend: {
      colors,
    },
  },
};
```

```tsx title=MyActivityIndicator.js
import colors from "./colors";

export function MyActivityIndicator(props) {
  return <ActivityIndicator color={colors.tahiti.500} {...props} />;
}
```

```

```
