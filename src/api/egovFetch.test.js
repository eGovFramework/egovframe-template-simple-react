import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { getQueryString, requestFetch } from "@/api/egovFetch";
import CODE from "@/constants/code";

/**
 * 인증 오류 응답은 로그인 화면으로 보내고 거기서 끝나야 한다.
 * 응답 본문을 화면 핸들러에 넘기면 핸들러가 `resp.result.*` 를 읽다 깨진다.
 */
describe("requestFetch 인증 오류 처리", () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    // jsdom 은 실제 이동을 구현하지 않는다 — 대입만 받아 두고 넘어간다.
    delete window.location;
    window.location = { href: "" };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ resultCode: CODE.RCV_ERROR_AUTH }),
      })
    );
  });

  afterEach(() => {
    alertSpy.mockRestore();
    vi.restoreAllMocks();
  });

  it("인증 오류면 화면 핸들러를 부르지 않는다", async () => {
    const handler = vi.fn();

    requestFetch("/board", { method: "GET" }, handler);
    await vi.waitFor(() => expect(alertSpy).toHaveBeenCalled());

    expect(handler).not.toHaveBeenCalled();
  });

  it("인증 오류가 화면 오류 알림을 덧붙이지 않는다", async () => {
    // 실제 화면 핸들러가 하는 일 — 목록 3종이 전부 이 모양이다.
    const handler = vi.fn((resp) => {
      void resp.result.brdMstrVO;
    });
    const errorHandler = vi.fn();

    requestFetch("/board", { method: "GET" }, handler, errorHandler);
    await vi.waitFor(() => expect(alertSpy).toHaveBeenCalled());

    expect(errorHandler).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });
});

/**
 * 목록 조회 쿼리스트링은 사용자가 입력한 검색어를 그대로 싣는다.
 * 인코딩하지 않으면 `#` 뒤가 잘리고 `&` 가 파라미터를 쪼개 서버가 다른 조건으로 조회한다.
 * 같은 검색어를 주소창에 남기는 useListNavigation 은 이미 인코딩한다.
 */
describe("getQueryString", () => {
  it("검색어의 특수문자를 인코딩한다", () => {
    expect(
      getQueryString({
        bbsId: "BBSMSTR_AAA",
        pageIndex: 1,
        searchCnd: "0",
        searchWrd: "C#5 & C++",
      })
    ).toBe("?bbsId=BBSMSTR_AAA&pageIndex=1&searchCnd=0&searchWrd=C%235+%26+C%2B%2B");
  });

  it("인코딩한 쿼리스트링에서 원래 검색어를 되읽을 수 있다", () => {
    const searchWrd = "C#5 & C++";
    const url = new URL(
      "/board" + getQueryString({ bbsId: "BBSMSTR_AAA", searchWrd }),
      "http://localhost"
    );

    expect(url.searchParams.get("searchWrd")).toBe(searchWrd);
  });
});
