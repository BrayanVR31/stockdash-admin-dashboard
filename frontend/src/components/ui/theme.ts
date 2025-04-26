import {
  createSystem,
  defaultBaseConfig,
  defineConfig,
  defaultConfig,
} from "@chakra-ui/react";

const customConfig = defineConfig({
  ...defaultConfig,
  conditions: {
    on: "[data-container=dashboard]",
  },
});

export const system = createSystem(defaultBaseConfig, customConfig);
