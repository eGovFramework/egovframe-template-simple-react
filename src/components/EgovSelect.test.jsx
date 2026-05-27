import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EgovSelect from "@/components/EgovSelect";

const sampleOptions = [
  { value: "", label: "전체" },
  { value: "1", label: "공지사항" },
  { value: "2", label: "자료실" },
];

describe("EgovSelect", () => {
  it("옵션 목록을 올바르게 렌더링한다", () => {
    render(
      <EgovSelect
        id="sel1"
        name="searchType"
        title="검색유형"
        options={sampleOptions}
        setValue=""
        setter={vi.fn()}
      />
    );
    expect(screen.getByTitle("검색유형")).toBeInTheDocument();
    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("공지사항")).toBeInTheDocument();
    expect(screen.getByText("자료실")).toBeInTheDocument();
  });

  it("id, name 속성이 올바르게 설정된다", () => {
    render(
      <EgovSelect
        id="sel1"
        name="searchType"
        title="검색유형"
        options={sampleOptions}
        setValue=""
        setter={vi.fn()}
      />
    );
    const select = screen.getByTitle("검색유형");
    expect(select).toHaveAttribute("id", "sel1");
    expect(select).toHaveAttribute("name", "searchType");
  });

  it("setValue에 해당하는 옵션이 기본 선택된다", () => {
    render(
      <EgovSelect
        id="sel1"
        name="searchType"
        title="검색유형"
        options={sampleOptions}
        setValue="1"
        setter={vi.fn()}
      />
    );
    const select = screen.getByTitle("검색유형");
    expect(select.value).toBe("1");
  });

  it("옵션 변경 시 setter를 호출한다", async () => {
    const setter = vi.fn();
    render(
      <EgovSelect
        id="sel1"
        name="searchType"
        title="검색유형"
        options={sampleOptions}
        setValue=""
        setter={setter}
      />
    );
    await userEvent.selectOptions(screen.getByTitle("검색유형"), "2");
    expect(setter).toHaveBeenCalled();
  });
});
