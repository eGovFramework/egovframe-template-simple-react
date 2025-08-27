import EgovAdminBoardList from "@/pages/admin/board/EgovAdminBoardList";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "pages/admin/board/EgovAdminBoardList",
  component: EgovAdminBoardList,
  parameters: {},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/admin/board"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
