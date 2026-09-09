import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { requestFetch } from "@/api/egovFetch";
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
        ok: true,
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
