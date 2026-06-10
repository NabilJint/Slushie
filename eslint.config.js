// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      // posthog-react-native is installed via pnpm; the node resolver returns a
      // false positive because it doesn't follow pnpm's virtual-store symlinks.
      "import/no-unresolved": ["error", { ignore: ["posthog-react-native"] }],
    },
  },
]);
