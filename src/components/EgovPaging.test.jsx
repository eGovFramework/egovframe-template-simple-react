import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EgovPaging from "@/components/EgovPaging";

describe("EgovPaging", () => {
  it("pagination prop이 없으면 '-'를 출력한다", () => {
    const { container } = render(<EgovPaging />);
    expect(container.querySelector(".paging")).toBeInTheDocument();
    expect(container.querySelector("ul").textContent).toBe("-");
  });

  it("전체 페이지가 pageSize 이하이면 처음/이전/다음/마지막 버튼을 렌더링하지 않는다", () => {
    const pagination = {
      currentPageNo: 1,
      pageSize: 10,
      totalRecordCount: 30,
      recordCountPerPage: 10,
    };
    render(<EgovPaging pagination={pagination} moveToPage={vi.fn()} />);
    expect(screen.queryByText("처음")).not.toBeInTheDocument();
    expect(screen.queryByText("이전")).not.toBeInTheDocument();
    expect(screen.queryByText("다음")).not.toBeInTheDocument();
  });

  it("페이지 번호 버튼을 올바르게 렌더링한다", () => {
    const pagination = {
      currentPageNo: 2,
      pageSize: 10,
      totalRecordCount: 30,
      recordCountPerPage: 10,
    };
    render(<EgovPaging pagination={pagination} moveToPage={vi.fn()} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("현재 페이지 버튼에 'cur' 클래스를 적용한다", () => {
    const pagination = {
      currentPageNo: 2,
      pageSize: 10,
      totalRecordCount: 30,
      recordCountPerPage: 10,
    };
    render(<EgovPaging pagination={pagination} moveToPage={vi.fn()} />);
    const currentBtn = screen.getByText("2").closest("button");
    expect(currentBtn).toHaveClass("cur");
  });

  it("전체 페이지가 pageSize를 초과하면 처음/이전/다음/마지막 버튼을 렌더링한다", () => {
    const pagination = {
      currentPageNo: 5,
      pageSize: 3,
      totalRecordCount: 50,
      recordCountPerPage: 5,
    };
    render(<EgovPaging pagination={pagination} moveToPage={vi.fn()} />);
    expect(screen.getByText("처음")).toBeInTheDocument();
    expect(screen.getByText("이전")).toBeInTheDocument();
    expect(screen.getByText("다음")).toBeInTheDocument();
  });

  it("페이지 번호 클릭 시 moveToPage를 해당 번호로 호출한다", async () => {
    const moveToPage = vi.fn();
    const pagination = {
      currentPageNo: 1,
      pageSize: 10,
      totalRecordCount: 30,
      recordCountPerPage: 10,
    };
    render(<EgovPaging pagination={pagination} moveToPage={moveToPage} />);
    await userEvent.click(screen.getByText("3"));
    expect(moveToPage).toHaveBeenCalledWith(3);
  });

  it("처음 버튼 클릭 시 moveToPage(1)을 호출한다", async () => {
    const moveToPage = vi.fn();
    const pagination = {
      currentPageNo: 5,
      pageSize: 3,
      totalRecordCount: 50,
      recordCountPerPage: 5,
    };
    render(<EgovPaging pagination={pagination} moveToPage={moveToPage} />);
    await userEvent.click(screen.getByText("처음"));
    expect(moveToPage).toHaveBeenCalledWith(1);
  });
});
