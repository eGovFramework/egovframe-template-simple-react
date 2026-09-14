import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import { useListNavigation } from "@/hooks/useListNavigation";

/**
 * 상세 화면은 검색 조건을 `location.state?.searchCondition` 으로 읽는다 —
 * 목록을 거치지 않고 들어오면 없다. 그때도 목록 주소는 만들어져야 한다.
 */
const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe("useListNavigation 페이지 번호", () => {
  const setup = (search = "", state) => renderHook(() => ({
    ...useListNavigation("BBSMSTR_BBBBBBBBBBBB"),
    location: useLocation(),
  }), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[{ pathname: "/inform/notice", search, state }]}>
        {children}
      </MemoryRouter>
    ),
  });

  it.each([undefined, "0", "-1", "2.5", "2junk", "9007199254740992"])(
    "잘못되거나 없는 URL 페이지 %s는 1페이지로 보정한다", (page) => {
      const query = new URLSearchParams({ searchCnd: "1", searchWrd: "공지" });
      if (page !== undefined) query.set("page", page);
      const { result } = setup(`?${query}`);
      expect(result.current.searchCondition).toEqual({
        bbsId: "BBSMSTR_BBBBBBBBBBBB", pageIndex: 1, searchCnd: "1", searchWrd: "공지",
      });
    }
  );

  it.each([1, 3])("정상 URL 페이지 %s를 유지한다", (page) => {
    const { result } = setup(`?page=${page}`);
    expect(result.current.searchCondition.pageIndex).toBe(page);
  });

  it.each([[-1, 1], [2.5, 1], ["2junk", 1], [3, 3]])(
    "이전 화면의 페이지 %s를 %s로 복원한다", (pageIndex, expected) => {
      const condition = { bbsId: "board", pageIndex, searchCnd: "1", searchWrd: "공지" };
      const { result } = setup("?page=2", { searchCondition: condition });
      expect(result.current.searchCondition).toEqual({ ...condition, pageIndex: expected });
    }
  );

  it.each([[-1, 1], [3, 3]])("페이지 이동 %s의 요청과 주소가 일치한다", (page, expected) => {
    const { result } = setup();
    const retrieveList = vi.fn();
    act(() => result.current.handlePageMove(page,
      { current: { value: "1" } }, { current: { value: "공지" } }, retrieveList));
    expect(retrieveList).toHaveBeenCalledExactlyOnceWith({
      bbsId: "BBSMSTR_BBBBBBBBBBBB", pageIndex: expected, searchCnd: "1", searchWrd: "공지",
    });
    const query = new URLSearchParams(result.current.location.search);
    expect(query.get("page")).toBe(expected === 1 ? null : String(expected));
    expect(result.current.searchCondition.pageIndex).toBe(expected);
  });

  it("목록으로 돌아가는 주소에 소수 페이지를 넣지 않는다", () => {
    const { result } = setup();
    expect(result.current.getBackToListURL("/inform/notice", {
      pageIndex: 2.5, searchCnd: "1", searchWrd: "공지",
    })).toBe("/inform/notice?searchCnd=1&searchWrd=%EA%B3%B5%EC%A7%80");
  });
});

describe("useListNavigation.getBackToListURL", () => {
  const setup = () =>
    renderHook(() => useListNavigation("BBSMSTR_BBBBBBBBBBBB"), { wrapper });

  it("검색 조건이 없으면 목록 주소만 돌려준다", () => {
    const { result } = setup();

    expect(result.current.getBackToListURL("/inform/gallery", undefined)).toBe(
      "/inform/gallery"
    );
  });

  it("검색 조건이 있으면 쿼리로 붙인다", () => {
    const { result } = setup();

    expect(
      result.current.getBackToListURL("/inform/gallery", {
        pageIndex: 2,
        searchCnd: "1",
        searchWrd: "공지",
      })
    ).toBe("/inform/gallery?page=2&searchCnd=1&searchWrd=%EA%B3%B5%EC%A7%80");
  });

  it("기본 검색 조건은 쿼리를 만들지 않는다", () => {
    const { result } = setup();

    expect(
      result.current.getBackToListURL("/inform/gallery", {
        pageIndex: 1,
        searchCnd: "0",
        searchWrd: "",
      })
    ).toBe("/inform/gallery");
  });
});
