import EgovPaging from "@/components/EgovPaging";
import { useArgs } from "storybook/internal/preview-api";

export default {
  title: "components/EgovPaging",
  component: EgovPaging,
  tags: ["autodocs"],
  argTypes: {
    pagination: { control: "object" },
  },
  args: {
    pagination: {
      currentPageNo: 1,
      pageSize: 10,
      totalRecordCount: 1000,
      recordCountPerPage: 10,
    },
  },
};

export const Interactive = (args) => {
  const [{ pagination }, updateArgs] = useArgs();

  const handleMoveToPage = (page) => {
    updateArgs({
      pagination: {
        ...pagination,
        currentPageNo: page,
      },
    });
  };

  return <EgovPaging {...args} moveToPage={handleMoveToPage} />;
};
