import EgovRadioButtonGroup from "@/components/EgovRadioButtonGroup";
import { useArgs } from "storybook/internal/preview-api";

export default {
  title: "components/EgovRadioButtonGroup",
  component: EgovRadioButtonGroup,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    radioGroup: { control: "object" },
    setter: { action: "changed" },
  },
  args: {
    radioGroup: [
      { label: "Radio 1", value: "radio1" },
      { label: "Radio 2", value: "radio2" },
      { label: "Radio 3", value: "radio3" },
    ],
    name: "radioGroup",
    setValue: "radio1",
  },
};

export const Default = (args) => {
  const [, updateArgs] = useArgs();

  const handleChange = (newValue) => {
    updateArgs({ setValue: newValue });
  };

  return <EgovRadioButtonGroup {...args} setter={handleChange} />;
};
