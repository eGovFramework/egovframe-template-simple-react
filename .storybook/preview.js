/** @type { import('@storybook/react-webpack5').Preview } */
import "../src/css/base.css";
import "../src/css/layout.css";
import "../src/css/component.css";
import "../src/css/page.css";
import "../src/css/response.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
