import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    fence: {
      ...nodes.fence,
      render: component('./src/components/MarkdocFence.astro'),
      attributes: {
        ...nodes.fence?.attributes,
        content: { type: String },
        language: { type: String },
      },
    },
  },
});