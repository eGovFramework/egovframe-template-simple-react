import EgovError from "@/components/EgovError";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "components/EgovError",
  component: EgovError,
  tags: ["autodocs"],
  argTypes: {
    msg: { control: "text" },
  },
  args: {
    msg: "다음과 같은 에러가 발생하였습니다.",
  },
  decorators: [
    (Story, context) => (
      <MemoryRouter
        key={context.args.msg}
        initialEntries={[
          { pathname: "/error", state: { msg: context.args.msg } },
        ]}
      >
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
