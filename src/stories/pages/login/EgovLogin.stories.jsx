import EgovLogin from "@/pages/login/EgovLogin";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "pages/login/EgovLogin",
  component: EgovLogin,
  parameters: {},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/login"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
