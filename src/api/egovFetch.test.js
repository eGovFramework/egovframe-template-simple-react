import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { getQueryString, requestFetch } from "@/api/egovFetch";
import CODE from "@/constants/code";
import { mockJsonResponse } from "@/test/mockFetch";

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
      Promise.resolve(mockJsonResponse({ resultCode: CODE.RCV_ERROR_AUTH }))
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

  it("인증 오류에서도 반환한 Promise가 완료된다", async () => {
    const handler = vi.fn();
    const request = requestFetch("/board", { method: "GET" }, handler);

    await expect(request).resolves.toBeUndefined();
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

/** HTTP 상태는 업무 resultCode와 별도로 판단한다. */
describe("requestFetch HTTP 응답 처리", () => {
  const originalLocation = window.location;
  let alertSpy;

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem("loginUser", JSON.stringify({ id: "demo-user" }));
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    delete window.location;
    window.location = { href: "/protected" };
  });

  afterEach(() => {
    window.location = originalLocation;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each([
    [200, { resultCode: 403 }],
    [401, { resultCode: 403 }],
    [401, { resultCode: "401" }],
    [401, { resultCode: 200 }],
    [401, undefined],
    [401, "<html>Unauthorized</html>"],
  ])("HTTP %s 인증 오류는 본문 %j와 무관하게 로그인으로 이동한다", async (status, body) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        mockJsonResponse(typeof body === "object" ? body : undefined, {
          ok: status === 200,
          status,
        })
      )
    );
    const handler = vi.fn();
    const errorHandler = vi.fn();

    await expect(requestFetch("/bbsMaster", { method: "GET" }, handler, errorHandler)).resolves.toBeUndefined();

    expect(window.location.href).toBe("/login");
    expect(JSON.parse(sessionStorage.getItem("loginUser"))).toEqual({ id: "" });
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(handler).not.toHaveBeenCalled();
    expect(errorHandler).not.toHaveBeenCalled();
  });

  it.each([
    [403, { resultCode: 403, resultMessage: "권한이 없습니다." }, "권한이 없습니다."],
    [500, { resultMessage: "서버 오류" }, "서버 오류"],
    [500, null, "HTTP error: 500"],
    [500, { resultMessage: 123 }, "HTTP error: 500"],
    [500, { resultMessage: " " }, "HTTP error: 500"],
    [502, undefined, "HTTP error: 502"],
  ])("HTTP %s 오류는 로그아웃 없이 오류 콜백에 전달한다", async (status, body, message) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(mockJsonResponse(body, { ok: false, status }))
    );
    const handler = vi.fn();
    const errorHandler = vi.fn();

    await requestFetch("/bbsMaster", { method: "GET" }, handler, errorHandler);

    expect(errorHandler).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ message }));
    expect(handler).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
    expect(window.location.href).toBe("/protected");
    expect(JSON.parse(sessionStorage.getItem("loginUser"))).toEqual({ id: "demo-user" });
  });

  it("인증 조회는 401을 오류 콜백으로 받아 반복 이동을 피한다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(mockJsonResponse(undefined, { ok: false, status: 401 }))
    );
    const handler = vi.fn();
    const errorHandler = vi.fn();
    await requestFetch("/auth/me", { method: "GET" }, handler, errorHandler, { redirectOnUnauthorized: false });
    expect(errorHandler).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ message: "HTTP error: 401" }));
    expect(handler).not.toHaveBeenCalled();
    expect(window.location.href).toBe("/protected");
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it("네트워크 장애를 인증 만료로 처리하지 않는다", async () => {
    const error = new TypeError("Failed to fetch");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(error));
    const errorHandler = vi.fn();
    await requestFetch("/board", { method: "GET" }, vi.fn(), errorHandler);
    expect(errorHandler).toHaveBeenCalledExactlyOnceWith(error);
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(window.location.href).toBe("/protected");
  });
});
