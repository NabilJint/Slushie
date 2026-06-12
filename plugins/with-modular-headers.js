const { withPodfile } = require("@expo/config-plugins");

module.exports = function withModularHeaders(config) {
  return withPodfile(config, async (config) => {
    const contents = config.modResults.contents;
    if (!contents.includes("use_modular_headers!")) {
      config.modResults.contents = contents.replace(
        /^(platform :ios.*)$/m,
        "$1\nuse_modular_headers!",
      );
    }
    return config;
  });
};
