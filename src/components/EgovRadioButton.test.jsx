import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EgovRadioButton from "@/components/EgovRadioButton";

describe("EgovRadioButton", () => {
  it("라벨 텍스트를 렌더링한다", () => {
    render(
      <EgovRadioButton
        name="searchType"
        label="전체"
        value="all"
        checkedValue="all"
        setter={vi.fn()}
      />
    );
    expect(screen.getByText("전체")).toBeInTheDocument();
  });

  it("value와 checkedValue가 같으면 checked 상태이다", () => {
    render(
      <EgovRadioButton
        name="searchType"
        label="전체"
        value="all"
        checkedValue="all"
        setter={vi.fn()}
      />
    );
    expect(screen.getByTitle("전체")).toBeChecked();
  });

  it("value와 checkedValue가 다르면 unchecked 상태이다", () => {
    render(
      <EgovRadioButton
        name="searchType"
        label="제목"
        value="title"
        checkedValue="all"
        setter={vi.fn()}
      />
    );
    expect(screen.getByTitle("제목")).not.toBeChecked();
  });

  it("checked 상태이면 label에 'on' 클래스가 추가된다", () => {
    const { container } = render(
      <EgovRadioButton
        name="searchType"
        label="전체"
        value="all"
        checkedValue="all"
        setter={vi.fn()}
      />
    );
    expect(container.querySelector("label")).toHaveClass("on");
  });

  it("unchecked 상태이면 label에 'on' 클래스가 없다", () => {
    const { container } = render(
      <EgovRadioButton
        name="searchType"
        label="제목"
        value="title"
        checkedValue="all"
        setter={vi.fn()}
      />
    );
    expect(container.querySelector("label")).not.toHaveClass("on");
  });

  it("클릭 시 setter를 해당 value로 호출한다", async () => {
    const setter = vi.fn();
    render(
      <EgovRadioButton
        name="searchType"
        label="제목"
        value="title"
        checkedValue="all"
        setter={setter}
      />
    );
    await userEvent.click(screen.getByTitle("제목"));
    expect(setter).toHaveBeenCalledWith("title");
  });
});
